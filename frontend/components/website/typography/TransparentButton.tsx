import Link from 'next/link';
import React from 'react';

interface TransparentButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const TransparentButton: React.FC<TransparentButtonProps> = ({
  children,
  href,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'px-4 py-4 text-center border border-[var(--color-input-border)] font-medium rounded hover:bg-[var(--color-hover-surface)] hover:text-black disabled:bg-[var(--color-input-fill-disabled)] disabled:cursor-not-allowed transition-colors';

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
      className={`${baseClasses} ${className} bg-transparent text-white`}
    >
      {children}
    </button>
  );
};

export default TransparentButton;