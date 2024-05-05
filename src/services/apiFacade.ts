import { makeOptions, handleHttpErrors } from "./fetchUtils";

const SERVER_URL = "http://localhost:8080";

const PRODUCTS_URL = SERVER_URL + "/api/products";
const PRODUCTORDER_URL = SERVER_URL + "/api/productorder";

interface Delivery {
  id?: number;
  deliveryDate: string;
  fromWarehouse: string;
  toDestination: string;
  productOrders: ProductOrder[];
}

interface Product {
  id?: number;
  name: string;
  price: number;
  weightInGrams: number;
}

interface ProductOrder {
  id?: number;
  productId: number;
  product: Product ;
  quantity: number;
  totalWeightInGrams: number;
}


async function getProduct(id: number): Promise<Product> {
  return await fetch(PRODUCTS_URL + "/" + id).then(handleHttpErrors);
}

async function getProducts(): Promise<Product[]> {
  const options = makeOptions("GET", null, undefined);
  return fetch(PRODUCTS_URL, options).then(handleHttpErrors);
}


async function addProduct(newProduct: Product): Promise<Product> {
  const options = makeOptions("POST", newProduct, undefined);
  return fetch(PRODUCTS_URL, options).then(handleHttpErrors);
}

async function updateProduct(updatedProduct: Product): Promise<Product> {
  if (!updatedProduct.id) {
    throw new Error("Product must have an id to be updated");
  }

  const options = makeOptions("PUT", updatedProduct, undefined);
  const URL = `${PRODUCTS_URL}/${updatedProduct.id}`;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteProduct(id: number) {
  const options = makeOptions("DELETE", null, undefined);

  const response = await fetch(`${PRODUCTS_URL}/${id}`, options);

  if (response.ok) {
    console.log("Product deleted.");
  } else {
   alert("Failed to delete product with id: " + id + " due to it being in a product order.");
  
  }

}

async function addProductToProductOrder(newProductOrder: ProductOrder): Promise<Product> {
  const options = makeOptions("POST", newProductOrder, undefined);
  return fetch(`${PRODUCTORDER_URL}`, options).then(handleHttpErrors);
}


async function getAllProductOrders() {
  const options = makeOptions("GET", null, undefined);
  return fetch(PRODUCTORDER_URL, options).then(handleHttpErrors);
}

async function deleteProductOrder(id: number) {
  const options = makeOptions("DELETE", null, undefined);

  const response = await fetch(`${PRODUCTORDER_URL}/${id}`, options);

  if (response.ok) {
    console.log("Product order deleted.");
  } 

}

async function updateProductOrder(updatedProductOrder: ProductOrder): Promise<ProductOrder> {
  if (!updatedProductOrder.id) {
    throw new Error("Product order must have an id to be updated");
  }

  const options = makeOptions("PUT", updatedProductOrder, undefined);
  const URL = `${PRODUCTORDER_URL}/${updatedProductOrder.id}`;
  return fetch(URL, options).then(handleHttpErrors);

}



export type { Product,   ProductOrder, Delivery };

export {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductToProductOrder,
  getAllProductOrders,
  deleteProductOrder,
  updateProductOrder
}