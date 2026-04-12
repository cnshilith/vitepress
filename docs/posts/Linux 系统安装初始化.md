# Linux 系统安装初始化

---

# 1、设置默认 shell 及默认语言为中文

### 1️⃣、你可以按照以下步骤将 Ubuntu 的默认 shell 设置为 zsh：

首先确保已安装 zsh。你可以在终端执行：

```bash
sudo apt-get install zsh
```

安装完成后，使用以下命令将默认 shell 切换为 zsh：

```bash
chsh -s $(which zsh)
```

退出当前终端，重新登录或重启终端，shell 就会变为 zsh。

### **手动下载常用插件**

### **(1) 语法高亮插件：`zsh-syntax-highlighting`**

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/plugins/zsh-syntax-highlighting
```

### **(2) 自动补全插件：`zsh-autosuggestions`**

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git ~/.zsh/plugins/zsh-autosuggestions
```

### **(3) 快速目录跳转：`z` (替代 `cd`)**

```bash
git clone https://github.com/rupa/z.git ~/.zsh/plugins/z
```

---

### **3. 配置插件**

编辑 **`~/.zshrc`** 文件：

```bash
nano ~/.zshrc
```

在文件中添加以下内容：

```bash
# 启用插件
plugins=(
  zsh-syntax-highlighting
  zsh-autosuggestions
  z
)

# 加载插件
source ~/.zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source ~/.zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/plugins/z/z.sh

# 其他自定义配置（可选）
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#808080"  # 设置自动补全提示颜色
```

保存并退出（**`Ctrl+X`** → **`Y`** → **`Enter`**）。

---

### **4. 应用配置**

```bash
source ~/.zshrc  # 立即生效
```

---

### **5. 验证插件**

- **语法高亮**：输入命令时，正确的命令显示绿色，错误的显示红色。
- **自动补全**：输入命令时会显示灰色提示，按 **`→`** 或 **`Ctrl+F`** 接受补全。
- **快速跳转**：输入 **`z 目录名`** 直接跳转到常用目录。

---

### **6. 其他实用插件（可选）**

- **历史命令搜索：`zsh-history-substring-search`**复制下载复制下载
  
    ```bash
    git clone https://github.com/zsh-users/zsh-history-substring-search ~/.zsh/plugins/zsh-history-substring-search
    ```
    
    在 **`~/.zshrc`** 中添加：
    
    ```bash
    source ~/.zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
    bindkey '^[[A' history-substring-search-up    # 上箭头键触发
    bindkey '^[[B' history-substring-search-down  # 下箭头键触发
    ```
    

---

### **7. 恢复默认配置**

如果出现问题，删除插件目录并清理 **`~/.zshrc`** 中的相关配置：

```bash
rm -rf ~/.zsh/plugins
nano ~/.zshrc  # 删除插件相关的行
```

### 2️⃣、设置系统言语为中文

### **更新软件包列表**

```bash
sudo apt update
```

### **安装中文语言包**

```bash
sudo apt install language-pack-zh-hans -y
```

### **配置系统区域设置**

运行以下命令生成中文语言环境：

```bash
sudo locale-gen zh_CN.UTF-8
```

### **修改默认系统语言**

编辑 **`/etc/default/locale`** 文件：

```bash
sudo nano /etc/default/locale
```

将内容修改为：

```bash
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh"
LC_ALL="zh_CN.UTF-8"
```

保存并退出（**`Ctrl+X`** → **`Y`** → **`Enter`**）。

### **应用配置**

- **临时生效**（当前会话）：
  
    ```bash
    export LANG=zh_CN.UTF-8
    ```
    
- **永久生效**：重启系统：
  
    ```bash
    sudo reboot
    ```
    

### **验证设置**

```bash
locale
```

输出应显示 **`zh_CN.UTF-8`** 作为主要语言。

---

# 2、安装主题美化

