import {
  Zap,
  Shield,
  Globe,
  Code,
  Gauge,
  DollarSign,
  Users,
  HeartHandshake,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      id: 'fast',
      num: '01',
      title: t('极速转发'),
      desc: t('优化网络架构，毫秒级响应，支持流式输出与高并发场景'),
      span: 'md:col-span-2',
      accent: '#FF6A00',
      visual: (
        <div className='mt-4 grid grid-cols-3 gap-2'>
          {['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Qwen', 'Llama'].map(
            (name) => (
              <div
                key={name}
                className='flex items-center justify-center rounded-xl border border-[#F3D7B5] bg-white/80 px-3 py-2 text-xs text-[#6B7280] transition-colors hover:border-[#FF6A00]/30 hover:bg-orange-50/60'
              >
                {name}
              </div>
            )
          )}
        </div>
      ),
    },
    {
      id: 'secure',
      num: '02',
      title: t('安全可靠'),
      desc: t('企业级权限管理，多维度访问控制，完整审计日志'),
      span: 'md:col-span-1',
      accent: '#10B981',
      visual: (
        <div className='mt-4 flex items-center justify-center'>
          <div className='relative'>
            <div className='flex size-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50'>
              <Shield className='size-7 text-emerald-500' strokeWidth={1.5} />
            </div>
            <div className='absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500'>
              <svg
                className='size-3 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={3}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 12.75 6 6 9-13.5'
                />
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'global',
      num: '03',
      title: t('全球覆盖'),
      desc: t('多地域部署，智能负载均衡，稳定访问全球 AI 服务'),
      span: 'md:col-span-1',
      accent: '#8B5CF6',
      visual: (
        <div className='mt-4 space-y-2'>
          {[t('负载均衡'), t('限速控制'), t('成本追踪')].map((step, i) => (
            <div key={step} className='flex items-center gap-2'>
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 1
                    ? 'border border-[#FF6A00]/30 bg-orange-50 text-[#FF6A00]'
                    : 'border border-[#F3D7B5] bg-white text-[#6B7280]'
                }`}
              >
                {i + 1}
              </div>
              <div className='h-px flex-1 bg-[#F3D7B5]' />
              <span className='text-xs text-[#6B7280]'>{step}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'developer',
      num: '04',
      title: t('开发者友好'),
      desc: t('完整 API 文档，OpenAI 兼容接口，多语言 SDK 支持'),
      span: 'md:col-span-2',
      accent: '#F59E0B',
      visual: (
        <div className='mt-4 flex items-center gap-3'>
          <div className='flex -space-x-2'>
            {['API', 'SDK', 'CLI', 'Doc'].map((n) => (
              <div
                key={n}
                className='flex size-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-orange-100 to-amber-100 text-[9px] font-bold text-[#FF6A00]'
              >
                {n}
              </div>
            ))}
          </div>
          <div className='flex items-center gap-1.5 text-xs text-[#6B7280]'>
            <Code className='size-3.5 text-[#FF6A00]' />
            {t('OpenAI 兼容')}
          </div>
        </div>
      ),
    },
  ]

  const additionalFeatures = [
    {
      icon: <Gauge className='size-5' strokeWidth={1.5} />,
      title: t('高性能并发'),
      desc: t('支持高并发，自动负载均衡与故障转移'),
    },
    {
      icon: <DollarSign className='size-5' strokeWidth={1.5} />,
      title: t('透明计费'),
      desc: t('按需付费，实时用量监控，无隐藏费用'),
    },
    {
      icon: <Users className='size-5' strokeWidth={1.5} />,
      title: t('团队协作'),
      desc: t('多用户管理，灵活配额分配，权限细粒度控制'),
    },
    {
      icon: <HeartHandshake className='size-5' strokeWidth={1.5} />,
      title: t('专业支持'),
      desc: t('专业团队提供 7×24 技术支持服务'),
    },
  ]

  return (
    <section className='relative z-10 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-lg'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
            {t('核心优势')}
          </p>
          <h2 className='text-2xl font-bold leading-tight tracking-tight text-[#111827] md:text-3xl'>
            {t('为开发者而生，')}
            <br />
            {t('为规模化而设计')}
          </h2>
        </AnimateInView>

        {/* Bento grid */}
        <div className='grid gap-3 md:grid-cols-3'>
          {features.map((f, i) => (
            <AnimateInView
              key={f.id}
              delay={i * 80}
              animation='scale-in'
              className={`group rounded-2xl border border-[#F3D7B5] bg-white/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/60 backdrop-blur-sm md:p-8 ${f.span}`}
            >
              <div className='mb-3 flex items-center gap-3'>
                <span
                  className='flex size-7 items-center justify-center rounded-lg text-[10px] font-bold text-white'
                  style={{ background: f.accent }}
                >
                  {f.num}
                </span>
                <h3 className='text-sm font-semibold text-[#111827]'>{f.title}</h3>
              </div>
              <p className='text-sm leading-relaxed text-[#6B7280]'>{f.desc}</p>
              {f.visual}
            </AnimateInView>
          ))}
        </div>

        {/* Additional features row */}
        <div className='mt-14 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12'>
          {additionalFeatures.map((f, i) => (
            <AnimateInView
              key={f.title}
              delay={i * 80}
              animation='fade-up'
              className='flex flex-col items-center text-center'
            >
              <div className='mb-3 flex size-12 items-center justify-center rounded-2xl border border-[#F3D7B5] bg-white text-[#FF6A00] shadow-sm'>
                {f.icon}
              </div>
              <h3 className='mb-1.5 text-sm font-semibold text-[#111827]'>{f.title}</h3>
              <p className='max-w-[200px] text-xs leading-relaxed text-[#6B7280]'>
                {f.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
