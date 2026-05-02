import { Code2, MessageSquare, Eye, Mic } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface TemplateCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  code: string
  accentColor: string
}

function TemplateCard(props: TemplateCardProps) {
  return (
    <div className='group flex flex-col gap-4 rounded-2xl border border-[#F3D7B5] bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/50 backdrop-blur-sm'>
      <div className='flex items-center gap-3'>
        <div
          className='flex size-9 items-center justify-center rounded-xl'
          style={{ background: props.accentColor + '15', color: props.accentColor }}
        >
          {props.icon}
        </div>
        <div>
          <p className='text-sm font-semibold text-[#111827]'>{props.title}</p>
          <p className='text-xs text-[#6B7280]'>{props.desc}</p>
        </div>
      </div>
      <div className='overflow-hidden rounded-xl bg-[#111827] p-4'>
        <pre className='overflow-x-auto text-[11px] leading-relaxed text-orange-200/90'>
          <code>{props.code}</code>
        </pre>
      </div>
    </div>
  )
}

export function ApiTemplates() {
  const { t } = useTranslation()

  const templates: TemplateCardProps[] = [
    {
      icon: <MessageSquare className='size-4' />,
      title: t('对话补全'),
      desc: t('Chat Completion API'),
      accentColor: '#FF6A00',
      code: `curl https://your-gateway/v1/chat/completions \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user",
      "content": "你好！"}]
  }'`,
    },
    {
      icon: <Eye className='size-4' />,
      title: t('图像理解'),
      desc: t('Vision API'),
      accentColor: '#8B5CF6',
      code: `from openai import OpenAI
client = OpenAI(
  base_url="https://your-gateway/v1",
  api_key="your-key"
)
resp = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role":"user","content":[
    {"type":"image_url",
     "image_url":{"url":"https://..."}}
  ]}]
)`,
    },
    {
      icon: <Mic className='size-4' />,
      title: t('语音转文字'),
      desc: t('Speech-to-Text API'),
      accentColor: '#10B981',
      code: `const openai = new OpenAI({
  baseURL: 'https://your-gateway/v1',
  apiKey: 'your-key',
})
const transcription =
  await openai.audio.transcriptions.create({
    file: fs.createReadStream('audio.mp3'),
    model: 'whisper-1',
  })`,
    },
    {
      icon: <Code2 className='size-4' />,
      title: t('流式输出'),
      desc: t('Streaming API'),
      accentColor: '#F59E0B',
      code: `stream = client.chat.completions.create(
  model="claude-3-5-sonnet",
  messages=[{"role":"user",
    "content":"写一首诗"}],
  stream=True
)
for chunk in stream:
  print(chunk.choices[0].delta.content,
    end="", flush=True)`,
    },
  ]

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 text-center'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
            {t('API 模板')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
            {t('几行代码，即刻集成')}
          </h2>
          <p className='mx-auto mt-3 max-w-md text-sm text-[#6B7280]'>
            {t('完全兼容 OpenAI SDK，无需修改现有代码，直接替换 base_url 即可')}
          </p>
        </AnimateInView>

        <div className='grid gap-5 sm:grid-cols-2'>
          {templates.map((tpl, i) => (
            <AnimateInView key={tpl.title} delay={i * 80} animation='fade-up'>
              <TemplateCard {...tpl} />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
