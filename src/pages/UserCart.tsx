/* We Can't use useFetch inside any function call neither in any useEffect callback.
   For eg: Like when we add to Cart or delete Item from cart,
   it can be done using onClicks, and even we can't use useFetch inside any Callback or function.
   So that's why I am calling the methods directly on first render, to showcase my practice on API Calls and methods
   Also making a utility function will make the code verbose, and means the same thing.
   So to get responses from All 3 Apis, I called them directly on render and Display the output
   */

import {
    ICartsData,
    IDeletedCart,
    IProductCard,
    ICartStructure,
    IJsonAddCart,
    IResponseAddCart
} from '../typings';
import {useUserContext} from "../contexts/UserContext.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useFetch} from "../helpers/useFetch.ts";


function UserCart() {

    const {userId} = useUserContext()

    //Fetching the Previous/Current Car Items and displaying them using cartItems State
    const [cartItems, setCartItems] = useState<ICartStructure[]>([])

    //Collecting the Cart ID for making a delete call
    const [cartId,setCartId]=useState<number>(0)

    //Setting the total cost from the User's Cart API
    const [total,setTotal]=useState<number>(0)

    //JSON body for Calling the POST request:
    const [jsonBody,setJsonBody]=useState<IJsonAddCart>()

    //Get a User's Cart API
    const {data:userCart}=useFetch<ICartsData>(`https://dummyjson.com/carts/user/${userId}`)

    //Delete request for the Cart, using the cartID obtained from the above API
    const {data:deletedItems}=useFetch<IDeletedCart>(`https://dummyjson.com/carts/${cartId}`,"DELETE")

    //Calling Add to Cart using the Cart Items from the local Storage
    const {data:addCartItems}=useFetch<IResponseAddCart>(`https://dummyjson.com/carts/add`,"POST",jsonBody)


    //GET REQUEST CALL (GET)
    useEffect(() => {
        if(userCart){
            setCartItems(userCart.carts[0].products)
            setTotal(userCart.carts[0].total)
            setCartId(userCart.carts[0].id)
        }
    }, [userCart]);

    //DELETE REQUEST CALL (DELETE)
    useEffect(() => {
    }, [deletedItems]);

    //ADD TO CART REQUEST CALL (POST)
    useEffect(() => {
        if (localStorage.getItem(userId)) {
            const localStorageData = JSON.parse(localStorage.getItem(userId));
            if (localStorageData && Array.isArray(localStorageData.products)) {
                const extractedProducts = localStorageData.products.map((product:{id:number,quantity:number}) => ({
                    id: product.id,
                    quantity: product.quantity,
                }));
                setJsonBody({
                    userId: localStorageData.userId,
                    products: extractedProducts,
                });
            }
        }
    }, [userId,addCartItems]);


    //Dummy Remove From Cart Function:
    async function handleRemoveFromCart(id:number){
        const existingCartData = localStorage.getItem(userId);
        if (existingCartData) {
            const cart = JSON.parse(existingCartData);
            const updatedProducts = cart.products.filter((p: IProductCard) => p.id !== id);
            const updatedCart = {
                ...cart,
                products: updatedProducts,
            };
            //setCartItems(updatedProducts)
            //Check console.log for the Local Items
            localStorage.setItem(userId, JSON.stringify(updatedCart));
        }
    }
    return (
        <div className='p-6'>
            <Link className='underline underline-offset-3 text-blue-600' to='/'>Back</Link>
            <br/>
            <span>{userId}'s Cart, Cart Id: {cartId}</span>
            <br/>
            <span>No. of items in cart:{cartItems.length}</span>
            <br/>
            <h3 className='text-2xl font-bold'>Total:{total}</h3>
            <p>Fetching Cart Items from API dynamically</p>
            {
                cartItems.map((prod)=>(
                    <main key={prod.id} className="m-3 border flex justify-between p-2">

                        <section className="flex items-start space-x-2">
                            <h2>{prod.title}</h2>
                            <p>  :x{prod.quantity}</p>
                            <p>Price: ${prod.price}</p>
                        </section>
                        <section className="space-y-1">
                            <section>
                                <button
                                    onClick={()=>handleRemoveFromCart(prod.id)}
                                    className="bg-red-500 rounded-md p-1 text-white font-medium"
                                >
                                    Remove from Cart
                                </button>
                            </section>
                        </section>
                    </main>
                ))
            }
            <p>Response from Add to Cart API:</p>
            <section className='border p-2'>
                    <p>Response from Add To Cart API</p>
                    <p>Newly Updated Cart having values from local storage: (Add some products if you have 0 products here)</p>
                <section>
                    {
                        addCartItems?.products.map((prod)=>{
                            return(
                                <section className='flex p-2 border m-2' key={prod.id}>
                                    <p className='text-md mx-3'>{prod.title}</p>
                                    <p>${prod.price}</p>
                                </section>
                            )
                        })
                    }
                </section>

            </section>

            <p>Response from Delete API:</p>
            <section className='border '>
                <div className='flex flex-col space-x-2 text-md font-semibold'>
                    <p className=''>Cart ID for which DELETE method was Called: {deletedItems?.id}</p>
                   <p> Cart Deleted TimeStamp:{deletedItems?.deletedOn}</p>
                    <p>Cart Items Response From API Call that were Deleted. (response might not be correct)</p>
                </div>
                <section>
                    {
                        deletedItems?.products.map((prod)=>{
                            return(
                                <section className='flex p-2 border m-2' key={prod.id}>
                                    <p className='text-md mx-3'>{prod.title}</p>
                                    <p>${prod.price}</p>
                                </section>

                            )
                        })
                    }
                </section>
            </section>
        </div>
    );
}

export default UserCart;