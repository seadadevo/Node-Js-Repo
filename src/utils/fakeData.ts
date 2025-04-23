import { faker } from '@faker-js/faker';
import { IfakeProducts } from '../interfaces';

export const generateFakeProducts = (): IfakeProducts[] => {
    return Array.from({length: 25}, (_, idx) => {
        return {
            id: idx + 1,
            title: faker.commerce.productName(),
            price: +faker.commerce.price({min: 100, max: 200}),
            description: faker.commerce.productDescription(),
        }
    } )
}