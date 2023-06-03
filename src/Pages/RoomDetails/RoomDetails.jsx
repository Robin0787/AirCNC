import React from 'react';
import Button from '../../Conponents/Buttons/Button';
import Calendar from "../../Conponents/Calendar/Calendar";
import Heading from '../../Conponents/Heading/Heading';
import Container from '../../Conponents/Shared/Container/Container';
import RoomInfo from './RoomInfo/RoomInfo';


const RoomDetails = () => {
    return (
        <Container>
            <section className='max-w-screen-lg mx-auto'>
                <section className='flex flex-col gap-6'>
                    <Heading title={'Veluvana Bali - Owl Bamboo House'} subtitle={'Sideman, Indonesia'} center={false} />
                    <article className='w-full overflow-hidden rounded-xl'>
                        <img src={'https://i.ibb.co/G9Kn6qY/Room3.webp'} alt="" className='w-full object-cover' />
                    </article>
                    <article className='grid md:grid-flow-col  lg:grid-cols-[6fr_4fr] gap-4 w-full'>
                        <RoomInfo />
                        <div>
                            <Calendar />
                            <div className='px-2'>
                                <Button label={'Reserve'} />
                                <div className='flex justify-between font-bold pt-2'>
                                    <p>Price: </p>
                                    <p>$545</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
        </Container>
    );
};

export default RoomDetails;