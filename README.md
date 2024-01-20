# Vue Express Mongo App
Simple ecommerce app with Vue.js frontend, Express.js backend, Firebase authentication and MongoDB database.

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for more details.

## Features
- Products List
- Product Details
- Email Authentication (Firebase)
- Managing Cart Items (Add, Remove) by authenticated users

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


## Production Deployment (Render)
- Create a new web service on Render
- Connect the web service to your GitHub repository
    - Branch: `deployment`
    - Root Directory: `backend`
    - Runtime: `Node.js`
    - Build Command: `npm run build`. It uses the script defined in `package.json` in the backend directory, see below.
    - Start Command: `node ./build/server.js`
    - Environment Variables:
        MONGO_DB_URL
- Copy the web service URL
- Replace the redirect URL in `frontend/src/pages/ProductDetailPage.vue -> signIn()` with the web service URL
- Create a frontend build
```bash
cd frontend
npm run build
```
- Copy the `dist` directory to the backend directory
```bash
cp -r dist ../backend/dist
```
- Add script for deployment build to `package.json` in the backend directory
```json
"scripts": {
// ...
"build": "npm install && npx babel ./src --out-dir ./build"
},
```
- Add the following lines to `backend/server.js`
```javascript
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }))
// ...
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
})
- Add authorised domains to Firebase Authentication
    - Go to Firebase Console -> Authentication -> Settings -> Authorized domains
    - Add your web service URL
```
