-- Active: 1695755077107@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('localtime', 'now')) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at) 
VALUES ('u001', 'Fernanda Shizue Imai', 'fernanda@email.com', '012345',(strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
),
('u002', 'Airton Menadro Jr', 'airton@email.com', '123456',(strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
),
('u003', 'Belinha', 'belinha@email.com', '876543',(strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

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
VALUES ('prod001', 'Mouse gamer', 250, 'Melhor mouse do mercado!','https://picsum.photos/seed/Mouse%20gamer/400' ),
('prod002', 'Monitor', 900, 'Monitor LED Full HD 24 polegadas','https://picsum.photos/seed/Monitor/400' ),
('prod003', 'Cadeira Gamer', 500, 'Cadeira Gamer TGT Heron TC, Preto e Cinza','https://www.magazineluiza.com.br/cadeira-gamer-tgt-heron-tc-preto-e-cinza-tgt-hrtc-bl01/p/hj1ae46027/mo/mecg/?seller_id=pichauinfo&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=69995&gclid=CjwKCAjwgsqoBhBNEiwAwe5w0w38aMUbfs2qDfebfWGZi8F-fY9ir2f7ngn42VzTszX9e__KOeu7vxoCFgEQAvD_BwE&gclsrc=aw.ds'),
('prod004', 'Fone Gamer', 150, 'Headset Gamer, Quantum 100 - Preto', 'https://www.amazon.com.br/Fone-Ouvido-JBL-Quantum-Gamer/dp/B083X24CFF/ref=asc_df_B083X24CFF/?tag=googleshopp00-20&linkCode=df0&hvadid=379720664788&hvpos=&hvnetw=g&hvrand=10605277430671477496&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-921119917181&psc=1'),
('prod005', 'Teclado Gamer', 180, 'HyperX Teclado Gamer HyperX Alloy Core RGB, ABNT2', 'https://www.amazon.com.br/HyperX-Teclado-Gamer-Alloy-ABNT2/dp/B07TV9B7Z3/ref=asc_df_B07TV9B7Z3/?tag=googleshopp00-20&linkCode=df0&hvadid=379726010793&hvpos=&hvnetw=g&hvrand=4057279778435855790&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001773&hvtargid=pla-906902484847&psc=1');
