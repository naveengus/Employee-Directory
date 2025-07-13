# Employee Directory React App

A responsive and user-friendly **Employee Directory** application built using **React**.

This is a **frontend-only project**, with no backend integration. It uses:

- `mockapiData.js` as initial dummy employee data
- `localStorage` to simulate data persistence in the browser

**Note:** Since there is no real backend or database connection, changes (add/edit/delete) are only stored **temporarily** in the browser's local storage. If you clear the cache, reload on another device, or deploy without persistent state, **the data will reset.**

---

## 🚀 Features

- ✅ View employee cards with name, email, department, and role
- 🔍 Search by first name, last name, or email
- 🎯 Filter employees by department and role
- ➕ Add new employees
- 📝 Edit existing employee data
- 🗑️ Delete employees
- 📄 Pagination (10/25/50/100 items per page)
- 💾 Data persistence using localStorage
- 🌐 Deployed on Netlify

---

## 🛠️ Tech Stack

- React (Vite)
- React Router DOM
- Bootstrap / React-Bootstrap
- LocalStorage

---

## 📁 Project Structure

src/
│
├── components/
│ ├── common/
│ │ └── topBar/
│ │ └── TopBar.jsx
│ ├── Home.jsx
│ ├── EmployeCard.jsx
│ ├── EmployeeForm.jsx
│ └── mockapiData.js
│
├── App.jsx
└── main.jsx
