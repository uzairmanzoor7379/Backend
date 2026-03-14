const ImageKit = require('@imagekit/nodejs');
const { toFile } =  require('@imagekit/nodejs'); 

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

 async function storage({buffer,filename,folder = ""} ) {
    console.log(buffer)
    const file = await imagekit.files.upload({
  file: await toFile(Buffer.from(buffer), 'file'),
  fileName: filename,
  folder 
});
 return file
}

module.exports = storage