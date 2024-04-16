import ProductList from "../components/ProductList"
import NavBar from '../NavBar.tsx';

export default function ProductPage() {
  return (
  <>
  <NavBar />
  <div className="main-content">
    <h1>Product List</h1> 
    <div>
      <ProductList />

    </div>
    </div>
  </>
  )

}