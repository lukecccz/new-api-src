import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

export function PricingPreview() {
  const { t } = useTranslation()

  const plans = [
    {
      name: t('免费版'),
      price: t('¥ 0'),
      per: t('/ 月'),
      desc: t('适合个人开发者体验'),
      features: [
        t('每月 100K Token 额度'),
        t('访问 10+ 基础模型'),
        t('API Key 管理'),
        t('基础用量统计'),
      ],
      cta: t('免费注册'),
      highlight: false,
    },
    {
      name: t('专业版'),
      price: t('¥ 99'),
      per: t('/ 月'),
      desc: t('适合中小团队与商业项目'),
      features: [
        t('每月 5M Token 额度'),
        t('访问 50+ 全量模型'),
        t('多用户 & 配额管理'),
        t('高级分析 & 日志'),
        t('优先技术支持'),
      ],
      cta: t('开始试用'),
      highlight: true,
    },
    {
      name: t('企业版'),
      price: t('定制'),
      per: '',
      desc: t('适合大规模企业级部署'),
      features: [
        t('无限 Token 额度'),
        t('私有化部署支持'),
        t('SLA 服务保障'),
        t('专属客户经理'),
        t('合规 & 审计支持'),
      ],
      cta: t('联系我们'),
      highlight: false,
    },
  ]

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-5xl'>
        <AnimateInView className='mb-12 text-center'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
            {t('定价方案')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
            {t('简单透明，按需选择')}
          </h2>
          <p className='mx-auto mt-3 max-w-md text-sm text-[#6B7280]'>
            {t('从个人项目到企业级部署，总有适合你的方案')}
          </p>
        </AnimateInView>

        <div className='grid gap-5 md:grid-cols-3'>
          {plans.map((plan, i) => (
            <AnimateInView key={plan.name} delay={i * 80} animation='fade-up'>
              <div
                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlight
                    ? 'border-[#FF6A00]/30 bg-gradient-to-b from-orange-50/80 to-white shadow-lg shadow-orange-100/60'
                    : 'border-[#F3D7B5] bg-white/80 shadow-sm hover:shadow-md hover:shadow-orange-100/40'
                } backdrop-blur-sm`}
              >
                {plan.highlight && (
                  <div
                    className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold text-white shadow-sm'
                    style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }}
                  >
                    {t('最受欢迎')}
                  </div>
                )}
                <div className='mb-5'>
                  <p className='text-sm font-semibold text-[#111827]'>{plan.name}</p>
                  <div className='mt-2 flex items-end gap-1'>
                    <span className='text-3xl font-bold text-[#111827]'>
                      {plan.price}
                    </span>
                    {plan.per && (
                      <span className='mb-1 text-xs text-[#6B7280]'>{plan.per}</span>
                    )}
                  </div>
                  <p className='mt-1 text-xs text-[#6B7280]'>{plan.desc}</p>
                </div>

                <ul className='mb-6 flex-1 space-y-2.5'>
                  {plan.features.map((f) => (
                    <li key={f} className='flex items-start gap-2'>
                      <CheckCircle2 className='mt-0.5 size-3.5 shrink-0 text-[#FF6A00]' />
                      <span className='text-xs text-[#6B7280]'>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`group w-full rounded-xl text-sm font-medium ${
                    plan.highlight
                      ? 'shadow-md shadow-orange-200/40'
                      : 'border border-[#F3D7B5] bg-white hover:bg-orange-50/60 hover:border-[#FF6A00]/30'
                  }`}
                  style={
                    plan.highlight
                      ? { background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }
                      : undefined
                  }
                  variant={plan.highlight ? 'default' : 'outline'}
                  asChild
                >
                  <Link to='/sign-up'>
                    {plan.cta}
                    <ArrowRight className='ml-1.5 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                  </Link>
                </Button>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView className='mt-8 text-center' animation='fade-up' delay={300}>
          <Link
            to='/pricing'
            className='text-sm font-medium text-[#FF6A00] hover:underline'
          >
            {t('查看完整定价详情')} →
          </Link>
        </AnimateInView>
      </div>
    </section>
  )
}
