# 🚀 Atlas Cluster Keepalive Service

A lightweight, reliable Node.js service designed to keep your MongoDB Atlas cluster active by periodically triggering application endpoints.

---

## 📌 Overview

Cloud-hosted databases like MongoDB Atlas can experience cold starts or enter idle states when not actively used. This service solves that problem by:

- Exposing a secure `/run` endpoint  
- Reading a list of project endpoints from a configuration file (`projects.json`)  
- Triggering those endpoints on demand  
- Allowing scheduled execution via GitHub Actions (or any cron system)

This ensures your database-backed applications stay responsive and ready.

---

## ⚙️ How It Works

1. A cron job (e.g., GitHub Actions) hits the `/run` endpoint
2. The service validates the request using a secret token
3. It reads all configured endpoints from `projects.json`
4. It sends HTTP requests to each endpoint
5. Those endpoints interact with MongoDB Atlas, keeping the cluster active

---

## 🧩 Features

- 🔐 Secure endpoint with token-based authentication  
- 🔁 Retry mechanism for failed requests  
- 📄 Config-driven architecture using `projects.json`  
- ⚡ Lightweight and fast  
- ☁️ Designed for serverless and cloud deployments  
- ⏱️ Easy integration with GitHub Actions cron jobs  

---

## 📁 Project Structure

```
.
├── src/
│   ├── index.js          # Entry point
│   ├── runner.js         # Core logic to hit endpoints
│   ├── retry.js          # Retry utility
│
├── projects.json         # List of endpoints to ping
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## 🔧 Configuration

### 1. Environment Variables

Create a `.env` file:

```
PORT=3000
CRON_SECRET=your_secure_token_here
```

---

### 2. Define Target Endpoints

Create a `projects.json` file:

```
[
  {
    "name": "project-1",
    "url": "https://your-api.com/health",
    "method": "GET",
    "isActive": true
  },
  {
    "name": "project-2",
    "url": "https://another-api.com/ping",
    "method": "GET",
    "isActive": false
  }
]
```

---

## ▶️ Running Locally

```
npm install
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

## 🔐 API Usage

### Endpoint: `/run`

**Method:** `GET`

**Headers:**
```
x-cron-secret: your_secure_token_here
```

**Example using curl:**

```
curl -H "x-cron-secret: your_secure_token_here" \
http://localhost:3000/run
```

---

## ⏰ GitHub Actions Cron Setup

Example workflow:

```
name: Keep Atlas Alive

on:
  schedule:
    - cron: "*/10 * * * *" # every 10 minutes

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Call Keepalive Service
        run: |
          curl -H "x-cron-secret: ${{ secrets.CRON_SECRET }}" \
          https://your-service-url/run
```

---

## 🔁 Retry Strategy

The service includes a retry mechanism to handle transient failures when calling endpoints.

- Automatic retries on failure  
- Logs each failed attempt  
- Configurable retry count  

---

## 🛡️ Security

- All requests to `/run` must include a valid `x-cron-secret` header  
- Prevents unauthorized triggering of endpoint calls  
- Keep your secret safe using environment variables or GitHub Secrets  

---

## 🌍 Deployment

You can deploy this service on:

- Render  
- Railway  
- Vercel (serverless adaptation needed)  
- AWS / GCP / Azure  
- Any Node.js-compatible hosting platform  

---

## 💡 Use Cases

- Prevent MongoDB Atlas free-tier clusters from idling
- Maintain uptime for hobby or side projects  
- Lightweight internal DevOps utility  

---

## 📈 Future Improvements

- Dashboard / logs UI  
- Health reporting endpoint  
- Rate limiting & batching

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Open issues  
- Submit pull requests  
- Suggest improvements  

---

## 📄 License

MIT License

---

## ✨ Author

Built to solve a real-world problem of keeping cloud databases responsive with minimal infrastructure.

---

> Simple. Reliable. Always Awake.