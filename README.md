# Full-Stack Pattern Detection System

A full-stack application that detects stock chart patterns within a given **ticker** and **date range**.
Currently supported patterns include:

* **Double Tops**
* **Triple Bottoms**
* **Head and Shoulders**

The project follows a **monorepo structure** with separate `frontend` (Next.js) and `backend` (TypeScript + Express) folders.

---

## 🚀 Features

* Detects well-known stock market patterns.
* Input: Ticker symbol, start date, end date, and pattern type.
* Visualizes stock data and detected patterns using **candlestick charts**.
* Frontend: Built with **Next.js**.
* Backend: Built with **Express + TypeScript**.
* Extensible design to add new patterns in the future.

---

## 📂 Project Structure

```
.
├── frontend   # Next.js frontend
├── backend    # Express + TypeScript backend
└── package.json
```

---

## ⚙️ Setup

Clone the repository and install dependencies for both frontend and backend.

```bash
# Install frontend dependencies
npm run frontend:setup

# Install backend dependencies
npm run backend:setup
```

---

## 🛠️ Development

Run frontend and backend in **separate terminals**:

```bash
# Start frontend in development mode
npm run frontend:dev

# Start backend in development mode
npm run backend:dev
```

---

## 📦 Build & Run

```bash
# Build frontend and backend
npm run frontend:build
npm run backend:build

# Start frontend and backend (separate terminals)
npm run frontend:start
npm run backend:start
```

---

## 🧪 Suggested Test Data

You can use the following data to test the system:

* **Double Tops**

  ```js
  {ticker: 'AMZN', fromDate: new Date('2018-08-14'), toDate: new Date('2025-10-10')}
  ```

* **Triple Bottoms**

  ```js
  {ticker: 'TSLA', fromDate: new Date('2025-03-06'), toDate: new Date('2025-05-02')}
  ```

* **Head and Shoulders**

  ```js
  {ticker: 'GDX', fromDate: new Date('2011-02-15'), toDate: new Date('2011-06-15')}
  ```

---

## 📊 Visualization

The system visualizes stock data and the detected patterns using **candlestick charts**:

* Candlestick chart shows **open, high, low, close prices** for the selected date range.
* Detected patterns are highlighted on the chart for easy identification.
* You can interact with the chart (zoom, hover for values) via the frontend interface.


---

## 📝 Notes

* Both **frontend** and **backend** must be run in **separate terminals**.
* Currently no automated tests are defined (`npm test` will exit with an error).
* Future updates will add more patterns and enhanced visualization options.
