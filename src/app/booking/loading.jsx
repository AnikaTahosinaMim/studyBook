export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-purple-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-purple-600 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
      </div>

      <p className="mt-6 text-lg font-semibold text-purple-600">
        Loading your bookings...
      </p>

      <p className="text-sm text-slate-500 mt-1">Please wait a moment</p>
    </div>
  );
}
