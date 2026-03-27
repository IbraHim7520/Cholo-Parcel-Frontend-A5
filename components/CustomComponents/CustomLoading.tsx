

const CustomLoading = () => {
    return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      {/* Outer Ring */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500"></div>
        
        {/* Inner Pulse Core */}
        <div className="h-10 w-10 animate-pulse rounded-full bg-blue-600/20 dark:bg-blue-500/20"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Loading Content
        </h2>
        <p className="text-sm text-slate-500 animate-pulse dark:text-slate-400">
          Please wait while we prepare your view...
        </p>
      </div>

      {/* Subtle Background Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"></div>
    </div>
    );
};

export default CustomLoading;