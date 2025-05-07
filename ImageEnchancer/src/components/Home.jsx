// import React, { use, useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import Loading from './Loading';
import { useState } from 'react';


const Home = () => {

    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(null);

    const UploadimageHandler = async (file) => {   //async-----> to use axios
        //1) Now we want to Display the Image in the Uploaded image section:-

        setUploadImage(URL.createObjectURL(file));  //Now we cant save the file directly so we need to send the OBJECT-----> that acts as IMAGE
        console.log(URL.createObjectURL(file));
        //URL.createObjectURL(file)-----> Will pass the Image in the form of Link
        setloading(true);

        //2) As well as Hitting the API too:-
        try {

            const enhancedURL=await enchancedImageAPI(file);  //await-----> jab tak API call na ho tab tak rukho
            setEnhancedImage(enhancedURL);
            setloading(false);
        }catch{
            console.log(error);
            alert("Error while enhancng the Image. Please try Againg Later!")
        }

    };

    return (
        <div className=''>
            <ImageUpload UploadimageHandler={UploadimageHandler} />
            {/* -----> Sending to """"""IMAGEUPLOAD.JSX""""""  */}
            <ImagePreview
                loading={loading}
                uploaded={uploadImage}
                enhanced={enhancedImage}
            />
        </div>
    )
}

export default Home;