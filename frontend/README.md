# Vue.js frontend

## Axios configuration
- Install axios
```bash
cd frontend
npm install axios
```
- Add devServer proxy to vue.config.js
```javascript
devServer: {
    proxy: "http://localhost:3000"
}
```

## Firebase authentication configuration
- Go to https://firebase.google.com/
- Create a new project
- Open the project and Click on Web to Add Firebase to your web app
- Copy the config object
- Add `.env` file in frontend directory and add all the config variables with prefix `VUE_APP_` to allow vue to access them. See .env.example for reference
- Add the following code to `main.js`
```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
```
- Install firebase
```bash
cd frontend
npm install firebase
```
- Enable authentication in firebase site console
    - Go to Authentication tab
    - Select Sign-in method -> Email/Password -> Enable
- Add Authorised domains if you are using custom domains for your app
    - Go to Authentication tab -> Settings -> Authorised domains


## NPM Commands
- Project setup
```bash
npm install
```
- Compiles and hot-reloads for development
```bash
npm run serve
```
- Compiles and minifies for production
```bash
npm run build
```
- Lints and fixes files
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
