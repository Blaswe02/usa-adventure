import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-red-700 hover:bg-red-600 text-white border-2 border-red-500",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border-2 border-slate-500",
    danger: "bg-red-900 hover:bg-red-800 text-red-100 border-2 border-red-700"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
