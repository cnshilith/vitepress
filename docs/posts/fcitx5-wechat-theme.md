# fcitx5 仿微信输入法风格主题（适配 4K / 高 DPI）

> **用法**：把本文档**整篇**复制粘贴给另一台电脑上的 opencode（或其它 AI 编码助手），让它照着自动创建并启用主题。
>
> **目标效果**：fcitx5 候选框仿微信输入法——浅色/深色两套、5px 圆角、横排候选、绿色高亮项，并在 4K 屏和系统缩放下保持清晰。

---

## 给 AI 助手的指令

请在本机完成以下任务：为 fcitx5 创建 `wechat-light` 与 `wechat-dark` 两个主题，并适配 4K 屏 / 系统 DPI 缩放。按顺序执行：

1. 运行「0. 前置检查」确认环境
2. 用 **write 工具**创建 `theme.conf` 与 SVG 源文件（内容见第 2–4 节）
3. 用 **bash** 运行第 5 节命令生成 PNG 及 `@2x`/`@3x` 高清变体
4. 更新 `~/.config/fcitx5/conf/classicui.conf`（第 6 节）
5. 重启 fcitx5（第 7 节）并验证（第 8 节）

> 关键点：fcitx5 主题**没有 `border-radius`/`CornerRadius` 参数**，圆角必须用图片实现；`SupportedScale=3` + `@2x/@3x` 图片是高 DPI 下清晰的关键。

---

## 0. 前置检查

```bash
fcitx5 --version
magick -version | head -1
ls /usr/share/fcitx5/themes/default/theme.conf
```

- 需要 fcitx5 已安装并正在运行。
- 需要 ImageMagick 7（命令为 `magick`）。若只有 ImageMagick 6，把下文所有 `magick` 换成 `convert`。

---

## 1. 创建目录

```bash
mkdir -p ~/.local/share/fcitx5/themes/wechat-light ~/.local/share/fcitx5/themes/wechat-dark
```

---

## 2. 创建 `wechat-light/theme.conf`

用 write 工具写入 `~/.local/share/fcitx5/themes/wechat-light/theme.conf`：

```ini
[Metadata]
Name=WeChat Light
Name[zh_CN]=微信浅色
Version=1
Author=shilith
Description=仿微信输入法浅色主题
ScaleWithDPI=True
SupportedScale=3

[InputPanel]
NormalColor=#424242
HighlightColor=#ffffff
HighlightBackgroundColor=#75B100
HighlightCandidateColor=#ffffff
CandidateLabelColor=#999999
CandidateCommentColor=#999999
FullWidthHighlight=False
PageButtonAlignment=Last Candidate

[InputPanel/TextMargin]
Left=8
Right=8
Top=6
Bottom=6

[InputPanel/ContentMargin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/Background]
Image=panel.png
Color=#ffffff
BorderColor=#ffffff
BorderWidth=0

[InputPanel/Background/Margin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/Highlight]
Image=highlight.png
Color=#75B100
BorderColor=#75B100
BorderWidth=0

[InputPanel/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu]
NormalColor=#424242
HighlightCandidateColor=#ffffff

[Menu/Background]
Color=#ffffff
BorderColor=#e0e0e0
BorderWidth=1

[Menu/Background/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/Highlight]
Color=#75B100

[Menu/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/Separator]
Color=#e0e0e0

[Menu/TextMargin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/ContentMargin]
Left=2
Right=2
Top=2
Bottom=2
```

---

## 3. 创建 `wechat-dark/theme.conf`

用 write 工具写入 `~/.local/share/fcitx5/themes/wechat-dark/theme.conf`：

```ini
[Metadata]
Name=WeChat Dark
Name[zh_CN]=微信深色
Version=1
Author=shilith
Description=仿微信输入法深色主题
ScaleWithDPI=True
SupportedScale=3

[InputPanel]
NormalColor=#e9e9ea
HighlightColor=#ffffff
HighlightBackgroundColor=#75B100
HighlightCandidateColor=#ffffff
CandidateLabelColor=#999999
CandidateCommentColor=#999999
FullWidthHighlight=False
PageButtonAlignment=Last Candidate

[InputPanel/TextMargin]
Left=8
Right=8
Top=6
Bottom=6

[InputPanel/ContentMargin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/Background]
Image=panel.png
Color=#2e2925
BorderColor=#2e2925
BorderWidth=0

[InputPanel/Background/Margin]
Left=5
Right=5
Top=5
Bottom=5

[InputPanel/Highlight]
Image=highlight.png
Color=#75B100
BorderColor=#75B100
BorderWidth=0

[InputPanel/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu]
NormalColor=#e9e9ea
HighlightCandidateColor=#ffffff

[Menu/Background]
Color=#2e2925
BorderColor=#45403b
BorderWidth=1

[Menu/Background/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/Highlight]
Color=#75B100

[Menu/Highlight/Margin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/Separator]
Color=#45403b

[Menu/TextMargin]
Left=5
Right=5
Top=5
Bottom=5

[Menu/ContentMargin]
Left=2
Right=2
Top=2
Bottom=2
```

---

## 4. 创建 SVG 源文件

用 write 工具分别创建 4 个文件（圆角半径 `rx="5"`）：

`~/.local/share/fcitx5/themes/wechat-light/highlight.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="39" height="50">
    <rect width="39" height="50" rx="5" ry="5" fill="#75B100"/>
</svg>
```

