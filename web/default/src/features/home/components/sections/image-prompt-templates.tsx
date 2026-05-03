import { useState } from 'react'
import { Copy, Check, Wand2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface PromptTemplate {
  id: string
  category: string
  title: string
  desc: string
  prompt: string
  gradient: string
  accentColor: string
}

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'portrait', label: 'Portrait & Photo' },
  { key: 'poster', label: 'Poster & Illustration' },
  { key: 'character', label: 'Character Design' },
  { key: 'ui', label: 'UI & Social Media' },
  { key: 'anime', label: 'Anime & Pixel Art' },
]

const TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    category: 'portrait',
    title: 'Studio Portrait',
    desc: '专业人像棚拍，电影感光影',
    prompt:
      'A professional studio portrait of a woman in her 30s, soft cinematic Rembrandt lighting, shallow depth of field f/1.8, natural skin tones, shot on Hasselblad medium format, photorealistic, warm neutral background',
    gradient: 'linear-gradient(135deg, #f5e6d3 0%, #c4956a 60%, #8b5e3c 100%)',
    accentColor: '#c4956a',
  },
  {
    id: '2',
    category: 'portrait',
    title: 'Vintage Film',
    desc: '复古胶片质感，70年代街头写真',
    prompt:
      'Vintage 35mm film photograph, authentic grain and halation, faded warm tones, candid street portrait of a young man, 1970s aesthetic, soft vignette, nostalgic mood, Kodak Portra 400 emulation',
    gradient: 'linear-gradient(135deg, #e8d5b7 0%, #b89060 60%, #7a5c35 100%)',
    accentColor: '#b89060',
  },
  {
    id: '3',
    category: 'portrait',
    title: 'Chiaroscuro Drama',
    desc: '伦勃朗明暗对比，古典油画风',
    prompt:
      'Dramatic chiaroscuro portrait, strong single-source side lighting, deep shadows with rich warm undertones, classical oil painting aesthetic, textured linen canvas background, museum quality',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #4a2010 50%, #8b4513 100%)',
    accentColor: '#8b4513',
  },
  {
    id: '4',
    category: 'poster',
    title: 'Cinematic Movie Poster',
    desc: '史诗级电影海报构图',
    prompt:
      'Epic movie poster composition, lone silhouetted figure against a vast dramatic landscape at golden hour, bold typography space reserved at top and bottom, cinematic anamorphic lens flare, professional film poster color grading, Dune aesthetic',
    gradient: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #2d1b4e 100%)',
    accentColor: '#9b59b6',
  },
  {
    id: '5',
    category: 'poster',
    title: 'Art Deco Poster',
    desc: '装饰艺术风格，几何金色',
    prompt:
      'Art Deco travel poster, bold geometric sunburst patterns, gold and black color scheme with deep teal accents, elegant symmetrical composition, 1920s Bauhaus influence, luxurious texture, vintage tourism advertisement style',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #5a3d00 50%, #c9a227 100%)',
    accentColor: '#c9a227',
  },
  {
    id: '6',
    category: 'poster',
    title: 'Minimal Typography',
    desc: '极简主义字体排版设计',
    prompt:
      'Brutalist minimalist typographic poster design, bold oversized sans-serif headline in black, single accent color (coral red), stark white background, Swiss International Style, generous negative space, printed texture overlay',
    gradient: 'linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 60%, #d0d0c8 100%)',
    accentColor: '#e74c3c',
  },
  {
    id: '7',
    category: 'character',
    title: 'Cyberpunk Warrior',
    desc: '赛博朋克战士，霓虹科幻风',
    prompt:
      'Full body character concept art, female cyberpunk warrior, sleek black armor with glowing neon blue circuit patterns, rain-soaked neon-lit dystopian cityscape backdrop, dramatic upward angle, hyper-detailed, Artstation trending',
    gradient: 'linear-gradient(135deg, #050510 0%, #0d0d2b 50%, #1a0a3a 100%)',
    accentColor: '#00d4ff',
  },
  {
    id: '8',
    category: 'character',
    title: 'Fantasy Mage',
    desc: '奇幻法师，魔法能量环绕',
    prompt:
      'Fantasy RPG mage character design, ancient wizard with silver beard, flowing deep blue robes adorned with golden runes, magical energy orbs swirling around outstretched hands, ancient library setting, warm candlelight, painterly digital illustration',
    gradient: 'linear-gradient(135deg, #0d0020 0%, #2d0060 50%, #5b00b0 100%)',
    accentColor: '#8b5cf6',
  },
  {
    id: '9',
    category: 'ui',
    title: 'App Store Screenshot',
    desc: 'iOS应用推广展示图，简洁现代',
    prompt:
      'Clean minimal iOS app store screenshot mockup, iPhone 15 Pro mockup frame in space black, productivity dashboard app UI shown on screen, light mode interface, soft pastel purple and white palette, floating device with realistic shadow on gradient background',
    gradient: 'linear-gradient(135deg, #e8eeff 0%, #c4d0ff 60%, #a0b4ff 100%)',
    accentColor: '#6366f1',
  },
  {
    id: '10',
    category: 'ui',
    title: 'Brand Social Banner',
    desc: 'LinkedIn/X 品牌横幅，商务科技感',
    prompt:
      'Professional LinkedIn company banner, tech startup brand aesthetic, abstract low-poly geometric mesh background transitioning from deep navy to warm orange, minimal logo placeholder area, sleek modern corporate design, 1584x396 format',
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #ee8c1a 40%, #FFB000 100%)',
    accentColor: '#FF6A00',
  },
  {
    id: '11',
    category: 'anime',
    title: 'Ghibli Landscape',
    desc: '宫崎骏风格奇幻田园风景',
    prompt:
      'Studio Ghibli inspired pastoral landscape, rolling green hills dotted with wildflowers, cozy stone cottage with chimney smoke curling skyward, magical golden hour light breaking through soft clouds, painterly watercolor style, whimsical dreamy atmosphere',
    gradient: 'linear-gradient(135deg, #a8e6cf 0%, #7ec8a0 50%, #4caf82 100%)',
    accentColor: '#4caf82',
  },
  {
    id: '12',
    category: 'anime',
    title: '16-bit Pixel Art',
    desc: '复古16位游戏像素角色',
    prompt:
      '16-bit JRPG pixel art hero character sprite sheet, front/back/side views, detailed pixel shading with strong outlines, classic RPG color palette of 32 colors, clean transparent background, Super Nintendo era aesthetic',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#e94560',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className='flex items-center gap-1.5 rounded-lg border border-[#F3D7B5] bg-white/70 px-2.5 py-1.5 text-[11px] font-medium text-[#6B7280] transition-all hover:border-[#FF6A00]/40 hover:text-[#FF6A00]'
    >
      {copied ? <Check className='size-3' /> : <Copy className='size-3' />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function PromptCard({ template }: { template: PromptTemplate }) {
  const { t } = useTranslation()

  return (
    <div className='group flex flex-col overflow-hidden rounded-2xl border border-[#F3D7B5] bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-orange-100/50 backdrop-blur-sm'>
      {/* Visual preview area */}
      <div
        className='relative h-36 w-full flex-shrink-0 overflow-hidden'
        style={{ background: template.gradient }}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div
            className='flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm'
            style={{ border: `1px solid ${template.accentColor}40` }}
          >
            <Wand2 className='size-5 text-white' />
          </div>
        </div>
        {/* Category badge */}
        <div className='absolute top-3 left-3'>
          <span className='rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm'>
            {CATEGORIES.find((c) => c.key === template.category)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col gap-2.5 p-4'>
        <div>
          <p className='text-sm font-semibold text-[#111827]'>{template.title}</p>
          <p className='mt-0.5 text-xs text-[#6B7280]'>{template.desc}</p>
        </div>

        {/* Prompt preview */}
        <div className='rounded-lg border border-[#F3D7B5] bg-[#FFFBF2] p-2.5'>
          <p className='line-clamp-2 text-[11px] leading-relaxed text-[#6B7280] italic'>
            {template.prompt.slice(0, 110)}...
          </p>
        </div>

        {/* Actions */}
        <div className='mt-auto flex items-center justify-between'>
          <CopyButton text={template.prompt} />
          <button className='flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[#FF6A00] transition-colors hover:bg-orange-50'>
            <Wand2 className='size-3' />
            {t('使用模版')}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ImagePromptTemplates() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((tpl) => tpl.category === activeCategory)

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 text-center'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
            Prompt Templates
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
            {t('图片生成提示词模版')}
          </h2>
          <p className='mx-auto mt-3 max-w-md text-sm text-[#6B7280]'>
            {t('精选高质量图片生成提示词，一键复制即可生成精美图像')}
          </p>
        </AnimateInView>

        {/* Category filter tabs */}
        <AnimateInView
          className='mb-10 flex flex-wrap items-center justify-center gap-2'
          delay={80}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'border-[#FF6A00] bg-[#FF6A00] text-white shadow-sm shadow-orange-200/50'
                  : 'border-[#F3D7B5] bg-white/70 text-[#6B7280] hover:border-[#FF6A00]/40 hover:text-[#FF6A00]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </AnimateInView>

        {/* Cards grid */}
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((template, i) => (
            <AnimateInView key={template.id} delay={i * 60} animation='fade-up'>
              <PromptCard template={template} />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
