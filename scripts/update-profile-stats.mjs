import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const username = process.env.PROFILE_USERNAME ?? 'loulanyue';
const token = process.env.GITHUB_TOKEN;
const snapshotPath = process.env.PROFILE_DATA_PATH;
const checkOnly = process.argv.includes('--check');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bannerPath = path.join(root, 'assets', 'profile-terminal.svg');
const featuredPath = path.join(root, 'assets', 'featured-systems.svg');
const upstreamPath = path.join(root, 'assets', 'upstream-contributions.svg');
const upstreamMapPath = path.join(root, 'assets', 'upstream-engineering-map.svg');
const readmePath = path.join(root, 'README.md');

const featuredRepositories = [
  'spec-kit-zh',
  'dream-xi-ai',
  'awesome-claude-notes',
  'interview-notes',
];

const featuredMetadata = {
  'dream-xi-ai': {
    role: 'TEAM',
    zh: '面向复杂交付的多智能体控制面，统一规划、执行、验证与风险治理。',
    en: 'Control plane for multi-agent planning, execution, verification, and risk.',
  },
  'spec-kit-zh': {
    role: 'SPEC',
    zh: '把规格、上下文与智能体协作编排为可复用的开放工程协议。',
    en: 'Open protocol for specifications, context, and agent collaboration.',
  },
  'interview-notes': {
    role: 'KNOW',
    zh: '将后端知识重构为面向判断、设计与演进的工程决策系统。',
    en: 'Backend knowledge organized for engineering judgment, design, and evolution.',
  },
  'awesome-claude-notes': {
    role: 'DIST',
    zh: '沉淀可移植的智能体能力层，跨工具复用角色、技能与工作流。',
    en: 'Portable capability layer for agents, skills, and cross-tool workflows.',
  },
};

const upstreamStarThreshold = 100_000;
const upstreamContributions = [
  { key: 'openclaw', owner: 'openclaw', repo: 'openclaw', pull: 121494 },
  { key: 'ecc', owner: 'affaan-m', repo: 'ECC', pull: 2833 },
  { key: 'hermes', owner: 'NousResearch', repo: 'hermes-agent', pull: 82992 },
  { key: 'opencode', owner: 'anomalyco', repo: 'opencode', pull: 38763 },
  { key: 'firecrawl', owner: 'firecrawl', repo: 'firecrawl', pull: 4061 },
  { key: 'langflow', owner: 'langflow-ai', repo: 'langflow', pull: 14177 },
  { key: 'dify', owner: 'langgenius', repo: 'dify', pull: 40412 },
  { key: 'openwebui', owner: 'open-webui', repo: 'open-webui', pull: 28218 },
  { key: 'langchain', owner: 'langchain-ai', repo: 'langchain', pull: 39215 },
  { key: 'geminicli', owner: 'google-gemini', repo: 'gemini-cli', pull: 28546 },
  { key: 'pytorch', owner: 'pytorch', repo: 'pytorch', pull: 191904 },
  { key: 'transformers', owner: 'huggingface', repo: 'transformers', pull: 47763 },
];

const upstreamMetadata = {
  openclaw: {
    topic: 'SESSION CONTINUITY',
    zh: '跨心跳与对话策略缺口保留会话上下文，减少重置与缓存抖动。',
    en: 'Preserves reusable session context across heartbeat and chat policy gaps.',
  },
  ecc: {
    topic: 'CODING STYLE',
    zh: '完善 TypeScript/JavaScript 命名规约与代码风格指引，提升智能体生成代码一致性。',
    en: 'Adds naming conventions to TypeScript/JavaScript coding style for agent output consistency.',
  },
  hermes: {
    topic: 'APPROVAL SURFACE',
    zh: '让受保护文件写入在桌面端呈现明确审批，避免静默超时。',
    en: 'Surfaces protected file-write approvals in Desktop instead of timing out.',
  },
  opencode: {
    topic: 'MODEL REPLAY',
    zh: '保留失败回合的推理签名链，确保工具调用可被模型安全重放。',
    en: 'Preserves signed reasoning context for valid tool-call replay.',
  },
  firecrawl: {
    topic: 'BUILD CONTRACT',
    zh: '显式化原生客户端构建契约，让异构部署具备可复现前提。',
    en: 'Makes native client prerequisites explicit for reproducible deployment.',
  },
  transformers: {
    topic: 'AUDIO EMBEDDING',
    zh: '修复 HuBERT 位置卷积在 BatchNorm 模式下的填充敏感性，消除音频嵌入偏移。',
    en: 'Fixes positional conv padding sensitivity in HuBERT when conv_pos_batch_norm=True.',
  },
  langflow: {
    topic: 'MCP LIFECYCLE',
    zh: '把取消语义落实到传输生命周期，阻断后台任务与子进程泄漏。',
    en: 'Carries cancellation semantics through the transport lifecycle.',
  },
  dify: {
    topic: 'ENDPOINT VALIDATION',
    zh: '把 404 视为服务可达的路径响应，修复外部知识 API 误判。',
    en: 'Treats HTTP 404 as reachable endpoint evidence during API validation.',
  },
  openwebui: {
    topic: 'MODEL RESOLUTION',
    zh: '避免自定义模型别名导致同一基础模型被重复移除。',
    en: 'Prevents alias resolution from removing the same base model twice.',
  },
  langchain: {
    topic: 'EXECUTION BOUNDARY',
    zh: '修复线程池执行器的生成器迭代器兼容性，守住异步与多线程执行边界。',
    en: 'Fixes generator iterable compatibility in ContextThreadPoolExecutor.map.',
  },
  geminicli: {
    topic: 'AUTH BOUNDARY',
    zh: '隔离 API Key 与残留授权头，避免认证机制在请求边界相互污染。',
    en: 'Isolates API-key auth from stale authorization headers at request boundaries.',
  },
  pytorch: {
    topic: 'RUNTIME COMPATIBILITY',
    zh: '修复 AOTInductor 在 CPU 架构指令集下级的判空兼容，保障编译导出可靠加载。',
    en: 'Fixes CPU ISA superset compatibility in _load_aoti for AOTInductor models.',
  },
};

