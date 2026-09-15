# 🔗 URL Shortener — Backend API

A RESTful backend API for a full-stack URL Shortener application built with **Node.js, Express.js, MongoDB, Mongoose, and JavaScript**.

The API handles URL creation, short-code generation, URL redirection, click tracking, URL history, deletion, and clearing all shortened URLs.

---

## 🚀 Live API

[URL Shortener Backend API](https://url-shortener-backend-3vot.onrender.com/?utm_source=chatgpt.com)

The API root endpoint returns:

```json
{
  "success": true,
  "message": "URL Shortener API is running 🚀"
}
```

---

## 💻 Frontend

The backend is connected to the React frontend:

[URL Shortener Frontend](https://url-shortener-frontend-gamma-opal.vercel.app/?utm_source=chatgpt.com)

---

## ✨ Features

- 🔗 Create shortened URLs
- 🎲 Generate unique short codes
- ✅ Validate URLs
- 🌐 Support HTTP and HTTPS URLs
- 📊 Track URL clicks
- 🔄 Redirect short URLs
- 📜 Retrieve URL history
- 🗑️ Delete individual URLs
- 🧹 Clear all URLs
- 📅 Store creation timestamps
- 💾 MongoDB persistence
- 🔌 RESTful API
- ⚠️ Error handling
- 🌍 CORS configuration
- 🔐 Environment-variable configuration
- ☁️ Render deployment

---

## 🛠️ Tech Stack

### Runtime

- Node.js

### Framework

- Express.js

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Libraries

- CORS
- dotenv
- nanoid

### Development

- Nodemon
- npm
- Git
- GitHub

### Deployment

- Render

---

## 🏗️ Architecture

```text
                 React Frontend
                       │
                       │ HTTP Requests
                       ▼
             ┌─────────────────────┐
             │    Express API      │
             │      Node.js        │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │    Controllers      │
             │ Business Logic      │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │      Mongoose       │
             │       Model         │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │    MongoDB Atlas    │
             │      Database       │
             └─────────────────────┘
```

---

## 📁 Project Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── urlController.js
│   │
│   ├── models/
│   │   └── Url.js
│   │
│   ├── routes/
│   │   └── urlRoutes.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗄️ Database Model

The application uses a MongoDB collection called `urls`.

Each URL document contains:

```json
{
  "_id": "...",
  "originalUrl": "https://www.google.com",
  "shortCode": "aB12Cd",
  "clicks": 5,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Fields

| Field         | Type     | Description                 |
| ------------- | -------- | --------------------------- |
| `_id`         | ObjectId | MongoDB document identifier |
| `originalUrl` | String   | Original long URL           |
| `shortCode`   | String   | Unique shortened URL code   |
| `clicks`      | Number   | Number of redirects         |
| `createdAt`   | Date     | Creation timestamp          |
| `updatedAt`   | Date     | Last update timestamp       |

---

# 📡 API Documentation

## Base URL

```text
https://url-shortener-backend-3vot.onrender.com
```

---

## 1. Health Check

### Request

```http
GET /
```

### Response

```json
{
  "success": true,
  "message": "URL Shortener API is running 🚀"
}
```

---

# 🔗 URL Endpoints

## 2. Get All URLs

### Request

```http
GET /api/urls
```

### Response

```json
{
  "success": true,
  "count": 2,
  "data": []
}
```

The URLs are returned with the newest URLs first.

---

## 3. Create Short URL

### Request

```http
POST /api/urls
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "originalUrl": "https://www.google.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Short URL created successfully.",
  "data": {
    "id": "...",
    "originalUrl": "https://www.google.com",
    "shortCode": "aB12Cd",
    "shortUrl": "https://url-shortener-backend-3vot.onrender.com/aB12Cd",
    "clicks": 0,
    "createdAt": "..."
  }
}
```

---

## 4. Redirect Short URL

### Request

```http
GET /:shortCode
```

Example:

```text
GET /aB12Cd
```

The server:

```text
1. Finds the short code
        ↓
2. Retrieves the original URL
        ↓
3. Increments click count
        ↓
4. Saves the updated document
        ↓
5. Redirects the user
```

Example:

```text
https://url-shortener-backend-3vot.onrender.com/aB12Cd
```

redirects to:

```text
https://www.google.com
```

---

## 5. Delete URL

### Request

```http
DELETE /api/urls/:id
```

Example:

```text
DELETE /api/urls/64xxxxxxxxxxxx
```

### Response

```json
{
  "success": true,
  "message": "Short URL deleted successfully."
}
```

---

## 6. Clear All URLs

### Request

```http
DELETE /api/urls/clear-all
```

### Response

```json
{
  "success": true,
  "message": "All URLs cleared successfully."
}
```

This removes all URL documents from the database.

---

# 🔄 URL Creation Flow

```text
Client
  │
  │ POST /api/urls
  ▼
Express Router
  │
  ▼
URL Controller
  │
  ├── Validate URL
  │
  ├── Generate short code
  │
  ├── Check uniqueness
  │
  └── Save URL
        │
        ▼
    MongoDB Atlas
        │
        ▼
    API Response
        │
        ▼
     Frontend
```

---

# 🔀 Redirect Flow

```text
User clicks short URL
          │
          ▼
GET /:shortCode
          │
          ▼
Find URL in MongoDB
          │
          ▼
Increase clicks
          │
          ▼
Save document
          │
          ▼
Redirect to original URL
```

---

# ✅ URL Validation

The backend validates the submitted URL using the JavaScript `URL` constructor.

Only these protocols are accepted:

```text
http:
https:
```

Examples of valid URLs:

```text
https://google.com
https://github.com
https://react.dev
http://example.com
```

Invalid URLs are rejected.

---

# 🎲 Short Code Generation

The backend generates a random short code using `nanoid`.

Example:

```text
Original URL
https://www.example.com

        ↓

Short Code
aB12Cd

        ↓

Short URL
https://url-shortener-backend-3vot.onrender.com/aB12Cd
```

The backend also checks whether the generated short code already exists.

If a collision occurs, another code is generated.

---

# 📊 Click Tracking

Every time a shortened URL is opened:

```text
Short URL
    ↓
Database lookup
    ↓
clicks + 1
    ↓
Database update
    ↓
Redirect
```

Example:

```text
Before:
clicks: 10

After:
clicks: 11
```

---

# ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:5173
```

### Production

For the deployed application:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

FRONTEND_URL=https://url-shortener-frontend-gamma-opal.vercel.app
```

### ⚠️ Security

Never commit the `.env` file to GitHub.

The `.gitignore` contains:

```text
node_modules
.env
```

---

# 💻 Installation

Clone the repository:

```bash
git clone https://github.com/Mobin977/url-shortener-backend.git
```

Navigate into the project:

```bash
cd url-shortener-backend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Locally

### Development

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### Production

```bash
npm start
```

---

# 📦 NPM Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

### Development server

```bash
npm run dev
```

### Production server

```bash
npm start
```

---

# 🧪 API Testing

You can test the API using:

- Browser
- Postman
- Thunder Client
- Insomnia
- Frontend application

### Health Check

```http
GET /
```

### Get URLs

```http
GET /api/urls
```

### Create URL

```http
POST /api/urls
```

Body:

```json
{
  "originalUrl": "https://github.com"
}
```

### Delete URL

```http
DELETE /api/urls/:id
```

### Clear URLs

```http
DELETE /api/urls/clear-all
```

---

# 🌐 CORS

The backend uses CORS to allow requests from the configured frontend.

The frontend URL is configured through:

```env
FRONTEND_URL
```

This allows the deployed Vercel frontend to communicate with the Render API.

---

# ☁️ Deployment

The backend is deployed using **Render**.

Production API:

[URL Shortener Backend API](https://url-shortener-backend-3vot.onrender.com/?utm_source=chatgpt.com)

The database is hosted using **MongoDB Atlas**.

---

# 🔐 Security Considerations

This is an educational portfolio project.

For a production URL-shortening service, additional security features should be implemented:

- Rate limiting
- Authentication
- API authorization
- Abuse prevention
- Malware/phishing URL detection
- Request validation
- API monitoring
- Logging
- HTTPS
- Database backups
- URL expiration
- Bot protection

---

# 🔮 Future Improvements

Possible backend improvements:

- 👤 User authentication
- 🔐 Private URLs
- ⏰ URL expiration
- 🏷️ Custom aliases
- 📊 Advanced analytics
- 🌍 Geographic click tracking
- 📅 Click analytics by date
- ⚡ Redis caching
- 🚦 Rate limiting
- 🛡️ Malicious URL detection
- 📈 Analytics API
- 🔔 API monitoring
- 🌐 Custom domains

---

# 🎯 Learning Objectives

This project provided hands-on experience with:

- Node.js
- Express.js
- REST API development
- MongoDB
- Mongoose
- CRUD operations
- Database schemas
- HTTP methods
- URL validation
- Dynamic routing
- HTTP redirects
- Click tracking
- Error handling
- CORS
- Environment variables
- Git
- GitHub
- Render deployment
- MongoDB Atlas

---

# 👨‍💻 Author

**Shaik Mobin**

Full-Stack Developer

GitHub:

`https://github.com/Mobin977`

LinkedIn:

`https://www.linkedin.com/in/mobin-shaik-65900541/`

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project was created for educational and portfolio purposes.
