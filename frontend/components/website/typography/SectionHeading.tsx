interface SectionHeadingProps {
  title: string;
  secondaryTitle?: string;
  description: string;
  align?: "left" | "center" | "right";
}

const SectionHeading = ({
  title,
  secondaryTitle,
  description,
  align = "center",
}: SectionHeadingProps) => {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "left"
        ? "text-left"
        : "text-right";

  return (
    <div className={`mx-auto ${alignClass}`}>
      <h1 className={`section-title font-bold text-text-section-title`}>
        {title}
      </h1>
      <p className={`section-subtitle text-placeholder-text`}>{description}</p>
    </div>
  );
};

export default SectionHeading;
