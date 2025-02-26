# Chat Interface Project

## 📌 Overview
This project is a real-time chat interface built with **React.js**, designed for an interactive and dynamic messaging experience. It includes features like live message rendering, editable chat names, and a typing effect for bot responses.

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **npm** or **yarn**

### 2️⃣ Installation
Clone the repository and install dependencies:
```sh
# Clone the repository
git clone https://github.com/your-repo/chat-interface.git
cd chat-interface

# Install dependencies
npm install  # or yarn install
```

### 3️⃣ Running the App
Start the development server:
```sh
npm start  # or yarn start
```

The application will be available at **http://localhost:3000**.

## 🚀 Features
- **Live Typing Effect** for bot messages
- **Bold, Italic & Hyperlinks** correctly rendered in messages
- **Editable Chat Names**
- **React Hooks** for state management

## 📌 Usage Guide
### 🔹 Editing a Chat Name
1. Click on the chat name to edit.
2. Modify the name and press **Enter** or click outside to save.

### 🔹 Sending Messages
1. Type a message in the input box.
2. Press **Enter** to send.

### 🔹 Bot Typing Effect
The bot messages appear with a letter-by-letter typing animation for a better UX.

## 🎨 Design Decisions
### **1️⃣ React Functional Components & Hooks**
- Used `useState` for local state management.
- Used `useEffect` for side effects like handling the typing effect.

### **2️⃣ Handling Chat Name Edits**
- A function `onEditChatName` updates the chat list.
- **Issue Fix:** Ensured `onEditChatName` is always passed as a prop.

### **3️⃣ Rich Text Formatting**
- Messages with `**bold**`, `*italic*`, and `[hyperlinks](https://example.com)` are parsed correctly.
- Implemented using **Regex & React's `dangerouslySetInnerHTML`**.

## 🐞 Troubleshooting
### ❌ `onEditChatName is not a function`
- Ensure `onEditChatName` is passed as a prop.
- Log `console.log(onEditChatName)` in the child component.

## 📜 License
This project is open-source and available under the **MIT License**.

---

👨‍💻 **Contributors:** Prateek Porwal | prateekporwal456@gmail.com