const upstreamCategories = [
  {
    id: 'agent-runtime',
    en: 'AGENT RUNTIMES & CODING INTERFACES',
    zh: '智能体运行时与编码终端',
    icon: '🤖',
    color: '#2A9DB2',
    repositories: [
      'openclaw/openclaw',
      'affaan-m/ECC',
      'NousResearch/hermes-agent',
      'anomalyco/opencode',
      'google-gemini/gemini-cli',
    ],
  },
  {
    id: 'workflow',
    en: 'AI WORKFLOW & EXPERIENCE PLATFORMS',
    zh: 'AI 工作流与体验平台',
    icon: '⚡',
    color: '#5D86B3',
    repositories: [
      'langchain-ai/langchain',
      'langflow-ai/langflow',
      'langgenius/dify',
      'langgenius/graphon',
      'open-webui/open-webui',
      'Comfy-Org/ComfyUI_frontend',
    ],
  },
  {
    id: 'data-integration',
    en: 'DATA, RETRIEVAL & TOOL CONNECTIVITY',
    zh: '数据、检索与工具接入',
    icon: '🔌',
    color: '#54A98E',
    repositories: [
      'firecrawl/firecrawl',
      'qdrant/qdrant',
      'teng-lin/notebooklm-py',
      'diegosouzapw/OmniRoute',
      'googleapis/mcp-toolbox',
    ],
  },
  {
    id: 'model-ml',
    en: 'MODEL TRAINING & ML SYSTEMS',
    zh: '模型训练与机器学习系统',
    icon: '🧠',
    color: '#4D8FBA',
    repositories: [
      'huggingface/transformers',
      'pytorch/pytorch',
      'vllm-project/vllm',
      'BerriAI/litellm',
      'hiyouga/LlamaFactory',
      'sktime/sktime',
    ],
  },
  {
    id: 'python-toolchain',
    en: 'PYTHON ENGINEERING TOOLCHAIN',
    zh: 'Python 工程工具链',
    icon: '🛠️',
    color: '#2A879B',
    repositories: ['python-poetry/poetry', 'facebook/pyrefly'],
  },
  {
    id: 'knowledge',
    en: 'ENGINEERING KNOWLEDGE & ECOSYSTEMS',
    zh: '工程知识与生态',
    icon: '📚',
    color: '#C49435',
    repositories: ['DuGuQiuBai/Java', 'baomidou/mybatis-plus-doc'],
  },
];

const highlightedRepositories = new Set([
  'openclaw/openclaw',
  'affaan-m/ECC',
  'NousResearch/hermes-agent',
  'anomalyco/opencode',
  'langflow-ai/langflow',
  'hiyouga/LlamaFactory',
  'python-poetry/poetry',
]);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${username}-profile-telemetry`,
  'X-GitHub-Api-Version': '2022-11-28',
};

if (token) headers.Authorization = `Bearer ${token}`;

async function request(url) {
  try {
    const response = await fetch(url, { headers });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    // Fallback to curl with local proxy if direct fetch fails
  }

  const proxy = process.env.https_proxy || process.env.http_proxy || 'http://127.0.0.1:7890';
  const curlArgs = [
    '-s',
    '--compressed',
    '-H',
    'Accept: application/vnd.github+json',
    '-H',
    `User-Agent: ${username}-profile-telemetry`,
  ];
  if (token) curlArgs.push('-H', `Authorization: Bearer ${token}`);
  if (proxy) curlArgs.push('-x', proxy);
  curlArgs.push(url);

  try {
    const { stdout } = await execFileAsync('curl', curlArgs);
    const data = JSON.parse(stdout);
    if (data.message && data.documentation_url) {
      throw new Error(`GitHub API error: ${data.message}`);
    }
    return data;
  } catch (err) {
    throw new Error(`Failed to request ${url}: ${err.message}`);
  }
}

async function getOwnedProjects() {
  const projects = [];
  for (let page = 1; ; page += 1) {
    const batch = await request(
      `https://api.github.com/users/${username}/repos?type=owner&sort=full_name&per_page=100&page=${page}`,
    );
    projects.push(...batch.filter((repository) => !repository.fork));
    if (batch.length < 100) break;
  }
  return projects;
}

