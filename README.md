# Appointment Booking System

## Objective
The Appointment Booking System allows users to:
1. View available time slots for appointments.
2. Book an appointment.
3. View their booked appointments.
4. Cancel an appointment.

---

## Features
### Front-End (React.js)
- **Calendar/List View:** Displays available appointment slots.
- **Booking Form:** Allows users to select a date, time slot, and enter their details (name, contact).
- **Appointment Management:** Users can view and cancel their booked appointments.
- **User Authentication:** Login and Signup functionality for secure access.
- **Styling:** Uses TailwindCSS for a responsive, mobile-friendly design.

### Back-End (Spring Boot)
- **API Endpoints:**
  - `GET /slots` - Retrieve available time slots.
  - `POST /appointments` - Book an appointment.
  - `GET /appointments` - Retrieve booked appointments for a user.
  - `DELETE /appointments/:id` - Cancel an appointment.
  - `POST /signup` - Register a new user.
  - `POST /login` - Authenticate a user.
- **Validation:**
  - Prevents double-booking of time slots.
  - Ensures valid user details.

### Database (MySQL)
- Stores users, available slots, and booked appointments.

---

## Setup & Installation
### Prerequisites
- **Node.js & npm** (for React front-end)
- **Java & Spring Boot** (for back-end)
- **MySQL Database**

### Steps to Run the Project
#### 1. Clone the Repository
```sh
 git clone https://github.com/PrabhashSwarnajith/appointment-booking-system.git
 cd appointment-booking-system
```

#### 2. Set Up the Back-End (Spring Boot)
1. Navigate to the back-end folder:
   ```sh
   cd backend
   ```
2. Configure `application.properties` with your MySQL database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/appointment_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Build and run the Spring Boot application:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

#### 3. Set Up the Front-End (React.js)
1. Navigate to the front-end folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

The React application will be available at `http://localhost:3000/`.

#### 4. Database Setup
- Ensure MySQL is running and create a database:
  ```sql
  CREATE DATABASE appointment_db;
  ```
- The application will automatically create tables on startup.

---

## Tools & Technologies Used
- **Front-End:** React.js, TailwindCSS 
- **Back-End:** Spring Boot, REST API
- **Database:** MySQL,Docker
- **Other:** Node.js, npm, Maven

---

## Contribution & Support
Feel free to contribute or report issues via the GitHub repository.

**Repository:** [GitHub](https://github.com/PrabhashSwarnajith/appointment-booking-system)

---

## Future Enhancements
- Implement user authentication (signup/login).
- Add email/SMS notifications for appointment confirmations.
- Introduce role-based access (admin, user).
- Improve UI with additional customization options.
- Enhance security with JWT-based authentication.

