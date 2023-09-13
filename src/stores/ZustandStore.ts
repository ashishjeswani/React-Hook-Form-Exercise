import { create } from 'zustand';
import {IAddedProduct} from "../typings.ts";
const addProductsStore = (set) => ({
    products: [],

    initializeProductsArray: (productsArray:IAddedProduct[]) => {
        set((state) => ({
            products: productsArray
        }));
    },
    addNewProduct: (prod:IAddedProduct) => {
        set((state) => ({
            products: [...state.products, prod],
        }));
    },
    delProduct: (id:number) => {
        set((state) => ({
            products: state.products.filter((product:IAddedProduct) => {
                return product.id !== id;
            }),
        }));
    },
    updateProduct: (updatedProduct:IAddedProduct) => {
        set((state) => {
            const index = state.products.findIndex((product:IAddedProduct) => product.id === updatedProduct.id);
            if (index !== -1) {
                const updatedProducts = [...state.products];
                updatedProducts[index] = updatedProduct;
                return { products: updatedProducts };
            }
            return state;
        });
    },
});
export const useAddedStore = create(addProductsStore);