async function getUpstreamPullRequests() {
  const query = encodeURIComponent(`is:pr author:${username} -user:${username}`);
  const first = await request(`https://api.github.com/search/issues?q=${query}&per_page=100&page=1`);
  const items = [...first.items];

  for (let page = 2; items.length < first.total_count && page <= 10; page += 1) {
    const next = await request(
      `https://api.github.com/search/issues?q=${query}&per_page=100&page=${page}`,
    );
    items.push(...next.items);
  }

  if (first.incomplete_results || items.length !== first.total_count) {
    throw new Error(
      `Upstream search is incomplete: received ${items.length} of ${first.total_count} pull requests.`,
    );
  }

  return { ...first, items };
}

async function getUpstreamRepositoryDetails(items) {
  const repositoryUrls = [...new Set(items.map((item) => item.repository_url))];
  return Promise.all(repositoryUrls.map((url) => request(url)));
}

async function loadProfileData() {
  if (snapshotPath) {
    const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
    return {
      projects: snapshot.owned,
      profile: snapshot.profile,
      upstreamSearch: snapshot.search,
      upstreamRepositories: snapshot.upstreamRepositories,
    };
  }

  const [projects, profile, upstreamSearch] = await Promise.all([
    getOwnedProjects(),
    request(`https://api.github.com/users/${username}`),
    getUpstreamPullRequests(),
  ]);
  const upstreamRepositories = await getUpstreamRepositoryDetails(upstreamSearch.items);
  return { projects, profile, upstreamSearch, upstreamRepositories };
}

function replaceTextById(source, id, value) {
  const pattern = new RegExp(`(<text\\b[^>]*\\bid="${id}"[^>]*>)[^<]*(</text>)`);
  if (!pattern.test(source)) {
    throw new Error(`Telemetry target not found: ${id}`);
  }
  return source.replace(pattern, `$1${value}$2`);
}

function formatCompactNumber(value) {
  if (value < 1_000) return String(value);
  if (value < 1_000_000) {
    return `${(value / 1_000).toFixed(1).replace(/\\.0$/, '')}K`;
  }
  return `${(value / 1_000_000).toFixed(2).replace(/0$/, '')}M`;
}

