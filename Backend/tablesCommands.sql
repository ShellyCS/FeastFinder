
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    areaName VARCHAR(100),
    avgRating DECIMAL(3, 2),
    restaurant_image VARCHAR(255),
    deliveryTime INT
);




CREATE TABLE IF NOT EXISTS restaurant_info (
    name VARCHAR(255),
    restaurantId VARCHAR(255) PRIMARY KEY,
    city VARCHAR(255),
    avgRating DECIMAL(3, 1),
    costForTwo VARCHAR(255),
    cloudinaryImageId VARCHAR(255),
    totalRatings INT,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL 
);

CREATE TABLE IF NOT EXISTS MenuCategory (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    categoryName VARCHAR(255) NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS Dishes (
    dishId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    isVeg BOOLEAN,
    imageId VARCHAR(255),
    categoryName VARCHAR(255),
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE,
);


CREATE TABLE IF NOT EXISTS userASSeller (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id) ON DELETE CASCADE,
);

CREATE TABLE images (
    id VARCHAR(250) PRIMARY KEY,
    image_data LONGBLOB
);

CREATE TABLE Orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
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
    FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE
    FOREIGN KEY (dishId) REFERENCES Dishes(dishId) ON DELETE CASCADE
    FOREIGN KEY (restaurantId) REFERENCES Dishes(restaurantId) ON DELETE CASCADE
);
