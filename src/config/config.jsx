//axios config
import axios from 'axios';
const Service = axios.create({
    baseURL: 'https://acoplasticos-api.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
export default Service;


export const iconsConfig = {
    height: "24px", // Corrige "heigh" a "height"
    width: "24px",
    iconColor: "white",
}
