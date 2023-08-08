import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager('./src/products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // Obtener el parámetro 'limit' de la consulta
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
