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
      className="cursor-pointer px-8 py-2.5 rounded-xl text-base font-medium
        text-white bg-blue-700 border border-blue-700 shadow-sm
        hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
        focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed transition-all
        duration-200 w-full md:w-fit whitespace-nowrap"
    >
      {children}
    </button>
  );
};
