import { toast } from "react-hot-toast";

// saving users email to database for further use.
export const saveUser = user => {
    const currentUser = {
        email: user.email
    };
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0){
            toast.success('User Saved');
        };
    });
}
// become a host
export const becomeHost = async email => {
    const currentUser = {
        role: 'host'
    };
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    const data = await res.json();
    return data;
};  

// Get users role
export const getUserRole = email => {

    return fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${email}`)
    .then(res => res.json())
    .then(data => data?.role);
}