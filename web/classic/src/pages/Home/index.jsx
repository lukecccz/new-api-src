/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const providerIcons = [
  { name: 'Moonshot', icon: <Moonshot size={38} /> },
  { name: 'OpenAI', icon: <OpenAI size={38} /> },
  { name: 'xAI', icon: <XAI size={38} /> },
  { name: 'Zhipu', icon: <Zhipu.Color size={38} /> },
  { name: 'Volcengine', icon: <Volcengine.Color size={38} /> },
  { name: 'Cohere', icon: <Cohere.Color size={38} /> },
  { name: 'Claude', icon: <Claude.Color size={38} /> },
  { name: 'Gemini', icon: <Gemini.Color size={38} /> },
  { name: 'Suno', icon: <Suno size={38} /> },
  { name: 'Minimax', icon: <Minimax.Color size={38} /> },
  { name: 'Wenxin', icon: <Wenxin.Color size={38} /> },
  { name: 'Spark', icon: <Spark.Color size={38} /> },
  { name: 'Qingyan', icon: <Qingyan.Color size={38} /> },
  { name: 'DeepSeek', icon: <DeepSeek.Color size={38} /> },
  { name: 'Qwen', icon: <Qwen.Color size={38} /> },
  { name: 'Midjourney', icon: <Midjourney size={38} /> },
  { name: 'Grok', icon: <Grok size={38} /> },
  { name: 'Azure AI', icon: <AzureAI.Color size={38} /> },
  { name: 'Hunyuan', icon: <Hunyuan.Color size={38} /> },
  { name: 'Xinference', icon: <Xinference.Color size={38} /> },
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    document.body.classList.add('classic-home-active');
    return () => {
      document.body.classList.remove('classic-home-active');
    };
  }, []);

  return (
    <div className='classic-home w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='home-page'>
          <section className='home-hero'>
            <div className='home-grid-bg' />
            <div className='home-glow' />
            <div className='home-hero-inner'>
              <div className='home-badge'>{t('AI 模型聚合网关')}</div>

              <h1 className='home-title'>
                <span>{t('统一的')}</span>
                <span>{t('大模型接口网关')}</span>
              </h1>

              <p className='home-subtitle'>
                {t('更好的价格，更好的稳定性，只需要将模型基址替换为：')}
              </p>

              <div className='home-base-url-input'>
                <div className='home-base-url-value' title={serverAddress}>
                  {serverAddress}
                </div>
                <div className='home-base-url-path'>/v1/chat/completions</div>
                <Button
                  type='primary'
                  onClick={handleCopyBaseURL}
                  icon={<IconCopy />}
                  className='home-base-url-copy'
                  aria-label={t('复制')}
                >
                  {t('复制')}
                </Button>
              </div>

              <div className='home-actions'>
                <Link className='home-auth-link' to='/console'>
                  <Button
                    theme='solid'
                    type='primary'
                    size={isMobile ? 'default' : 'large'}
                    className='home-auth-btn home-auth-btn-login'
                    icon={<IconPlay />}
                  >
                    {t('获取密钥')}
                  </Button>
                </Link>
                {isDemoSiteMode && statusState?.status?.version ? (
                  <Button
                    size={isMobile ? 'default' : 'large'}
                    className='home-auth-btn home-auth-btn-register'
                    icon={<IconGithubLogo />}
                    onClick={() =>
                      window.open(
                        'https://github.com/QuantumNous/new-api',
                        '_blank',
                      )
                    }
                  >
                    {statusState.status.version}
                  </Button>
                ) : (
                  docsLink && (
                    <Button
                      size={isMobile ? 'default' : 'large'}
                      className='home-auth-btn home-auth-btn-register'
                      icon={<IconFile />}
                      onClick={() => window.open(docsLink, '_blank')}
                    >
                      {t('文档')}
                    </Button>
                  )
                )}
              </div>

              <div className='home-provider-section'>
                <div className='home-provider-title'>
                  {t('支持众多的大模型供应商')}
                </div>
                <div className='home-provider-grid'>
                  {providerIcons.map((provider) => (
                    <div
                      className='home-provider-item'
                      key={provider.name}
                      aria-label={provider.name}
                      title={provider.name}
                    >
                      {provider.icon}
                    </div>
                  ))}
                  <div className='home-provider-more'>30+</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
