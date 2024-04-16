import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, Product, addProduct, updateProduct, addProductToProductOrder } from '../services/apiFacade';
import '../styling/productList.css';


function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState<number | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({ productId: 0, quantity: 1 }); // Default quantity is 1


    const [newProduct, setNewProduct] = useState({ name: '', price: 0, weightInGrams: 0 });

    const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);



    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Failed to delete the product");
        }
    };



  const handleAddOrUpdateProduct = async () => {
      if (!newProduct.name || newProduct.price <= 0 || newProduct.weightInGrams <= 0) {
          alert("Please fill in all fields correctly.");
          return;
      }

      try {
          if (editMode && editProductId) {
              const updatedProduct = await updateProduct({ ...newProduct, id: editProductId });
              setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
              setEditMode(false); // Disable edit mode
              setEditProductId(null); // Clear edit product ID
          } else {
              const addedProduct = await addProduct(newProduct);
              setProducts([...products, addedProduct]);
              alert(newProduct.name + " added to the list successfully!")
          }
          setNewProduct({ name: '', price: 0, weightInGrams: 0 }); // Clear form fields
      } catch (error) {
          console.error("Failed to add/update the product", error);
      }
  };


  const handleEdit = (product: Product) => {
      setNewProduct({
          name: product.name,
          price: product.price,
          weightInGrams: product.weightInGrams
      });
      setEditMode(true);
      setEditProductId(product.id || 0); 
  };

  const addProductToOrder = async () => {
    try {
     //@ts-expect-error den er sur over at den ik får et helt product og totalweightingrams med😭
        await addProductToProductOrder(currentOrder);
        alert("Product added to order successfully!");
        setIsModalOpen(false); // Close the modal
        setCurrentOrder({productId: 0, quantity: 1 }); // Reset the current order
    } catch (error) {
        console.error("Failed to add product to order", error);
    }
};


    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
  };
  
  const openModal = (product: Product) => {
      setCurrentOrder({ ...currentOrder, productId: product.id || 0 });
      setIsModalOpen(true);
  }


    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        <input
    type="text"
    placeholder="Search by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ margin: '10px 0', padding: '8px', width: '97%' }}
/>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((product) => (
                  <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price} dkk</td>
                      <td>{product.weightInGrams}</td>
                      <td>
                          <button onClick={() => handleDelete(product.id || 0)}>Delete</button>
                          <button onClick={() => handleEdit(product)}>Edit</button>
                          <button onClick={() => openModal(product)}>Add to Order</button>
                      </td>
                  </tr>
               ))}
            </tbody>
        </table>
        <div>
            {currentPage > 1 && (
                <button onClick={handlePreviousPage}>Previous</button>
            )}
            {indexOfLastItem < filteredProducts.length && (
                <button onClick={handleNextPage}>Next</button>
            )}
        </div>
          <div className='form-container'>
            <h2>{editMode ? "Edit Product" : "Add Product"}</h2>
            <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
            />
            <input
                type="number"
                placeholder="Weight in grams"
                value={newProduct.weightInGrams}
                onChange={(e) => setNewProduct({ ...newProduct, weightInGrams: +e.target.value })}
            />
            <button onClick={handleAddOrUpdateProduct}>{editMode ? "Update Product" : "Add Product"}</button>
        </div>
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span onClick={() => setIsModalOpen(false)}>&times;</span>
                    <h2>Add to Order</h2>
                    <input
                        type="number"
                        value={currentOrder.quantity}
                        onChange={e => setCurrentOrder({ ...currentOrder, quantity: parseInt(e.target.value) })}
                        min="1"
                    />
                    <button onClick={addProductToOrder}>Add to Order</button>
                </div>
            </div>
        )}
        </div>
    );
}

export default ProductList;
