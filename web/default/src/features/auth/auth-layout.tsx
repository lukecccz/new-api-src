import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div
      className='relative grid min-h-svh'
      style={{ background: 'linear-gradient(160deg, #FFF7E6 0%, #FFFBF2 60%, #FFF3DC 100%)' }}
    >
      {/* Warm background glows */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 overflow-hidden'
      >
        <div
          className='absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30'
          style={{
            background: 'radial-gradient(circle, #FFB000 0%, transparent 70%)',
          }}
        />
        <div
          className='absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-20'
          style={{
            background: 'radial-gradient(circle, #FF6A00 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Logo top-left */}
      <Link
        to='/'
        className='absolute top-6 left-6 z-10 flex items-center gap-2.5 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative flex size-9 items-center justify-center overflow-hidden rounded-xl border border-[#F3D7B5] bg-white/90 shadow-sm'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-xl' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-6 w-6 rounded-lg object-contain'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-5 w-28' />
        ) : (
          <span className='text-sm font-semibold text-[#111827]'>
            {systemName || t('AI Gateway Console')}
          </span>
        )}
      </Link>

      {/* Card */}
      <div className='container flex items-center justify-center pt-20 sm:pt-0'>
        <div className='w-full rounded-3xl border border-[#F3D7B5] bg-white/85 px-8 py-10 shadow-xl shadow-orange-100/40 backdrop-blur-sm sm:w-[480px] sm:px-10 sm:py-12'>
          {children}
        </div>
      </div>
    </div>
  )
}
