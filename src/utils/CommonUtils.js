class CommonUtils {
    static isNumber1(number) {
        if (number === 1) return true;
        return false;
    }
    static toBase64 = file => new Promise((resolve, reject) => {
        //các comment là để download file
        // let link = document.createElement('a');
        // link.download = 'image.jpeg';
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // link.href = reader.result; // data url
            // link.click(); 
            resolve(reader.result);
        }
        reader.onerror = error => reject(error);
    });
    static Base64ToImage = (image) => {
        let uint8Array = new Uint8Array(image.data)
        let deco = new TextDecoder().decode(uint8Array)
        return deco


    }
    //cách 2 base64 to image
    // static Base64ToImage1 = (image) => {
    //     const imageBuffer = Buffer.from(JSON.stringify(image))
    //     console.log(imageBuffer)
    //     let imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    //     console.log(imageBase64)
    // }
}

export default CommonUtils;