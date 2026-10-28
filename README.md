# BEINING.UK

Hugo 个人作品集，中文展示 AI 应用与智能硬件实践。首页重点为 IELTS TODAY 和 InkPartner，其他项目和固件工具保留各自入口。

构建版本与 GitHub Pages 一致：Hugo Extended 0.162.1。

## 本地预览

```bash
make dev
```

如果本机没有 `make`，可以直接运行：

```bash
hugo server -D -F --disableFastRender --navigateToChanged --printPathWarnings
```

预览地址通常是 `http://localhost:1313/`。固件刷写页本地测试请用 Chrome 或 Edge 打开 `http://localhost:1313/firmware/`。

## 生产构建

```bash
make build
```

等价 Hugo 命令：

```bash
hugo --gc --minify --cleanDestinationDir --printPathWarnings
```

## 新增项目

```bash
make new-project name=my-new-board
```

然后编辑：

```text
content/projects/my-new-board/index.md
```

项目使用 leaf bundle。后续可以在同目录放：

```text
cover.webp
gallery/pcb-front.webp
gallery/pcb-back.webp
diagrams/system.svg
```

常用 front matter：

```yaml
draft: false
featured: true
category: "hardware"
status: "prototype"
```

`category` 可用值：`hardware`、`software`、`firmware`、`opensource`、`tool`、`notes`。

## 更新首页信息

首页个人介绍、个人链接、三项优势和联系方式集中维护在：

```text
data/home.yaml
```

首页项目卡片来自：

```text
content/projects/
```

设置 `featured: true` 的项目按 `weight` 顺序进入首页代表作品。项目 Markdown 可选字段：

```yaml
display_category: "AI 应用 / 语言学习"
status_label: "持续维护"
subtitle: "一句话说明使用价值"
contribution: "个人职责摘要"
capabilities: ["主要能力一", "主要能力二"]
showcase_layout: "desktop" # 或 phones
showcase:
  - src: "interface.jpg"
    alt: "具体界面说明"
showcase_caption: "界面演示 · 使用虚拟示例数据"
```

界面图片保存在对应项目目录，保留原始宽高比例。截图更新时使用虚拟数据，并同步更新图注；实物照片须先核对设备型号。没有上述可选字段的旧项目仍使用原有封面和图库。

## 更新固件

固件文件保持放在 `static/firmware/` 下，不进入 Hugo Pipes。

建议流程：

1. 把新固件放到 `static/firmware/<device>/`。
2. 更新对应 `manifest.json`，例如 `static/firmware/esp8266/v15-reader-2026-08-09/manifest.json`。
3. 本地运行 `make dev`。
4. 用 Chrome 或 Edge 访问 `http://localhost:1313/firmware/` 测试。
5. 推送前运行 `make build`。

Web Serial 页面逻辑在 `assets/js/firmware-upload.js`，只由 `/firmware/` 模板加载。

## 推送前检查

```bash
git status --short
node scripts/validate-firmware-release.mjs
make build
```

确认 `/projects/`、`/projects/4g-remote-switch/` 和 `/firmware/` 都能访问后再部署。
