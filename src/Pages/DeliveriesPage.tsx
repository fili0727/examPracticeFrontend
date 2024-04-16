
import NavBar from '../NavBar.tsx';
import DeliveriesList from '../components/DeliveriesList.tsx';

export default function DeliveriesPage() {
  return (
  <>
  <NavBar />
  <div className="main-content">
    <h1>Deliveries List</h1> 
    <div>
      <DeliveriesList />
    </div>
    </div>
  </>
  )

}