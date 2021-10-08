const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'vuegram', 
    api_key: '636127522747716', 
    api_secret: '4WU4E_eFtU0yU-iITRgtSByvcRQ' 
  });

  module.exports = {cloudinary}