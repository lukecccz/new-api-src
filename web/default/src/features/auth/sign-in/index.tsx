import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { t } = useTranslation()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-2xl font-bold tracking-tight text-[#111827] sm:text-left'>
            {t('欢迎登录')}
          </h2>
          {!status?.self_use_mode_enabled && (
            <p className='text-left text-sm text-[#6B7280] sm:text-base'>
              {t("还没有账户？")}{' '}
              <Link
                to='/sign-up'
                className='font-semibold text-[#FF6A00] underline underline-offset-4 hover:opacity-80'
              >
                {t('免费注册')}
              </Link>
              .
            </p>
          )}
        </div>

        <UserAuthForm redirectTo={redirect} />

        <TermsFooter
          variant='sign-in'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}
