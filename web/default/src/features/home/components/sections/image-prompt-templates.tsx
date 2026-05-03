import { useState } from 'react'
import { Copy, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface PromptTemplate {
  id: string
  category: string
  title: string
  desc: string
  prompt: string
  image: string
  accentColor: string
}

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'portrait', label: '人像摄影' },
  { key: 'poster', label: '海报插画' },
  { key: 'character', label: '角色设计' },
  { key: 'ui', label: 'UI 与社媒' },
  { key: 'anime', label: '动漫像素' },
]

// picsum.photos/seed/{seed}/{w}/{h} — 固定 seed，同一 seed 永远返回同一张图
const TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    category: 'portrait',
    title: '影棚人像',
    desc: '专业棚拍，电影感 Rembrandt 光影',
    prompt:
      'A professional studio portrait of a woman in her 30s, soft cinematic Rembrandt lighting, shallow depth of field f/1.8, natural skin tones, shot on Hasselblad medium format, photorealistic, warm neutral background',
    image: 'https://picsum.photos/seed/portrait-studio/600/340',
    accentColor: '#c4956a',
  },
  {
    id: '2',
    category: 'portrait',
    title: '复古胶片',
    desc: '70 年代街头写真，Kodak Portra 质感',
    prompt:
      'Vintage 35mm film photograph, authentic grain and halation, faded warm tones, candid street portrait of a young man, 1970s aesthetic, soft vignette, nostalgic mood, Kodak Portra 400 emulation',
    image: 'https://picsum.photos/seed/vintage-film/600/340',
    accentColor: '#b89060',
  },
  {
    id: '3',
    category: 'portrait',
    title: '明暗戏剧人像',
    desc: '单光源强侧逆光，古典油画质感',
    prompt:
      'Dramatic chiaroscuro portrait, strong single-source side lighting, deep shadows with rich warm undertones, classical oil painting aesthetic, textured linen canvas background, museum quality',
    image: 'https://picsum.photos/seed/chiaroscuro/600/340',
    accentColor: '#8b4513',
  },
  {
    id: '4',
    category: 'poster',
    title: '电影海报',
    desc: '史诗构图，黄金时刻剪影背景',
    prompt:
      'Epic movie poster composition, lone silhouetted figure against a vast dramatic landscape at golden hour, bold typography space reserved at top and bottom, cinematic anamorphic lens flare, professional film poster color grading, Dune aesthetic',
    image: 'https://picsum.photos/seed/movie-poster/600/340',
    accentColor: '#9b59b6',
  },
  {
    id: '5',
    category: 'poster',
    title: '装饰艺术海报',
    desc: '1920s Bauhaus 几何金色风格',
    prompt:
      'Art Deco travel poster, bold geometric sunburst patterns, gold and black color scheme with deep teal accents, elegant symmetrical composition, 1920s Bauhaus influence, luxurious texture, vintage tourism advertisement style',
    image: 'https://picsum.photos/seed/art-deco/600/340',
    accentColor: '#c9a227',
  },
  {
    id: '6',
    category: 'poster',
    title: '极简排版',
    desc: '瑞士国际主义风格，大字留白',
    prompt:
      'Brutalist minimalist typographic poster design, bold oversized sans-serif headline in black, single accent color (coral red), stark white background, Swiss International Style, generous negative space, printed texture overlay',
    image: 'https://picsum.photos/seed/minimal-type/600/340',
    accentColor: '#e74c3c',
  },
  {
    id: '7',
    category: 'character',
    title: '赛博朋克战士',
    desc: '霓虹科幻装甲，雨夜城市背景',
    prompt:
      'Full body character concept art, female cyberpunk warrior, sleek black armor with glowing neon blue circuit patterns, rain-soaked neon-lit dystopian cityscape backdrop, dramatic upward angle, hyper-detailed, Artstation trending',
    image: 'https://picsum.photos/seed/cyberpunk/600/340',
    accentColor: '#00d4ff',
  },
  {
    id: '8',
    category: 'character',
    title: '奇幻法师',
    desc: '魔法能量环绕，古典图书馆场景',
    prompt:
      'Fantasy RPG mage character design, ancient wizard with silver beard, flowing deep blue robes adorned with golden runes, magical energy orbs swirling around outstretched hands, ancient library setting, warm candlelight, painterly digital illustration',
    image: 'https://picsum.photos/seed/fantasy-mage/600/340',
    accentColor: '#8b5cf6',
  },
  {
    id: '9',
    category: 'ui',
    title: 'App 推广截图',
    desc: 'iPhone 15 Pro 悬浮展示，简洁现代',
    prompt:
      'Clean minimal iOS app store screenshot mockup, iPhone 15 Pro mockup frame in space black, productivity dashboard app UI shown on screen, light mode interface, soft pastel purple and white palette, floating device with realistic shadow on gradient background',
    image: 'https://picsum.photos/seed/app-store/600/340',
    accentColor: '#6366f1',
  },
  {
    id: '10',
    category: 'ui',
    title: '品牌社媒横幅',
    desc: 'LinkedIn/X 封面，科技感商务风',
    prompt:
      'Professional LinkedIn company banner, tech startup brand aesthetic, abstract low-poly geometric mesh background transitioning from deep navy to warm orange, minimal logo placeholder area, sleek modern corporate design, 1584x396 format',
    image: 'https://picsum.photos/seed/social-banner/600/340',
    accentColor: '#FF6A00',
  },
  {
    id: '11',
    category: 'anime',
    title: '吉卜力风景',
    desc: '宫崎骏奇幻田园，水彩手绘感',
    prompt:
      'Studio Ghibli inspired pastoral landscape, rolling green hills dotted with wildflowers, cozy stone cottage with chimney smoke curling skyward, magical golden hour light breaking through soft clouds, painterly watercolor style, whimsical dreamy atmosphere',
    image: 'https://picsum.photos/seed/ghibli/600/340',
    accentColor: '#4caf82',
  },
  {
    id: '12',
    category: 'anime',
    title: '16 位像素角色',
    desc: '复古 JRPG 精灵图，超任风格',
    prompt:
      '16-bit JRPG pixel art hero character sprite sheet, front/back/side views, detailed pixel shading with strong outlines, classic RPG color palette of 32 colors, clean transparent background, Super Nintendo era aesthetic',
    image: 'https://picsum.photos/seed/pixel-art/600/340',
    accentColor: '#e94560',
  },
]

