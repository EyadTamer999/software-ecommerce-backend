# **E-commerce Platform with Microservices Architecture**

A scalable and modern e-commerce platform developed using a microservices architecture, offering advanced features for customers, vendors, and administrators. The platform ensures a seamless shopping experience with features like product listing, cart management, user authentication, and order processing.

---

## **Features**

### **1. Authentication and User Management**
- **Login:** Secure login for customers with validation and error handling.
- **Register:** Account creation with email verification and optional company details.
- **Forgot Password:** Reset password functionality with email-based link generation.
- **Profile Management:** View and update user details, manage payment methods, and saved addresses.

### **2. Home Page**
- **Featured Listings:** Prominent display of popular products with images, prices, and ratings.
- **Product Search and Categories:** Search bar and category-based navigation for easier browsing.
- **Top Offers:** Section showcasing discounted products with validity periods.

### **3. Cart and Checkout**
- **Cart Management:** Add, remove, or update product quantities in the cart. 
- **Apply Coupons:** Apply discount codes to orders.
- **Checkout Process:** Secure and streamlined checkout flow for registered and guest users.
- **Place Order:** Finalize purchases with a clear "Place Order" button.

### **4. Product Management**
- **Detailed Product View:** Comprehensive product details including specifications, reviews, and availability.
- **Add to Cart and Rent Options:** Add products to cart or rent them with adjustable rental periods.
- **Customizable Products:** Options to select size, color, and other specifications.
- **Wishlist:** Save products for later purchase.

### **5. Order and Wishlist Management**
- **Order History:** View past orders with details like date, items, total amount, and status.
- **Wishlist Management:** Save, edit, or move items to the cart from the wishlist.

### **6. Communication Tools**
- **Kafka Integration:** Microservices communication handled using Kafka for seamless data exchange.
- **Notifications:** Real-time updates on orders and activities.

### **7. Architecture and Infrastructure**
- **Microservices Architecture:** Each feature implemented as a separate, independent service.
- **Dockerization:** All services are containerized for easy deployment.
- **Professional UI:** Clean and responsive user interface.

---

## **Technology Stack**

### **Frontend**
- **Framework:** Next.js  

### **Backend**
- **Framework:** Nest.js  
- **Architecture:** Microservices with Kafka-based communication  
- **Database:** MongoDB  

### **Infrastructure**
- **Containerization:** Dockerized for efficient deployment and scaling  
- **Communication Protocol:** Kafka for inter-service communication  

---

## **Installation and Setup**

### **Prerequisites**
- Node.js and npm installed on your local machine.
- Docker installed for containerization.
- Access to a MongoDB instance or cluster.

### **Steps to Run**
1. Clone the repository:  
   ```bash
   git clone [repository_url]
   cd [repository_folder]
   ```
2. Install dependencies for all services:
   ```bash
   npm install
   ```
3. Set up environment variables based on the provided `.env.example` file.

4. Start the application using Docker:
   ```bash
   docker-compose up
   ```

5. Access the application via the provided URL (e.g., `http://localhost:3000`).

---

## **Contributing**

We welcome contributions! Please follow these steps:  
1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## **License**

This project is licensed under the MIT License.

---

## **Acknowledgments**

Special thanks to the development team 
