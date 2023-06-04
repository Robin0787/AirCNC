import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../../APIs/rooms';
import { uploadImage } from '../../APIs/uploadImage';
import AddRoomForm from '../../Conponents/Dashboard/AddRoomForm';
import { AuthContext } from '../../providers/AuthProvider';

const AddRoom = () => {
  const {user} = useContext(AuthContext);
  const [ loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  // Handling form submit
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.files[0];
    const from = dates.startDate;
    const to = dates.endDate;
    uploadImage(image)
    .then(data => {
      const roomData = {
        image: data.data.display_url,
        location, title, price, total_guest, category, bedrooms, bathrooms, description, from, to,
        host: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        }
      }
      // posting rooms data to server
      addRoom(roomData)
      .then(data => {
        if(data.insertedId) {
          toast.success('Room Added');
          form.reset();
          navigate('/dashboard/my-listings');
        }
      }).catch(err => {console.log(err.message)});
      setLoading(false);
    }).catch(err=>{console.log(err.message);setLoading(false)});

  }
  // listening the image selection and pass it to another function to upload it to the server.
  const handleImageChange = image => {
    setUploadButtonText(image.name);
  }
  // listening the dates selection and storing it to state;
  function handleDates (ranges) {
    setDates(ranges.selection);
  }
  return (
    <div>
      <AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} uploadButtonText={uploadButtonText} dates={dates} handleDates={handleDates}/>
    </div>
  );
};

export default AddRoom;