`~/.local/share/fcitx5/themes/wechat-light/panel.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="100">
    <rect width="40" height="100" rx="5" ry="5" fill="#ffffff"/>
</svg>
```

`~/.local/share/fcitx5/themes/wechat-dark/highlight.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="39" height="50">
    <rect width="39" height="50" rx="5" ry="5" fill="#75B100"/>
</svg>
```

`~/.local/share/fcitx5/themes/wechat-dark/panel.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="100">
    <rect width="40" height="100" rx="5" ry="5" fill="#2e2925"/>
</svg>
```

---

## 5. 生成 PNG（1x / 2x / 3x）

`-density 192` 得到 2 倍图、`-density 288` 得到 3 倍图；`SupportedScale=3` 会让 fcitx5 在高 DPI 屏自动选用它们：

```bash
cd ~/.local/share/fcitx5/themes
for t in wechat-light wechat-dark; do
  for f in highlight panel; do
    magick -background none -depth 8 $t/$f.svg -define png:color-type=6 $t/$f.png
    magick -background none -density 192 -depth 8 $t/$f.svg -define png:color-type=6 $t/$f@2x.png
    magick -background none -density 288 -depth 8 $t/$f.svg -define png:color-type=6 $t/$f@3x.png
  done
done
```

验证尺寸应为：`highlight` = 39x50 / 78x100 / 117x150，`panel` = 40x100 / 80x200 / 120x300：

```bash
identify ~/.local/share/fcitx5/themes/wechat-light/*.png ~/.local/share/fcitx5/themes/wechat-dark/*.png
```

---

## 6. 更新 `~/.config/fcitx5/conf/classicui.conf`

确保文件中包含（或修改为）以下键值，其余行保留：

```ini
Font="Noto Sans CJK SC 16"
MenuFont="Noto Sans CJK SC 16"
TrayFont="Noto Sans CJK SC Bold 16"
Theme=wechat-light
DarkTheme=wechat-dark
UseDarkTheme=True
PerScreenDPI=True
EnableFractionalScale=True
UseAccentColor=False
```

> - `PerScreenDPI=True`：多屏不同 DPI 时按所在屏幕渲染。
> - `EnableFractionalScale=True`：Wayland 下启用分数缩放（如 1.25/1.75x），显著减少模糊。
> - 字体名按本机实际已安装字体调整（可用 `fc-list | grep -i "CJK"` 查询）。

若文件不存在，直接创建 `~/.config/fcitx5/conf/classicui.conf` 并写入上述内容即可。

---

## 7. 重启 fcitx5

```bash
pkill -x fcitx5; sleep 1; nohup fcitx5 -d >/dev/null 2>&1 &
```

（等价的图形方式：`fcitx5 -r`。）

---

## 8. 验证

1. 任意文本框输入拼音，观察候选框：
   - 浅色模式：白底、绿色高亮块、圆角、横排。
   - 深色模式：`#2e2925` 底、绿色高亮块。
2. 切换系统深浅色，确认自动在 `wechat-light` / `wechat-dark` 间切换。
3. 检查无主题加载错误：
   ```bash
   fcitx5-diagnose 2>&1 | grep -iE "theme|error|classicui"
   ```
4. 查看当前主题配置：
   ```bash
   grep -E "^Theme|^DarkTheme" ~/.config/fcitx5/conf/classicui.conf
   ```

---

## 9. 手动切换与微调

**图形界面切换**：终端运行 `fcitx5-configtool` → **附加组件 (Add-ons)** 标签 → 找到 **Classic UI** → 点齿轮 → **主题** 下拉框选 `WeChat Light`。

**字体大小**：改 `classicui.conf` 的 `Font`。注意数值是 **point** 大小（16pt ≈ 21px @96dpi）；若要严格 16px，改成 `12`。

**圆角半径**：
- 修改 `panel.svg` / `highlight.svg` 中的 `rx`；
- `theme.conf` 里对应的 `Margin` 必须 ≥ 圆角半径（让圆角完整落在 9-patch 角部内，否则会变形）；
- 重新生成 PNG：
  ```bash
  cd ~/.local/share/fcitx5/themes/wechat-light
  for d in 96 192 288; do
    s=""; [ $d = 192 ] && s="@2x"; [ $d = 288 ] && s="@3x"
    magick -background none -density $d -define png:color-type=6 highlight.svg highlight$s.png
    magick -background none -density $d -define png:color-type=6 panel.svg panel$s.png
  done
  ```

**仍偏模糊 / 锯齿**：在 `classicui.conf` 增加 `ForceWaylandDPI=192`（强制整数倍 DPI，避免分数缩放插值），或用更大的 `@Nx` 图（同时把 `SupportedScale` 调大）。

---

## 附：颜色对照表

| 元素 | theme.conf 键 | 浅色 | 深色 |
|---|---|---|---|
| 候选条背景 | `InputPanel/Background/Color` | `#ffffff` | `#2e2925` |
| 高亮候选背景 | `InputPanel/Highlight/Color`、`HighlightBackgroundColor` | `#75B100` | `#75B100` |
| 高亮候选文字 | `HighlightCandidateColor` | `#ffffff` | `#ffffff` |
| 普通候选文字 | `NormalColor` | `#424242` | `#e9e9ea` |
| 提示/拼音文字 | `CandidateCommentColor` | `#999999` | `#999999` |
| 候选序号 | `CandidateLabelColor` | `#999999` | `#999999` |
| 圆角半径 | 图片 `rx` + `Margin` | 5px | 5px |
