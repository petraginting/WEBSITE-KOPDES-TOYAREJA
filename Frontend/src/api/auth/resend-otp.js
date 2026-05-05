import api from "../axios";

export const reSendOtp = async(no_hp) => {
    try {

        const response = await api.post('/auth/resend-otp', {no_hp: no_hp})

        if (response.data.success) {
            return response.data;
        } else {
            alert(response.data.message)
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        
    }
}