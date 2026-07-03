# BEINING.UK

Hugo 个人站点，定位为智能硬件、IoT、固件工具和开源项目作品集。

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

`category` 可用值：`hardware`、`firmware`、`opensource`、`tool`、`notes`。

## 更新首页信息

首页 Hero、按钮、统计、技能、固件工具入口、创作记录和联系方式集中维护在：

```text
data/home.yaml
```

首页项目卡片来自：

```text
content/projects/
```

设置 `featured: true` 的项目会进入首页精选项目。

## 更新固件

固件文件保持放在 `static/firmware/` 下，不进入 Hugo Pipes。

建议流程：

1. 把新固件放到 `static/firmware/<device>/`。
2. 更新对应 `manifest.json`，例如 `static/firmware/esp32/manifest.json`。
3. 本地运行 `make dev`。
4. 用 Chrome 或 Edge 访问 `http://localhost:1313/firmware/` 测试。
5. 推送前运行 `make build`。

Web Serial 页面逻辑在 `assets/js/firmware-upload.js`，只由 `/firmware/` 模板加载。

## 二手闲置

`/secondhand/` 保留为辅助页面，入口放在页脚。商品数据集中维护在：

```text
data/secondhand/products.yaml
```

将商品 `sold` 改为 `true` 后，构建时会自动从列表隐藏。

## 推送前检查

```bash
git status --short
make build
```

确认 `/projects/`、`/projects/4g-remote-switch/`、`/firmware/` 和 `/secondhand/` 都能访问后再部署。
