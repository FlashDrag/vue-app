# Vue Express Mongo App
Simple ecommerce app with Vue.js frontend, Express.js backend, Firebase authentication and MongoDB database.

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for more details.

## Features
- Products list
- Product details
- Cart

## Local Deployment
### Prerequisites
- Node.js
- MongoDB Atlas
- Firebase account and project

### Steps
- Clone the repository
```bash
git clone https://github.com/FlashDrag/vue-app
```
- Install dependencies
```bash
cd frontend
npm install
cd ../backend
npm install
```
- Create `.env` file in backend and frontend directories. See `.env.example` files for reference.
- Run the backend server
```bash
cd backend
npm run dev
```
- Run the frontend server
```bash
cd frontend
npm run serve
```
- Open http://localhost:8080 in your browser
