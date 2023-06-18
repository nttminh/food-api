CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
CREATE TABLE food_type (
  type_id INT PRIMARY KEY AUTO_INCREMENT,
  type_name VARCHAR(255)
);
CREATE TABLE food (
  food_id INT PRIMARY KEY AUTO_INCREMENT,
  food_name VARCHAR(255),
  image VARCHAR(255),
  price FLOAT,
  description VARCHAR(255),
  type_id INT,
  FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);
CREATE TABLE sub_food (
  sub_id INT PRIMARY KEY AUTO_INCREMENT,
  sub_name VARCHAR(255),
  sub_price FLOAT,
  food_id INT,
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);
CREATE TABLE orders (
  user_id INT,
  food_id INT,
  amount INT,
  code VARCHAR(255),
  arr_sub_id VARCHAR(255),
  PRIMARY KEY (user_id, food_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);
CREATE TABLE restaurant (
  res_id INT PRIMARY KEY AUTO_INCREMENT,
  res_name VARCHAR(255),
  image VARCHAR(255),
  description VARCHAR(255)
);
CREATE TABLE rate_res (
  user_id INT,
  res_id INT,
  amount INT,
  date_rate DATETIME,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);
CREATE TABLE like_res (
  user_id INT,
  res_id INT,
  date_like DATETIME,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);
INSERT INTO users (full_name, email, password) VALUES
('John Doe', 'johndoe@example.com', 'password123'),
('Jane Smith', 'janesmith@example.com', 'pass456'),
('Michael Johnson', 'michaeljohnson@example.com', 'securepass'),
('Emily Brown', 'emilybrown@example.com', 'mysecret123'),
('David Wilson', 'davidwilson@example.com', 'password789');
INSERT INTO food_type (type_name) VALUES
('Pizza'),
('Burger'),
('Sushi'),
('Pasta'),
('Salad');
INSERT INTO food (food_name, image, price, description, type_id) VALUES
('Margherita Pizza', 'pizza.jpg', 9.99, 'Classic cheese and tomato pizza', 1),
('Cheeseburger', 'burger.jpg', 6.99, 'Juicy beef patty with melted cheese', 2),
('California Roll', 'sushi.jpg', 8.99, 'Sushi roll with crab, avocado, and cucumber', 3),
('Spaghetti Bolognese', 'pasta.jpg', 11.99, 'Pasta with meaty tomato sauce', 4),
('Greek Salad', 'salad.jpg', 7.99, 'Fresh salad with feta cheese and olives', 5);
INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Extra Cheese', 1.5, 1),
('Bacon', 2.0, 2),
('Eel', 1.5, 3),
('Meatballs', 1.75, 4),
('Grilled Chicken', 1.0, 5);
INSERT INTO restaurant (res_name, image, description) VALUES
('Pizza Paradise', 'pizzaparadise.jpg', 'A cozy restaurant serving delicious pizzas'),
('Burger Barn', 'burgerbarn.jpg', 'Home of the juiciest burgers in town'),
('Sushi Sensation', 'sushisensation.jpg', 'Experience the finest sushi in a serene ambiance'),
('Pasta Palace', 'pastapalace.jpg', 'Authentic Italian pasta dishes made with love'),
('Salad Spot', 'saladspot.jpg', 'Healthy and fresh salads made to order');
INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ORDER123', '1,2'),
(2, 3, 1, 'ORDER456', '3'),
(3, 2, 3, 'ORDER789', '4,5'),
(4, 4, 1, 'ORDERABC', '2'),
(5, 5, 2, 'ORDERDEF', '1,3');
INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2023-06-01 10:30:00'),
(2, 3, '2023-06-02 15:45:00'),
(3, 2, '2023-06-03 12:15:00'),
(4, 4, '2023-06-04 19:00:00'),
(5, 5, '2023-06-05 08:20:00');
INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 4, '2023-06-01 14:20:00'),
(2, 3, 5, '2023-06-02 18:30:00'),
(3, 2, 3, '2023-06-03 09:45:00'),
(4, 4, 4, '2023-06-04 17:10:00'),
(5, 5, 5, '2023-06-05 12:30:00');
