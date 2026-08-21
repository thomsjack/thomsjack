<p align="center">
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

### `01 / OPEN SYSTEMS` · 自有开放系统

> 沉淀可复用的工程协议、多智能体控制面、能力层与系统知识架构，按实时星标倒序排列。  
> *Reusable engineering protocols, multi-agent control planes, capability layers, and system knowledge architectures.*

| 项目 / Repository | 类型 / Role | 实时星标 / Stars | 核心定位与工程说明 / Description |
|:---|:---:|:---:|:---|
| [**`dream-xi-ai`**](https://github.com/loulanyue/dream-xi-ai) | `TEAM` | `★ 430` | **面向复杂交付的多智能体控制面，统一规划、执行、验证与风险治理。**<br><sub>*Control plane for multi-agent planning, execution, verification, and risk.*</sub> |
| [**`spec-kit-zh`**](https://github.com/loulanyue/spec-kit-zh) | `SPEC` | `★ 336` | **把规格、上下文与智能体协作编排为可复用的开放工程协议。**<br><sub>*Open protocol for specifications, context, and agent collaboration.*</sub> |
| [**`interview-notes`**](https://github.com/loulanyue/interview-notes) | `KNOW` | `★ 306` | **将后端知识重构为面向判断、设计与演进的工程决策系统。**<br><sub>*Backend knowledge organized for engineering judgment, design, and evolution.*</sub> |
| [**`awesome-claude-notes`**](https://github.com/loulanyue/awesome-claude-notes) | `DIST` | `★ 266` | **沉淀可移植的智能体能力层，跨工具复用角色、技能与工作流。**<br><sub>*Portable capability layer for agents, skills, and cross-tool workflows.*</sub> |

<br />

---

<a id="02-100k-upstream"></a>

### `02 / 100K+ UPSTREAM IMPACT` · 十万星上游工程

<p>
  <img alt="Upstream PRs" src="https://img.shields.io/badge/UPSTREAM_PRS-57-123E52?style=flat-square&labelColor=EAF6FA" />
  <img alt="Merged" src="https://img.shields.io/badge/MERGED-7-337E69?style=flat-square&labelColor=EAF6FA" />
  <img alt="Open" src="https://img.shields.io/badge/OPEN_PRS-23-406E9A?style=flat-square&labelColor=EAF6FA" />
  <img alt="100K+ Projects" src="https://img.shields.io/badge/100K%2B_PROJECTS-11-2A9DB2?style=flat-square&labelColor=EAF6FA" />
  <img alt="Total Star Reach" src="https://img.shields.io/badge/TOTAL_STAR_REACH-2.38M%2B-54A98E?style=flat-square&labelColor=EAF6FA" />
</p>

> 严格收录所有星标数大于 10 万且具备公开工程贡献的上游项目，项目与 PR 均可直接点击直达。  
> *All contributed upstream projects strictly above 100K stars, sorted by live star count descending with direct hyperlinks.*

| 上游项目 / Repository | 项目星标 / Stars | 贡献 PR / Pull Request | 状态 / State | 工程焦点与贡献说明 / Contribution Summary |
|:---|:---:|:---:|:---:|:---|
| [**`openclaw/openclaw`**](https://github.com/openclaw/openclaw) | `★ 387.0K` | [**`PR #121494`**](https://github.com/openclaw/openclaw/pull/121494) | `CLOSED` | **SESSION CONTINUITY** · 跨心跳与对话策略缺口保留会话上下文，减少重置与缓存抖动。<br><sub>*Preserves reusable session context across heartbeat and chat policy gaps.*</sub> |
| [**`NousResearch/hermes-agent`**](https://github.com/NousResearch/hermes-agent) | `★ 233.7K` | [**`PR #82992`**](https://github.com/NousResearch/hermes-agent/pull/82992) | `OPEN` | **APPROVAL SURFACE** · 让受保护文件写入在桌面端呈现明确审批，避免静默超时。<br><sub>*Surfaces protected file-write approvals in Desktop instead of timing out.*</sub> |
| [**`anomalyco/opencode`**](https://github.com/anomalyco/opencode) | `★ 199.7K` | [**`PR #38763`**](https://github.com/anomalyco/opencode/pull/38763) | `OPEN` | **MODEL REPLAY** · 保留失败回合的推理签名链，确保工具调用可被模型安全重放。<br><sub>*Preserves signed reasoning context for valid tool-call replay.*</sub> |
| [**`firecrawl/firecrawl`**](https://github.com/firecrawl/firecrawl) | `★ 170.2K` | [**`PR #4061`**](https://github.com/firecrawl/firecrawl/pull/4061) | `OPEN` | **BUILD CONTRACT** · 显式化原生客户端构建契约，让异构部署具备可复现前提。<br><sub>*Makes native client prerequisites explicit for reproducible deployment.*</sub> |
| [**`huggingface/transformers`**](https://github.com/huggingface/transformers) | `★ 164.3K` | [**`PR #47763`**](https://github.com/huggingface/transformers/pull/47763) | `OPEN` | **AUDIO EMBEDDING** · 修复 HuBERT 位置卷积在 BatchNorm 模式下的填充敏感性，消除音频嵌入偏移。<br><sub>*Fixes positional conv padding sensitivity in HuBERT when conv_pos_batch_norm=True.*</sub> |
| [**`langflow-ai/langflow`**](https://github.com/langflow-ai/langflow) | `★ 153.5K` | [**`PR #14177`**](https://github.com/langflow-ai/langflow/pull/14177) | `OPEN` | **MCP LIFECYCLE** · 把取消语义落实到传输生命周期，阻断后台任务与子进程泄漏。<br><sub>*Carries cancellation semantics through the transport lifecycle.*</sub> |
| [**`langgenius/dify`**](https://github.com/langgenius/dify) | `★ 153.1K` | [**`PR #40412`**](https://github.com/langgenius/dify/pull/40412) | `OPEN` | **ENDPOINT VALIDATION** · 把 404 视为服务可达的路径响应，修复外部知识 API 误判。<br><sub>*Treats HTTP 404 as reachable endpoint evidence during API validation.*</sub> |
| [**`open-webui/open-webui`**](https://github.com/open-webui/open-webui) | `★ 149.4K` | [**`PR #28218`**](https://github.com/open-webui/open-webui/pull/28218) | `CLOSED` | **MODEL RESOLUTION** · 避免自定义模型别名导致同一基础模型被重复移除。<br><sub>*Prevents alias resolution from removing the same base model twice.*</sub> |
| [**`langchain-ai/langchain`**](https://github.com/langchain-ai/langchain) | `★ 144.7K` | [**`PR #39215`**](https://github.com/langchain-ai/langchain/pull/39215) | `CLOSED` | **EXECUTION BOUNDARY** · 修复线程池执行器的生成器迭代器兼容性，守住异步与多线程执行边界。<br><sub>*Fixes generator iterable compatibility in ContextThreadPoolExecutor.map.*</sub> |
| [**`google-gemini/gemini-cli`**](https://github.com/google-gemini/gemini-cli) | `★ 106.6K` | [**`PR #28546`**](https://github.com/google-gemini/gemini-cli/pull/28546) | `CLOSED` | **AUTH BOUNDARY** · 隔离 API Key 与残留授权头，避免认证机制在请求边界相互污染。<br><sub>*Isolates API-key auth from stale authorization headers at request boundaries.*</sub> |
| [**`pytorch/pytorch`**](https://github.com/pytorch/pytorch) | `★ 102.5K` | [**`PR #191904`**](https://github.com/pytorch/pytorch/pull/191904) | `OPEN` | **RUNTIME COMPATIBILITY** · 修复 AOTInductor 在 CPU 架构指令集下级的判空兼容，保障编译导出可靠加载。<br><sub>*Fixes CPU ISA superset compatibility in _load_aoti for AOTInductor models.*</sub> |

<br />

---

<a id="03-engineering-map"></a>

### `03 / UPSTREAM ENGINEERING MAP` · 上游工程版图

> 跨智能体运行时、AI 工作流平台、模型系统、数据接入与工程工具链展开的 25 个公开上游项目协作。  
> *Covers 25 public upstream projects spanning agent runtimes, workflow platforms, ML systems, and developer tooling.*

<details open>
<summary><strong>展开查看全部上游项目分类与直达链接 / Explore Categorized Projects</strong></summary>
<br />

| 领域 / Domain | 上游项目清单与贡献状态 / Repositories & Telemetry |
|:---|:---|
| **🤖 智能体运行时与编码终端**<br><sub>AGENT RUNTIMES & CODING INTERFACES</sub> | • [**`openclaw/openclaw`**](https://github.com/openclaw/openclaw) `★ 387.0K` · 7 PR (1 O / 2 M / 4 C)<br>• [**`NousResearch/hermes-agent`**](https://github.com/NousResearch/hermes-agent) `★ 233.7K` · 5 PR (3 O / 0 M / 2 C)<br>• [**`anomalyco/opencode`**](https://github.com/anomalyco/opencode) `★ 199.7K` · 5 PR (1 O / 0 M / 4 C)<br>• [**`google-gemini/gemini-cli`**](https://github.com/google-gemini/gemini-cli) `★ 106.6K` · 1 PR (0 O / 0 M / 1 C) |
| **⚡ AI 工作流与体验平台**<br><sub>AI WORKFLOW & EXPERIENCE PLATFORMS</sub> | • [**`langflow-ai/langflow`**](https://github.com/langflow-ai/langflow) `★ 153.5K` · 3 PR (2 O / 0 M / 1 C)<br>• [**`langgenius/dify`**](https://github.com/langgenius/dify) `★ 153.1K` · 9 PR (7 O / 1 M / 1 C)<br>• [**`open-webui/open-webui`**](https://github.com/open-webui/open-webui) `★ 149.4K` · 8 PR (0 O / 0 M / 8 C)<br>• [**`langchain-ai/langchain`**](https://github.com/langchain-ai/langchain) `★ 144.7K` · 1 PR (0 O / 0 M / 1 C)<br>• [**`Comfy-Org/ComfyUI_frontend`**](https://github.com/Comfy-Org/ComfyUI_frontend) `★ 2.0K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`langgenius/graphon`**](https://github.com/langgenius/graphon) `★ 76` · 1 PR (1 O / 0 M / 0 C) |
| **🔌 数据、检索与工具接入**<br><sub>DATA, RETRIEVAL & TOOL CONNECTIVITY</sub> | • [**`firecrawl/firecrawl`**](https://github.com/firecrawl/firecrawl) `★ 170.2K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`diegosouzapw/OmniRoute`**](https://github.com/diegosouzapw/OmniRoute) `★ 52.1K` · 1 PR (0 O / 1 M / 0 C)<br>• [**`qdrant/qdrant`**](https://github.com/qdrant/qdrant) `★ 34.1K` · 1 PR (0 O / 0 M / 1 C)<br>• [**`teng-lin/notebooklm-py`**](https://github.com/teng-lin/notebooklm-py) `★ 18.8K` · 1 PR (0 O / 1 M / 0 C)<br>• [**`googleapis/mcp-toolbox`**](https://github.com/googleapis/mcp-toolbox) `★ 16.2K` · 1 PR (0 O / 0 M / 1 C) |
| **🧠 模型训练与机器学习系统**<br><sub>MODEL TRAINING & ML SYSTEMS</sub> | • [**`huggingface/transformers`**](https://github.com/huggingface/transformers) `★ 164.3K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`pytorch/pytorch`**](https://github.com/pytorch/pytorch) `★ 102.5K` · 2 PR (1 O / 0 M / 1 C)<br>• [**`vllm-project/vllm`**](https://github.com/vllm-project/vllm) `★ 89.6K` · 1 PR (0 O / 1 M / 0 C)<br>• [**`hiyouga/LlamaFactory`**](https://github.com/hiyouga/LlamaFactory) `★ 74.3K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`BerriAI/litellm`**](https://github.com/BerriAI/litellm) `★ 56.9K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`sktime/sktime`**](https://github.com/sktime/sktime) `★ 10.0K` · 1 PR (0 O / 1 M / 0 C) |
| **🛠️ Python 工程工具链**<br><sub>PYTHON ENGINEERING TOOLCHAIN</sub> | • [**`python-poetry/poetry`**](https://github.com/python-poetry/poetry) `★ 34.3K` · 1 PR (1 O / 0 M / 0 C)<br>• [**`facebook/pyrefly`**](https://github.com/facebook/pyrefly) `★ 6.9K` · 1 PR (1 O / 0 M / 0 C) |
| **📚 工程知识与生态**<br><sub>ENGINEERING KNOWLEDGE & ECOSYSTEMS</sub> | • [**`DuGuQiuBai/Java`**](https://github.com/DuGuQiuBai/Java) `★ 14.5K` · 1 PR (0 O / 0 M / 1 C)<br>• [**`baomidou/mybatis-plus-doc`**](https://github.com/baomidou/mybatis-plus-doc) `★ 753` · 1 PR (0 O / 0 M / 1 C) |

</details>

<br />

---

<a id="04-principles"></a>

### `04 / SYSTEMS THESIS & OPERATING PRINCIPLES` · 系统主张与工程原则

```text
ZH  连接自有系统与上游基础设施，把可复现的问题转化为可审查、可维护、可持续演进的公共工程
EN  Connecting original systems with upstream infrastructure—turning reproducible failures into reviewable, maintainable, and evolvable public engineering
```

<p align="center">
  <img alt="Java" src="https://img.shields.io/badge/Java-EAF6FA?style=flat-square&logo=openjdk&logoColor=0B7185" />
  <img alt="Python" src="https://img.shields.io/badge/Python-EAF6FA?style=flat-square&logo=python&logoColor=0B7185" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-EAF6FA?style=flat-square&logo=typescript&logoColor=0B7185" />
  <img alt="Rust" src="https://img.shields.io/badge/Rust-EAF6FA?style=flat-square&logo=rust&logoColor=0B7185" />
  <img alt="Shell" src="https://img.shields.io/badge/Shell-EAF6FA?style=flat-square&logo=gnubash&logoColor=0B7185" />
  <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-EAF6FA?style=flat-square&logo=githubactions&logoColor=0B7185" />
</p>

```text
01  THINK IN SYSTEMS / 系统思考    02  GROUND IN EVIDENCE / 证据驱动    03  DESIGN FOR REVIEW / 面向审查    04  MAINTAIN FOR LONGEVITY / 长期维护
```

<p align="center">
  <a href="https://github.com/pulls?q=is%3Apr+author%3Aloulanyue"><img alt="Explore upstream pull requests" src="https://img.shields.io/badge/UPSTREAM_PULL_REQUESTS-EXPLORE-2A9DB2?style=for-the-badge&labelColor=EAF6FA&logo=gitpullrequest&logoColor=0B5C75" /></a>
  <a href="https://github.com/loulanyue?tab=repositories"><img alt="Explore all repositories" src="https://img.shields.io/badge/ALL_PROJECTS-OPEN-54A98E?style=for-the-badge&labelColor=EAF6FA&logo=github&logoColor=0B5C75" /></a>
</p>

<p align="center">
  <sub>数据每日自动更新 · Updated 2026-08-21 UTC via automated telemetry.</sub>
</p>
