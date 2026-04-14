import React from "react";

type ProgressBarProps = {
  value: number;
  height?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  color?: string;
};

const clamp = (v: number) => Math.max(0, Math.min(100, v));

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 18,
  className = "",
  barClassName = "",
  showLabel = false,
  color = "#D4A017",
}) => {
  const pct = clamp(Math.round(value));

  return (
    <div
      className={`w-full ${className}`}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}>
      <div
        className='w-full bg-[#EDE8DC] rounded-full overflow-hidden'
        style={{ height }}
        role='progressbar'
        aria-label='Progress'>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
          style={{
            width: `${pct}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {showLabel && (
        <div className='mt-2 text-sm text-right text-gray-500'>{pct}%</div>
      )}
    </div>
  );
};

export default ProgressBar;
