import express, { Request, Response } from "express";

const app = express();

type Product = {
  id: number;
  name: string;
};

const dummy_products: Product[] = [
  { id: 1, name: "Blue T-Shirt" },
  { id: 2, name: "Blue T-bant" },
];

app.get("/", (req, res) => {
  res.send(`<h1>Hello express js</h1>`);
});

app.get("/products", (req, res) => {
  res.send(dummy_products);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid Product ID" });
  }
  const findProduct = dummy_products.find((p) => p.id === productId);
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
