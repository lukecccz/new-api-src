import { BarChart3, Key, Zap, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function ConsolePreview() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <BarChart3 className='size-4' />,
      title: t('实时数据看板'),
      desc: t('请求量、Token 消耗、费用统计一屏览尽'),
    },
    {
      icon: <Key className='size-4' />,
      title: t('API Key 管理'),
      desc: t('精细化配额控制，独立限速，一键失效'),
    },
    {
      icon: <Zap className='size-4' />,
      title: t('渠道健康监控'),
      desc: t('自动检测渠道可用性，智能故障转移'),
    },
    {
      icon: <Shield className='size-4' />,
      title: t('用量审计日志'),
      desc: t('完整请求日志，追踪每一次 AI 调用'),
    },
  ]

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
          {/* Left text */}
          <AnimateInView animation='fade-right'>
            <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
              {t('控制台预览')}
            </p>
            <h2 className='text-2xl font-bold leading-tight tracking-tight text-[#111827] md:text-3xl'>
              {t('一个控制台，')}
              <br />
              {t('掌控所有 AI 服务')}
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-[#6B7280]'>
              {t(
                'Routeon 提供完整的 SaaS 级管理界面，从渠道配置到用量分析，所有功能触手可及。'
              )}
            </p>

            <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {features.map((f) => (
                <div
                  key={f.title}
                  className='flex gap-3 rounded-xl border border-[#F3D7B5] bg-white/70 p-4 backdrop-blur-sm'
                >
                  <div className='mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#F3D7B5] bg-orange-50 text-[#FF6A00]'>
                    {f.icon}
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-[#111827]'>{f.title}</p>
                    <p className='mt-0.5 text-xs leading-relaxed text-[#6B7280]'>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateInView>

          {/* Right mockup */}
          <AnimateInView animation='fade-left' delay={150}>
            <div className='relative overflow-hidden rounded-2xl border border-[#F3D7B5] bg-white/90 shadow-xl shadow-orange-100/40 backdrop-blur-sm'>
              {/* Browser chrome */}
              <div className='flex items-center gap-1.5 border-b border-[#F3D7B5] bg-[#FFFBF2] px-4 py-3'>
                <div className='size-2.5 rounded-full bg-red-300' />
                <div className='size-2.5 rounded-full bg-yellow-300' />
                <div className='size-2.5 rounded-full bg-green-300' />
                <div className='ml-3 flex-1 rounded-md border border-[#F3D7B5] bg-white/70 px-3 py-1 text-[10px] text-[#6B7280]'>
                  console.routeon.cc/dashboard
                </div>
              </div>

              {/* Dashboard preview */}
              <div className='p-4'>
                {/* Stat cards */}
                <div className='grid grid-cols-3 gap-2 mb-3'>
                  {[
                    { label: t('今日请求'), value: '12,847', trend: '+12%' },
                    { label: t('Token 消耗'), value: '2.4M', trend: '+8%' },
                    { label: t('余额'), value: '¥ 48.60', trend: '' },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className='rounded-xl border border-[#F3D7B5] bg-[#FFFBF2] p-3'
                    >
                      <p className='text-[9px] text-[#6B7280]'>{card.label}</p>
                      <p className='mt-0.5 text-sm font-bold text-[#111827]'>
                        {card.value}
                      </p>
                      {card.trend && (
                        <p className='text-[9px] font-medium text-emerald-500'>
                          {card.trend}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chart bar placeholder */}
                <div className='mb-3 rounded-xl border border-[#F3D7B5] bg-[#FFFBF2] p-3'>
                  <p className='mb-2 text-[9px] font-medium text-[#6B7280]'>
                    {t('请求趋势')}
                  </p>
                  <div className='flex h-16 items-end gap-1'>
                    {[40, 65, 50, 80, 70, 90, 85, 95, 60, 75, 88, 92].map(
                      (h, i) => (
                        <div
                          key={i}
                          className='flex-1 rounded-sm'
                          style={{
                            height: `${h}%`,
                            background:
                              i === 11
                                ? 'linear-gradient(to top, #FF6A00, #FFB000)'
                                : 'oklch(0.893 0.042 68)',
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Channel table */}
                <div className='rounded-xl border border-[#F3D7B5] bg-[#FFFBF2] p-3'>
                  <p className='mb-2 text-[9px] font-medium text-[#6B7280]'>
                    {t('渠道状态')}
                  </p>
                  <div className='space-y-1.5'>
                    {[
                      { name: 'OpenAI GPT-4', status: t('正常'), ok: true },
                      { name: 'Claude 3.5', status: t('正常'), ok: true },
                      { name: 'Gemini Pro', status: t('降级'), ok: false },
                    ].map((ch) => (
                      <div
                        key={ch.name}
                        className='flex items-center justify-between'
                      >
                        <span className='text-[9px] text-[#111827]'>{ch.name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${
                            ch.ok
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {ch.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