function pullRequestState(pullRequest) {
  if (pullRequest.merged_at ?? pullRequest.pull_request?.merged_at) return 'MERGED';
  return pullRequest.state.toUpperCase();
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildProjectModels(upstreamSearch, upstreamRepositories) {
  const pullsByRepository = new Map();
  for (const pullRequest of upstreamSearch.items) {
    const fullName = pullRequest.repository_url.split('/repos/')[1];
    const pulls = pullsByRepository.get(fullName) ?? [];
    pulls.push(pullRequest);
    pullsByRepository.set(fullName, pulls);
  }

  return upstreamRepositories.map((repository) => {
    const pulls = pullsByRepository.get(repository.full_name) ?? [];
    const merged = pulls.filter((pullRequest) => pullRequest.pull_request?.merged_at).length;
    const open = pulls.filter((pullRequest) => pullRequest.state === 'open').length;
    return {
      fullName: repository.full_name,
      url: repository.html_url,
      stars: repository.stargazers_count,
      pulls: pulls.length,
      open,
      merged,
      closed: pulls.length - open - merged,
    };
  });
}

function buildCategoryModels(projectModels) {
  const projectByName = new Map(projectModels.map((project) => [project.fullName, project]));
  const assigned = new Set();
  const categories = upstreamCategories.map((category) => {
    const duplicates = category.repositories.filter((fullName) => assigned.has(fullName));
    if (duplicates.length > 0) {
      throw new Error(`Upstream category mapping contains duplicates: ${duplicates.join(', ')}`);
    }
    const projects = category.repositories
      .map((fullName) => projectByName.get(fullName))
      .filter(Boolean)
      .sort((left, right) => right.stars - left.stars || left.fullName.localeCompare(right.fullName));
    projects.forEach((project) => assigned.add(project.fullName));
    return { ...category, projects };
  });

  const uncategorized = projectModels
    .filter((project) => !assigned.has(project.fullName))
    .sort((left, right) => right.stars - left.stars || left.fullName.localeCompare(right.fullName));

  if (uncategorized.length > 0) {
    console.warn(
      `Uncategorized upstream projects placed in OTHER: ${uncategorized
        .map((project) => project.fullName)
        .join(', ')}`,
    );
    categories.push({
      id: 'other',
      en: 'OTHER PUBLIC ENGINEERING',
      zh: '其他公开工程',
      icon: '🌐',
      color: '#789EAB',
      projects: uncategorized,
    });
  }

  return categories.filter((category) => category.projects.length > 0);
}

function renderMetricCard({ x, value, label, zh, color }) {
  const labelX = String(value).length > 3 ? 126 : 84;
  return `
    <g transform="translate(${x} 82)">
      <rect width="204" height="72" rx="14" fill="#FFFFFF" stroke="#D3E8EE"/>
      <text x="22" y="46" fill="${color}" font-size="28" font-weight="750">${escapeXml(value)}</text>
      <text x="${labelX}" y="31" fill="#2A879B" font-size="9.5" font-weight="750" letter-spacing="1.15">${escapeXml(label)}</text>
      <text x="${labelX}" y="51" fill="#789EAB" font-size="11">${escapeXml(zh)}</text>
    </g>`;
}

function renderCategoryCard(category, x, y, height) {
  const projectCount = category.projects.length;
  const pullCount = category.projects.reduce((sum, project) => sum + project.pulls, 0);
  const starCount = category.projects.reduce((sum, project) => sum + project.stars, 0);
  const rows = category.projects
    .map((project, index) => {
      const rowY = 94 + index * 29;
      const highlighted = highlightedRepositories.has(project.fullName);
      const state = `${project.pulls}PR · ${project.open}O/${project.merged}M/${project.closed}C`;
      return `
        <a href="${escapeXml(project.url)}" target="_blank" style="cursor:pointer">
          <g transform="translate(0 ${rowY})">
            <circle cx="24" cy="-4" r="${highlighted ? 4 : 2.6}" fill="${highlighted ? category.color : '#A8C6D0'}"/>
            <text x="36" y="0" fill="#0B6E8A" font-size="12.2" font-weight="${highlighted ? 750 : 620}" text-decoration="underline">${escapeXml(project.fullName)}</text>
            <text x="350" y="0" text-anchor="end" fill="#789EAB" font-size="9.8" font-weight="650">${state}</text>
            <text x="506" y="0" text-anchor="end" fill="#5F8A99" font-size="10.8" font-weight="700">★ ${formatCompactNumber(project.stars)}</text>
          </g>
        </a>`;
    })
    .join('');

  return `
    <g transform="translate(${x} ${y})" filter="url(#shadow)">
      <rect width="526" height="${height}" rx="17" fill="#FFFFFF" stroke="#D1E7ED"/>
      <rect width="6" height="${height}" rx="3" fill="${category.color}"/>
      <text x="24" y="30" fill="#123E52" font-size="13.2" font-weight="800" letter-spacing=".7">${escapeXml(category.en)}</text>
      <text x="24" y="51" fill="#648C99" font-size="12" font-weight="650">${escapeXml(category.zh)}</text>
      <text x="506" y="29" text-anchor="end" fill="${category.color}" font-size="10.2" font-weight="750">${projectCount} PROJECTS · ${pullCount} PR</text>
      <text x="506" y="50" text-anchor="end" fill="#789EAB" font-size="10.5">★ ${formatCompactNumber(starCount)} TOTAL</text>
      <path d="M24 68H506" stroke="#DCECF1"/>
      ${rows}
    </g>`;
}

function renderUpstreamMap({ categories, totals, refreshedOn }) {
  const categoryHeights = categories.map((category) => Math.max(144, 86 + category.projects.length * 29));
  const rowCount = Math.ceil(categories.length / 2);
  const rowHeights = Array.from({ length: rowCount }, (_, row) =>
    Math.max(categoryHeights[row * 2] ?? 0, categoryHeights[row * 2 + 1] ?? 0),
  );
  const rowOffsets = [];
  let nextY = 244;
  for (const height of rowHeights) {
    rowOffsets.push(nextY);
    nextY += height + 16;
  }
  const canvasHeight = nextY + 34;
  const cards = categories
    .map((category, index) =>
      renderCategoryCard(
        category,
        index % 2 === 0 ? 58 : 616,
        rowOffsets[Math.floor(index / 2)],
        rowHeights[Math.floor(index / 2)],
      ),
    )
    .join('');

  const metrics = [
    { value: totals.pulls, label: 'PUBLIC PRS', zh: '公开上游 PR', color: '#123E52' },
    { value: totals.open, label: 'OPEN', zh: '进行中', color: '#406E9A' },
    { value: totals.merged, label: 'MERGED', zh: '已合并', color: '#337E69' },
    { value: totals.projects, label: 'PROJECTS', zh: '覆盖项目', color: '#123E52' },
    { value: formatCompactNumber(totals.stars), label: 'PROJECT STARS', zh: '项目 Star 总数', color: '#2A879B' },
  ]
    .map((metric, index) => renderMetricCard({ ...metric, x: 58 + index * 220 }))
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="${canvasHeight}" viewBox="0 0 1200 ${canvasHeight}" role="img" aria-labelledby="title desc">
  <title id="title">LoulanYue upstream engineering map</title>
  <desc id="desc">All public upstream projects contributed to by LoulanYue, categorized by engineering role with live pull request and star telemetry.</desc>
  <defs>
    <linearGradient id="canvas" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FDFFFF"/>
      <stop offset=".55" stop-color="#F5FBFC"/>
      <stop offset="1" stop-color="#EBF7FA"/>
    </linearGradient>
    <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#63C6A7"/>
      <stop offset=".5" stop-color="#2A9DB2"/>
      <stop offset="1" stop-color="#5D86B3"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="9" flood-color="#397E91" flood-opacity=".08"/>
    </filter>
  </defs>
  <rect width="1200" height="${canvasHeight}" rx="22" fill="url(#canvas)"/>
  <rect x="1" y="1" width="1198" height="${canvasHeight - 2}" rx="21" fill="none" stroke="#B9DCE6" stroke-width="2"/>
  <rect x="32" y="34" width="5" height="${canvasHeight - 68}" rx="2.5" fill="url(#rail)"/>
  <g font-family="'Avenir Next', 'PingFang SC', 'Noto Sans CJK SC', ui-sans-serif, sans-serif">
    <text x="58" y="57" fill="#123E52" font-size="25" font-weight="750" letter-spacing="1.3">03 / UPSTREAM ENGINEERING MAP</text>
    <text x="650" y="57" fill="#2A879B" font-size="19" font-weight="700">上游工程版图</text>
    <text x="1142" y="54" text-anchor="end" fill="#4F7888" font-size="11.5" font-weight="700" letter-spacing="1.15">ALL PUBLIC PROJECTS · CATEGORIZED BY SYSTEM ROLE</text>
    ${metrics}
    <text x="58" y="188" fill="#24566A" font-size="15.2" font-weight="680">跨智能体运行时、AI 工作流、模型训练、数据接入与开发工具链开展上游工程。</text>
    <text x="58" y="214" fill="#648C99" font-size="12.8">Upstream engineering across agent runtimes, AI workflows, model training, data access, and developer tooling.</text>
    <text x="1142" y="188" text-anchor="end" fill="#2A879B" font-size="11.5" font-weight="750" letter-spacing="1.05">REPRODUCIBLE → REVIEWABLE → MAINTAINABLE</text>
    ${cards}
    <text x="58" y="${canvasHeight - 24}" fill="#4F7888" font-size="11.2" font-weight="700" letter-spacing="1.15">O / OPEN · M / MERGED · C / CLOSED, NOT MERGED · ● PRIORITY SYSTEMS</text>
    <text x="1142" y="${canvasHeight - 24}" text-anchor="end" fill="#4F7888" font-size="11.2">UPDATED ${refreshedOn} UTC · 每日自动更新</text>
  </g>
</svg>
`.replace(/[ \t]+$/gm, '');
}

function renderReadme({
  featuredItems,
  sortedUpstreamItems,
  categoryModels,
  totals,
  refreshedOn,
}) {
  const featuredRows = featuredItems
    .map((item) => {
      return `| [**\`${item.name}\`**](https://github.com/loulanyue/${item.name}) \`${item.meta.role}\` | \`★ ${item.stars.toLocaleString('en-US')}\` | **${item.meta.zh}** |`;
    })
    .join('\n');

  const upstreamRows = sortedUpstreamItems
    .map((item) => {
      const prUrl = `https://github.com/${item.owner}/${item.repo}/pull/${item.pull}`;
      const repoUrl = `https://github.com/${item.owner}/${item.repo}`;
      const stateBadge = item.state === 'MERGED'
        ? `\`MERGED\``
        : item.state === 'OPEN'
        ? `\`OPEN\``
        : `\`CLOSED\``;
      const starsFormatted = formatCompactNumber(item.repository.stargazers_count);
      return `| [**\`${item.owner}/${item.repo}\`**](${repoUrl}) \`★ ${starsFormatted}\` | [**\`PR #${item.pull}\`**](${prUrl}) ${stateBadge} | **${item.meta.topic}** · ${item.meta.zh} |`;
    })
    .join('\n');

  const categoryLists = categoryModels
    .map((category) => {
      const prSum = category.projects.reduce((sum, p) => sum + p.pulls, 0);
      const projectItems = category.projects
        .map((project) => {
          const starsCompact = formatCompactNumber(project.stars);
          return `  - [**\`${project.fullName}\`**](${project.url}) \`★ ${starsCompact}\` · ${project.pulls} PR (\`${project.open} Open\` / \`${project.merged} Merged\` / \`${project.closed} Closed\`)`;
        })
        .join('\n');
      return `- **${category.icon ?? '📁'} ${category.zh} · ${category.en}** (\`${category.projects.length} 项目 / ${prSum} PR\`)\n${projectItems}`;
    })
    .join('\n\n');

  return `<p align="center">
  <img src="./assets/profile-terminal.svg" width="100%" alt="LoulanYue — bilingual open-source AI systems engineering profile with live telemetry" />
</p>

<p align="center">
  <a href="#01-original-systems"><img alt="01 ORIGINAL SYSTEMS" src="https://img.shields.io/badge/01-ORIGINAL_SYSTEMS-2A9DB2?style=flat-square&labelColor=EAF6FA" /></a>&nbsp;
  <a href="#02-100k-upstream"><img alt="02 100K+ UPSTREAM" src="https://img.shields.io/badge/02-100K%2B_UPSTREAM-54A98E?style=flat-square&labelColor=EAF6FA" /></a>&nbsp;
  <a href="#03-engineering-map"><img alt="03 ENGINEERING MAP" src="https://img.shields.io/badge/03-ENGINEERING_MAP-5D86B3?style=flat-square&labelColor=EAF6FA" /></a>&nbsp;
  <a href="#04-principles"><img alt="04 PRINCIPLES" src="https://img.shields.io/badge/04-PRINCIPLES-C49435?style=flat-square&labelColor=EAF6FA" /></a>
</p>

---

<a id="01-original-systems"></a>

### \`01 / OPEN SYSTEMS\` · 自有开放系统

> 沉淀可复用的工程协议、多智能体控制面、能力层与系统知识架构，按实时星标倒序排列。

| 项目 / System | 实时星标 / Stars | 核心定位与工程说明 / Focus & Architecture |
|:---|:---:|:---|
${featuredRows}

<br />

---

<a id="02-100k-upstream"></a>

### \`02 / 100K+ UPSTREAM IMPACT\` · 头部上游工程

<p>
  <img alt="Upstream PRs" src="https://img.shields.io/badge/UPSTREAM_PRS-${totals.pulls}-123E52?style=flat-square&labelColor=EAF6FA" />
  <img alt="Merged" src="https://img.shields.io/badge/MERGED-${totals.merged}-337E69?style=flat-square&labelColor=EAF6FA" />
  <img alt="Open" src="https://img.shields.io/badge/OPEN_PRS-${totals.open}-406E9A?style=flat-square&labelColor=EAF6FA" />
  <img alt="100K+ Projects" src="https://img.shields.io/badge/100K%2B_PROJECTS-${sortedUpstreamItems.length}-2A9DB2?style=flat-square&labelColor=EAF6FA" />
  <img alt="Total Star Reach" src="https://img.shields.io/badge/TOTAL_STAR_REACH-${formatCompactNumber(totals.stars)}%2B-54A98E?style=flat-square&labelColor=EAF6FA" />
</p>

> 严格收录所有星标数大于 10 万且具备公开工程贡献的上游项目，项目与 PR 均可直接点击跳转。

| 上游项目 / Repository | 贡献 PR / Pull Request | 核心工程焦点与贡献说明 / Contribution Summary |
|:---|:---|:---|
${upstreamRows}

<br />

---

<a id="03-engineering-map"></a>

### \`03 / UPSTREAM ENGINEERING MAP\` · 上游工程版图

> 跨智能体运行时、AI 工作流平台、模型系统、数据接入与工程工具链展开的 ${totals.projects} 个公开上游项目协作。

<details open>
<summary><strong>展开查看全部上游项目分类与直达链接 / Explore ${totals.projects} Upstream Projects</strong></summary>
<br />

${categoryLists}

</details>

<br />

---

<a id="04-principles"></a>

### \`04 / SYSTEMS THESIS & OPERATING PRINCIPLES\` · 系统主张与工程原则

\`\`\`text
ZH  连接自有系统与上游基础设施，把可复现的问题转化为可审查、可维护、可持续演进的公共工程
EN  Connecting original systems with upstream infrastructure—turning reproducible failures into reviewable, maintainable, and evolvable public engineering
\`\`\`

<p align="center">
  <img alt="Java" src="https://img.shields.io/badge/Java-EAF6FA?style=flat-square&logo=openjdk&logoColor=0B7185" />
  <img alt="Python" src="https://img.shields.io/badge/Python-EAF6FA?style=flat-square&logo=python&logoColor=0B7185" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-EAF6FA?style=flat-square&logo=typescript&logoColor=0B7185" />
  <img alt="Rust" src="https://img.shields.io/badge/Rust-EAF6FA?style=flat-square&logo=rust&logoColor=0B7185" />
  <img alt="Shell" src="https://img.shields.io/badge/Shell-EAF6FA?style=flat-square&logo=gnubash&logoColor=0B7185" />
  <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-EAF6FA?style=flat-square&logo=githubactions&logoColor=0B7185" />
</p>

\`\`\`text
01  THINK IN SYSTEMS / 系统思考    02  GROUND IN EVIDENCE / 证据驱动    03  DESIGN FOR REVIEW / 面向审查    04  MAINTAIN FOR LONGEVITY / 长期维护
\`\`\`

<p align="center">
  <a href="https://github.com/pulls?q=is%3Apr+author%3Aloulanyue"><img alt="Explore upstream pull requests" src="https://img.shields.io/badge/UPSTREAM_PULL_REQUESTS-EXPLORE-2A9DB2?style=for-the-badge&labelColor=EAF6FA&logo=gitpullrequest&logoColor=0B5C75" /></a>
  <a href="https://github.com/loulanyue?tab=repositories"><img alt="Explore all repositories" src="https://img.shields.io/badge/ALL_PROJECTS-OPEN-54A98E?style=for-the-badge&labelColor=EAF6FA&logo=github&logoColor=0B5C75" /></a>
</p>

<p align="center">
  <sub>数据每日自动更新 · Updated ${refreshedOn} UTC via automated telemetry.</sub>
</p>
`;
}


