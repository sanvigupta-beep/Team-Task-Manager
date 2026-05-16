# Team Task Manager

A full-stack team collaboration platform that lets teams create projects, manage tasks, assign members, and track progress — all with role-based access control.

## Features

- **Authentication** — Email/password signup & login, JWT-based persistent sessions, bcrypt-hashed passwords
- **Role-Based Access Control** — `admin` and `member` roles with strictly enforced permissions
- **Projects** — Create, edit, delete, search, and invite team members
- **Tasks** — Create, assign, prioritize, set due dates, filter, and search
- **Status Workflow** — `To Do -> In Progress -> Completed`
- **Dashboard** — Stats, charts (status/priority breakdowns), recent activity, overdue tracking
- **Modern UI** — Responsive, accessible, Tailwind-styled, with toasts and loading states
- **Production-ready** — Error handling, pagination, validation, async handlers, env-based config

## Tech Stack

| Layer        | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| Frontend     | React 18, Vite, React Router, Tailwind CSS, Axios, Recharts |
| State        | Context API                                                 |
| Backend      | Node.js, Express                                            |
| Database     | MongoDB (Mongoose)                                          |
| Auth         | JWT, bcryptjs                                               |
| Validation   | express-validator                                           |
| Deployment   | Railway (backend + frontend)                                |

## Project Structure

```
team-task-manager/
├── backend/      # Express API (MVC)
├── frontend/     # React + Vite app
├── README.md
└── railway.json
```

## Installation

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and a strong JWT_SECRET
npm install
npm run dev
```

The API will run on `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
cp .env.example .env
# Edit .env if your backend isn't on http://localhost:5000
npm install
npm run dev
```

The app will be live at `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)

| Variable        | Description                                           |
| --------------- | ----------------------------------------------------- |
| `PORT`          | Server port (default `5000`)                          |
| `NODE_ENV`      | `development` or `production`                         |
| `MONGO_URI`     | MongoDB Atlas connection string                       |
| `JWT_SECRET`    | Long random string used to sign tokens                |
| `JWT_EXPIRES_IN`| e.g. `7d`                                             |
| `CLIENT_URL`    | Allowed frontend origin(s), comma-separated           |

### Frontend (`frontend/.env`)

| Variable        | Description                                |
| --------------- | ------------------------------------------ |
| `VITE_API_URL`  | Full URL to backend API (e.g. `/api` path) |

## API Endpoints

### Auth

| Method | Path                 | Auth | Description                |
| ------ | -------------------- | ---- | -------------------------- |
| POST   | `/api/auth/signup`   | -    | Create account, get token  |
| POST   | `/api/auth/login`    | -    | Log in, get token          |
| GET    | `/api/auth/me`       | yes  | Current user info          |

### Projects

| Method | Path                      | Role         | Description                |
| ------ | ------------------------- | ------------ | -------------------------- |
| GET    | `/api/projects`           | any          | List (paginated, search)   |
| POST   | `/api/projects`           | admin        | Create project             |
| GET    | `/api/projects/:id`       | member of    | Project details + tasks    |
| PUT    | `/api/projects/:id`       | admin        | Update project             |
| DELETE | `/api/projects/:id`       | admin        | Delete project + tasks     |
| GET    | `/api/projects/users/all` | any          | List all users (picker)    |

### Tasks

| Method | Path                       | Role          | Description                          |
| ------ | -------------------------- | ------------- | ------------------------------------ |
| GET    | `/api/tasks`               | any           | Filter/paginate accessible tasks     |
| POST   | `/api/tasks`               | admin         | Create task                          |
| PUT    | `/api/tasks/:id`           | admin         | Edit task                            |
| DELETE | `/api/tasks/:id`           | admin         | Delete task                          |
| PATCH  | `/api/tasks/:id/status`    | admin/assignee| Change task status only              |

### Dashboard

| Method | Path                      | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/dashboard/stats`    | Totals, charts, recent items |

All authenticated requests use `Authorization: Bearer <token>`.

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Add a database user with read/write permissions.
3. Network Access -> add `0.0.0.0/0` (or your IPs).
4. Copy the connection string and place it in `MONGO_URI` (replace `<password>` and database name).

## Deployment to Railway

### Backend service

1. Create a new Railway project -> "Deploy from GitHub repo" -> select this repo.
2. Set **Root directory** to `backend`.
3. Add environment variables in the Railway dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=7d`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://<your-frontend-domain>`
4. Railway uses `npm start` automatically (defined in `railway.json`).
5. Note the public URL Railway assigns (e.g. `https://team-task-api.up.railway.app`).

### Frontend service

1. Add a **second service** in the same Railway project from the same repo.
2. Set **Root directory** to `frontend`.
3. Set environment variables:
   - `VITE_API_URL=https://<backend-domain>/api`
4. Customize build & start commands (Railway settings):
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm run preview -- --host 0.0.0.0 --port $PORT`
5. Update the backend's `CLIENT_URL` to the frontend's Railway domain and redeploy.

## Screenshots

> Add screenshots once deployed:
>
> - `docs/screenshots/dashboard.png`
> - `docs/screenshots/projects.png`
> - `docs/screenshots/project-detail.png`
> - `docs/screenshots/tasks.png`
> - `docs/screenshots/login.png`

## Run Locally — Quickstart

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

Open `http://localhost:5173`. Sign up (the first signup can pick the `admin` role) and explore.

## Future Improvements

- Real-time updates with Socket.IO (live task changes)
- Comments and attachments on tasks
- Email notifications for assignment & due dates
- Kanban board drag-and-drop view
- Recurring tasks & subtasks
- Audit log per project
- Two-factor authentication
- Avatar uploads (S3 / Cloudinary)
- Dark mode
- Full test suite (Vitest + Supertest)

## License

MIT
