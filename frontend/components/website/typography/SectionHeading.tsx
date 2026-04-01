interface SectionHeadingProps {
  title: string;
  secondaryTitle?: string;
  description: string;
}

const SectionHeading = ({ title, secondaryTitle, description }: SectionHeadingProps) => {
  return (
    <div className="text-center mx-auto">
      <h1 className="section-title text-center font-bold text-text-primary">{title}</h1>
      <p className="section-subtitle text-placeholder-text">{description}</p>
      
    </div>
  );
};

export default SectionHeading;