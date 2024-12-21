import { useIsLoading } from "../../hooks/loading";

const Loading = () => {
  const isLoading = useIsLoading();

  return (
    isLoading && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default Loading;
