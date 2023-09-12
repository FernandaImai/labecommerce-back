import { TProducts, TUsers } from "./types";

export const users: TUsers[]=[
{
id:"u001",
name:"Fulano",
email:"fulano@email.com",
password:"fulano123",
createdAt: new Date().toISOString()
},{
id:"u002",
name:"Beltrana",
email:"beltrana@email.com",
password:"beltrana00",
createdAt:new Date().toISOString()  
}
]

export const products: TProducts[]=[
{
id:"prod001",
name:"Mouse gamer",
price:250,
description:"Melhor mouse do mercado!",
imageUrl:"https://picsum.photos/seed/Mouse%20gamer/400"  
},{
id:"prod002",
name:"Monitor",
price:900,
description:"Monitor LED Full HD 24 polegadas",
imageUrl:"https://picsum.photos/seed/Monitor/400"    
}
]



// Função para criar um novo usuário
export function createUser(id: string, name: string, email: string, password: string): string {
  const createdAt = new Date().toISOString();
  const newUser:TUsers = { id, name, email, password, createdAt };
  users.push(newUser);
  return "Cadastro realizado com sucesso";
}

// Função para buscar todos os usuários
export function getAllUsers(): TUsers[] {
  return users;
}


// Função para criar um novo produto
export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): string {
  const newProduct = { id, name, price, description, imageUrl };
  products.push(newProduct);
  return "Produto criado com sucesso";
}

// Função para buscar todos os produtos
export function getAllProducts(): TProducts[] {
  return products;
}

// Função para buscar produtos por nome
export function searchProductsByName(name: string): TProducts[] {
    // Use a função filter para encontrar produtos com nomes que contenham o termo de busca (case-insensitive)
    const searchTerm = name.toLowerCase();
    const matchingProducts = products.filter((product) =>product.name.toLowerCase().includes(searchTerm)
    );
  
    return matchingProducts;
  }

