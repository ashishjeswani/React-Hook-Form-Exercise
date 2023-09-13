import { create } from 'zustand';
import {IAddedProduct} from "../typings.ts";
const addProductsStore = (set) => ({
    products: [],

    initializeProductsArray: (productsArray:IAddedProduct[]) => {
        set((state) => ({
            products: productsArray || [], // Initialize with the provided array or an empty array
        }));
    },
    addNewProduct: (prod:IAddedProduct) => {
        set((state) => ({
            products: [...state.products, prod],
        }));
    },
    delProduct: (title:string) => {
        set((state) => ({
            products: state.products.filter((product:IAddedProduct) => {
                return product.title !== title;
            }),
        }));
    },
    updateProduct: (updatedProduct:IAddedProduct) => {
        set((state) => {
            const index = state.products.findIndex((product:IAddedProduct) => product.title === updatedProduct.title);
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
