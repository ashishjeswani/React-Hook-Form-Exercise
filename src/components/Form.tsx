import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAddedProduct, IFormInputs} from "../typings.ts";
import {useFetch} from "../helpers/useFetch.ts";
import {DevTool} from "@hookform/devtools";

function Form(){

    const {register, handleSubmit,control,formState:{errors}}= useForm<IFormInputs>()
    const [categories, setCategories] = useState<string[]>([]);
    const {data:categoriesData}=useFetch<string[]>('https://dummyjson.com/products/categories')

    const onSubmit:SubmitHandler<IFormInputs> = (data,)=> {
        console.log(data)
        const newProduct: IAddedProduct = {
            title: data.title,
            category: data.category,
            price: data.price,
            rating: data.rating,
            description: data.description,
        };
        const existingProductsJSON = localStorage.getItem('products');
        let existingProducts: IAddedProduct[] = [];
        if (existingProductsJSON) {
            existingProducts = JSON.parse(existingProductsJSON);
        }
        existingProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(existingProducts));
    }

    useEffect(() => {
        if(categoriesData){
            setCategories(categoriesData)
        }
    }, [categoriesData]);

    return(
        <>
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
        </>
    )


}

export default Form