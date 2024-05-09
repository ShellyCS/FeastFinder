-- Drop the database if it exists
DROP DATABASE IF EXISTS food_db;

-- Create the database
CREATE DATABASE IF NOT EXISTS food_db;

-- Use the database
USE food_db;

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
(30183, 'Persian Darbar', 'Byculla', 4.30, '7aeb2bbff29d99d6e986240911ce0e71', 30),
(32291, 'Cafe Coffee Day', 'Shivaji Park', 4.20, 'b70c7d23d197251b7b315b7e4d8173ae', 35),
(68144, 'WarmOven Cake & Desserts', 'Koramangala', 4.30, 'e938fb5f416cc2c28b4b519cf27b04cc', 24),
(74444, 'Samosa Party', 'Koramangala', 4.30, 'd8d4e708a41f011361c949d44990d5e0', 27),
(75966, 'Kaati Zone Rolls & Wraps', 'Koramangala', 4.00, 'ibmfw10arqzrdibq03mt', 24),
(105262, 'UBQ by Barbeque Nation', 'Adugodi', 3.90, 'muaktnk5xb3zop4bvj6l', 29),
(376319, 'The Brooklyn Creamery - Healthy Ice Cream', 'HSR LAYOUT', 4.20, 'b1b35780a9b1dfeb26d680506d494eaa', 23),
(409726, 'Starboy Pizza & Shakes', 'Worli, Mumbai', 4.30, 'o8mbvhnnextaa3xsc9nj', 35),
(409732, 'Wakka Makka Chinese', 'Worli, Mumbai', 4.30, 'brone6tt2siq3hmqiqzi', 32),
(410373, 'New York Waffles & Dinges', 'Worli, Mumbai', 4.20, 'vog2c7he9anjgywyqm9d', 32),
(419319, 'The Dough Therapy', 'Rosevellt', 4.90, '8eef058c1b4d15ebfd99cc296fe6c7ea', 120),
(428659, 'Tru Falafel', 'Central Park', 4.40, '3656a459e0ba179e250cf25836d02134', 90),
(512590, 'Wow! Momo', 'KORAMANGALA', 4.30, '64fd45fd9f44c1737bc446e470bed666', 24),
(613918, 'KFC', 'Times Square', 4.00, 'f01666ac73626461d7455d9c24005cd4', 25),
(728722, 'Olio - The Wood Fired Pizzeria', 'Sambava Chamber', 4.30, '4b44c7921b1b6073a4ffa58b38f8def1', 35),
(595682, 'Subway', 'Matunga Wadala', 4.30, '63178e3e64d503a479f2a2048a474552', 33),
(588705, 'La Pino\'z Pizza', 'JP Nagar', 4.10, 'w6roonblq3fa5wrtlgys', 35),
(728723, 'Crusto\'s - Gourmet Cheese Burst Pizza', 'Sambava Chamber', 4.60, '2e7493543bd1785e8196144625a5b20b', 45);



CREATE TABLE IF NOT EXISTS restaurant_info (
    name VARCHAR(255),
    restaurantId VARCHAR(255) PRIMARY KEY,
    city VARCHAR(255),
    avgRating DECIMAL(3, 1),
    costForTwo VARCHAR(255),
    cloudinaryImageId VARCHAR(255),
    totalRatings INT
);


