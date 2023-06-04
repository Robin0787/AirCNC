export const addBooking = async bookingInfo => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/booking`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bookingInfo)
    })
    const data = await response.json();
    return data;
};


// Get all bookings for a user by email
export const getBookings = async email => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings?email=${email}`)
    const bookings = await response.json();
    return bookings;
};