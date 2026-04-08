// MainLayout.tsx
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Content utama */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary flex items-center justify-center gap-2 border-t border-gray-200 h-10 text-center text-sm text-muted">
        <span className="font-semibold text-primary-foreground">MeaLabs</span>
        <span>·</span>
        <span>Powered by</span>
        <a
          href="https://www.themealdb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-secondary hover:underline"
        >
          TheMealDB API
        </a>
      </footer>
    </div>
  );
};

export default MainLayout;
