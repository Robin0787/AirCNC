import React from 'react';
import Categories from '../../Conponents/Categories/Categories';
import Rooms from './Rooms/Rooms';

const Home = () => {
    return (
        <section>
            <Categories />
            <Rooms />
        </section>
    );
};

export default Home;