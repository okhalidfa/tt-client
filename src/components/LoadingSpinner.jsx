const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
    </div>
  ); 
};

export default LoadingSpinner;
