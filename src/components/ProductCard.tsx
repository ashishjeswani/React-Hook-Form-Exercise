import { IProductCard } from "../typings";
import {useUserContext} from "../contexts/UserContext.tsx";

function ProductCard({
  product,

}: {
  product: IProductCard;

}) {
  const { title, category, price, thumbnail, rating, description } = product;

  const {userId}=useUserContext()


  //Dummy Remove from Cart Function
  const handleRemoveFromCart = () => {
    const existingCartData = localStorage.getItem(userId);
    if (existingCartData) {
      const cart = JSON.parse(existingCartData);
      const updatedProducts = cart.products.filter((p: IProductCard) => p.id !== product.id);
      const updatedCart = {
        ...cart,
        products: updatedProducts,
      };
      localStorage.setItem(userId, JSON.stringify(updatedCart));
    }
  };


  //Dummy Add to Cart Function
  const handleAddToCart = () => {
    const existingCartData = localStorage.getItem(userId);
    let updatedCart;
    if (existingCartData) {
      const cart = JSON.parse(existingCartData);
      const existingProduct = cart.products.find((p: IProductCard) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({  quantity: 1 ,...product});
      }

      updatedCart = cart;
    } else {
      updatedCart = {
        userId,
        products: [{ quantity:1,...product}],
      };
    }
    localStorage.setItem(userId, JSON.stringify(updatedCart));
  };

  return (
    <main className="m-3 border flex justify-between p-2">
      <section className="flex items-start space-x-2">
        <div>
          <img src={thumbnail} alt={title} className="h-20 w-20" />
        </div>
        <h2>{title}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <span className="line-clamp-1 w-[20vw]">{description}</span>
      </section>
      <section className="space-y-1">
        <section>
          <p>{rating}</p>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 rounded-md p-1 text-white font-medium"
          >
            Add to Cart
          </button>
        </section>
        <section>
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 rounded-md p-1 text-white font-medium"
          >
            Remove from Cart
          </button>
        </section>
      </section>
    </main>
  );
}

export default ProductCard;
