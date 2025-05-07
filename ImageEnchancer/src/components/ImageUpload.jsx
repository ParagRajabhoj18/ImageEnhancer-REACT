const ImageUpload = (props) => {

    const showImageHandler = (e) => {
        const file=e.target.files[0];  //we have made the file variable so that we dont have to write the whole path again and again
        // console.log(e.target.files[0]);

        if(file){
            props.UploadimageHandler(file);  // getting it from HOME.JSX("""parent""")
        }
    }

    return (
        <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-2-w-xl'>

            <label htmlFor="fileInput" className='block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all'>
                <span className='text-lg font-medium text-gray-600'>
                    Click and Drag to Upload your Image
                </span>
            </label>


            <input type="file" id='fileInput' className='hidden' onChange={showImageHandler} />
        </div>
    )
}

export default ImageUpload;