# MeaLabs – React + Vite Meal Explorer
A responsive web application built with **React** and **Vite** to explore meals from around the world using [TheMealDB API](https://www.themealdb.com/). Users can browse popular meals and search by name with an interactive hero section.

---

## Features
* **Hero slider** displaying popular meals
* **Search functionality** with live navigation
* **Filter by category, area, or ingredient**
* **Responsive layout** optimized for all screen sizes
* **Loading & empty states** with icons

---

## Tech Stack
* **React** – UI library
* **Vite** – Development & build tool
* **TypeScript** – Type safety
* **TailwindCSS** – Utility-first styling
* **Lucide Icons** – Icon components
* **React Router** – Routing
* **TheMealDB API** – Meal data

---

## Getting Started

### Prerequisites
* Node.js >= 18
* npm or yarn

### Installation
```bash
git clone https://github.com/your-username/mealabs.git
cd mealabs
npm install
```

### Running the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app. Hot Module Replacement (HMR) is enabled by default.

### Building for Production
```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Project Structure
```
src/
├─ components/      # HeroSlider, FilterDropdown, Loading, MealCard
├─ lib/             # API utilities (TheMealDB integration)
├─ pages/           # Page components
├─ App.tsx          # Application entry
└─ main.tsx         # React DOM render
```

---

## Custom Behaviors
* **Hero slider**
  Automatically cycles through popular meals with smooth transitions.

* **Meal Card**
  Card for search & filter results, displaying the meal image and title clearly.

* **Search and filters**
  Users can search meals and filter by category, area, or ingredient.

* **Loading & empty states**
  Animated icons maintain layout consistency.

---

## ESLint & TypeScript
The project includes a minimal ESLint setup compatible with React.
For production, enabling TypeScript with type-aware linting is recommended.

---

## References
* [Vite + React Template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
* [TheMealDB API](https://www.themealdb.com/api.php)
* [TailwindCSS Documentation](https://tailwindcss.com/docs)
* [Lucide Icons](https://lucide.dev/)

---

## License

MIT License
