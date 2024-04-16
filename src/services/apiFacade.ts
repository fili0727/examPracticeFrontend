import { makeOptions, handleHttpErrors } from "./fetchUtils";

const SERVER_URL = "http://localhost:8080";

const PRODUCTS_URL = SERVER_URL + "/api/products";


interface Product {
  id?: number;
  name: string;
  price: number;
  weightInGrams: number;
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
  }
}



export type { Product };

export {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
}