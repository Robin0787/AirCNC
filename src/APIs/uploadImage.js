
export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API_KEY}`
        // Uploading the users image to the img hosting app
        const res = await fetch(url, { method: "POST", body: formData })
        const data = await res.json();
        return data;
}