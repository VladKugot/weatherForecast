import type React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      className="cursor-pointer px-6 py-3 rounded-xl text-sm sm:text-base
        font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600
        border border-transparent shadow-sm shadow-blue-500/20
        hover:from-blue-500 hover:to-indigo-500 hover:shadow-md
        hover:shadow-blue-500/30 focus:outline-none focus:ring-4
        focus:ring-blue-500/25 active:scale-95 disabled:opacity-50
        disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto
        min-w-35 whitespace-nowrap"
    >
      {children}
    </button>
  );
};
