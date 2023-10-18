-- Active: 1695755077107@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);


SELECT * FROM users;

INSERT INTO users (id, name, email, password) 
VALUES ('u001', 'Fernanda Shizue Imai', 'fernanda@email.com', '012345'),
('u002', 'Airton Menadro Jr', 'airton@email.com', '123456')
,
('u003', 'Belinha', 'belinha@email.com', '876543');

UPDATE users SET created_at =''  WHERE id= 'u003';

DROP TABLE users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);


SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
('prod001', 'Mouse gamer', 250, 'Melhor mouse do mercado!','https://picsum.photos/seed/Mouse%20gamer/400' ),
('prod002', 'Monitor', 900, 'Monitor LED Full HD 24 polegadas','https://picsum.photos/seed/Monitor/400' ),
('prod003', 'Cadeira Gamer', 500, 'Cadeira Gamer TGT Heron TC, Preto e Cinza','https://www.magazineluiza.com.br/cadeira-gamer-tgt-heron-tc-preto-e-cinza-tgt-hrtc-bl01/p/hj1ae46027/mo/mecg/?seller_id=pichauinfo&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=69995&gclid=CjwKCAjwgsqoBhBNEiwAwe5w0w38aMUbfs2qDfebfWGZi8F-fY9ir2f7ngn42VzTszX9e__KOeu7vxoCFgEQAvD_BwE&gclsrc=aw.ds'),
('prod004', 'Fone Gamer', 150, 'Headset Gamer, Quantum 100 - Preto', 'https://www.amazon.com.br/Fone-Ouvido-JBL-Quantum-Gamer/dp/B083X24CFF/ref=asc_df_B083X24CFF/?tag=googleshopp00-20&linkCode=df0&hvadid=379720664788&hvpos=&hvnetw=g&hvrand=10605277430671477496&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-921119917181&psc=1'),
('prod005', 'Teclado Gamer', 180, 'HyperX Teclado Gamer HyperX Alloy Core RGB, ABNT2', 'https://www.amazon.com.br/HyperX-Teclado-Gamer-Alloy-ABNT2/dp/B07TV9B7Z3/ref=asc_df_B07TV9B7Z3/?tag=googleshopp00-20&linkCode=df0&hvadid=379726010793&hvpos=&hvnetw=g&hvrand=4057279778435855790&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-906902484847&psc=1');

 --Get All Users--
  SELECT * FROM users;

  --Get All Products--
  SELECT * FROM products;

  --Get all Products (funcionalidade 2)--

  SELECT * FROM products WHERE name LIKE  '%gamer%';

  --Exercício 2--

  --Create User--

  INSERT INTO users (id, name, email, password, created_at)
  VALUES('u004', 'Adriana', 'adriana@email.com', '7891027',(strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')));

--Create Product--

INSERT INTO products (id, name, price, description, image_url)
VALUES('prod006', 'Pen Drive', 34.99, 'Sandisk Pen drive USB Cruzer Blade, 64 GB', 'https://www.amazon.com.br/Sandisk-Cruzer-Blade-Flash-SDCZ50-064G-A46/dp/B00DGHQ0D0/ref=asc_df_B00DGHQ0D0/?tag=googleshopp00-20&linkCode=df0&hvadid=379792667186&hvpos=&hvnetw=g&hvrand=9094649278711680985&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-923425979915&psc=1');

--Delete User by id--

DELETE FROM users WHERE id='u004';

--Delete Product by id--

DELETE FROM products WHERE id='prod006';

--Edit Product by id--

UPDATE products SET price=149.99 WHERE id='prod004';

--  make the query edit all columns of the item --

UPDATE products
SET 
  name = 'Cartão de Memória',
  price = 59.99,
  description = 'SanDisk Cartão microSDXC Ultra SDSQUNS-128G-GN6MN 128GB 80MB/s',
  image_url = 'https://www.amazon.com.br/SanDisk-Cart%C3%A3o-SDSQUNS-128G-GN6MN-Classe-microSDXC/dp/B07HHD7C7T/ref=asc_df_B07HHD7C7T/?tag=googleshopp00-20&linkCode=df0&hvadid=379751635837&hvpos=&hvnetw=g&hvrand=11167178578804736813&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-575048341642&psc=1'
WHERE id = 'prod005';


CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
FOREIGN KEY (buyer) REFERENCES users (id)
);

DROP TABLE purchases;

INSERT INTO purchases (id, buyer, total_price) VALUES 
('001', 'u001',300),
('002','u002',500);

SELECT * FROM purchases;

UPDATE purchases SET total_price=149.99 WHERE id='001';

SELECT 
p.id AS idCompra,
buyer,
name,
email,
total_price,
p.created_at
FROM users AS u
INNER JOIN purchases AS p
ON u.id = p.buyer;

 --Get All Users--
  SELECT * FROM users;

  --Get All Products--
  SELECT * FROM products;

  --Get all Products (funcionalidade 2)--

  SELECT * FROM products WHERE name LIKE  '%gamer%';

  --Exercício 2--

  --Create User--

  INSERT INTO users (id, name, email, password, created_at)
  VALUES('u004', 'Adriana', 'adriana@email.com', '7891027',(strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')));

--Create Product--

INSERT INTO products (id, name, price, description, image_url)
VALUES('prod006', 'Pen Drive', 34.99, 'Sandisk Pen drive USB Cruzer Blade, 64 GB', 'https://www.amazon.com.br/Sandisk-Cruzer-Blade-Flash-SDCZ50-064G-A46/dp/B00DGHQ0D0/ref=asc_df_B00DGHQ0D0/?tag=googleshopp00-20&linkCode=df0&hvadid=379792667186&hvpos=&hvnetw=g&hvrand=9094649278711680985&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-923425979915&psc=1');

--Delete User by id--

DELETE FROM users WHERE id='u004';

--Delete Product by id--

DELETE FROM products WHERE id='prod006';

--Edit Product by id--

UPDATE products SET price=149.99 WHERE id='prod004';

--  make the query edit all columns of the item --

UPDATE products
SET 
  name = 'Cartão de Memória',
  price = 59.99,
  description = 'SanDisk Cartão microSDXC Ultra SDSQUNS-128G-GN6MN 128GB 80MB/s',
  image_url = 'https://www.amazon.com.br/SanDisk-Cart%C3%A3o-SDSQUNS-128G-GN6MN-Classe-microSDXC/dp/B07HHD7C7T/ref=asc_df_B07HHD7C7T/?tag=googleshopp00-20&linkCode=df0&hvadid=379751635837&hvpos=&hvnetw=g&hvrand=11167178578804736813&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-575048341642&psc=1'
WHERE id = 'prod005';


CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
FOREIGN KEY (buyer) REFERENCES users (id)
ON UPDATE CASCADE 
ON DELETE CASCADE 
);

DROP TABLE purchases;

INSERT INTO purchases (id, buyer, total_price) VALUES 
('c001', 'u001',300),
('c002','u002',500),
('c003','u003',199);


INSERT INTO purchases (id, buyer, total_price) VALUES


SELECT * FROM purchases;

UPDATE purchases SET total_price=149.99 WHERE id='001';

SELECT 
p.id AS idCompra,
buyer,
name,
email,
total_price,
p.created_at
FROM users AS u
INNER JOIN purchases AS p
ON u.id = p.buyer;

CREATE TABLE purchases_products(
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id)
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
);

DROP TABLE purchases_products;

INSERT INTO purchases_products VALUES
('c001', 'prod004', 2),
('c002', 'prod002',1),
('c003', 'prod005',3);

SELECT 
pp.purchase_id,
pp.product_id,
pr.name,
pp.quantity,
u.name
FROM purchases_products AS pp
INNER JOIN purchases AS pu ON pp.purchase_id = pu.id
INNER JOIN products AS pr ON  pp.product_id= pr.id
INNER JOIN users AS u ON pu.buyer=u.id;