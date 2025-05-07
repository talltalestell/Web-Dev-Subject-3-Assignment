# Full Stack Web Application Assignment (Frontend Only)

## 🚀 Overview

This assignment focuses on building a frontend web application that connects to an existing REST API backend (already provided).

## ✅ Requirements Checklist

- [x] At least 10 files (.html, .js, .css, .json)
- [x] Fetch live data from the REST API and display it
- [x] Update data via the REST API (POST, PUT)
- [x] Use `fetch()` or `axios`
- [x] Test in two browsers
- [x] Use JavaScript to update the DOM
- [x] Validate your code and test for errors
- [x] Use good data organisation and styling

## 🧭 Student Responsibility

> ⚠️ You must create the `index.html` file in the root folder of your repository.

It should serve as your home page with links to your other subpages.

---

## 📡 Available REST API Endpoints

| Method | Endpoint                            | Description                      | Request Body Required? | Example Call                                |
|--------|-------------------------------------|----------------------------------|-------------------------|---------------------------------------------|
| `GET`  | `/teach/users`                      | Get a list of all users          | ❌                      | `/teach/users`                              |
| `GET`  | `/teach/users/{id}`                 | Get a single user by ID          | ❌                      | `/teach/users/43`                           |
| `PUT`  | `/teach/users/{id}`                 | Update user address details      | ✅ JSON                 | `/teach/users/43`                           |
| `POST` | `/teach/users/{id}/upload-image`    | Upload profile image (avatar)    | ✅ FormData             | `/teach/users/43/upload-image`             |
| `GET`  | `/teach/users/{id}/audit`           | Get audit history for user       | ❌                      | `/teach/users/43/audit`                     |

### 🧪 Headers and Setup
- Use `Content-Type: application/json` for PUT requests
- Use `multipart/form-data` for file uploads

### 📦 Example PUT Request Body
```json
{
  "address_1": "123 Main St",
  "address_2": "Unit 5",
  "address_3": "Level 2",
  "city": "Melbourne",
  "state": "VIC",
  "postcode": "3000"
}
```

---

## 📁 Suggested Project Structure

```
Web Dev Subject 3 Assignment/
├── index.html
├── profile.html
├── edit.html
├── upload.html
├── data-view.html
├── todo.html
├── forms.html
├── help.html
├── legal.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── data/
│   └── sample.json
└── README.md
```

---

## 📸 Submission Instructions

- Push your files to a GitHub repository
- Share the GitHub repo URL with your trainer

---

## 💡 Tips

- Use `DOMContentLoaded` when writing scripts
- Use browser dev tools to debug
- Validate your HTML and CSS using W3C tools
- Use semantic HTML tags and organised file naming
- Stick to Bootstrap styling for consistency

Good luck — and don't forget to test your app in **at least two browsers**! ✅
