# Containerised Chat App

## Overview

This is a full-stack, real-time chat application built with React (frontend) and Node.js/Express (backend), using WebSockets for instant messaging and JWT for secure authentication. The app is fully containerized with Docker and orchestrated using Docker Compose.

---

## Features

### Frontend (client)
- Real-time messaging with WebSocket
- User registration and login (JWT authentication)
- Modern, responsive UI (React 19, TypeScript, Zustand)
- Emoji reactions and picker
- Online users list
- Auto-scroll chat window
- Secure password handling

### Backend (server)
- WebSocket server with JWT authentication
- REST API for registration and login
- SQLite database for persistent user storage
- Bcrypt password hashing
- Broadcasts messages and user list to all clients
- CORS enabled for frontend integration

---

## Project Structure

```
contanierised-chat-app/
├── client/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── App.tsx
│   │   ├── store.ts
│   │   ├── Types.ts
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── server/         # Express backend
│   ├── src/
│   │   ├── server.ts
│   │   ├── authMiddleware.ts
│   │   ├── sqlite.ts
│   │   ├── Types.ts
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) & Docker Compose
- (For local dev) Node.js 16+ and npm

---

## Quick Start (Docker Compose)

1. Clone the repository:
	```bash
	git clone <your-repo-url>
	cd contanierised-chat-app
	```
2. Create environment files:
	- `client/.env`:
	  ```env
	  VITE_SERVER_URL=http://localhost:4000
	  VITE_WEBSOCKET_URL=ws://localhost:4000
	  ```
	- `server/.env`:
	  ```env
	  JWT_SECRET=your-secret-key-here
	  ```
3. Build and start all services:
	```bash
	docker compose up --build
	```
4. Access the app:
	- Frontend: [http://localhost:5173](http://localhost:5173)
	- Backend API: [http://localhost:4000](http://localhost:4000)

---

## Manual Development Setup

### Backend
```bash
cd server
npm install
cp .env.example .env # or create .env as above
npm run build
npm start
# or for dev: npm run dev
```

### Frontend
```bash
cd client
npm install
cp .env.example .env # or create .env as above
npm run dev
# Open http://localhost:5173
```

---

## Usage & Authentication Flow

1. **Register**: Create a new account with username and password.
2. **Login**: Authenticate to receive a JWT token.
3. **Connect**: The frontend connects to the WebSocket server using the JWT token.
4. **Chat**: Send and receive real-time messages, see online users, and react with emojis.

---

## API Endpoints

- `POST /api/register` — Register a new user
- `POST /api/login` — Authenticate and receive JWT token
- `GET /api/` — Health check

**WebSocket:**
- Connect to: `ws://localhost:4000/?token=<jwt-token>`

---

## Environment Variables

### client/.env
- `VITE_SERVER_URL` — REST API base URL (default: http://localhost:4000)
- `VITE_WEBSOCKET_URL` — WebSocket URL (default: ws://localhost:4000)

### server/.env
- `JWT_SECRET` — Secret key for JWT signing

---

## Docker & Deployment

### Build and Run (all services)
```bash
docker compose up --build
```

### Individual Service (example: client)
```bash
docker build -t chat-client ./client
docker run -p 5173:5173 chat-client
```

### Cloud Deployment
Build for your target architecture:
```bash
docker build --platform=linux/amd64 -t myapp .
docker push myregistry.com/myapp
```
See [Docker's Node.js guide](https://docs.docker.com/language/nodejs/) for more.

---

## Security Notes
- Passwords are hashed with bcrypt
- JWT tokens expire after 1 hour
- WebSocket connections require valid JWT

---

## License

ISC