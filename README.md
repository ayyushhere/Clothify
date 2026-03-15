# Clothify 🛍️

A sleek, premium, and fully-featured MERN stack e-commerce platform designed for luxury clothing and apparel. Clothify offers a seamless shopping experience with a beautifully modern interface, integrated payment gateways, and a comprehensive admin panel for order and inventory management.

---

## ✨ Features

### Frontend (Customer Facing)
- **Premium UI/UX:** A stunning, modern interface utilizing glassmorphism, dynamic gradients, and smooth Micro-animations tailored for a luxury brand aesthetic.
- **Product Browsing:** Easily browse, filter, and search through the clothing collection.
- **Cart & Checkout:** Seamlessly manage cart items and check out with ease.
- **Dynamic Order Tracking:** View detailed order history and track the current status of each parcel in real-time.
- **Order Cancellation:** Customers can cancel their orders directly from the frontend (restricted to pre-shipping stages).

### Admin Panel
- **Secure Authentication:** Protected admin portal to manage the store securely.
- **Product Management:** Add, edit, and organize inventory with image uploads handling directly to Cloudinary.
- **Order Management:** View all incoming orders, update shipping statuses (Order Placed, Packing, Shipped, Out for delivery, Delivered), and manage cancellations.

### Backend Infrastructure
- **Payment Integration:** Securely process payments via **Stripe** and **Razorpay**.
- **Database:** Fast and scalable data storage using **MongoDB**.
- **Image Hosting:** Cloud-based asset management via **Cloudinary**.
- **RESTful API:** Robust Node.js/Express backend handling user authentication, product delivery, and order state.

---

## 🛠️ Tech Stack

- **MongoDB** (Database)
- **Express.js** (Backend Framework)
- **React.js** (Frontend & Admin UI)
- **Node.js** (Runtime Environment)
- **Tailwind CSS** (Styling)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayyushhere/Clothify.git
   cd Clothify
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the `backend` directory based on required environment variables.*

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   *Create a `.env` file in the `frontend` directory based on required environment variables.*

4. **Admin Setup**
   ```bash
   cd ../admin
   npm install
   ```
   *Configure the backend URL in the Admin app.*

### Running the Application (Development)

Open three separate terminals and run the following commands:

**Terminal 1 (Backend):**
```bash
cd backend
npm run server
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 3 (Admin Panel):**
```bash
cd admin
npm run dev
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---

*Designed and engineered to bring luxury e-commerce to life.*
