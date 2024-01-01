-- Active: 1698396764187@@localhost@3308@carrentalsystem
-- Dummy Inserts for the 'car' table
INSERT INTO car (plate_id, model, production_year, color, photo, category, class_id, office_id, `status`)
VALUES
(1, 'BMW', 2020, 'Blue', 'bmw_photo.jpg', 'Sedan', 'Luxury', 1, 'Active'),
(2, 'TOYOTA', 2019, 'Black', 'toyota_photo.jpg', 'SUV', 'Mid-Range', 2, 'Rented'),
(3, 'SKODA', 2022, 'Red', 'skoda_photo.jpg', 'Sedan', 'Economy', 3, 'Active'),
(4, 'OPEL', 2018, 'Silver', 'opel_photo.jpg', 'CrossOver', 'Mid-Range', 1, 'Pending'),
(5, 'NISSAN', 2021, 'Grey', 'nissan_photo.jpg', 'SUV', 'Luxury', 2, 'Out-Of-Service'),
(6, 'HYNDAI', 2020, 'White', 'hyundai_photo.jpg', 'Sedan', 'Economy', 3, 'Active'),
(7, 'HONDA', 2019, 'Bronze', 'honda_photo.jpg', 'Mini_Van', 'Mid-Range', 1, 'Active'),
(8, 'KIA', 2023, 'Green', 'kia_photo.jpg', 'CrossOver', 'Luxury', 2, 'Rented');

INSERT INTO customer (ssn, f_name, l_name, b_d, gender, email, pass) VALUES
(123456789, 'John', 'Doe', '1990-01-01', 'M', 'john.doe@example.com', 'password123'),
(987654321, 'Jane', 'Smith', '1985-05-15', 'F', 'jane.smith@example.com', 'securepass'),
(555555555, 'Bob', 'Johnson', '1982-09-30', 'M', 'bob.johnson@example.com', 'test123');

