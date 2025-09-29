# EZTechMovie Cart App 🎬🛒  

The app features a shopping cart system with **subscriptions** and **accessories**, full navigation, toast notifications, and custom styling.  

---

## 👩‍💻 Team Members  
- Alyssa Saez  
- Weston Sadler  
- Jayme Yereance  

---

## 🎓 Instructor  
- Joseph Issa  
- **Course**: INT499 – Capstone in Information Technology  

---

## 🚀 Getting Started  
1. Clone the repository:  
   ```bash
   git clone https://github.com/AlyssaSaez/EZTechMovie.git
   cd EZTechMovie
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the development server:  
   ```bash
   npm run dev
   ```
4. Open the app in your browser:  
   ```
   http://localhost:5173
   ```

---

## ✨ Features  
### Cart System  
- Add/remove items  
- Adjust quantity (**accessories only**)  
- Total price calculation  
- Cart persists in **localStorage**  
- Clear cart option  

### Subscriptions  
- Only **one subscription** can be added at a time  
- **Toast warning** appears if another subscription is attempted  
- Active subscription shows **“Subscription in cart”** label  

### Accessories  
- Multiple items can be added  
- Quantity can be incremented/decremented  
- “**In cart (n)**” pill shows feedback directly on Accessories page  

### Navbar  
- Navigation links: **Home, Subscriptions, Accessories, Cart**  
- **Live cart count badge** updates as items are added/removed  

### Footer  
- Team credits  

---

## 🛠 Tech Stack  
- **React 18** with Vite  
- **React Router DOM** for navigation  
- **Context API + Reducer** for cart state management  
- **LocalStorage** for persistence  
- **Custom CSS** for layout and styling  
