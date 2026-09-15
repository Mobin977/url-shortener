# 🔗 URL Shortener — Frontend

A modern and responsive **URL Shortener frontend** built with **React, TypeScript, and Vite**.

The application provides a clean interface for creating and managing shortened URLs while communicating with a separate Node.js/Express REST API.

---

## 🚀 Live Demo

[URL Shortener Frontend — Live Demo](https://url-shortener-frontend-gamma-opal.vercel.app/?utm_source=chatgpt.com)

---

## 💻 Backend API

The frontend communicates with a separate backend API:

[URL Shortener Backend API](https://url-shortener-backend-3vot.onrender.com/?utm_source=chatgpt.com)

---

## ✨ Features

- 🔗 Create shortened URLs
- ✅ URL validation
- 📋 Copy shortened URLs
- 📊 Total URL count
- 👆 Total click count
- 📈 Individual click tracking
- 🕒 URL creation date and time
- 📜 URL history
- 🗑️ Delete individual URLs
- 🧹 Clear all URLs
- 🔄 Automatic click-count refresh
- ⌨️ Press Enter to shorten URLs
- ⚠️ Error handling
- ✅ Success notifications
- ⏳ Loading states
- 📱 Responsive design
- 🌐 REST API integration

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Fetch API

### Backend Integration

- Node.js
- Express.js
- REST API
- MongoDB

### Deployment

- Vercel

---

## 🏗️ Frontend Architecture

```text
                    User
                     │
                     ▼
          ┌────────────────────┐
          │ React + TypeScript │
          │     Frontend       │
          └─────────┬──────────┘
                    │
                    │ HTTP / REST API
                    ▼
          ┌────────────────────┐
          │  Express Backend   │
          │      Render        │
          └─────────┬──────────┘
                    │
                    ▼
             MongoDB Atlas
```

---

## 📁 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 🔌 API Integration

The frontend uses the native JavaScript **Fetch API** to communicate with the backend.

### Create Short URL

```http
POST /api/urls
```

Request:

```json
{
  "originalUrl": "https://www.example.com"
}
```

---

### Get All URLs

```http
GET /api/urls
```

---

### Delete URL

```http
DELETE /api/urls/:id
```

---

### Clear All URLs

```http
DELETE /api/urls/clear-all
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/urls

VITE_API_BASE_URL=http://localhost:5000
```

For the deployed backend:

```env
VITE_API_URL=https://url-shortener-backend-3vot.onrender.com/api/urls

VITE_API_BASE_URL=https://url-shortener-backend-3vot.onrender.com
```

### ⚠️ Important

Do not commit `.env` files to GitHub.

The project `.gitignore` includes:

```text
.env
.env.local
```

---

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/Mobin977/url-shortener-frontend.git
```

Navigate into the project:

```bash
cd url-shortener-frontend
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📊 Dashboard

The frontend displays two main statistics:

```text
┌────────────────────┐
│     Total URLs     │
│         5          │
└────────────────────┘

┌────────────────────┐
│    Total Clicks    │
│        25          │
└────────────────────┘
```

---

## 🔗 URL Creation Flow

```text
User enters URL
       │
       ▼
Frontend validation
       │
       ▼
POST request
       │
       ▼
Backend API
       │
       ▼
Short URL generated
       │
       ▼
Response returned
       │
       ▼
Frontend displays result
```

---

## 📋 URL Management

Each URL card displays:

- Original URL
- Short URL
- Click count
- Creation date
- Copy button
- Delete button

The application also provides a **Clear All** option for removing all stored URLs.

---

## 🔄 Automatic Updates

The frontend periodically requests the latest URL information from the backend.

This allows click statistics to update automatically after users open shortened URLs.

---

## 📱 Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The layout automatically adapts to smaller screen sizes.

---

## 🎨 UI Features

The interface includes:

- Modern card-based layout
- Responsive statistics cards
- URL input section
- Short URL result section
- URL history section
- Success notifications
- Error notifications
- Confirmation dialogs
- Responsive buttons

---

## 🧪 Validation

The frontend validates URLs before sending them to the backend.

Accepted protocols:

```text
http://
https://
```

Examples:

```text
https://google.com
https://github.com
https://react.dev
```

Invalid examples:

```text
google
github
hello
12345
```

---

## 🚀 Deployment

The frontend is deployed using **Vercel**.

Production URL:

[https://url-shortener-frontend-gamma-opal.vercel.app/](https://url-shortener-frontend-gamma-opal.vercel.app/?utm_source=chatgpt.com)

---

## 📸 Screenshots

Add your screenshots here after taking them from the deployed application.

Recommended structure:

```text
screenshots/
├── dashboard.png
├── short-url.png
├── url-history.png
└── statistics.png
```

Then add:

```markdown
## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Short URL

![Short URL](screenshots/short-url.png)

### URL History

![URL History](screenshots/url-history.png)

### Statistics

![Statistics](screenshots/statistics.png)
```

---

## 🎯 Learning Objectives

This project helped me practice:

- React development
- TypeScript
- React state management
- React hooks
- API integration
- Fetch API
- REST APIs
- Form handling
- Client-side validation
- Error handling
- Loading states
- Responsive CSS
- Environment variables
- Git and GitHub
- Vercel deployment

---

## 🔮 Future Improvements

Planned frontend improvements:

- 📈 Analytics charts
- 📊 Detailed click analytics
- 🔐 Authentication UI
- 👤 User dashboard
- 📱 QR code generation
- 🌙 Dark mode
- 🔍 Advanced URL search
- 🏷️ Custom URL aliases
- ⏰ URL expiration settings

---

## 👨‍💻 Author

**Shaik Mobin**

Full-Stack Developer

GitHub:

`https://github.com/Mobin977`

LinkedIn:

`https://www.linkedin.com/in/mobin-shaik-65900541/`

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project was created for educational and portfolio purposes.
