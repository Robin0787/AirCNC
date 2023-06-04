import formatDistance from 'date-fns/formatDistance';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { addBooking } from '../../APIs/booking';
import { updateRoomStatus } from '../../APIs/updateRoomStatus';
import Button from '../../Conponents/Buttons/Button';
import Calendar from "../../Conponents/Calendar/Calendar";
import Heading from '../../Conponents/Heading/Heading';
import BookingModal from '../../Conponents/Modal/BookingModal/BookingModal';
import Container from '../../Conponents/Shared/Container/Container';
import { AuthContext } from '../../providers/AuthProvider';
import RoomInfo from './RoomInfo/RoomInfo';

const RoomDetails = () => {
    const [openModal, setOpenModal] = useState(false);
    const { _id, location, title, price, total_guest, category, bedrooms, bathrooms, description, from, to, image, host, booked } = useLoaderData();
    const { user, userRole } = useContext(AuthContext);
    const days = formatDistance(new Date(to), new Date(from), ['']);
    const total_price = parseFloat(days.split(' ')[0]) * parseFloat(price);
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState({
        startDate: new Date(from),
        endDate: new Date(to),
        key: 'selection'
    });
    const [bookingInfo, setBookingInfo] = useState({
        guest: {
            name: user.displayName, email: user.email, image: user.photoURL
        },
        host: host.email,
        from: timeRange.startDate,
        to: timeRange.endDate,
        total_guest, title, location, total_price, category, image,
        roomId: _id,
    });

    function modalHandler() {
        addBooking(bookingInfo)
        .then(data => {
            if(data.insertedId){
                console.log(_id);
                updateRoomStatus(true, _id)
                .then(data => {
                    console.log(data);
                    toast.success('Booking Successful');
                    closeModal();
                    navigate('/dashboard/my-bookings');
                }).catch(err => {toast.error(err.message)});
            }
        }).catch(err => {console.log(err.message)});
    }
    function closeModal() {
        setOpenModal(false);
    }
    function handleDateChange (ranges) {
        return setTimeRange(ranges);
    }
    return (
        <Container>
            <section className='max-w-screen-lg mx-auto'>
                <section className='flex flex-col gap-6'>
                    <Heading title={title} subtitle={location} center={false} />
                    <article className='w-full overflow-hidden rounded-xl'>
                        <img src={image} alt="" className='w-full object-cover' />
                    </article>
                    <article className='grid md:grid-flow-col  lg:grid-cols-[6fr_4fr] gap-4 w-full'>
                        <RoomInfo roomData={{ total_guest, host, bedrooms, bathrooms, description }} />
                        <div>
                            <div className="flex flex-col justify-start p-4 bg-gray-100 gap-4">
                                <h3 className="text-2xl relative">$<span className='font-bold'>{price}</span><span className='text-sm absolute top-1 text-gray-500 pl-1'>night</span></h3>
                                <Calendar value={timeRange} handleDateChange={handleDateChange}/>
                            </div>
                            <div className='px-4 bg-gray-100'>
                                <Button onClick={() => setOpenModal(true)} label={'Reserve'} disabled={host.email === user?.email || booked}/>
                                <div className='flex justify-between font-bold py-2 '>
                                    <p>Total Price:</p>
                                    <p>{total_price > 0 ? total_price : 120} $</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
            <BookingModal modalHandler={modalHandler} closeModal={closeModal} isOpen={openModal} bookingInfo={bookingInfo} />
        </Container>
    );
};

export default RoomDetails;