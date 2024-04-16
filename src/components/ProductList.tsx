import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, Product, addProduct, updateProduct } from '../services/apiFacade';
import '../styling/productList.css';


function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState<number | null>(null);


    const [newProduct, setNewProduct] = useState({ name: '', price: 0, weightInGrams: 0 });


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
            setEditMode(false); // Reset edit mode
            setEditProductId(null); // Clear edit product ID
        } else {
            const addedProduct = await addProduct(newProduct);
            setProducts([...products, addedProduct]);
        }
        setNewProduct({ name: '', price: 0, weightInGrams: 0 }); // Clear the form
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



    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
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
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price} dkk</td>
                        <td>{product.weightInGrams} g</td>
                        <td>
                            <td>
                                <button onClick={() => handleDelete(product.id || 0)}>Delete</button>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                            </td>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
                <div>
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

        </div>
    );
}

export default ProductList;
