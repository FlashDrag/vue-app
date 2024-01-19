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

## Commands
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
