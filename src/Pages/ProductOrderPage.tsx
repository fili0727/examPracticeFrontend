
import NavBar from '../NavBar.tsx';
import ProductOrderList from '../components/ProductOrderList.tsx'

export default function ProductOrderPage() {
  return (
  <>
  <NavBar />
  <div className="main-content">
    <h1>Product Orders List</h1> 
    <div>
      <ProductOrderList />

    </div>
    </div>
  </>
  )

}