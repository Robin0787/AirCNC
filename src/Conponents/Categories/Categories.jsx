import React from 'react';
import Container from '../Shared/Container/Container';
import CategoryBox from './CategoryBox/CategoryBox';
import { categories } from './categoriesData';

const Categories = () => {
    return (
        <Container>
            <article className='pt-4 flex items-center justify-between gap-3 overflow-x-auto'>
                {
                    categories.map((item, index) => <CategoryBox key={index} label={item.label} icon={item.icon}/>)
                }
            </article>
        </Container>
    );
};

export default Categories;