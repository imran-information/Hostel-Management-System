import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    to,
    onClick,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    isOutlet = false,
    outletProps = {},
    ...props
}) => {
    const navigate = useNavigate();

    // Base button classes
    const baseClasses = `
    font-oswald
    rounded-xl font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-70 disabled:cursor-not-allowed
    flex items-center justify-center
    relative overflow-hidden
    transform hover:scale-[1.02] active:scale-[0.98]
    shadow-sm hover:shadow-md
  `;

    // Variant classes
    const variantClasses = {
        primary: `
      bg-gradient-to-r from-indigo-600 to-indigo-500 text-white
      hover:from-indigo-700 hover:to-indigo-600
      focus:ring-indigo-500
      shadow-indigo-200
    `,
        secondary: `
       text-white border-2 border-indigo-200
      hover:bg-indigo-600 hover:border-indigo-600
      focus:ring-indigo-300
    `,
        ghost: `
      text-indigo-600 hover:bg-indigo-50
      focus:ring-indigo-300
    `,
        danger: `
      bg-gradient-to-r from-red-600 to-red-500 text-white
      hover:from-red-700 hover:to-red-600
      focus:ring-red-300
    `,
        outline: `
    text-indigo-600 border-2 border-indigo-600
    hover:bg-indigo-600 hover:text-white
    mb-0
  `
    };

    // Size classes
    const sizeClasses = {
        small: 'px-4 py-1 text-sm',
        medium: 'px-6 py-2 text-base',
        large: 'px-8 py-3 text-lg'
    };

    // Combine all classes
    const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
    ${loading ? 'cursor-wait' : ''}
  `;

    // Click handler
    const handleClick = (e) => {
        if (onClick) onClick(e);
    };

    // Outlet button handler
    if (isOutlet) {
        return (
            <Link
                to={to || '#'}
                className={`${combinedClasses} inline-flex`}
                {...props}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(to, outletProps);
                }}
            >
                {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
                {children}
                {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
            </Link>
        );
    }

    // Regular link button
    if (to) {
        return (
            <Link
                to={to}
                className={`${combinedClasses} inline-flex`}
                {...props}
            >
                {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
                {children}
                {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
            </Link>
        );
    }

    // Regular button
    return (
        <button
            className={combinedClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {/* Loading spinner */}
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}

            {/* Button content */}
            <span className={`flex items-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
                {children}
                {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
            </span>
        </button>
    );
};

export default Button;

