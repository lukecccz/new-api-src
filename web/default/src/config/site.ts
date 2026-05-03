/**
 * Routeon site-wide configuration constants.
 * Edit values here to update links and URLs across the entire frontend.
 */
export const SITE_CONFIG = {
  /** Brand name */
  BRAND_NAME: 'Routeon',

  /** Main website */
  SITE_URL: 'https://routeon.cc',

  /** Console / dashboard */
  CONSOLE_URL: 'https://console.routeon.cc',

  /** API base URL (without /v1) */
  API_BASE_URL: 'https://api.routeon.cc',

  /** OpenAI-compatible chat completions endpoint */
  API_CHAT_URL: 'https://api.routeon.cc/v1/chat/completions',

  /** SDK baseURL */
  API_V1_URL: 'https://api.routeon.cc/v1',

  /** External documentation link — Feishu doc */
  FEISHU_DOCS_URL: 'https://vcnolqeyggsf.feishu.cn/docx/EonZdDrvqoabuAxwRFfc72olnYg',
} as const
