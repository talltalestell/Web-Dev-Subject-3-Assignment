# Web Development Assignment Instructions

# BEFORE YOU BEGIN

---

## Step 1: Create a GitHub Account
- Go to [https://github.com/](https://github.com/)
- Create a **new GitHub account** if you don't already have one.
- Verify your email if GitHub asks.

---

## Step 2: Fork the Assignment Repository
- Go to the master assignment repository:
  > [https://github.com/Velodata/Web-Dev-Subject-3-Assignment](https://github.com/Velodata/Web-Dev-Subject-3-Assignment)
- Click the **Fork** button (top right).
- Fork it into **your own GitHub account**.

✅ Now you have your own copy.

---

## Step 3: Install (or Enable) GitHub Extension in VS Code (Optional but Recommended)
- Open **VS Code**.
- Go to the **Extensions panel** (`Ctrl + Shift + X`).
- Search for:
  ```
  GitHub Pull Requests
  ```
- Install or Enable it if you see it.

✅ This will make GitHub integration inside VS Code smoother.

---

## Step 4: Check and Clear Old GitHub Credentials (Important!)
- Press the **Windows** key and search for:
  ```
  Credential Manager
  ```
- Open **Credential Manager** → Select the **Windows Credentials** tab.
- Look for any saved credentials for:
  ```
  github.com
  ```
- **Remove** any GitHub-related saved credentials.

✅ This ensures your new GitHub account will be used when you push.

---

# WORKFLOW TO START YOUR PROJECT

---

## Step 1: Clone Your Forked Repository
- Stay on your **forked repo page** after forking.
- Click the green **<> Code** button.
- Copy the **HTTPS URL**.
- In **VS Code Terminal**, run:

```bash
cd path\to\your\preferred\folder
git clone [paste-your-forked-URL-here]
```

Example:

```bash
git clone https://github.com/your-username/Web-Dev-Subject-3-Assignment.git
```

✅ This copies your own GitHub fork to your computer.

---

## Step 2: Open Your Project Folder in VS Code
- Open the folder you just cloned.

---

## Step 3: Work Normally
- Edit files as needed.

---

## Step 4: Save and Push Changes
Whenever you want to save your work to GitHub:

```bash
git add .
git commit -m "Your message"
git push
```

✅ The **first time you push**, a GitHub login popup will appear.
✅ Log in using your GitHub account (the one you created).
✅ If asked for a password, use your GitHub **Personal Access Token (PAT)**.

---

# ✅ Quick Student Summary

| Step | Task |
|:---|:---|
| 1 | Create GitHub account |
| 2 | Fork the master repo |
| 3 | Install GitHub Pull Requests extension (optional) |
| 4 | Clear any old Windows Credentials |
| 5 | Clone your fork |
| 6 | Work in VS Code |
| 7 | `git add .` → `git commit -m "message"` → `git push` |

---

# Important Notes
- Always make sure you are working inside **your own forked repository**.
- Always use **HTTPS clone URLs**, not SSH.
- Always push to your forked repository before deploying to Vercel.

✅ Following these steps will avoid authentication problems and allow clean deployment.