[**starship](https://starship.rs/zh-CN/guide/):**

**轻量、迅速、客制化的高颜值终端！**

- **快：** 很快 —— 真的真的非常快！ 🚀
- **客制化：** 可定制各种各样的提示符。
- **通用：** 适用于任何 Shell、任何操作系统。
- **智能：** 一目了然地显示相关信息。
- **功能丰富：** 支持所有你喜欢的工具。
- **易用：** 安装快速 —— 几分钟就可上手

### **🚀 安装**

### **前置要求**

- 安装并在终端启用 [**Nerd Font**](https://www.nerdfonts.com/) 字体（如 [**Fira Code Nerd Font**](https://www.nerdfonts.com/font-downloads) ）。

### **步骤 1. 安装 Starship**

从下面的列表中选择您的操作系统以查看安装指令：

安装最新版本:

```bash
curl -sS https://starship.rs/install.sh | sh
```

或者，使用以下任一软件包管理器安装Starship：

| **发行版** | **软件包来源** | **指令** |
| --- | --- | --- |
| ***任意发行版*** | [**crates.io**](https://crates.io/crates/starship) | `cargo install starship --locked` |
| *任意发行版* | [**conda-forge**](https://anaconda.org/conda-forge/starship) | `conda install -c conda-forge starship` |
| *任意发行版* | [**Linuxbrew**](https://formulae.brew.sh/formula/starship) | `brew install starship` |
| Alpine Linux 3.13+ | [**Alpine Linux Packages**](https://pkgs.alpinelinux.org/packages?name=starship) | `apk add starship` |
| Arch Linux | [**Arch Linux extra**](https://archlinux.org/packages/extra/x86_64/starship) | `pacman -S starship` |
| CentOS 7+ | [**Copr**](https://copr.fedorainfracloud.org/coprs/atim/starship) | `dnf copr enable atim/starshipdnf install starship` |
| Debian 13+ | [**Debian Main**](https://sources.debian.org/src/starship/1.22.1-1/) | `apt install starship` |
| Gentoo | [**Gentoo Packages**](https://packages.gentoo.org/packages/app-shells/starship) | `emerge app-shells/starship` |
| Manjaro |  | `pacman -S starship` |
| NixOS | [**nixpkgs**](https://github.com/NixOS/nixpkgs/blob/master/pkgs/tools/misc/starship/default.nix) | `nix-env -iA nixpkgs.starship` |
| openSUSE | [**OSS**](https://software.opensuse.org/package/starship) | `zypper in starship` |
| Ubuntu 25.04+ | [**Ubuntu Universe**](https://packages.ubuntu.com/source/plucky/starship) | `apt install starship` |
| Void Linux | [**Void Linux Packages**](https://github.com/void-linux/void-packages/tree/master/srcpkgs/starship) | `xbps-install -S starship` |

### **步骤 2. 设置您的 shell 以使用 Starship**

配置你的终端来初始化 starship。 请从下面列表选择你的终端：

*在 `~/.zshrc` 的最后，添加以下内容：*

```bash
eval "$(starship init zsh)"
```

### **步骤 3. 配置 Starship**

打开一个新的 Shell 实例，你应该就能看到漂亮的 Shell 新提示符了。 如果你对默认配置感到满意，那么开始使用吧！

如果你想进一步配置 Starship，查阅下列内容：

- [**配置**](https://starship.rs/config/)：学习如何配置 Starship 来调节提示符到你喜欢的样子。
- [**预设**](https://starship.rs/presets/)：从其他构建好的配置中获取灵感。

# 3、安装 `neovim`和配置插件

[**`neovim官网地址`**](https://neovim.io/)

[**`lazyvim插件`**](https://www.lazyvim.org/)

### **使用 Neovim 官方仓库（推荐）**

这种方法可以安装最新的稳定版本或预发布版本（Nightly）。

### **1. 添加 Neovim 官方仓库**

首先，更新软件包索引并安装必要的依赖：

```bash
sudo apt update
sudo apt install -y software-properties-common
```

然后，添加 Neovim 的官方仓库（适用于 Ubuntu 20.04/22.04/24.04）：

```bash
sudo add-apt-repository -y ppa:neovim-ppa/unstable  # 安装 Nightly 版本（最新开发版）
# 或者使用稳定版（推荐大多数用户）
sudo add-apt-repository -y ppa:neovim-ppa/stable
```

### **2. 安装 Neovim**

更新软件包索引并安装：

```bash
sudo apt update
sudo apt install -y neovim
```

### **3. 验证安装**

检查安装的版本：

```bash
nvim --version
```

## 安装 [LazyVim Starter](https://github.com/LazyVim/starter)

- 备份您当前的 Neovim 文件：
  
    ```bash
    # required
    mv ~/.config/nvim{,.bak}
    
    # optional but recommended
    mv ~/.local/share/nvim{,.bak}
    mv ~/.local/state/nvim{,.bak}
    mv ~/.cache/nvim{,.bak}
    ```
    
- 克隆启动器
  
    ```bash
    git clone https://github.com/LazyVim/starter ~/.config/nvim
    ```
    
- 删除.git文件夹，以便您稍后可以将其添加到您自己的回购中
  
    ```bash
    rm -rf ~/.config/nvim/.git
    ```
    
- 启动Neovim！
  
    ```bash
    nvim
    ```