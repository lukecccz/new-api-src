import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BrandCardProps extends ComponentPropsWithoutRef<'div'> {
  hover?: boolean
}

export function BrandCard({ hover = true, className, children, ...props }: BrandCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#F3D7B5] bg-white/80 shadow-sm backdrop-blur-sm',
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface BrandStatCardProps {
  title: string
  value: ReactNode
  description?: ReactNode
  icon?: ReactNode
  accent?: boolean
  className?: string
}

export function BrandStatCard({
  title,
  value,
  description,
  icon,
  accent,
  className,
}: BrandStatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#F3D7B5] bg-white/80 p-5 shadow-sm backdrop-blur-sm',
        accent && 'border-[#FF6A00]/20 bg-gradient-to-br from-orange-50/70 to-white',
        className
      )}
    >
      <div className='flex items-start justify-between'>
        <p className='text-xs font-medium text-[#6B7280]'>{title}</p>
        {icon && (
          <div className='flex size-8 items-center justify-center rounded-lg border border-[#F3D7B5] bg-orange-50 text-[#FF6A00]'>
            {icon}
          </div>
        )}
      </div>
      <p className='mt-2 text-2xl font-bold text-[#111827]'>{value}</p>
      {description && (
        <p className='mt-1 text-xs text-[#6B7280]'>{description}</p>
      )}
    </div>
  )
}
