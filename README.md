# 📌 Book_my_space | Full Stack Room Booking Platform

- A comprehensive room booking platform enabling hourly and daily reservations.
- Implemented secure payment processing using Stripe with 3-5% service fee integration.
- Built authentication system using NextAuth ensuring secure user access.
- Developed responsive UI using ShadcnUI, TailwindCSS and TypeScript.
- Utilized PostgreSQL for efficient data management and relationships.
- Technologies: Next.js, TypeScript, PostgreSQL, ShadcnUI, TailwindCSS, Stripe, NextAuth.

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/VishalChaudhary01/book_my_space
cd book_my_space
```

## 📦 Setup using Docker (Recommended)

### 2️⃣ Build and Run the Project

```bash
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up
```

## 🔧 Setup Manually (Without Docker)

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Open .env and replace DATABASE_URL with your actual database connection string.

### 4️⃣ Run the Application

```bash
npm run dev
```

## 🌍 Access the Application

### Once the server is running, open your browser and go to:

🔗 http://localhost:3000
