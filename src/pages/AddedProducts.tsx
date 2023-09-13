import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {useFetch} from "../helpers/useFetch.ts";
import {DevTool} from '@hookform/devtools'

interface IFormInputs {
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating:number;
    description:string;
}

interface IAddedProduct {
    title: string;
    category: string;
    price: number;
    rating:number;
    description:string;
}

export default  function AddedProducts(){

    const {register, handleSubmit,control,formState:{errors}}= useForm<IFormInputs>()
    const [categories, setCategories] = useState<string[]>([]);
    const {data:categoriesData}=useFetch<string[]>('https://dummyjson.com/products/categories')
    const [addedProducts,setAddedProducts]=useState<IAddedProduct[]>([])

    const onSubmit:SubmitHandler<IFormInputs> = (data,)=> {
        console.log(data)
        const newProduct: IAddedProduct = {
            title: data.title,
            category: data.category,
            price: data.price,
            rating: data.rating,
            description: data.description,
        };
        setAddedProducts([...addedProducts,newProduct])
        localStorage.setItem('products',JSON.stringify([...addedProducts, newProduct]))
        // event.target.reset()
    }


    useEffect(() => {
        if(categoriesData){
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    return (
        <section className='p-4'>
            <h1 className='text-2xl font-semibold'>Add Products</h1>
            <section className='flex flex-col border-black border p-3 w-[50vw] m-4'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3' noValidate>
                        <label htmlFor="title">Product Title:</label>
                        <input id='title' className='border w-[15vw] border-black'
                               type='text'
                               {...register("title",{required:{
                                   value:true,
                                       message:'Title error'
                                   },maxLength:20,minLength:3})} />
                        <p className='text-red-500'>{errors.title?.message}</p>
                        <label htmlFor='description'>Description:</label>
                        <textarea id='description' className='border w-[15vw] border-black' rows={10} cols={30}
                               {...register("description",
                                   {required:{
                                           value:true,
                                           message:'Description error'
                                       },maxLength:100})} />
                        <p className='text-red-500'>{errors.description?.message}</p>
                        <h3>Rating</h3>
                        <div className='flex border'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <React.Fragment key={value} >
                                    <label htmlFor={`ratingRadio${value}`}>{value}:</label>
                                    <input
                                        id={`ratingRadio${value}`}
                                        className="border w-[15vw] border-black"
                                        type="radio"
                                        {...register("rating", { required: {
                                            value:true,
                                                message:'Rating error'
                                            } })}
                                        value={value}
                                    />
                                </React.Fragment>
                            ))}
                            <p className='text-red-500'>{errors.rating?.message}</p>
                        </div>
                        <label htmlFor='price'>Price:</label>
                        <input id='price' className='border w-[15vw] border-black'
                               type='number' {...register("price",
                            {required:{
                                value:true,
                                    message:'Price error'
                                }})} />
                        <p className='text-red-500'>{errors.price?.message}</p>
                        <label htmlFor='category'>Category</label>
                        <select className='border' id='category' {...register("category",{required:{
                            value:true,
                                message:'Please select a category'
                            }})}>
                            {categories.map((cat)=>{
                                return (
                                    <option key={cat}>{cat}</option>
                                )
                            })}
                        </select>
                        <p className='text-red-500'>{errors.category?.message}</p>
                        <input className='p-2 bg-blue-500 rounded-md text-white' type='submit'/>
                    </form>
                <DevTool control={control} />
            </section>
            <section className='flex flex-col p-4 m-4 border-black border text-md w-[50vw]'>
                <h1 className='text-2xl'>Products Added:</h1>
                {
                    addedProducts.map((prod)=>{
                        return (
                            <>
                            <section className="flex flex-col items-start space-x-2 border-black border rounded-md m-2">
                                <h2>Title: {prod.title}</h2>
                                <p>Category: Category: {prod.category}</p>
                                <p>Price: ${prod.price}</p>
                                <span className="line-clamp-1 w-[20vw]">Description: {prod.description}</span>
                            </section>
                            </>
                        )
                        }
                    )
                }
            </section>
        </section>
    )



}