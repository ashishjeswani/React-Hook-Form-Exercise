import Form from "../components/Form.tsx";

export default function AddedProducts() {

    return (
        <section className="p-4">
            <h1 className="text-2xl font-semibold">Add Products </h1>
            <section className="flex flex-col border-black border p-3 w-[50vw] m-4">
                <Form  />
            </section>
            <section className="flex flex-col p-4 m-4 border-black border text-md w-[50vw]">
                <h1 className="text-2xl">Products Added:</h1>
                {JSON.parse(localStorage.getItem('products')).map((prod) => (
                    <section
                        key={prod.id}
                        className="flex flex-col items-start space-x-2 border-black border rounded-md m-2"
                    >
                        <h2>Title: {prod.title}</h2>
                        <p>Category: {prod.category}</p>
                        <p>Price: ${prod.price}</p>
                        <span className="line-clamp-1 w-[20vw]">Description: {prod.description}</span>
                    </section>
                ))}
            </section>
        </section>
    );
}
