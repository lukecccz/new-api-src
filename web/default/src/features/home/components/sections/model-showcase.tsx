import { Brain, Cpu, Sparkles, Wand2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface ModelCardProps {
  name: string
  provider: string
  tag: string
  tagColor: string
  icon: React.ReactNode
  desc: string
}

function ModelCard(props: ModelCardProps) {
  return (
    <div className='group flex flex-col gap-3 rounded-2xl border border-[#F3D7B5] bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/50 backdrop-blur-sm'>
      <div className='flex items-start justify-between'>
        <div className='flex size-10 items-center justify-center rounded-xl border border-[#F3D7B5] bg-gradient-to-br from-orange-50 to-amber-50'>
          {props.icon}
        </div>
        <span
          className='rounded-full px-2.5 py-0.5 text-[10px] font-semibold'
          style={{ background: props.tagColor + '18', color: props.tagColor }}
        >
          {props.tag}
        </span>
      </div>
      <div>
        <p className='text-sm font-semibold text-[#111827]'>{props.name}</p>
        <p className='mt-0.5 text-xs text-[#6B7280]'>{props.provider}</p>
      </div>
      <p className='text-xs leading-relaxed text-[#6B7280]'>{props.desc}</p>
    </div>
  )
}

export function ModelShowcase() {
  const { t } = useTranslation()

  const models: ModelCardProps[] = [
    {
      name: 'GPT-4o',
      provider: 'OpenAI',
      tag: t('多模态'),
      tagColor: '#10B981',
      icon: <Brain className='size-5 text-[#10B981]' />,
      desc: t('旗舰多模态大模型，支持文本、图像、音频输入'),
    },
    {
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      tag: t('推理增强'),
      tagColor: '#8B5CF6',
      icon: <Sparkles className='size-5 text-[#8B5CF6]' />,
      desc: t('强大的推理能力与长上下文支持，适合复杂任务'),
    },
    {
      name: 'Gemini 2.0 Flash',
      provider: 'Google',
      tag: t('极速'),
      tagColor: '#FF6A00',
      icon: <Cpu className='size-5 text-[#FF6A00]' />,
      desc: t('谷歌最新一代多模态模型，极速响应与低延迟'),
    },
    {
      name: 'DeepSeek-V3',
      provider: 'DeepSeek',
      tag: t('高性价比'),
      tagColor: '#0EA5E9',
      icon: <Wand2 className='size-5 text-[#0EA5E9]' />,
      desc: t('领先的开源大模型，超强代码与推理能力'),
    },
    {
      name: 'Qwen-Max',
      provider: 'Alibaba',
      tag: t('中文优化'),
      tagColor: '#F59E0B',
      icon: <Brain className='size-5 text-[#F59E0B]' />,
      desc: t('阿里云通义千问旗舰版，中文理解能力优异'),
    },
    {
      name: 'Llama 3.1 405B',
      provider: 'Meta',
      tag: t('开源'),
      tagColor: '#EC4899',
      icon: <Cpu className='size-5 text-[#EC4899]' />,
      desc: t('Meta 最大开源模型，适合本地部署与定制化'),
    },
  ]

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
            <div>
              <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
                {t('模型广场')}
              </p>
              <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
                {t('接入 50+ 主流 AI 模型')}
              </h2>
              <p className='mt-2 text-sm text-[#6B7280]'>
                {t('统一接口，一次集成，随时切换最优模型')}
              </p>
            </div>
            <a
              href='/pricing'
              className='shrink-0 text-sm font-medium text-[#FF6A00] hover:underline'
            >
              {t('查看全部模型')} →
            </a>
          </div>
        </AnimateInView>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {models.map((model, i) => (
            <AnimateInView key={model.name} delay={i * 60} animation='fade-up'>
              <ModelCard {...model} />
            </AnimateInView>
          ))}
        </div>

        {/* Badge strip */}
        <AnimateInView className='mt-10' animation='fade-up' delay={400}>
          <div className='flex flex-wrap items-center justify-center gap-2'>
            {[
              'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Alibaba',
              'Meta', 'Mistral', 'Cohere', 'AWS Bedrock', 'Azure OpenAI',
              '+ 40 more',
            ].map((name) => (
              <span
                key={name}
                className='rounded-full border border-[#F3D7B5] bg-white/70 px-3 py-1 text-xs text-[#6B7280]'
              >
                {name}
              </span>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
