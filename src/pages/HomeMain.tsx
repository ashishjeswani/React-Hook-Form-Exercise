import  { useEffect, useState } from "react";
import { useFetch } from "../helpers/useFetch.ts";
import {ICartsData, IProductData} from "../typings.ts";
import ProductCard from "../components/ProductCard.tsx";
import SearchBox from "../components/SearchBox.tsx";
import {Link} from "react-router-dom";
import {useUserContext} from "../contexts/UserContext.tsx";

export default function HomeMain() {

    const {userId}=useUserContext()
    const [products, setProducts] = useState<IProductData["products"]>([]);
    const [mutatedData,setMutatedData]=useState<IProductData["products"]>([])
    const [category, setCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [cartLength,setCartLength]=useState<number>(0)
    const [query, setQuery] = useState<string>("");

    //API CALLS:
    const { data, error } = useFetch<IProductData>("https://dummyjson.com/products");
    const {data:categoriesData}=useFetch<string[]>('https://dummyjson.com/products/categories')
    const {data:queriedData}=useFetch<IProductData>(`https://dummyjson.com/products/search?q=${query}`)
    const {data:categoryData,error:categoryError}=useFetch<IProductData>(`https://dummyjson.com/products/category/${category}`)
    const {data:userCart}=useFetch<ICartsData>(`https://dummyjson.com/carts/user/${userId}`)

    //Only necessary UseEffect Calls:
    useEffect(() => {
        if(data){
            setProducts(data.products)
        }
    }, [data]);

    useEffect(() => {
        if(categoriesData){
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    useEffect(() => {
        if(userCart){
            setCartLength(userCart.carts[0].products.length)
        }
    }, [userCart]);

    useEffect(() => {
        if (query && queriedData) {
            setMutatedData(queriedData.products);
        }
    }, [query,queriedData]);

    useEffect(() => {
        if (categoryData) {
            setMutatedData(categoryData.products);
        }
    }, [category,categoryData]);

    return (
        <main>
            <section className="flex justify-between p-3 space-x-1">
                <SearchBox onSearch={setQuery} />
                {
                    categoryError ? (
                        <p>Can't get Categories</p>
                    ) :(
                        <select
                            className="border border-black rounded-md"
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    )
                }
                <Link to='/user-cart' className="flex flex-col items-center p-2">
                    <p>{cartLength} items</p>
                </Link>
                <Link to='/added-products' >
                    Added Products
                </Link>
            </section>

            {error ? (
                <h1>Error....</h1>
            ) : (
                mutatedData.length ===0 ? (
                    <section className="">
                        {products.length === 0 ? (
                            <p>No results...try changing the query...</p>
                        ) : (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}

                                />
                            ))
                        )}
                    </section>
                ):(
                    <section className="">
                        {mutatedData.length === 0 ? (
                            <p>No results...try changing the query...</p>
                        ) : (
                            mutatedData.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}

                                />
                            ))
                        )}
                    </section>
                )
            )}
        </main>
    );
}
