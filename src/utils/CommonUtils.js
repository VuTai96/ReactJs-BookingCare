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
}

export default CommonUtils;