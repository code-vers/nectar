interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  cardClassName?: string;
  iconWrapperClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const StatCard = ({
  icon,
  value,
  title,
  subtitle,
  footer,
  cardClassName,
  iconWrapperClassName,
  valueClassName,
  titleClassName,
  subtitleClassName,
}: StatCardProps) => {
  return (
    <div
      className={`flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md ${cardClassName ?? ""}`.trim()}>
      <div
        className={`bg-[#F0D080] p-2 rounded-sm w-10 h-10 flex items-center justify-center text-white text-2xl ${iconWrapperClassName ?? ""}`.trim()}>
        {icon}
      </div>
      <div>
        <div className={`${valueClassName ?? "text-4xl font-bold"}`}>
          {value}
        </div>
        <div className={`${titleClassName ?? "text-sm"}`}>{title}</div>
        {subtitle ? (
          <div className={`${subtitleClassName ?? "text-xs text-[#6B7280]"}`}>
            {subtitle}
          </div>
        ) : null}
        {footer ? <div className='mt-2'>{footer}</div> : null}
      </div>
    </div>
  );
};

export default StatCard;
