import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAddedProduct, IFormInputs} from "../typings.ts";
import {useFetch} from "../helpers/useFetch.ts";
import {DevTool} from "@hookform/devtools";
import {useAddedStore} from "../stores/ZustandStore.ts";


function UpdateForm({productId}:{productId:number}){

        const {register, handleSubmit,control,formState:{errors},reset}= useForm<IFormInputs>()
        const [categories, setCategories] = useState<string[]>([]);
        const {data:categoriesData}=useFetch<string[]>('https://dummyjson.com/products/categories')
        const updateProduct = useAddedStore(state => state.updateProduct)


        useEffect(() => {
                if(categoriesData){
                        setCategories(categoriesData)
                }
        }, [categoriesData]);


        const onSubmit: SubmitHandler<IFormInputs> = (data:IAddedProduct) => {
                console.log('FromData',data);
                updateProduct(data)

                reset()
        };

        return(
            <>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3' noValidate>
            <label htmlFor='id'>Generate a new ProductID:</label>
            <input value={productId} readOnly={true}/>
            <label htmlFor="title">Product Title:</label>
            <input placeholder='Product Title' id='title' className='border w-[15vw] border-black'
                   type='text'
                   {...register("title",{required:{
                           value:true,
                           message:'Title error'
                       },maxLength:20,minLength:3})} />
            <p className='text-red-500'>{errors.title?.message}</p>
            <label htmlFor='description'>Description:</label>
            <textarea placeholder='Description' id='description' className='border w-[25vw] border-black min-h-[30vh]'
                      {...register("description",
                          {required:{
                                  value:true,
                                  message:'Description error'
                              },maxLength:100})} />
            <p className='text-red-500'>{errors.description?.message}</p>
            <h3>Rating</h3>
            <div className='flex border p-2 rounded-md' >
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
            <label htmlFor='price'>Price INR:</label>
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
export default UpdateForm