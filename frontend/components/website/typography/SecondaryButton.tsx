import Link from 'next/link';
import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  href,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'px-4 py-2 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] border border-[var(--color-input-border)] font-medium rounded hover:bg-[var(--color-hover-surface)] disabled:bg-[var(--color-input-fill-disabled)] disabled:cursor-not-allowed transition-colors';

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

export default SecondaryButton;