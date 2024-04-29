# Agarly Car Rental System

Welcome to the Agarly Car Rental System repository! This project is a web application developed using Node.js and React for a car rental company named Agarly. The system enables customers to reserve cars, manage reservations, and provides administrative functionalities for car management and reporting.

## Features

- **Car Registration and Status Management**:
  - Register new cars with details such as model, year, plate ID, and manage car status (active, out of service, rented, etc.).

- **Global Car Reservation**:
  - Customers can reserve cars from anywhere in the world through the system, which supports multiple office locations.

- **Customer Account Creation and Reservation**:
  - Customers can create accounts by providing personal information and then proceed to reserve cars.

- **Automated Car Reservation Procedures**:
  - Automate manual procedures for car reservation, including reserving, pick-up, return, and payment processes.

- **Car Search and Advanced Filtering**:
  - Customers can search and filter available cars based on specific car specifications to match their needs.

- **Advanced Search Functionality**:
  - Perform advanced searches by car information, customer information, or reservation date to retrieve comprehensive details about cars, customers, and reservations.

- **Reporting**:
  - Generate basic necessary reports, including:
    - All reservations within a specified period with detailed car and customer information.
    - Reservations of a specific car within a specified period.
    - Status of all cars on a specific day.
    - Reservations of a specific customer with detailed car and reservation information.
    - Daily payments within a specific period.

- **Data Population for Testing**:
  - Populate the system with sufficient data to test all components and demonstrate the complete system functionality.

## Getting Started

To run the Agarly Car Rental System locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Gawad1/agarly-car-rental.git
Navigate to the Project Directory:
bash
Copy code
cd agarly-car-rental
Install Dependencies:
bash
Copy code
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set Up Environment Variables:
Create a .env file in the backend directory and configure necessary environment variables (e.g., database connection details, API keys).
Run the Application:
bash
Copy code
# Start the backend server
cd backend
npm start

# Start the frontend development server
cd ../frontend
npm start
Access the Application:
Open your web browser and navigate to http://localhost:3000 to access the Agarly Car Rental System.
Project Structure
The project structure is organized into two main directories:

backend/: Contains the backend Node.js application responsible for API endpoints, database interactions, and business logic.
frontend/: Contains the frontend React application responsible for the user interface and client-side interactions.
Contributing
Contributions to the Agarly Car Rental System project are welcome! If you would like to contribute:

Fork the repository.
Create a new branch for your contributions.
Implement new features or improvements.
Submit a pull request for review and integration.
