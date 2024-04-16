
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.tsx';
import ProductList from './Pages/ProductPage.tsx';


export default function App () {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>

  )

}