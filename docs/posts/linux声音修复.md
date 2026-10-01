linux声音修复，先改 PipeWire，再装 EasyEffects，最后导入一个“比 Windows 更饱满一点”的初始 EQ。

### 第一步：先改 PipeWire 重采样质量

终端里执行：

```bash
mkdir -p ~/.config/pipewire
```

然后编辑：

```bash
nano ~/.config/pipewire/pipewire-pulse.conf
```

在文件里找到或添加这两段：

```conf
context.properties = {
    default.clock.rate = 48000
    default.clock.allowed-rates = [ 44100 48000 88200 96000 192000 ]
}

stream.properties = {
    resample.quality = 10
}
```

保存后重启音频服务：

```bash
systemctl --user restart wireplumber pipewire pipewire-pulse
```

如果重启后出现爆音、卡顿，把 `resample.quality` 改成 `8` 再试。

### 第二步：在 Fedora 上装 EasyEffects

Fedora 自带仓库里的 EasyEffects 版本可能偏旧，建议用 Flatpak：

```bash
flatpak install flathub com.github.wwmm.easyeffects
```

如果提示没有 Flatpak，先装：

```bash
sudo dnf install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

装完后打开 EasyEffects，确认顶部选的是 **Output**。

### 第三步：装社区预设包

社区预设里有比较成熟的 EQ 方案，比如 Perfect EQ、Bass Enhancing + Perfect EQ 这类。

终端执行：

```bash
git clone https://github.com/JackHack96/EasyEffects-Presets.git ~/easyeffects-presets
```

然后把预设复制过去：

```bash
mkdir -p ~/.var/app/com.github.wwmm.easyeffects/config/easyeffects/output
cp ~/easyeffects-presets/*.json ~/.var/app/com.github.wwmm.easyeffects/config/easyeffects/output/
```

如果预设包里还有 `irs` 文件夹，也一起复制：

```bash
mkdir -p ~/.var/app/com.github.wwmm.easyeffects/config/easyeffects/irs
cp ~/easyeffects-presets/irs/*.irs ~/.var/app/com.github.wwmm.easyeffects/config/easyeffects/irs/
```

路径可能随社区仓库更新变化，如果 `output` 目录里没有 `.json` 文件，就进仓库看一下当前目录结构。

然后重启 EasyEffects：
```fish
pkill -f easyeffects
flatpak run com.github.wwmm.easyeffects &
disown
```

### 第四步：在 EasyEffects 里启用预设

1. 打开 EasyEffects。
2. 顶部选 **Output**。
3. 右上角打开 **Presets**。
4. 在预设列表里先试：
   - `ziyad_perfecteq`
   - `Bass Enhancing + Perfect EQ`
5. 播放一段熟悉的音乐，听低频和高频是否更舒服。

如果觉得低音太重，就换回 `ziyad_perfecteq`；如果觉得还是不够饱满，再试 `Boosted`。

### 第五步：手动建一个轻度 EQ 预设

如果不想用社区预设，也可以手动加一个比较稳的初始 EQ。

在 EasyEffects 里：

1. 选 **Output**。
2. 点 **Add Plugin**。
3. 添加 **Equalizer**。
4. 按下面先轻调：

| 频段 | 调整 |
|---|---|
| 32Hz | +3dB |
| 64Hz | +2dB |
| 125Hz | +1dB |
| 500Hz | -1dB |
| 1kHz | -1dB |
| 4kHz | +2dB |
| 8kHz | +2dB |
| 16kHz | +2dB |

这个参数参考了社区 Perfect EQ 的思路，但更保守一点。  
调完后点预设菜单，保存成自己的预设，比如叫 `Fedora Warm`。

### 第六步：让 EasyEffects 开机自动生效

EasyEffects 通常有开机自启选项。装好 Flatpak 后，可以在设置里打开：

- 启动时自动运行；
- 启动后自动加载你保存的预设。

如果 Flatpak 版自启不生效，可以手动加一个 systemd 用户服务，或者先暂时每次开机手动打开它。

### 怎么判断有没有效果

调完后用同一首歌、同一音量、同一播放器对比：

- 低频是否更厚一点；
- 人声是否更清楚；
- 高频是否不再发闷；
- 有没有爆音、失真、延迟。

如果声音变糊，就把低频增益从 +3/+2 降到 +1；如果声音变尖，就把 8kHz、16kHz 降到 +1 或 0。

这套流程对你现在的 Fedora 环境来说不难，基本就是：**改 PipeWire 配置 → 装 EasyEffects → 导入预设 → 轻调 EQ → 保存预设**。

打开后在 Output → Presets 里应该就能看到：

`Perfect EQ`

`Bass Enhancing + Perfect EQ`

`Boosted`

`Advanced Auto Gain`

`Dolby Atmos`

建议先试 `Perfect EQ`，如果觉得声音还是偏薄，再换 `Bass Enhancing + Perfect EQ`。