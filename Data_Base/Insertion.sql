-- Inserting dummy data into the 'class' table
INSERT INTO class (class_id, rate) VALUES
('Economy', 50.00),
('Mid-Range', 100.00),
('Luxury', 200.00);

-- Inserting dummy data into the 'office' table
INSERT INTO office (office_id, loc, n_cars) VALUES
(1, 'Downtown', 0),
(2, 'Suburb', 0),
(3, 'City Center', 0);

-- Dummy Insertions for the 'car' table
INSERT INTO car (plate_id, model, production_year, color, photo, category, class_id, office_id, status)
VALUES
  (1000, 'BMW', 2020, 'Blue', 'bmhttps://imgur.com/0LE2ZEvw.jpg', 'SUV', 'Luxury', 1, 'Active'),
  (2500, 'TOYOTA', 2019, 'Red', 'https://imgur.com/HmZTKQE.jpg', 'Sedan', 'Mid-Range', 1, 'Active'),
  (3100, 'SKODA', 2022, 'Silver', 'https://imgur.com/1hv3x9s.jpg', 'CrossOver', 'Mid-Range', 2, 'Active'),
  (4985, 'HONDA', 2021, 'White', 'https://imgur.com/AmsLueL.jpg', 'SUV', 'Luxury', 1, 'Active'),
  (5632, 'FORD', 2018, 'Black', 'https://imgur.com/kw8H0PH.jpg', 'Sedan', 'Economy', 3, 'Active'),
  (7213, 'KIA', 2019, 'Green', 'https://imgur.com/4qAaQnO.jpg', 'Mini_Van', 'Mid-Range', 2, 'Active');
'SUV','Sedan','CrossOver''Mini_Van'
