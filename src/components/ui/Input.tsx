// import { forwardRef, InputHTMLAttributes } from 'react'

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string
//   error?: string
//   fullWidth?: boolean
// }

// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ label, error, fullWidth = true, className = '', id, ...props }, ref) => {
//     const inputId = id || label?.toLowerCase().replace(/\s/g, '-')
    
//     return (
//       <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
//         {label && (
//           <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
//             {label}
//           </label>
//         )}
//         <input
//           ref={ref}
//           id={inputId}
//           className={`px-4 py-2.5 border rounded-lg outline-none transition-all duration-200
//             ${error ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-primary focus:border-primary'}
//             focus:ring-2 bg-white w-full`}
//           {...props}
//         />
//         {error && <p className="mt-1 text-sm text-error">{error}</p>}
//       </div>
//     )
//   }
// )

// Input.displayName = 'Input'

import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`px-4 py-2.5 border rounded-lg outline-none transition-all duration-200
            ${error ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-primary focus:border-primary'}
            focus:ring-2 bg-white w-full`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'