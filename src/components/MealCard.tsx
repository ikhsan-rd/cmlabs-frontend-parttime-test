import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MealCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  index?: number;
}

const MealCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  index = 0,
}: MealCardProps) => {
  return (
    <Link
      to={`/meal/${idMeal}`}
      className="group bg-card rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 p-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
            View Recipe
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-serif text-sm font-semibold leading-tight text-card-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {strMeal}
        </h3>
      </div>
    </Link>
  );
};

export default MealCard;