INSERT INTO restaurant_info (name, restaurantId, city, avgRating, costForTwo, cloudinaryImageId, totalRatings)
VALUES 
('Barbeque Nation', '23954', 'Midtown', 4.3, '₹300', 'koxmlppfprrurmmcvxp9', 10000),
('Chinese Wok', '28408', 'Downtown', 4.5, '₹300', 'e0839ff574213e6f35b3899ebf1fc597', 10000),
('UBQ by Barbeque Nation', '105262', 'Adugodi', 3.9, '₹300', 'muaktnk5xb3zop4bvj6l', 10000),
('The Dough Therapy', '419319', 'Rosevellt', 4.9, '₹300', '8eef058c1b4d15ebfd99cc296fe6c7ea', 10000),
('Tru Falafel', '428659', 'Central Park', 4.4, '₹300', '3656a459e0ba179e250cf25836d02134', 10000),
('Wow! Momo', '512590', 'KORAMANGALA', 4.3, '₹300', '64fd45fd9f44c1737bc446e470bed666', 10000),
('KFC', '613918', 'Times Square', 4.0, '₹300', 'f01666ac73626461d7455d9c24005cd4', 10000),
('Olio - The Wood Fired Pizzeria', '728722', 'Sambava Chamber', 4.3, '₹300 for two', '4b44c7921b1b6073a4ffa58b38f8def1', 1000),
('Crusto''s - Gourmet Cheese Burst Pizza', '728723', 'Sambava Chamber', 4.6, '₹300 for two', '2e7493543bd1785e8196144625a5b20b', 600),
('Burger King', '5934', 'Koramangala', 4.2, '₹350 for two', 'e33e1d3ba7d6b2bb0d45e1001b731fcf', 10000),
('Cafe Coffee Day', '32291', 'Shivaji Park', 4.2, '₹300', 'b70c7d23d197251b7b315b7e4d8173ae', 10000),
('WarmOven Cake & Desserts', '68144', 'Koramangala', 4.3, '₹300 for two', 'e938fb5f416cc2c28b4b519cf27b04cc', 800),
('Samosa Party', '74444', 'Koramangala', 4.3, '₹300', 'd8d4e708a41f011361c949d44990d5e0', 890),
('Kaati Zone Rolls & Wraps', '75966', 'Koramangala', 4.0, '₹300 for two', 'ibmfw10arqzrdibq03mt', 900),
('Persian Darbar', '30183', 'Byculla', 4.3, '₹300 for two', '7aeb2bbff29d99d6e986240911ce0e71', 500),
('The Brooklyn Creamery - Healthy Ice Cream', '376319', 'HSR LAYOUT', 4.2, '₹300 for two', 'b1b35780a9b1dfeb26d680506d494eaa', 700),
('Starboy Pizza & Shakes', '409726', 'Worli, Mumbai', 4.3, '₹300 for two', 'o8mbvhnnextaa3xsc9nj', 800),
('Wakka Makka Chinese', '409732', 'Worli, Mumbai', 4.3, '₹300 for two', 'brone6tt2siq3hmqiqzi', 900),
('New York Waffles & Dinges', '410373', 'Worli, Mumbai', 4.2, '₹300 for two', 'vog2c7he9anjgywyqm9d', 10000),
('La Pino''z Pizza', '588705', 'JP Nagar', 4.1, '₹300 for two', 'w6roonblq3fa5wrtlgys', 10000),
('Subway', '595682', 'Matunga Wadala', 4.3, '₹300 for two', '63178e3e64d503a479f2a2048a474552', 10000);



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
(728722, 'Recommended'),
(728722, 'Wood Fired Veg Pizza'),
(728722, 'Desserts'),
(728722, 'Beverages'),
(32291, 'CCD Cricket League'),
(32291, 'Celebration Cake'),
(23954, 'Group Party Combos'),
(23954, 'North Indian Curries'),
(30183, 'Main Course'),
(30183, 'Rice and Biryani');



-- Creating Dishes table
CREATE TABLE IF NOT EXISTS Dishes (
    dishId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    isVeg BOOLEAN,
    imageId VARCHAR(255),
    categoryName VARCHAR(255),
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);


-- https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=30183

