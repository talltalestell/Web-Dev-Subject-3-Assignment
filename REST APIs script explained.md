# 📘 Detailed Explanation of `script.js`

This document explains the purpose and functionality of each function and key section in the script file.

---

## 1. Constants and DOM Element References
```js
// Lesson 05 - Upload Avatar and Edit Address
const BASE_API_URL = 'https://mx.velodata.org/api/v2';

const fetchForm = document.getElementById('fetch-user-form');
const userIdInput = document.getElementById('user-id');
const avatarImg = document.getElementById('profile-image');
const fileInput = document.getElementById('image-input');
const startUploadBtn = document.getElementById('start-upload-btn');
const confirmBtn = document.getElementById('confirm-upload-btn');
const cancelBtn = document.getElementById('cancel-upload-btn');
const addressForm = document.getElementById('update-address-form');
const editAddressBtn = document.getElementById('edit-address-btn');
const cancelAddressBtn = document.getElementById('cancel-edit-btn');
const saveAddressBtn = document.getElementById('save-address-btn');
const messageBox = document.getElementById('response-message');

let currentUserId = null;
let originalAddressData = {};
let selectedFile = null;
```
**Explanation**:
Defines constants for API base URL and selects all required DOM elements for interaction. Also initializes key variables.

---

## 2. Address Fields Object
```js
const addressFields = {
  address_1: document.getElementById('address_1'),
  address_2: document.getElementById('address_2'),
  address_3: document.getElementById('address_3'),
  city: document.getElementById('city'),
  state: document.getElementById('state'),
  postcode: document.getElementById('postcode'),
};
```
**Explanation**:
Maps each address input field to a key in an object for easy iteration and data manipulation.

---

## 3. toggleAddressInputs(disabled)
```js
function toggleAddressInputs(disabled) {
  Object.values(addressFields).forEach(field => field.disabled = disabled);
}
```
**Explanation**:
Disables or enables all address fields based on the boolean `disabled`.

---

## 4. fillAddressFields(data)
```js
function fillAddressFields(data) {
  for (let key in addressFields) {
    addressFields[key].value = data[key] || '';
  }
}
```
**Explanation**:
Fills in the address input fields with data from a user object.

---

## 5. captureAddressData()
```js
function captureAddressData() {
  const result = {};
  for (let key in addressFields) {
    result[key] = addressFields[key].value;
  }
  return result;
}
```
**Explanation**:
Gathers current input values from the form into a single object.

---

## 6. Fetch User Info (Form Submission)
```js
fetchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = userIdInput.value.trim();
  if (!userId) return;

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${userId}?_=${Date.now()}`);
    if (!res.ok) throw new Error('User not found');
    const { data } = await res.json();

    currentUserId = data.id;
    const attrs = data.attributes;

    avatarImg.src = attrs.profile_image || 'https://via.placeholder.com/100x100?text=No+Image';
    fillAddressFields(attrs);
    originalAddressData = { ...attrs };

    toggleAddressInputs(true);
    addressForm.classList.remove('d-none');
    startUploadBtn.classList.remove('d-none');
    editAddressBtn.classList.remove('d-none');
    messageBox.innerHTML = '';
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    addressForm.classList.add('d-none');
    startUploadBtn.classList.add('d-none');
    editAddressBtn.classList.add('d-none');
  }
});
```
**Explanation**:
Fetches user data by ID and updates the UI with avatar and address info if found. Handles error if user not found.

---

## 7. Start Upload (Trigger File Picker)
```js
startUploadBtn.addEventListener('click', () => {
  fileInput.click();
});
```
**Explanation**:
Triggers the file input when user clicks the upload button.

---

## 8. Handle File Selection
```js
fileInput.addEventListener('change', () => {
  selectedFile = fileInput.files[0];
  if (selectedFile) {
    avatarImg.src = URL.createObjectURL(selectedFile);
    confirmBtn.classList.remove('d-none');
    cancelBtn.classList.remove('d-none');
  }
});
```
**Explanation**:
When a file is selected, show its preview and display confirm/cancel buttons.

---

## 9. Cancel Upload
```js
cancelBtn.addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  confirmBtn.classList.add('d-none');
  cancelBtn.classList.add('d-none');
});
```
**Explanation**:
Clears selected file and hides confirm/cancel UI.

---

## 10. Confirm Upload
```js
confirmBtn.addEventListener('click', async () => {
  if (!selectedFile || !currentUserId) return;

  const formData = new FormData();
  formData.append('attachment', selectedFile);

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${currentUserId}/upload-image`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Upload failed');
    const result = await res.json();

    avatarImg.src = result.data.attributes.profile_image;
    messageBox.innerHTML = `<div class="alert alert-success">Profile image updated.</div>`;
    confirmBtn.classList.add('d-none');
    cancelBtn.classList.add('d-none');
    fileInput.value = '';
    selectedFile = null;
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});
```
**Explanation**:
Uploads selected avatar image to the server and updates the image on success.

---

## 11. Edit Address Button
```js
editAddressBtn.addEventListener('click', () => {
  toggleAddressInputs(false);
  saveAddressBtn.classList.remove('d-none');
  cancelAddressBtn.classList.remove('d-none');
  editAddressBtn.classList.add('d-none');
});
```
**Explanation**:
Enables editing mode for address fields.

---

## 12. Cancel Address Edit
```js
cancelAddressBtn.addEventListener('click', () => {
  fillAddressFields(originalAddressData);
  toggleAddressInputs(true);
  saveAddressBtn.classList.add('d-none');
  cancelAddressBtn.classList.add('d-none');
  editAddressBtn.classList.remove('d-none');
});
```
**Explanation**:
Reverts address fields to original values and exits edit mode.

---

## 13. Submit Updated Address
```js
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {};
  for (let key in addressFields) {
    payload[key] = addressFields[key].value.trim();
  }

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${currentUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Update failed');
    const result = await res.json();

    messageBox.innerHTML = `<div class="alert alert-success">Address updated for user ID ${result.user.id}</div>`;
    originalAddressData = { ...payload };
    toggleAddressInputs(true);
    cancelAddressBtn.classList.add('d-none');
    editAddressBtn.classList.remove('d-none');
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});
```
**Explanation**:
Sends updated address data to the backend API and displays a success or error message.

---

