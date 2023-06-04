import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteBooking } from '../../APIs/delete';
import { updateRoomStatus } from '../../APIs/updateRoomStatus';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';

const TableRow = ({ booking, fetchBookings }) => {
    const [openModal, setOpenModal] = useState(false);
    
    const modalHandler = (id) => {
        deleteBooking(id)
        .then(data => {
            if(data.deletedCount > 0) {
                toast.success('Booking Cancelled');
                closeModal();
                updateRoomStatus(false, booking.roomId)
                .then(data => {
                    fetchBookings();
                })
            }
        })
    }
    const closeModal = () => {
        setOpenModal(false);
    }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{booking?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${booking?.total_price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span onClick={() => {setOpenModal(true)}} className='relative cursor-pointer'>Cancel</span>
        </span>
      </td>
      <DeleteModal closeModal={closeModal} id={booking._id} modalHandler={modalHandler} isOpen={openModal}/>
    </tr>
  )
}

export default TableRow;