function CopyButton({ prompt }: { prompt: string }) {
  const [copying, setCopying] = useState(false)

  const handleCopy = async () => {
    if (copying) return
    setCopying(true)
    try {
      await navigator.clipboard.writeText(prompt)
      toast.success('提示词已复制', { duration: 1800 })
    } catch {
      // Fallback for environments where clipboard API is blocked
      try {
        const ta = document.createElement('textarea')
        ta.value = prompt
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        toast.success('提示词已复制', { duration: 1800 })
      } catch {
        toast.error('复制失败，请手动复制')
      }
    } finally {
      setTimeout(() => setCopying(false), 1800)
    }
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copying}
      className='flex items-center gap-1.5 rounded-lg border border-[#F3D7B5] bg-white/70 px-2.5 py-1.5 text-[11px] font-medium text-[#6B7280] transition-all hover:border-[#FF6A00]/40 hover:text-[#FF6A00] disabled:opacity-60'
    >
      <Copy className='size-3' />
      {copying ? '已复制' : '复制'}
    </button>
  )
}

function PromptCard({ template }: { template: PromptTemplate }) {
  const { t } = useTranslation()
  const [imgError, setImgError] = useState(false)
  const categoryLabel = CATEGORIES.find((c) => c.key === template.category)?.label

  return (
    <div className='group flex flex-col overflow-hidden rounded-2xl border border-[#F3D7B5] bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-orange-100/50 backdrop-blur-sm'>
      {/* Cover image */}
      <div className='relative h-40 w-full flex-shrink-0 overflow-hidden bg-[#F5EDE0]'>
        {!imgError ? (
          <img
            src={template.image}
            alt={template.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
            onError={() => setImgError(true)}
            loading='lazy'
          />
        ) : (
          <div
            className='flex h-full w-full items-center justify-center'
            style={{
              background: `linear-gradient(135deg, ${template.accentColor}22 0%, ${template.accentColor}55 100%)`,
            }}
          >
            <Wand2 className='size-8 opacity-40' style={{ color: template.accentColor }} />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
        <div className='absolute top-3 left-3'>
          <span className='rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm'>
            {categoryLabel}
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
          <CopyButton prompt={template.prompt} />
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
            提示词模板库
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
            图片生成提示词模板
          </h2>
          <p className='mx-auto mt-3 max-w-md text-sm text-[#6B7280]'>
            精选高质量图片生成提示词，一键复制即可生成精美图像
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
