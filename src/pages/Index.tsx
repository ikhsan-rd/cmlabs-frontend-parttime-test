import { useState, useEffect } from "react";
import {
  getCategories,
  getAreas,
  getIngredients,
  searchMeals,
  filterByCategory,
  filterByArea,
  filterByIngredient,
} from "../lib/api";
import MealCard from "../components/MealCard";
import { Search, X } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import HeroSlider from "../components/HeroSlider";
import Loading from "./Loading";
import DataNotFound from "./DataNotFound";

/* ── Main Page ── */
const Index = () => {
  const { value } = useParams();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [popularMeals, setPopularMeals] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const activeFilterType = categoryFilter
    ? "category"
    : areaFilter
      ? "area"
      : ingredientFilter
        ? "ingredient"
        : null;

  const activeFilterValue =
    categoryFilter || areaFilter || ingredientFilter || "";

  // Load dropdown data once
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cat = await getCategories();
        const ar = await getAreas();
        const ing = await getIngredients();

        setCategories(cat || []);
        setAreas(ar || []);
        setIngredients(ing || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitialData();
  }, []);

  // Default popular meals
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await searchMeals("chicken");
        setPopularMeals(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPopular();
  }, []);

  // Filter & search meals
  useEffect(() => {
    const fetchMeals = async () => {
      // kalau tidak ada filter & search → skip
      if (!value && !activeSearch && !activeFilterType) return;

      setLoading(true);

      try {
        let data = [];

        if (activeSearch) {
          data = await searchMeals(activeSearch);
        } else if (categoryFilter) {
          data = await filterByCategory(categoryFilter);
        } else if (areaFilter) {
          data = await filterByArea(areaFilter);
        } else if (ingredientFilter) {
          data = await filterByIngredient(ingredientFilter);
        }

        setMeals(data || []);
      } catch (err) {
        console.log(err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [activeSearch, categoryFilter, areaFilter, ingredientFilter]);

  useEffect(() => {
    setCategoryFilter("");
    setAreaFilter("");
    setIngredientFilter("");
    setActiveSearch("");
    setSearchQuery("");

    if (!value) return;

    if (path === "category") {
      setCategoryFilter(value);
    } else if (path === "area") {
      setAreaFilter(value);
    } else if (path === "ingredient") {
      setIngredientFilter(value);
    } else if (path === "search") {
      setActiveSearch(value);
      setSearchQuery(value);
    }
  }, [value, path]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);

      setCategoryFilter("");
      setAreaFilter("");
      setIngredientFilter("");
    }
  };

  const handleFilterChange = (type: string, value: string) => {
    if (!value) {
      navigate("/");
      return;
    }

    navigate(`/${type}/${encodeURIComponent(value)}`);
  };

  const clearAll = () => {
    navigate("/");
  };

  const hasActiveFilter = !!activeFilterType || !!activeSearch;

  const displayMeals = hasActiveFilter ? meals : popularMeals;

  const title = activeSearch
    ? `Results for "${activeSearch}"`
    : activeFilterType
      ? `${activeFilterValue}`
      : "Popular Meals";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4">
        <HeroSlider meals={popularMeals || []} />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl">
            Mea<span className="text-primary text-outline">Labs</span>
          </h1>
          <p className="text-white/90 text-lg font-medium">
            Discover Delicious Recipes from Around the World
          </p>

          <form
            onSubmit={handleSearch}
            className="flex bg-background items-center bg-card rounded-full pl-5 px-4 py-2 gap-3 max-w-md mx-auto shadow-lg"
          >
            {/* <Search className="w-5 h-5 text-muted-foreground shrink-0" /> */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a meal..."
              className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="flex items-center justify-center p-1 text-primary-foreground rounded-full text-sm font-medium shrink-0 relative overflow-hidden"
            >
              <span className="block w-6 h-6 text-primary shrink-0 hover:animate-orbit">
                <Search className="w-full h-full" />
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Content */}
      <div className="px-8 py-10 space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.length > 0 && (
            <FilterDropdown
              id="category"
              label="All Categories"
              value={categoryFilter}
              options={categories.map((c) => c.strCategory)}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onChange={(v) => handleFilterChange("category", v)}
            />
          )}

          {areas.length > 0 && (
            <FilterDropdown
              id="area"
              label="All Cuisines"
              value={areaFilter}
              options={areas.map((a) => a.strArea)}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onChange={(v) => handleFilterChange("area", v)}
            />
          )}

          {ingredients.length > 0 && (
            <FilterDropdown
              id="ingredient"
              label="All Ingredients"
              value={ingredientFilter}
              options={ingredients.map((i) => i.strIngredient)}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onChange={(v) => handleFilterChange("ingredient", v)}
            />
          )}

          {hasActiveFilter && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>

        {/* Meal Grid */}
        {loading ? (
          <Loading />
        ) : displayMeals && displayMeals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
            {displayMeals.slice(0, 20).map((meal) => (
              <MealCard key={meal.idMeal} {...meal} />
            ))}
          </div>
        ) : (
          <DataNotFound data="Meals" />
        )}
      </div>
    </>
  );
};

export default Index;
