import express, { Request, Response } from "express";
import { generateFakeProducts } from "../src/utils/fakeData";
import { IfakeProducts } from "./interfaces";
const app = express();
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
const fakeProducts: IfakeProducts[] = generateFakeProducts();

app.get("/", (req, res) => {
  res.send(`<h1>Hello express js</h1>`);
});

app.get("/products", (req, res) => {
  const filterQuery = req.query.filter as string;
  const allProducts: IfakeProducts[] = fakeProducts;

  let filterProducts: any[] = [];

  if (filterQuery) {
    const propertiesOfFilter = filterQuery.split(",");

    filterProducts = fakeProducts.map((product) => {
      const filteredProduct: any = {};
      propertiesOfFilter.forEach((property) => {
        if (product.hasOwnProperty(property)) {
          filteredProduct[property] = product[property as keyof IfakeProducts];
        }
      });
      return { id: product.id, ...filteredProduct };
    });
  } else {
    filterProducts = allProducts;
  }
  res.send(filterProducts);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid Product ID" });
  }
  const findProduct: IfakeProducts | undefined = fakeProducts.find(
    (p) => p.id === productId
  );
  if (findProduct) {
    res.send(findProduct);
  } else {
    res.status(404).send({ message: "Invalid Product ID" });
  }
});

app.post("/products", (req, res) => {
  console.log("headers is:", req.headers);
  console.log("body is:", req.body);
  const newProduct = req.body;
  fakeProducts.push({ id: fakeProducts.length + 1, ...newProduct });
  res.status(201).send({
    id: fakeProducts.length + 1,
    title: req.body.title,
    price: req.body.price,
  });
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
