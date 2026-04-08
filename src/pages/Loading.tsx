import { HandPlatter } from "lucide-react";
import { cn } from "../lib/utils";

interface LoadingProps {
  size?: "full" | "fit";
}

const Loading = ({ size = "fit" }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4",
        size === "full" ? "min-h-[calc(100vh-2.5rem)]" : "",
      )}
    >
      <div className=" p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <HandPlatter className="w-16 h-16 text-primary animate-bounce" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Loading
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Please wait while we fetch delicious recipes for you
        </p>
      </div>
    </div>
  );
};

export default Loading;
