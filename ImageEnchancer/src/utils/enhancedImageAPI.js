import axios from './../../node_modules/axios/lib/axios';

const API_KEY="YOUR API KEY HERE";
const BASE_URL="https://techhk.aoscdn.com";

const MAXIMUM_RETRIES=5;

export const enchancedImageAPI=async(file)=>{
    //code to call API and get enhanced Image
   try{
    
    const taskId=await uploadImage(file);
    console.log("Image Uploaded  ",taskId);

    // it is giving the status as 4 -----> it measn the Imaeg is Still Processing
    // when the status is 5 -----> it means the image is ready to be used
    // so to Avoid this we make use of POLLING-----> i.e hum ye nochke lone ko tabtak call karege jab tak status code 5 nahi ho jata this is called POLLING


    // const enchancedImageData=await fetchEnhancedImage(taskId);
    //                                          |
    //                                          |
    //                                          |
    //                                          |
    //                                          |
    const enchancedImageData=await pollForEnhancedImage(taskId);


    
    console.log("Image Enhanced  ",enchancedImageData);

    return enchancedImageData;
    
   }catch(error){
    console.log("Error Enhancing The Image: ",error.message);
   }
};

const uploadImage=async(file)=>{
    // ---------------------------------- Code to Upload Image:-
    // "/api/tasks/visual/scale/"  -----POST

    const formData=new FormData();
    formData.append("image_file",file);   //image_file------> variable in API documentation to be taken

    const {data}= await axios.post(
        `${BASE_URL}/api/tasks/visual/scale/`,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data", //our type o data is Multipart and not Text
                "X-API-KEY":API_KEY,
            },
        }
    ); //formData-> Image is stored here

    if(!data?.data?.task_id){
        throw new Error("Failed to Upload Image! Task ID not Found");
    }
    // console.log(data);
    return data.data.task_id;

}

const pollForEnhancedImage=async(taskId,retries=0)=>{
    const resultImage=await fetchEnhancedImage(taskId);

    if(resultImage.state ===4){ //if image is ready
        console.log(`Processing.....(${retries}/${MAXIMUM_RETRIES})`);

        if(retries>=MAXIMUM_RETRIES){
            throw new Error("Max retries reached. Please try again later.");
        }

        //Wait for 2 Seconds
        await new Promise((resolve)=>setTimeout(resolve,2000));

        return pollForEnhancedImage(taskId,retries+1);//Recurssion until the retries hit the maximum limit of 5 as meantioned in IF Condition
    }
    console.log("Enhanced Image URL: ",resultImage);
    return resultImage;
};


const fetchEnhancedImage=async(taskId)=>{
    // "/api/tasks/visual/scale/{task_id}" -----GET  (task_id will be generated when you will upload the Image)
    // ---------------------------------- Fetch Enhanced image:-

    const {data}= await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers:{
                "X-API-KEY":API_KEY,
            },
        }
    ); //formData-> Image is stored here
    if(!data?.data){
        throw new Error("Failed to Fetch Enhanced Image");
    }
    return data.data;
};








// {status: 200, message: 'success', data: {…}}
// data
// : 
// {task_id: '234bc2ae-649e-452c-b89e-49c5c9f13da2'}
// message
// : 
// "success"
// status
// : 
// 200
// [[Prototype]]
// : 
// Object



// {status: 200, data: {…}}
// data
// : 
// {completed_at: 1746618759, created_at: 1746618758, download_time: 27, image: 'https://wxtechhk.oss-cn-hongkong.aliyuncs.com/task…a510c043&x-oss-signature-version=OSS4-HMAC-SHA256', image_height: 1900, …}
// status
// : 
// 200
// [[Prototype]]
// : 
// Object