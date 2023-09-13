import {ReactNode} from "react";


//Context Interfaces
export interface IUserContext {
    userId:string
}
export interface IUserProvider{
    userId:string,
    children:ReactNode
}

//Home Page Product Interfaces
export  interface IProductCard {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating: number;
    description: string;
 }
export interface IProductData {
    products:IProductStructure[]

}
export interface IProductStructure {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating:number;
    description:string;
    quantity?:number;
}



//Delete Cart Interfaces: [Delete Method Interfaces]
export interface IDeleteCartProduct {
    id:number,
    title:string,
    price:number,
    quantity:number
}

export interface IDeletedCart {
    id:number,
    products:IDeleteCartProduct[],
    isDeleted:boolean,
    deletedOn:string
}



//Cart Items Interfaces: [GET method interfaces]
export interface ICartStructure {
    quantity:number,
    title:string,
    price:number,
    id:number
}
export interface ICart {
    id: number;
    products: ICartStructure[];
    total:number
}
export interface ICartsData {
    carts: ICart[];
}


//Add to Cart Interfaces [POST method Interfaces]
export interface IJSONProducts {
    id:number,
    quantity:number
}

export interface IJsonAddCart {
    userId:number,
    products:IJSONProducts[]
}

export interface IResponseAddCartProducts {
    id:number,
    title:string,
    price:number,
    quantity:number
}
export interface IResponseAddCart{
    id:number,
    products:IResponseAddCartProducts[]
}

//FormInput Interfaces
export interface IFormInputs {
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating:number;
    description:string;
}

export interface IAddedProduct {
    title: string;
    category: string;
    price: number;
    rating:number;
    description:string;
}

//Added Products Interfaces
// export interface IAddedProductsStore {
//     products:IAddedProduct[],
//     addProduct:(product:IAddedProduct)=>void,
//     deleteProduct:(title:string)=>void,
//     updateProduct:(product:IAddedProduct)=>void,
// }

// export interface ZustandStore {
//     products:IAddedProduct[],
//     addNewProduct:()
// }