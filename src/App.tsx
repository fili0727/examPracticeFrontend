
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.tsx';
import ProductPage from './Pages/ProductPage.tsx';
import DeliveriesPage from './Pages/DeliveriesPage.tsx';
import VansPage from './Pages/VansPage.tsx';
import ProductOrderPage from './Pages/ProductOrderPage.tsx';


export default function App () {
  return (

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productorders" element={<ProductOrderPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/vans" element={<VansPage />} />
      </Routes>


  )

}