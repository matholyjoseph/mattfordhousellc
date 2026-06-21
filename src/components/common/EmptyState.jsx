import Button from "./Button";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({
  title = "No results found",
  message = "Please try adjusting your search filters or check back later.",
  icon = <FiInbox size={32} className="text-gold" />,
  actionLabel,
  actionTo
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/40 border border-gold/15 rounded-xl max-w-lg mx-auto">
      <div className="p-4 bg-cream-dark/60 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-serif font-bold text-lg text-forest-dark mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-charcoal-light max-w-sm mb-6 leading-relaxed font-sans font-light">
        {message}
      </p>
      {actionLabel && actionTo && (
        <Button to={actionTo} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
