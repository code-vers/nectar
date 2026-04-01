import Link from 'next/link';
import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'px-4 py-2 bg-[var(--color-btn-primary-bg)] text-[var(--color-primary-btn-text)] font-medium rounded hover:bg-[var(--color-btn-primary-hover-bg)] disabled:bg-[var(--color-primary-btn-disabled)] disabled:cursor-not-allowed transition-colors';

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;