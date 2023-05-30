import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Heading from '../../../Conponents/Heading/Heading';
import Loader from '../../../Conponents/Loader/Loader';
import Container from '../../../Conponents/Shared/Container/Container';
import Card from './Card/Card';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useSearchParams();
    const category = params.get('category');
    console.log(category);
    useEffect(() => {
        setLoading(true);
        fetch('rooms.json')
            .then(res => res.json())
            .then(data => {
                if(category){
                    const roomsData = data.filter(room => room.category === category);
                    setRooms(roomsData);
                }
                else {
                    setRooms(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [category]);

    if(rooms.length < 1) {
        return <div className='pt-10 flex justify-center'>
        <Heading title={'No Rooms Available In this Category!'} subtitle={'Please Select Other Categories'} center={true}/>
    </div>
    }

    return (
        <Container>
            {
                loading ?
                    <article className='flex justify-center items-center'> <Loader /> </article>
                    :
                    <article className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4 lg:gap-5 xl:gap-6'>
                        {
                            rooms.map((room, index) => <Card key={index} room={room} />) 
                        }
                    </article>
            }

        </Container>
    )
}

export default Rooms;