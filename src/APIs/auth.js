import { toast } from "react-hot-toast";

// saving users email to database for further use.
export const saveUser = user => {
    const currentUser = {
        email: user.email
    };
    fetch(`http://localhost:5000/users/${user?.email}`, {
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