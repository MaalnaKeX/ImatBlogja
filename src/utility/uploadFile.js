import axios from "axios";

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
  try {
    const resp = await axios.post(url, formData)
    return {url: resp.data.secure_url, id: resp.data.public_id}
  } catch (error) {
    console.log(error)
  }
}

const url = "https://imatblogjabackend.onrender.com/post/"

export const delPhoto = async (id) => {
	try {
		await axios.delete(url + id)
	} catch (error) {
		console.log(error);
	}
} 



















// _   _ _                       
// | \ | (_)                      
// |  \| |_  __ _  __ _  ___ _ __ 
// | . ` | |/ _` |/ _` |/ _ \ '__|
// | |\  | | (_| | (_| |  __/ |   
// |_| \_|_|\__, |\__, |\___|_|   
//           __/ | __/ |          
//          |___/ |___/           




//                ,---.          _,---.     _,.---._          ,--.-, 
//     _..---.  .--.'  \     _.='.'-,  \  ,-.' , -  `.       |==' -| 
//   .' .'.-. \ \==\-/\ \   /==.'-     / /==/_,  ,  - \      |==|- | 
//  /==/- '=' / /==/-|_\ | /==/ -   .-' |==|   .=.     |   __|==|, | 
//  |==|-,   '  \==\,   - \|==|_   /_,-.|==|_ : ;=:  - |,--.-'\=|- | 
//  |==|  .=. \ /==/ -   ,||==|  , \_.' )==| , '='     ||==|- |=/ ,| 
//  /==/- '=' ,/==/-  /\ - \==\-  ,    ( \==\ -    ,_ / |==|. /=| -| 
// |==|   -   /\==\ _.\=\.-'/==/ _  ,  /  '.='. -   .'  \==\, `-' /  
// `-._`.___,'  `--`        `--`------'     `--`--''     `--`----'   