const [
  { projects, profile, upstreamSearch, upstreamRepositories },
  currentBanner,
  currentFeatured,
  currentUpstream,
  currentUpstreamMap,
  currentReadme,
] = await Promise.all([
  loadProfileData(),
  readFile(bannerPath, 'utf8'),
  readFile(featuredPath, 'utf8'),
  readFile(upstreamPath, 'utf8'),
  readFile(upstreamMapPath, 'utf8').catch(() => ''),
  readFile(readmePath, 'utf8').catch(() => ''),
]);

if (upstreamSearch.incomplete_results) {
  throw new Error('Refusing to publish incomplete GitHub search results.');
}

const repositoryByName = new Map(projects.map((repository) => [repository.name, repository]));
const upstreamRepositoryByName = new Map(
  upstreamRepositories.map((repository) => [repository.full_name, repository]),
);
const pullByKey = new Map(
  upstreamSearch.items.map((pullRequest) => [
    `${pullRequest.repository_url.split('/repos/')[1]}#${pullRequest.number}`,
    pullRequest,
  ]),
);

const missingFeatured = featuredRepositories.filter((name) => !repositoryByName.has(name));
if (missingFeatured.length > 0) {
  throw new Error(`Featured repositories not found: ${missingFeatured.join(', ')}`);
}

