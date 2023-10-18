import {users, products, createUser, getAllUsers, createProduct, getAllProducts,searchProductsByName} from './database'
import express, { Request, Response} from 'express';
import cors from 'cors';
import { db } from './database/knex'
import { TProducts, TUsers } from './types';

// Criar um novo usuário
const createUserResult = createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99");
// console.log(createUserResult); // Deve imprimir "Cadastro realizado com sucesso"

// Buscar todos os usuários
const allUsers = getAllUsers();
// console.log(allUsers); // Deve imprimir a lista de usuários atualizada


// Criar um novo produto
const createProductResult = createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://images.unsplash.com/photo"
);
// console.log(createProductResult); // Deve imprimir "Produto criado com sucesso"

// Buscar todos os produtos
const allProducts = getAllProducts();
// console.log(allProducts); // Deve imprimir a lista de produtos atualizada

// Buscar produtos por nome (case-insensitive)
const searchTerm = "gamer";
const matchingProducts = searchProductsByName(searchTerm);
// console.log(`Produtos com nome contendo "${searchTerm}":`, matchingProducts);



const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", async(req:Request, res:Response) =>{
  try{
  const result: TUsers= await db.raw(`SELECT * FROM users`) ;
  res.status(200).send(result)
}catch(error){
  if(error instanceof Error){
    res.send(error.message)
}
}

})

//get de all products, junto com getProductByName

// app.get('/products',(req:Request, res:Response) =>{
//   const result: TProducts[] = products;
//   res.status(200).send(result)
// })

app.get('/products',async(req:Request, res: Response) =>{
  try{
  const query:string = req.query.name as string;

  if (query && query.trim().length === 0) {
    res.status(400).send("O parâmetro 'name' deve conter pelo menos um caracter.");
    return;
  }

  if (query) {
    // Se a query "name" estiver presente, realize a busca no banco de dados.
    const result:TProducts = await db.raw('SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]);
    res.status(200).send(result);
  } else {
    // Caso contrário, retorne todos os produtos.
    const allProducts = await db.raw('SELECT * FROM products');
    res.status(200).send(allProducts);
  }

//   if (query.trim().length === 0) {
//     res.statusCode = 400
//     throw new Error ("O parâmetro deve conter pelo menos um caractere. ")
//    }else{
//    const productsByName: TProducts[]= products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
//    res.status(200).send(productsByName)
//  } 

//  if(!query){
//   res.status(200).send(allProducts)
//  }
 

}catch(error){
  if(error instanceof Error){
    res.send(error.message)
}

}
})

app.post('/users', async (req:Request, res:Response) =>{

  try{

  const {id, name, email, password}: TUsers = req.body

  if(!id || !email || !name || !password ){
    res.statusCode = 400
    throw new Error ("Dados inválidos")
  }

  if(typeof id !== 'string' || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string'){
    res.statusCode = 400
    throw new Error ("Dados inválidos. Preencher o campos no formato correto ('string').")
  }

  // Verificar se a ID ou e-mail já existem na lista de usuários
  // const existingUser = users.find((user) => user.id === id || user.email === email);
  // if (existingUser) {
  //   res.statusCode = 400
  //   throw new Error ('ID ou e-mail já existem')
  // }

  const [isId] = await db.raw(`SELECT id FROM users WHERE id = '${id}'`)
  // console.log(isId);
  
  if(isId){
    //não posso cadastrar
    res.status(400)
    throw new Error ('Id já existe!')
  }else{
    //posso cadastrar
    await db.raw(`INSERT INTO users (id,name,email,password)
    VALUES('${id}', '${name}', '${email}','${password}')
    `)
    res.status(201).send('Cadastro registrado com sucesso')
  }
  
//   const newUser : TUsers={
//     id,
//     name,
//     email,
//     password
// }

  
}catch(error){
  if(error instanceof Error){
    res.send(error.message)
}
}
})

app.post('/products', (req:Request, res:Response): void =>{

try{
  const {id, name, price, description, imageUrl}: TProducts = req.body

  if(!id || !name || !price || !description || !imageUrl ){
    res.statusCode = 400
    throw new Error ("Dados inválidos")
  }

  if(typeof id !== 'string' || typeof name !== 'string' || typeof price !== 'number' || typeof description !== 'string'|| typeof imageUrl !== 'string' ){
    res.statusCode = 400
    throw new Error ("Dados inválidos. Preencher o campos no formato correto (price:'number' e demais dados 'string').")
  }

    // Verifique se a ID já existe na lista de produtos
    // const existingProduct = products.find((product) => product.id === id);
    // if (existingProduct) {
    //   res.statusCode = 400
    //   throw new Error ('ID já existe')
    // }

  // const newProduct : TProducts={
  //     id,
  //     name,
  //     price,
  //     description,
  //     imageUrl
  // }

  // products.push(newProduct)
  res.status(201).send('Produto registrado com sucesso')
}catch(error){
  if(error instanceof Error){
    res.send(error.message)
}
}
})


//delete users

app.delete("/users/:id", (req: Request, res: Response): void => {
  try{
  const id: string = req.params.id;
  const indexToDelete: number = users.findIndex((user) => user.id === id);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  } else {
    res.statusCode = 404
  }

  res.status(200).send({ message: "User apagado com sucesso" });

}catch(error){
  if(error instanceof Error){
    res.send(error.message)
}
}
});


//delete products


app.delete("/products/:id", (req: Request, res: Response):void => {
  try{
    const id: string = req.params.id;
    const indexToDelete: number = products.findIndex((product) => product.id === id);
  
    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
    } else {
      res.statusCode = 404
    }
  
    res.status(200).send({ message: "Produto apagado com sucesso" });
  }catch(error){
    if(error instanceof Error){
      res.send(error.message)
  }
  }
  });
  

  app.put("/products/:id", (req: Request, res: Response):void => {
try{
    const id: string= req.params.id 
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
  }catch(error){
    if(error instanceof Error){
      res.send(error.message)
  }
  }
})




