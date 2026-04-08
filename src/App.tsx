import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import MealDetailPage from "./pages/MealDetailPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/category/:value" element={<Index />} />
        <Route path="/area/:value" element={<Index />} />
        <Route path="/ingredient/:value" element={<Index />} />
        <Route path="/search/:value" element={<Index />} />
        <Route path="/meal/:id" element={<MealDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
