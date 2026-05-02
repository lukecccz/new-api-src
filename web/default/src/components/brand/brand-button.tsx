import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface BrandButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function BrandButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BrandButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

  const sizes = {
    sm: 'h-8 px-4 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-7 text-base',
  }

  const variants = {
    primary:
      'text-white shadow-md shadow-orange-200/40 hover:opacity-90',
    outline:
      'border border-[#F3D7B5] bg-white/80 text-[#111827] hover:border-[#FF6A00]/40 hover:bg-orange-50/60',
    ghost: 'text-[#6B7280] hover:text-[#111827] hover:bg-orange-50/40',
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      style={
        variant === 'primary'
          ? { background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  )
}
