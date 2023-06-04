export const updateRoomStatus = async (status, id) => {
    console.log(id);
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms/status/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status})
    })
    const data = await response.json();
    return data;
};