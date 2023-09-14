




import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
  
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";

// console.log(users, products);

// console.log(createUser("u003", "Astrodev", "astrodev@email.com", 145695));
// console.log(getAllUsers());

// console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));

// console.log(getAllProducts());

// console.log(searchProductsByName("gamer"));

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//1

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//2
app.get("/users", (req: Request, res: Response) => {
  const result: TUsers[] = users;

  res.status(200).send(result);
});

app.get("/products", (req: Request, res: Response) => {
  const result: TProducts[] = products;

  res.status(200).send(result);
});

app.get("/products/search", (req: Request, res: Response) => {
  const query: string = req.query.q as string;
  const resultProducts: TProducts[] = products

  if (!query) {
    return res.status(200).send(resultProducts)
} else {

  const productsByName: TProducts[] = products.filter(
    (product) => product.name.toLowerCase().includes(query.toLowerCase())
  );

  return res.status(200).send(productsByName);
}
});

//3

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password, createdAt }: TUsers = req.body;

  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt,
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl }: TProducts = req.body;

  const newProducts: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProducts);
  res.status(2001).send("Produto registrado com sucesso");
});

//delete users

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = users.findIndex((user) => user.id === id);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  } else {
    console.log("Nada foi deletado!");
  }

  res.status(200).send({ message: "User apagado com sucesso" });
});


//delete products


app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const indexToDelete = products.findIndex((product) => product.id === id);
  
    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
    } else {
      console.log("Nada foi deletado!");
    }
  
    res.status(200).send({ message: "Produto apagado com sucesso" });
  });
  

  app.put("/products/:id", (req: Request, res: Response) => {

    const id= req.params.id 
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

   
    const product = products.find((product) => product.id === id)

    if (product) {
        product.name = newName || product.name;
        product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;



        res.status(200).send({ message: 'Produto atualizado com sucesso' });
    } else {
        res.status(404).send({ message: 'Produto não encontrado' });
    }


  
})