const qualifiedUpstreamProjects = upstreamRepositories
  .filter((repository) => repository.stargazers_count > upstreamStarThreshold)
  .map((repository) => repository.full_name)
  .sort();
const selectedUpstreamProjects = upstreamContributions
  .map(({ owner, repo }) => `${owner}/${repo}`)
  .sort();
const missingQualifiedProjects = qualifiedUpstreamProjects.filter(
  (name) => !selectedUpstreamProjects.includes(name),
);
const ineligibleSelectedProjects = selectedUpstreamProjects.filter(
  (name) => !qualifiedUpstreamProjects.includes(name),
);

if (missingQualifiedProjects.length > 0 || ineligibleSelectedProjects.length > 0) {
  throw new Error(
    [
      `100K+ showcase must match every contributed project strictly above ${upstreamStarThreshold.toLocaleString('en-US')} stars.`,
      missingQualifiedProjects.length > 0 ? `Missing: ${missingQualifiedProjects.join(', ')}` : null,
      ineligibleSelectedProjects.length > 0
        ? `Below threshold: ${ineligibleSelectedProjects.join(', ')}`
        : null,
    ]
      .filter(Boolean)
      .join(' '),
  );
}

const selectedContributionDetails = upstreamContributions.map((contribution) => {
  const fullName = `${contribution.owner}/${contribution.repo}`;
  const repository = upstreamRepositoryByName.get(fullName);
  const pullRequest = pullByKey.get(`${fullName}#${contribution.pull}`);
  if (!repository || !pullRequest) {
    throw new Error(`Featured upstream contribution not found: ${fullName}#${contribution.pull}`);
  }
  const state = pullRequestState(pullRequest);
  const meta = upstreamMetadata[contribution.key] ?? {
    topic: 'UPSTREAM PR',
    zh: '上游工程贡献。',
    en: 'Public upstream contribution.',
  };
  return { ...contribution, repository, pullRequest, state, meta };
});

