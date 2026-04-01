interface SectionHeadingProps {
  title: string;
  secondaryTitle?: string;
  description: string;
}

const SectionHeading = ({ title, secondaryTitle, description }: SectionHeadingProps) => {
  return (
    <div>
      <h1 className="secondary-title text-text-primary">{title}</h1>
      <p className="section-subtitle text-placeholder-text">{secondaryTitle}</p>
      
    </div>
  );
};

export default SectionHeading;