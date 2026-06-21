export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[250px]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="text-xs font-semibold text-forest-light mt-4 tracking-wider uppercase font-sans">
          {message}
        </p>
      )}
    </div>
  );
}