const totalStars = projects.reduce((sum, repository) => sum + repository.stargazers_count, 0);
const projectCount = projects.length;
const followerCount = profile.followers;
const refreshedOn = process.env.REFRESHED_ON ?? new Date().toISOString().slice(0, 10);
const upstreamMergedCount = upstreamSearch.items.filter(
  (item) => Boolean(item.pull_request?.merged_at),
).length;
const upstreamActiveCount = upstreamSearch.items.filter((item) => item.state === 'open').length;
const projectModels = buildProjectModels(upstreamSearch, upstreamRepositories);
const categoryModels = buildCategoryModels(projectModels);
const upstreamStarReach = projectModels.reduce((sum, project) => sum + project.stars, 0);

// Sort featured projects by stars descending
const featuredItems = featuredRepositories
  .map((name) => {
    const repo = repositoryByName.get(name);
    return {
      name,
      repo,
      stars: repo.stargazers_count,
      meta: featuredMetadata[name],
    };
  })
  .sort((a, b) => b.stars - a.stars);

// Sort 100K+ upstream contributions by live repo stars descending
const sortedUpstreamItems = [...selectedContributionDetails].sort(
  (a, b) => b.repository.stargazers_count - a.repository.stargazers_count,
);

let nextBanner = currentBanner;
nextBanner = replaceTextById(nextBanner, 'total-stars', totalStars.toLocaleString('en-US'));
nextBanner = replaceTextById(nextBanner, 'project-count', String(projectCount));
nextBanner = replaceTextById(nextBanner, 'follower-count', followerCount.toLocaleString('en-US'));
nextBanner = replaceTextById(
  nextBanner,
  'hero-upstream-pr-count',
  String(upstreamSearch.total_count),
);
nextBanner = replaceTextById(nextBanner, 'last-updated-banner', `UPDATED ${refreshedOn} UTC`);

