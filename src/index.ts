import express, { Request, Response } from "express";
import {generateFakeProducts} from '../src/utils/fakeData'
const app = express();

interface IfakeProducts {
    id: number;
    title: string;
    price: number;
    description: string;
}

const fakeProducts : IfakeProducts[] = generateFakeProducts()

app.get("/", (req, res) => {
  res.send(`<h1>Hello express js</h1>`);
});

app.get("/products", (req, res) => {
  res.send(generateFakeProducts());
});

app.get("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid Product ID" });
  }
  const findProduct : IfakeProducts | undefined = fakeProducts.find((p) => p.id === productId) 
  if (findProduct) {
    res.send(findProduct);
  } else {
    res.status(404).send({ message: "Invalid Product ID" });
  }
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
