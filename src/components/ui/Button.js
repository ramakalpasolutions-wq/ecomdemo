'use client'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false,
  type = 'button'
}) {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-[#d87f3f] hover:bg-[#c46f2f] text-white disabled:bg-gray-300',
    secondary: 'bg-white hover:bg-gray-50 text-[#2d3e5f] border-2 border-[#2d3e5f] hover:bg-[#2d3e5f] hover:text-white disabled:bg-gray-100',
    outline: 'bg-transparent hover:bg-[#d87f3f] hover:text-white text-[#d87f3f] border-2 border-[#d87f3f]',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
