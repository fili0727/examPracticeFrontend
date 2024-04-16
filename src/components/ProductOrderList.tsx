import { getAllProductOrders, ProductOrder, deleteProductOrder, updateProductOrder } from "../services/apiFacade"
import { useState, useEffect } from "react"
export default function ProductOrderList() {
const [productOrders, setProductOrders] = useState<ProductOrder[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [error, setError] = useState<string | null>(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<ProductOrder | null>(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productOrders.slice(indexOfFirstItem, indexOfLastItem);





useEffect(() => {
  loadProductOrders()
}, [])

const loadProductOrders = async () => {
try{
  const data = await getAllProductOrders()
  setProductOrders(data)
  setLoading(false)
} catch (error){
  setError('Failed to fetch product orders')
  setLoading(false)
}
}

const handleDelete = async (id: number) => {
    try{
        await deleteProductOrder(id)
        setProductOrders(productOrders.filter(productOrder => productOrder.id !== id))
    } catch (error){
        console.error("Failed to delete the product order")
    }
}

    const handleUpdate = async () => {
        if (currentOrder && currentOrder.id) {
            try {
                const updatedOrder = await updateProductOrder(currentOrder);
                setProductOrders(productOrders.map(order => order.id === currentOrder.id ? { ...order, ...updatedOrder } : order));
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to update the product order");
            }
        }
    };

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
  };

    const openEditModal = (productOrder: ProductOrder) => {
        setCurrentOrder(productOrder);
        setIsModalOpen(true);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;


    return (
      <div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Weight</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((productOrder, index) => (
                  <tr key={index}>
                      <td>{productOrder.product.name}</td>
                      <td>{productOrder.quantity}</td>
                      <td>{productOrder.totalWeightInGrams}</td>  
                      <td>
                          <button onClick={() => handleDelete(productOrder.id || 0)}>Delete</button>
                          <button onClick={() => openEditModal(productOrder)}>Edit</button>
                      </td>
                  </tr>
               ))}
            </tbody>
        </table>
        <div>
            {currentPage > 1 && (
                <button onClick={handlePreviousPage}>Previous</button>
            )}
            {indexOfLastItem < productOrders.length && (
                <button onClick={handleNextPage}>Next</button>
            )}
        </div>
        {isModalOpen && currentOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <span onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Update Order for {currentOrder.product.name}</h2>
                        <input
                            type="number"
                            value={currentOrder.quantity}
                            onChange={e => setCurrentOrder({ ...currentOrder, quantity: parseInt(e.target.value) })}
                            min="1"
                        />
                        <button onClick={handleUpdate}>Update Order</button>
                    </div>
                </div>
            )}
        </div>
    );
}