-- Inserting dishes into the Recommended category of Chinese Wok
    INSERT INTO dishes (dishId, restaurantId, name, description, price, isVeg, imageId, categoryName)
    VALUES 
    (3, 28408, 'Combo for 1 Veg', 'Serves 1 | Combo for one (Rice/Noodle Bowl with choice of Veg Gravy, Veg Momos & Drinks)', 359.00, 1, '3e4f7ca32bf517b390f1cb3205b892e4', 'Recommended'),
    (4, 28408, 'Combo for 1 Non-Veg', 'Serves 1 | Combo for one (Rice/Noodle Bowl with choice of Non-Veg Gravy, Non-Veg Momos & Drinks)', 379.00, 0, '440c06ace44b931b729d9b6a090aba07', 'Recommended'),
    (5, 28408, 'Hunan Paneer Dry', 'Serves 1 | (Spicy) Cubes Of Paneer, Onion, Capsicum Tossed With Spicy & Savory flavors of Hunan Sauce.', 179.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/556889e9-b065-4137-b72c-461bac300d01_2c92ca9c-be45-4732-b598-7904032b7dbb.jpg_compressed', 'Recommended'),
    (6, 28408, 'Schezwan Paneer Dry', 'Serves 1 | (Spicy) Cubes Of Paneer, Onion, Capsicum Tossed With Schezwan Sauce.', 179.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/6a0e0e38-2636-4eff-af1a-a27f23fb292c_879376f5-f5b5-400c-86aa-aec499341475.jpg_compressed', 'Recommended'),
    (7, 28408, 'Hunan Chicken Dry', 'Serves 1 | (Spicy) Diced chicken, Onion, Capsicum Tossed With Spicy & Savory flavors of Hunan Sauce.', 179.00, 0, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/437b789a-adb8-4e75-8eff-e189113ffb30_6c98fe7d-1a74-4c71-8119-42b7993ab602.jpg_compressed', 'Recommended'),
    (8, 28408, 'Schezwan Chicken Dry', 'Serves 1 | (Spicy) Diced Chicken, Onion, Capsicum Tossed With Schezwan Sauce.', 179.00, 0, 'FOOD_CATALOG/IMAGES/CMS/2024/4/1/12970b39-0711-4b74-87d4-39d40c352010_a22898b3-d397-4a79-9422-891fb7a17f76.jpg_compressed', 'Recommended'),
(9, 28408, 'Veg Manchurian Pot Rice', 'Serves 1', 425.00, 1, 'b070b7161ba21152911305c9ef19d383', 'Pot Rice'),
(10, 28408, 'Paneer Pot Rice', 'Serves 1', 425.00, 1, 'a2fe0e7f6d4250df5ba4c37feb936f72', 'Pot Rice'),
(11, 28408, 'Chicken Pot Rice', 'Serves 2', 455.00, 0, '9e2e059b65d3855823ca507595ebe350', 'Pot Rice'),
(12, 28408, 'Chocolate Mousse - Small', 'Serves 1 | Creamy chocolate mousse layered with moist chocolate cake.', 59.00, 1, 'ca711b079751ea33fe269fb647d16cc6', 'Dessert'),
(13, 28408, 'Black forest Mousse Cake', 'Serves 1 | Evergreen cake recipe, served in a mousse style dessert', 59.00, 1, '8ba0f3247c029df99f689b410d955859', 'Dessert'),
(14, 28408, 'Salted Caramel Choco Mousse', 'Serves 1 | Layers of Salted Caramel mousse and Choco mousse served chilled', 59.00, 1, '3ded4072d30fde445c7e3bbc4d442b5f', 'Dessert'),
(15, 28408, 'Choco Lava', 'Serves 1 | Rich chocolate cake with molten chocolate center, served warm.', 99.00, 1, '29dcf869cd4eaa4df85019237ee67982', 'Dessert'),
(16, 28408, 'Pepsi Pet Bottle', 'Serves 1', 60.00, 1, '12b08bb69e0309ca812b61d18687ba54', 'Drinks'),
(17, 28408, '7 Up', 'Serves 1', 60.00, 1, 'c421918afec28477d19a4fd1726f5cbb', 'Drinks'),
(18, 28408, 'Coolberg Peach', 'Serves 1', 125.00, 1, 'c625bfc8302aee8b090fd08ac485cb6d', 'Drinks'),
(19, 28408, 'Coolberg Cranberry', 'Serves 1', 125.00, 1, '88ac3e904d023c08fab7760349831143', 'Drinks'),
(20, 28408, 'Crispy Noodles', 'Serves 1', 2000.00, 1, 'ee5eff88d414fbb62db96955497b3506', 'Extras'),
(21, 28408, 'Extra Schezwan Dip', 'Serves 1', 2000.00, 1, '7fad74d38be24e7be6ebc8eebbb3ee4e', 'Extras'),
(22, 28408, 'Extra Mayo Dip', 'Serves 1', 2000.00, 1, '8389646190f90fdc187c9e4bc3f79b0c', 'Extras'),
(23, 28408, 'Extra Sweet Chilli Dip', 'Serves 1', 2000.00, 1, '756739f826fd170b5ed4644f61a2d824', 'Extras'),
(28,  728722, 'Choco Chip Brownie', '[Eggless]. Brownies are the most loved and addictive dessert which are moist, soft in texture and gives you unique taste. Enjoy every bite and mark your moments.', 129.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/3/6/ebd59ed4-4e3a-4bc2-b9a2-bfb4f264c789_938e7e9f-5e57-4104-a8fc-802018674b96_compressed', 'Desserts'),
(29,  728722, 'Butterscotch Brownie', '[Eggless]. Celebrate the moments with our delicious and simple butterscotch brownie. Brownies are the most loved and addictive dessert which are moist, soft in texture and give you a magical taste. Enjoy every bite and mark your moments.', 129.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/3/6/d9e376ac-ceb9-4319-8ad4-6fa14cded119_40719fdf-8072-4f0a-8bb2-58029ce62cc7_compressed', 'Desserts'),
(30,  728722, 'Margherita Pizza', 'Serves 1 | Our signature pizza crust loaded with Classic Mozzarella Cheese + Cheddar Cheese + Tomato', 0.00, 1, 'ucbg7vvayxhhaqtq3bak', 'Wood Fired Veg Pizza'),
(31,  728722, 'Mexican Wave Pizza', 'Serves 1 | Our signature pizza crust loaded with Classic Mozzarella Cheese + Cheddar Cheese + Onion + Capsicum + Tomato + Jalapeno', 0.00, 1, 'FOOD_CATALOG/IMAGES/CMS/2024/3/12/522cff1f-31e0-4731-8d26-2da52fc49b26_862961c4-0a69-4532-9da5-100f1e27655a.jpg_compressed', 'Recommended'),
(32, 32291, 'King Latte', 'Serves 1 | Light, hot coffee, with 2 shots of espresso in steamed milk., Serving Size(gm/ml) - 350, Energy (kcal) - 184.66 Contains Milk', 169.00, 1, 'evcgfuy8ticij45vcgsb', 'CCD Cricket League'),
(33, 32291, 'Crunchy Frappe', 'Serves 1 | Some eat an oreo. Some dunk it. Some frappe it and do both`257 (350ml | 541.59kcal)', 319.00, 1, 'pey3ddrzxnkrzrq0mwnd', 'CCD Cricket League'),
(34, 32291, 'Dutch Truffle Cake (730 g)', 'Serves 4 | Tangy orange flavored, creamy truffle topped, delightful cocoa cake laced with a delicious ganache glaze. Serving Size(gm/ml) - 100, Energy (kcal) - 366.25 , Contains Gluten, Contains Milk, Contains Soy', 699.00, 1, 'nywbsgs2koiovpekqeyw', 'Celebration Cake'),
(35, 23954, 'Royal Jashn Combo (Non-Veg) (Serves 3-4)', 'Here''s the special murgh daawat you were looking for! Enjoy your choice of royal biryani, newly launched curries and breads. Make it truly shaandaar by adding your favourite kebabs and beverages to the spread.', 1319.00, FALSE, 'b6bf9ce87d0695016f80d7bbb7796985', 'Group Party Combos'),
(36, 23954, 'Royal Veg Biryani Party Combo for 4-5', 'Create your Party Combo with choice of 2 portions of Royal Veg Shaan Biryanis (Serves 2 each). It is accompanied with fresh Mint Raita and Gulab Jamuns to make your celebration more special.', 1105.00, TRUE, '7a35e1ba9a21c89488ae0d584a33c414', 'Group Party Combos'),
(37, 23954, 'Paneer Makhani', 'Relish this mildly sweet curry of tender paneer with an aromatic blend of kaju, fresh tomatoes, sliced onions and shahi masalas. Make the most of this Punjabi peshkash with your favourite biryanis & breads!', 279.00, TRUE, '436d094318e2ecbf77e998506c3d9025', 'North Indian Curries'),
(38, 23954, 'Royal Murgh Curry Combo (Serves 1)', 'Brighten your daawat with this North Indian spread of delicious murgh curry and a bread of your choice! Elevate this royal experience with a refreshing beverage.', 369.00, FALSE, 'FOOD_CATALOG/IMAGES/CMS/2024/4/4/e82d7d80-0341-4bfa-ae70-38ff51ad3125_17af8413-5c9f-4e30-8eab-0c934a9108de.jpeg', 'North Indian Curries'),
(39, 30183, 'Chicken Nawabi Masala (500 Ml)', 'Creamy based nawabi gravy made from minced chicken and indian masalas.', 535.00, FALSE, 'Main Course'),
(40, 30183, 'Pomfret Masala 1 Pcs 125 Gms', 'An irresistibly delicious preparation with fresh pomfret simmered in a rich and thick gravy seasoned with mild spices.', 625.00, FALSE, '1918a06a29a79d7bdbea98a378b6846e', 'Main Course'),
(41, 30183, 'Veg Pulao', 'Preparation by cooking chopped vegetables and rice in a flavor-packed masala.', 525.00, TRUE, 'ee4b035bc9338328f69b8dbde1c68b79', 'Rice and Biryani'),
(42, 30183, 'Mutton Pulao With Bone', 'A delectable main course prepared by cooking tender mutton pieces and rice in a flavor-packed masala.', 855.00, FALSE, 'a5391750f4cba69a78dfe7f8bff18161', 'Rice and Biryani');


CREATE TABLE IF NOT EXISTS userASSeller (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);

CREATE TABLE images (
    id VARCHAR(250) PRIMARY KEY,
    image_data LONGBLOB
);

CREATE TABLE Orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE OrderDetails (
    orderId INT,
    dishId INT,
    restaurantId INT,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    isVeg BOOLEAN,
    imageId VARCHAR(255),
    categoryName VARCHAR(255),
    count INT,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);