let nextFeatured = currentFeatured;
for (const name of featuredRepositories) {
  const stars = repositoryByName.get(name).stargazers_count.toLocaleString('en-US');
  nextFeatured = replaceTextById(nextFeatured, `stars-${name}`, `★ ${stars}`);
}
nextFeatured = replaceTextById(
  nextFeatured,
  'last-updated-featured',
  `LIVE STARS · UPDATED ${refreshedOn} UTC · 星标自动更新`,
);

let nextUpstream = currentUpstream;
nextUpstream = replaceTextById(
  nextUpstream,
  'upstream-pr-count',
  String(upstreamSearch.total_count),
);
nextUpstream = replaceTextById(nextUpstream, 'upstream-merged-count', String(upstreamMergedCount));
nextUpstream = replaceTextById(nextUpstream, 'upstream-active-count', String(upstreamActiveCount));
nextUpstream = replaceTextById(
  nextUpstream,
  'upstream-project-count',
  String(qualifiedUpstreamProjects.length),
);
nextUpstream = replaceTextById(
  nextUpstream,
  'last-updated-upstream',
  `PR STATUS + STARS · UPDATED ${refreshedOn} UTC · 每日自动更新`,
);

for (const contribution of selectedContributionDetails) {
  nextUpstream = replaceTextById(
    nextUpstream,
    `state-${contribution.key}`,
    pullRequestState(contribution.pullRequest),
  );
  nextUpstream = replaceTextById(
    nextUpstream,
    `repo-stars-${contribution.key}`,
    `★ ${formatCompactNumber(contribution.repository.stargazers_count)}`,
  );
}

const nextUpstreamMap = renderUpstreamMap({
  categories: categoryModels,
  totals: {
    pulls: upstreamSearch.total_count,
    open: upstreamActiveCount,
    merged: upstreamMergedCount,
    projects: projectModels.length,
    stars: upstreamStarReach,
  },
  refreshedOn,
});

const nextReadme = renderReadme({
  featuredItems,
  sortedUpstreamItems,
  categoryModels,
  totals: {
    pulls: upstreamSearch.total_count,
    open: upstreamActiveCount,
    merged: upstreamMergedCount,
    projects: projectModels.length,
    stars: upstreamStarReach,
  },
  refreshedOn,
});

const changedFiles = [
  { path: bannerPath, current: currentBanner, next: nextBanner },
  { path: featuredPath, current: currentFeatured, next: nextFeatured },
  { path: upstreamPath, current: currentUpstream, next: nextUpstream },
  { path: upstreamMapPath, current: currentUpstreamMap, next: nextUpstreamMap },
  { path: readmePath, current: currentReadme, next: nextReadme },
].filter((file) => file.current !== file.next);

const status = [
  `${totalStars.toLocaleString('en-US')} stars across ${projectCount} owned projects`,
  `${upstreamSearch.total_count} upstream PRs across ${projectModels.length} projects`,
  `${upstreamStarReach.toLocaleString('en-US')} total upstream project stars`,
].join('; ');

if (changedFiles.length === 0) {
  console.log(`Profile telemetry is current: ${status}.`);
  process.exit(0);
}

if (checkOnly) {
  throw new Error(`Profile telemetry is stale. Expected ${status}.`);
}

await Promise.all(changedFiles.map((file) => writeFile(file.path, file.next)));
console.log(`Updated ${changedFiles.length} profile asset(s) and README.md: ${status}.`);
