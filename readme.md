# CORS Proxy

A simple serverless CORS proxy deployed on **Vercel** to bypass CORS restrictions when fetching data from external APIs.

## 🚀 Features
- **Bypasses CORS restrictions** for frontend applications
- **Deployed on Vercel** (serverless & free-tier friendly)
- **Supports GET requests** for fetching data
- **Handles preflight (OPTIONS) requests**
- **Security controls** to restrict access to specific origins (optional)

## 🌍 How to Use
You can use this proxy to fetch data from APIs that block CORS requests. Simply make a GET request to the following format:

```bash
https://proxy.sewakgautam.com.np/api/proxy?url=TARGET_API_URL
```

### Example Usage with JavaScript (Axios)
```javascript
const response = await axios.get(
  `https://proxy.sewakgautam.com.np/api/proxy?url=https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-01-01&minmagnitude=5.5`
);
console.log(response.data);
```

### Example Usage with Fetch API
```javascript
fetch(`https://proxy.sewakgautam.com.np/api/proxy?url=https://api.example.com/data`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

## 🔗 Contribution
If you’d like to contribute, feel free to fork the repository and submit a pull request. Suggestions and improvements are always welcome!

## 🎯 License
This project is open-source and available under the **MIT License**.

---
### 🚀 Happy Coding! 🎉

