
export const fileDelete = async( file ) => {
  if ( !file ) throw new Error('File not found');

  // const cloudUrl = 'https://api.cloudinary.com/v1_1/dii4zhpsy/asset/destroy';
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dii4zhpsy/destroy';
  const splittedImageSrc = file.split('/');
  const imageId = splittedImageSrc[8].split('.');

  const formData = new FormData();
  formData.append('public_id', imageId[0]);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if ( !resp.ok ) throw new Error("Couldn't delete image");

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
    
  } catch (error) {
    // console.log( error );
    // throw new Error( error.message );
    return null;
  }
}