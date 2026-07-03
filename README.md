# Najahak-Backend

REST API for an internal dashboard that tracks client requests through a
`New -> In Progress -> Done` workflow, with JWT-based authentication.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing

## Architecture

Layered architecture, each layer with a single responsibility:

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Create your local environment file:

```bash
   cp .env.example .env
```

3. Fill in `.env`:
   - `MONGODB_URI` — your MongoDB connection string (Atlas or local)
   - `JWT_SECRET` — a long random string. Generate one with:

```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- `CLIENT_ORIGIN` — the URL of your frontend dev server (defaults to `http://localhost:5173`)

4. Start the server:

```bash
   npm run dev
```

## API Reference

All responses follow `{ success: true, data: ... }` or `{ success: false, message, details? }`.

### Auth (public)

| Method | Endpoint             | Body                  | Notes                            |
| ------ | -------------------- | --------------------- | -------------------------------- |
| POST   | `/api/auth/register` | `{ email, password }` | Password must be >= 8 characters |
| POST   | `/api/auth/login`    | `{ email, password }` | Returns `{ token, user }`        |

### Requests (require `Authorization: Bearer <token>`)

| Method | Endpoint                   | Body                                  | Notes                            |
| ------ | -------------------------- | ------------------------------------- | -------------------------------- |
| POST   | `/api/requests`            | `{ clientName, title, description? }` | Creates with status `"New"`      |
| GET    | `/api/requests`            | —                                     | Optional `?status=New` filter    |
| GET    | `/api/requests/:id`        | —                                     | 404 if not found                 |
| PATCH  | `/api/requests/:id/status` | `{ status }`                          | Only forward transitions allowed |

Status workflow: `New -> In Progress -> Done`. No skipping, no going backward.

### Health

| Method | Endpoint  | Notes                       |
| ------ | --------- | --------------------------- |
| GET    | `/health` | Uptime check, always public |

## Notes on design decisions

- Password validation happens in the service layer, before hashing — a schema-level `minlength` would validate the hash's length, not the original password.
- Login returns the same generic error for a wrong password and a nonexistent email, to avoid leaking which emails are registered.
- The status workflow is defined once in `src/constants/requestStatus.js`; both the schema `enum` and the service-layer transition check import from it.
