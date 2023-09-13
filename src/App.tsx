import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCart from './pages/UserCart.tsx';
import { UserProvider } from './contexts/UserContext';
import HomeMain from "./pages/HomeMain.tsx";
import AddedProducts from "./pages/AddedProducts.tsx";

function App() {
    const userId = '1'
    return (
        <BrowserRouter>
            <UserProvider userId={userId}>
                <Routes>
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/user-cart" element={<UserCart />} />
                    <Route path="/added-products" element={<AddedProducts />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;