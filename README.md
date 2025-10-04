# 🎬 EZTechMovie Cart App  

A feature-rich movie and shopping web app that combines movie discovery, a personalized Streamlist (watchlist), subscriptions, and accessory shopping — all in one sleek interface. Built with React and Vite.

---

## 👩‍💻 Team Members  
- **Alyssa Saez**  
- **Weston Sadler**  
- **Jayme Yereance**

---

## 🎓 Instructor  
- **Joseph Issa**  
- **Course:** INT499 – Capstone in Information Technology  

---

## 🚀 Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/AlyssaSaez/EZTechMovie.git
cd EZTechMovie
```

### 2. Install Dependencies  
```bash
npm install
```

### 3. Set Up Environment Variables  
Create a `.env` file in the project root and add:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> ⚠️ **Important:** Never include your actual API key in public repositories.

### 4. Run the Development Server  
```bash
npm run dev
```

### 5. Open in Browser  
```
http://localhost:5173
```

---

## ✨ Features  

### 🎥 Movies & Streamlist  
- Browse trending and popular movies via the **TMDB API**  
- Add movies to your **Streamlist (watchlist)**  
- Mark movies as watched, edit titles, or remove them  
- View a count of remaining unwatched movies  
- Dynamic movie rating display and clean poster layout  

### 🛒 Cart System  
- Add or remove items from the cart  
- Adjust quantity (**accessories only**)  
- Automatically calculates subtotal, tax, and total  
- Persistent storage using **LocalStorage**  
- “Clear Cart” option  

### 💡 Subscriptions  
- Only **one subscription** can be active at a time  
- Active plan displays “Subscription in Cart”  

### 🧢 Accessories  
- Add multiple accessory items  
- Increment/decrement quantities  
- “In Cart (n)” pill updates live  

### 🧭 Navigation  
- Intuitive navbar with links to **Home, Movies, Streamlist, Subscriptions, Accessories, Cart**  
- **Cart badge** shows live item count  
- Sign-in and sign-out functionality with **OAuth**

### 🖼 Home Page  
- Interactive dashboard with quick links to major sections  
- Trending movies carousel with arrow navigation  
- Clean, responsive card layout  

### 🦶 Footer  
- Includes team credits and project acknowledgment  

---

## 🛠 Tech Stack  
- **React 18** (Vite)  
- **React Router DOM**  
- **Context API + useReducer** (for global state management)  
- **LocalStorage** (for persistence)  
- **Custom CSS** (for consistent design and accessibility)  
- **TMDB API** (for movie data)

---

## ⚠️ Notes  
- Do **not** commit your `.env` file.  
- If a key was previously exposed, rotate it and update your local `.env`.  
- This project is for **educational purposes** only and not for commercial deployment.  

---

## ❤️ Acknowledgments  
Movie data powered by [The Movie Database (TMDB)](https://www.themoviedb.org/).
