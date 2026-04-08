import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMealDetail } from "../lib/api";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Loading from "./Loading";

const MealDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [meal, setMeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetail = async () => {
      if (!id) return;

      setIsLoading(true);

      try {
        const data = await getMealDetail(id);
        setMeal(data || null);
      } catch (err) {
        console.log(err);
        setMeal(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetail();
  }, [id]);

  if (isLoading) return <Loading size="full" />;

  if (!meal)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-muted-foreground">
        Meal not found.
      </div>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing, measure: measure || "" });
    }
  }

  const youtubeId = meal.strYoutube
    ? meal.strYoutube.split("v=")[1]?.split("&")[0]
    : null;

  return (
    <>
      {/* THUMBNAIL */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-b-lg xl:rounded-lg xl:mt-4 xl:max-w-6xl mx-auto">
        <img
          src={`${meal.strMealThumb}`}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* BACK */}
        <Link
          to="/"
          className="group absolute top-4 left-4 flex items-center h-8 bg-background rounded-full shadow overflow-hidden transition-all duration-500 px-2 hover:px-3 hover:gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm text-primary whitespace-nowrap opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-200">
            Back
          </span>
        </Link>

        {/* SOURCE */}
        {meal.strSource && (
          <Link
            to={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute top-4 right-4 flex items-center h-8 bg-background rounded-full shadow overflow-hidden transition-all duration-500 px-2 hover:px-3 hover:gap-2"
          >
            <span className="text-sm text-primary whitespace-nowrap opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-200">
              Source
            </span>
            <ExternalLink className="w-4 h-4 text-primary shrink-0" />
          </Link>
        )}

        {/* content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-6 text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow">
            {meal.strMeal}
          </h1>

          <div className="flex flex-wrap gap-2 flex-wrap">
            {meal.strCategory && (
              <button
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(meal.strCategory)}`)
                }
                className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full"
              >
                {meal.strCategory}
              </button>
            )}

            {meal.strArea && (
              <button
                onClick={() =>
                  navigate(`/area/${encodeURIComponent(meal.strArea)}`)
                }
                className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full"
              >
                {meal.strArea}
              </button>
            )}

            {meal.strTags?.split(",").map((tag: string) => (
              <span
                key={tag}
                className="bg-white/20 backdrop-blur text-xs px-3 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* INGREDIENT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Ingredients</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ingredients.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:shadow-md transition"
              >
                <img
                  src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                  alt={item.ingredient}
                  className="w-10 h-10 object-contain"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.ingredient}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.measure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INSTRUCTION */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Instructions</h2>

          <div className="prose prose-sm max-w-none whitespace-pre-line leading-relaxed text-foreground/90 mb-6">
            {meal.strInstructions}
          </div>
        </div>
      </div>

      {/* VIDEO */}
      {youtubeId && (
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <h2 className="text-lg font-semibold mb-4">Video</h2>

          <div className="aspect-video rounded-xl overflow-hidden shadow">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={meal.strMeal}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MealDetailPage;
