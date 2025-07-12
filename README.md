# Ground Up Challenge

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)
- (Optional) Docker for running backend dependencies

---

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` (if provided) or create a `.env` file with the following variables:
     ```env
    POSTGRES_DB=your-postgre-db
    POSTGRES_USER=your-postgre-user
    POSTGRES_PASSWORD=your-postgre-password
    POSTGRES_PORT=your-postgre-port
    POSTGRES_HOST=your-postgre-host
    SECRET_SHIFT=your-secret-shift // number
    API_KEY=your-api-key
    DB_CA_PATH=your-ca-path // for production
     ```
   - Adjust values as needed for your environment.

4. **Run database migrations and seeders (if using Sequelize):**
   ```bash
   npm run migrate
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   - The backend will typically run on `http://localhost:3000` (check your config).

---

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the `frontend` directory with the following variables:
     ```env
    API_HOST=
    API_KEY=
    NEXT_PUBLIC_NEW_ALERT_MINUTES=
    ACCESS_KEY_ID=
    SECRET_ACCESS_KEY=
    REGION=
    S3_BUCKET=
     ```
   - Adjust values as needed. `API_HOST` should point to your backend server.

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   - The frontend will run on `http://localhost:3000` by default.

---

## Connecting Frontend and Backend

- The frontend proxies API requests to the backend using the `API_HOST` environment variable.
- Ensure both servers are running and that CORS is configured on the backend if accessing from a different origin.
- Audio files and other assets are fetched from S3 using credentials set in the backend `.env`.

---

## Common Commands

- **Backend:**
  - `npm run dev` — Start backend in development mode
  - `npm run migrate` — Run DB migrations
  - `npm run seed` — Seed the database

- **Frontend:**
  - `npm run dev` — Start frontend in development mode

---

## Troubleshooting
- Ensure all environment variables are set correctly.
- Check backend logs for API errors.
- If S3 audio is not loading, verify AWS credentials and bucket permissions.
- For CORS issues, update backend CORS settings to allow requests from the frontend origin.

---

## Project Structure
- `backend/` — Node.js/Express API, database, and S3 integration
- `frontend/` — Next.js app with Tailwind CSS

---

## License
MIT (or specify your license)