-- Create the database
CREATE DATABASE IF NOT EXISTS food_db;

-- Creating restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    areaName VARCHAR(100),
    avgRating DECIMAL(3, 2),
    restaurant_image VARCHAR(255),
    deliveryTime INT
);

INSERT INTO restaurants (id, name, areaName, avgRating, restaurant_image, deliveryTime) VALUES
(23954, 'Barbeque Nation', 'Midtown', 4.30, 'koxmlppfprrurmmcvxp9', 35),
(28408, 'Chinese Wok', 'Downtown', 4.50, 'e0839ff574213e6f35b3899ebf1fc597', 30),
(105262, 'UBQ by Barbeque Nation', 'Adugodi', 3.90, 'muaktnk5xb3zop4bvj6l', 29),
(419319, 'The Dough Therapy', 'Rosevellt', 4.90, '8eef058c1b4d15ebfd99cc296fe6c7ea', 120),
(428659, 'Tru Falafel', 'Central Park', 4.40, '3656a459e0ba179e250cf25836d02134', 90),
(512590, 'Wow! Momo', 'KORAMANGALA', 4.30, '64fd45fd9f44c1737bc446e470bed666', 24),
(613918, 'KFC', 'Times Square', 4.00, 'f01666ac73626461d7455d9c24005cd4', 25),
(752903, 'Chicago Pizza', 'Downtown Chicago', 4.20, '80f040545552605e33eba09f8fa30be9', 30);

-- Creating users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL 
);

-- Creating MenuCategory table
CREATE TABLE IF NOT EXISTS MenuCategory (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    categoryName VARCHAR(255) NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);

-- Inserting data into MenuCategory table
INSERT INTO MenuCategory (restaurantId, categoryName)
VALUES
(28408, 'Recommended'),
(28408, 'Pot Rice'),
(28408, 'Dessert'),
(28408, 'Drinks'),
(28408, 'Extras'),
(752903, 'Stuffed Garlic Breads'),
(752903, 'Sides'),
(752903, 'Milkshakes'),
(752903, 'Family Combos'),
(752903, 'Mocktails'),
(752903, 'Meals');

-- Creating Dishes table
CREATE TABLE IF NOT EXISTS Dishes (
    dishId INT AUTO_INCREMENT PRIMARY KEY,
    categoryId INT,
    restaurantId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    isVeg BOOLEAN,
    imageId VARCHAR(255),
    FOREIGN KEY (categoryId) REFERENCES MenuCategory(categoryId),
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);

-- Inserting dishes into the Recommended category of Chinese Wok
INSERT INTO Dishes (categoryId, restaurantId, name, description, price, isVeg, imageId) 
VALUES
(1, 28408, 'Combo for 1 Veg', 'Serves 1 | Combo for one (Rice/Noodle Bowl with choice of Veg Gravy, Veg Momos & Drinks)', 359.00, 1, '3e4f7ca32bf517b390f1cb3205b892e4'),
(1, 28408, 'Combo for 1 Non-Veg', 'Serves 1 | Combo for one (Rice/Noodle Bowl with choice of Non-Veg Gravy, Non-Veg Momos & Drinks)', 379.00, 0, '440c06ace44b931b729d9b6a090aba07'),
(1, 28408, 'Hunan Paneer Dry', 'Serves 1 | (Spicy) Cubes Of Paneer, Onion, Capsicum Tossed With Spicy & Savory flavors of Hunan Sauce.', 179.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/556889e9-b065-4137-b72c-461bac300d01_2c92ca9c-be45-4732-b598-7904032b7dbb.jpg_compressed'),
(1, 28408, 'Schezwan Paneer Dry', 'Serves 1 | (Spicy) Cubes Of Paneer, Onion, Capsicum Tossed With Schezwan Sauce.', 179.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/6a0e0e38-2636-4eff-af1a-a27f23fb292c_879376f5-f5b5-400c-86aa-aec499341475.jpg_compressed'),
(1, 28408, 'Hunan Chicken Dry', 'Serves 1 | (Spicy) Diced chicken, Onion, Capsicum Tossed With Spicy & Savory flavors of Hunan Sauce.', 179.00, 0, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/437b789a-adb8-4e75-8eff-e189113ffb30_6c98fe7d-1a74-4c71-8119-42b7993ab602.jpg_compressed'),
(1, 28408, 'Schezwan Chicken Dry', 'Serves 1 | (Spicy) Diced Chicken, Onion, Capsicum Tossed With Schezwan Sauce.', 179.00, 0, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/12970b39-0711-4b74-87d4-39d40c352010_a22898b3-d397-4a79-9422-891fb7a17f76.jpg_compressed');
