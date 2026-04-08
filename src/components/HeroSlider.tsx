import { useEffect, useState } from "react";

/* ── Hero Slider ── */
const HeroSlider = ({ meals }: { meals: any[] }) => {
  const [current, setCurrent] = useState(0);
  const images = meals.slice(0, 8);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % images.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((meal, i) => (
        <img
          key={meal.idMeal}
          src={meal.strMealThumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
    </div>
  );
};

export default HeroSlider;
