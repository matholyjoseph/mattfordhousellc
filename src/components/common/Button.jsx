import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, outline, text
  size = "md", // sm, md, lg
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-sans font-semibold tracking-wide rounded transition-luxury focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-forest hover:bg-forest-light text-cream shadow-md hover:shadow-lg hover:shadow-forest/15",
    secondary: "bg-gold hover:bg-gold-light text-forest-dark shadow-md hover:shadow-lg hover:shadow-gold/15",
    outline: "border-2 border-gold text-forest hover:bg-gold/5",
    text: "text-forest hover:text-forest-light underline underline-offset-4 decoration-gold/50 hover:decoration-gold"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
