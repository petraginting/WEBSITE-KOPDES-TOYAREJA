export const uploadFoto = (payload, field) => {
    const formData = new FormData();

        Object.keys(payload).forEach((key) => {
            const value = payload[key];

            if (value === null || value === undefined) return;

            // khusus file
            if (key === field) {
                if (value instanceof File) {
                    formData.append(field, value);
                }
                return
            } 
            
            formData.append(key, value);
        });

        return formData   
}