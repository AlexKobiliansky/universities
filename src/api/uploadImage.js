import axios from "axios";

export const uploadImage = async (uploadedFile) => {
  const formData = new FormData();
  formData.append("file", uploadedFile);
  formData.append('upload_preset', 'j9bhlkli-universities');

  return axios.post('https://api.cloudinary.com/v1_1/do1zs5utw/image/upload', formData).then(({data}) => {
    return data.url;
  }).catch(e => alert(e.message));

}