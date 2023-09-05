import {users, products, createUser, getAllUsers, createProduct, getAllProducts,searchProductsByName} from './database'


// Criar um novo usuário
const createUserResult = createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99");
console.log(createUserResult); // Deve imprimir "Cadastro realizado com sucesso"

// Buscar todos os usuários
const allUsers = getAllUsers();
console.log(allUsers); // Deve imprimir a lista de usuários atualizada


// Criar um novo produto
const createProductResult = createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://images.unsplash.com/photo"
);
console.log(createProductResult); // Deve imprimir "Produto criado com sucesso"

// Buscar todos os produtos
const allProducts = getAllProducts();
console.log(allProducts); // Deve imprimir a lista de produtos atualizada

// Buscar produtos por nome (case-insensitive)
const searchTerm = "gamer";
const matchingProducts = searchProductsByName(searchTerm);
console.log(`Produtos com nome contendo "${searchTerm}":`, matchingProducts);










