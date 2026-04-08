import { UtensilsCrossed } from "lucide-react";

interface DataProps {
  data: string;
}

const DataNotFound = ({ data }: DataProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className=" p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <UtensilsCrossed className="w-16 h-16 text-primary animate-bounce" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {data} Not Found
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Oops! We couldn't find any {data.toLowerCase()} matching your search.
          Please try a different keyword or explore our popular meals.
        </p>
      </div>
    </div>
  );
};

export default DataNotFound;
