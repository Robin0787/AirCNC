// Delete a booking from database bu id
export const deleteBooking = async id => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/delete/booking/${id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => data);
}

