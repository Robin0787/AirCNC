import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteRoom } from '../../APIs/rooms';
import DeleteModal from '../../Conponents/Modal/DeleteModal/DeleteModal';

const RoomDataRow = ({ room, fetchListings }) => {
    const [openModal, setOpenModal] = useState(false);
    
    const modalHandler = (id) => {
        deleteRoom(id)
        .then(data => {
            if(data.deletedCount > 0) {
                toast.success('Room Deleted');
                closeModal();
                fetchListings();
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
                src={room?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span  className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span onClick={() => {setOpenModal(true)}} className='relative cursor-pointer'>Delete</span>
        </span>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
      </td>
      <DeleteModal closeModal={closeModal} id={room._id} modalHandler={modalHandler} isOpen={openModal}/>
    </tr>
  )
}

export default RoomDataRow;