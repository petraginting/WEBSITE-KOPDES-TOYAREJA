import { api } from '../api';

export const loginApi = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username: username,
            password: password,
            device_name: "Web App" // Tambahkan device_name jika diperlukan oleh backend    
        });
        
        if (response.data.success) {
            return response.data.message;
            
        } else {
            return(response.data.message);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}