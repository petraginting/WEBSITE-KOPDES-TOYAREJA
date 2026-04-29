import { api } from '../api';

export const loginApi = async (formData) => {
    try {
        const response = await api.post('/auth/login', {
            username: formData.username,
            password: formData.password,
            device_name: "Web App" // Tambahkan device_name jika diperlukan oleh backend    
        });
        
        if (response.data.success) {
            return response.data.data;
            
        } else {
            return(response.data.message);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}