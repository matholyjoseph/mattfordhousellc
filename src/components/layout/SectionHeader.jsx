export default function SectionHeader({ 
  title, 
  subtitle, 
  align = "center", 
  className = "" 
}) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 ${isCenter ? "text-center" : "text-left"} ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-dark font-serif mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-charcoal-light font-sans max-w-2xl text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div 
        className={`h-0.5 w-16 bg-gold mt-4 ${
          isCenter ? "mx-auto" : "mr-auto"
        }`}
      />
    </div>
  );
}
