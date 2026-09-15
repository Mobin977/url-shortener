# 🔗 URL Shortener — Full-Stack MERN Application

A production-ready **full-stack URL Shortener** built with React, TypeScript, Node.js, Express, MongoDB, and Mongoose.

The application allows users to create short URLs, redirect through generated short links, track clicks, manage URL history, and monitor URL statistics through a responsive dashboard.

## 🚀 Live Demo

### Frontend

https://url-shortener-frontend-gamma-opal.vercel.app/

### Backend API

https://url-shortener-backend-3vot.onrender.com/

---

## ✨ Features

- 🔗 Create shortened URLs
- ⚡ Generate unique 6-character short codes
- 🔄 Redirect short URLs to original URLs
- 📊 Track URL click counts
- 📈 Display total URLs and total clicks
- 🕒 Display URL creation dates
- 📋 Copy shortened URLs
- 🗑️ Delete individual URLs
- 🧹 Clear all URLs
- 🔄 Automatically refresh click statistics
- ✅ URL validation
- ❌ Error and success handling
- 📱 Responsive design
- ☁️ MongoDB persistence
- 🌐 REST API
- 🚀 Vercel frontend deployment
- 🚀 Render backend deployment

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- JavaScript
- REST API

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + TypeScript  │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                           Mongoose
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
url-shortener/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── urlController.js
│   │   ├── models/
│   │   │   └── Url.js
│   │   ├── routes/
│   │   │   └── urlRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

### 1. Create Short URL

The user enters a valid URL in the frontend.

```text
Original URL
     │
     ▼
Frontend
     │
     ▼
POST /api/urls
     │
     ▼
Express Backend
     │
     ▼
Generate Short Code
     │
     ▼
MongoDB
```

A unique 6-character short code is generated using `nanoid`.

Example:

```text
Original:
https://example.com/very-long-url

Short:
https://url-shortener-backend-3vot.onrender.com/aB91xZ
```

---

### 2. Redirect

When someone opens the shortened URL:

```text
Short URL
    │
    ▼
Backend
    │
    ▼
Find shortCode
    │
    ▼
Increment clicks
    │
    ▼
Redirect to original URL
```

---

### 3. Click Tracking

Each successful redirect increments the URL's click count.

The dashboard periodically refreshes the statistics so users can monitor link activity.

---

## 🔌 API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/`                   | API health check         |
| GET    | `/api/urls`           | Get all URLs             |
| POST   | `/api/urls`           | Create a short URL       |
| GET    | `/:shortCode`         | Redirect to original URL |
| DELETE | `/api/urls/:id`       | Delete a URL             |
| DELETE | `/api/urls/clear-all` | Delete all URLs          |

---

## 📡 Example API Request

### Create Short URL

```http
POST /api/urls
Content-Type: application/json
```

Request:

```json
{
  "originalUrl": "https://example.com"
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com",
    "shortCode": "aB91xZ",
    "clicks": 0
  }
}
```

---

## 💾 Database Model

Each URL document contains:

```text
Url
├── originalUrl
├── shortCode
├── clicks
├── createdAt
└── updatedAt
```

The `shortCode` field is unique.

---

## ⚙️ Environment Variables

### Backend

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api/urls
VITE_API_BASE_URL=http://localhost:5000
```

> Never commit `.env` files or database credentials to GitHub.

---

## 💻 Run Locally

### Clone Repository

```bash
git clone https://github.com/Mobin977/url-shortener.git
```

```bash
cd url-shortener
```

### Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧪 Production Build

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm start
```

---

## 🌐 Deployment

### Frontend

The React frontend is deployed using **Vercel**.

```text
https://url-shortener-frontend-gamma-opal.vercel.app/
```

### Backend

The Express API is deployed using **Render**.

```text
https://url-shortener-backend-3vot.onrender.com/
```

### Database

MongoDB Atlas is used for cloud database persistence.

---

## 🔐 Security Considerations

- Environment variables are excluded from Git
- MongoDB credentials are not committed
- URLs are validated before storage
- Only HTTP and HTTPS URLs are accepted
- Unique short codes are generated
- CORS is configured for frontend communication
- Database operations are handled through Mongoose

---

## 📸 Screenshots

Screenshots can be added here:

```text
screenshots/
├── dashboard.png
├── create-url.png
├── url-history.png
└── statistics.png
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

## 📚 What I Learned

This project helped strengthen practical full-stack development skills including:

- React component development
- TypeScript
- REST API development
- Express.js
- MongoDB
- Mongoose
- API integration
- URL validation
- Unique identifier generation
- CRUD operations
- Click tracking
- Environment variables
- CORS
- Error handling
- Git and GitHub
- Vercel deployment
- Render deployment
- Full-stack project architecture

---

## 🚀 Future Improvements

- 🔐 User authentication
- 👤 Personal URL dashboards
- 📊 Advanced analytics
- 📅 Click analytics by date
- 🌍 Geographic analytics
- 📱 QR code generation
- ⏳ URL expiration
- 🔒 Password-protected URLs
- 📈 Charts and visualizations
- 🔎 Search and filtering
- 🌐 Custom domains
- 🧪 Automated testing

---

## 👨‍💻 Author

**Mobin**

GitHub:
https://github.com/Mobin977

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available for educational and portfolio purposes.
