import Form from "../components/Form.tsx";
import { IAddedProduct } from "../typings.ts";
import { useState } from "react";

export default function AddedProducts() {
    const initialToggleStates = JSON.parse(localStorage.getItem('products')).map(() => false);
    const [editFormToggles, setEditFormToggles] = useState<boolean[]>(initialToggleStates);

    function handleUpdateProduct(index: number) {
        setEditFormToggles((prevToggles) => {
            const newToggles = [...prevToggles];
            newToggles[index] = !newToggles[index];
            return newToggles;
        });
    }

    return (
        <section className="p-4">
            <h1 className="text-2xl font-semibold">Add Products</h1>
            <section className="flex flex-col border-black border p-3 w-[50vw] m-4">
                <Form />
            </section>
            <section className="flex flex-col p-4 m-4 border-black border text-md w-[50vw]">
                <h1 className="text-2xl">Products Added:</h1>
                {JSON.parse(localStorage.getItem('products')).map((prod: IAddedProduct, index: number) => (
                    <section
                        key={prod.title}
                        className="flex flex-col items-start space-x-2 border-black border rounded-md m-2"
                    >
                        <h2>Title: {prod.title}</h2>
                        <p>Category: {prod.category}</p>
                        <p>Price: ${prod.price}</p>
                        <span className="line-clamp-1 w-[20vw]">Description: {prod.description}</span>
                        <button
                            onClick={() => handleUpdateProduct(index)}
                            className="p-2 bg-green-500 rounded-md text-white m-2"
                        >
                            Edit Product
                        </button>
                        <button className={` ${editFormToggles ? 'inline-flex':'hidden'} p-2 bg-red-500 rounded-md text-white m-2`}>Cancel</button>
                        {editFormToggles[index] ? (
                            <section className="flex flex-col border-black border p-3 w-[50vw] m-4">
                                <Form />
                            </section>
                        ) : null}
                    </section>
                ))}
            </section>
        </section>
    );
}
