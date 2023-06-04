export const addRoom = async roomInfo => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(roomInfo)
    })
    const data = await response.json();
    return data;
};
// Get all rooms
export const getAllRooms = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/all-rooms`)
    const data = await response.json();
    return data;
};
// Get single room
export const roomDetails = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/room/${id}`)
    const data = await response.json();
    return data;
};

// get filtered rooms for hosts
export const getRooms = async email => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rooms/${email}`);
    const data = await response.json();
    return data;
}

// Delete hosts room by id
export const deleteRoom = async id => {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}/delete/room/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(data => data);
}