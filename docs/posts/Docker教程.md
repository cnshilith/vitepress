# Docker 教程

### Docker 的应用场景

- **微服务架构：**每个服务独立容器化，便于管理和扩展。
- **CI/CD流水线：**与 Jenkins/GitLab CI 集成，实现自动化构建和测试。
- **开发环境标准化：**新成员一键启动全套依赖服务（如数据库、消息队列）。
- **云原生基础：**Kubernetes 等编排工具基于 Docker 管理容器集群。

### 基本命令

```sh
# 拉取镜像（如官方Nginx镜像）
docker pull nginx

# 运行容器（-d 后台运行，-p 映射端口）
docker run -d -p 80:80 nginx

# 查看运行中的容器
docker ps

# 构建镜像（基于当前目录的Dockerfile）
docker build -t my-app .

# 进入容器内部
docker exec -it <容器ID> /bin/bash
```

### 相关链接

Docker 官网：[https://www.docker.com](https://www.docker.com/)

Github Docker 源码：https://github.com/docker

### Docker安装

#### Ubuntu Docker 安装

##### 使用官方安装脚本自动安装

安装命令如下：

```sh
# 下载并执行Docker官方安装脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker
```



#### Debian Docker安装

##### 卸载旧版本

如果你之前安装过 Docker Engine 之前，你需要卸载旧版本，避免冲突：

```sh
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

##### 使用官方安装脚本自动安装

安装命令如下：

```sh
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh
```

---

### Docker Compose

#### Compose 简介

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

如果你还不了解 YML 文件配置，可以先阅读 [YAML 入门教程](https://www.runoob.com/w3cnote/yaml-intro.html)。

Compose 使用的三个步骤：

- 使用 Dockerfile 定义应用程序的环境。
- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

docker-compose.yml 的配置案例如下（配置参数参考下文）：

``` yaml
# yaml 配置实例
version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```



#### Compose 安装

Linux 上我们可以从 Github 上下载它的二进制包来使用，最新发行的版本地址：https://github.com/docker/compose/releases。

运行以下命令以下载 Docker Compose 的当前稳定版本：

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

要安装其他版本的 Compose，请替换 v2.2.2。

> Docker Compose 存放在 GitHub，不太稳定。
>
> 你可以也通过执行下面的命令，高速安装 Docker Compose。
>
> ```sh
> curl -L https://get.daocloud.io/docker/compose/releases/download/v2.4.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
> ```

将可执行权限应用于二进制文件：

```sh
$ sudo chmod +x /usr/local/bin/docker-compose
```

创建软链：

```sh
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

测试是否安装成功：

```sh
$ docker-compose version
cker-compose version 1.24.1, build 4667896b
```

**注意**： 对于 alpine，需要以下依赖包： py-pip，python-dev，libffi-dev，openssl-dev，gcc，libc-dev，和 make。

##### macOS

Mac 的 Docker 桌面版和 Docker Toolbox 已经包括 Compose 和其他 Docker 应用程序，因此 Mac 用户不需要单独安装 Compose。Docker 安装说明可以参阅 [MacOS Docker 安装](https://www.runoob.com/docker/macos-docker-install.html)。

##### windows PC

Windows 的 Docker 桌面版和 Docker Toolbox 已经包括 Compose 和其他 Docker 应用程序，因此 Windows 用户不需要单独安装 Compose。Docker 安装说明可以参阅[ Windows Docker 安装](https://www.runoob.com/docker/windows-docker-install.html)。



#### docker-compose常用命令

```dockerfile
# 构建建启动nignx容器
docker-compose up -d nginx           

# 登录到nginx容器中
docker-compose exec nginx bash      

# 删除所有nginx容器,镜像
docker-compose down               

#  显示所有容器
docker-compose ps                 

# 重新启动nginx容器
docker-compose restart nginx          

# 在php-fpm中不启动关联容器，并容器执行php -v 执行完成后删除容器
docker-compose run --no-deps --rm php-fpm php -v 

# 构建镜像
docker-compose build nginx             

# 不带缓存的构建
docker-compose build --no-cache nginx  

# 查看nginx的日志
docker-compose logs nginx            

#  查看nginx的实时日志
docker-compose logs -f nginx         

# 验证（docker-compose.yml）文件配置，当配置正确时，不输出任何内容，当文件配置错误，输出错误信息。 
docker-compose config -q      

# 以json的形式输出nginx的docker日志
docker-compose events --json nginx    

# 暂停nignx容器
docker-compose pause nginx         

#  恢复ningx容器
docker-compose unpause nginx      

# 删除容器（删除前必须关闭容器）
docker-compose rm nginx            

# 停止nignx容器
docker-compose stop nginx          

# 启动nignx容器
docker-compose start nginx

# 查看容器ip
docker inspect <容器ID或名称> | grep "IPAddress"

```



---

### docker-compose搭建一个专属的密码管理工具——Vaultwarden

#### 创建安装目录

```sh
 sudo -i
 ​
 mkdir vaultwarden && cd vaultwarden
 ​
 vim docker-compose.yml
```

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    ports:
      - "8070:80"
    environment:
      WEBSOCKET_ENABLED: 'true'
      SIGNUPS_ALLOWED: 'true' # 此设置控制新用户是否可以在没有邀请的情况下注册账户。可能的值：true/false。
      WEB_VAULT_ENABLED: 'true' # 此设置决定了网络保险库是否可访问。一旦您配置了您的账户和客户端，停止您的容器，然后将此值切换为false并重启Vaultwarden，可以用来防止未授权访问。可能的值：true/false。
      ADMIN_TOKEN: 'YourReallyStrongAdminTokenHere' # 此值是Vaultwarden管理员面板的令牌（一种密码）。为了安全起见，这应该是一个长的随机字符串。如果未设置此值，则管理员面板将被禁用。建议openssl rand -base64 48 生成ADMIN_TOKEN确保安全
      DOMAIN: 'https://subdomain.yourdomain.com' # 这是您希望与您的Vaultwarden实例关联的域名
    volumes:
      - ./data:/data
```

>```
>DOMAIN改成最后你要用的域名形式
>
>ADMIN_TOKEN可以在ssh里面输入openssl rand -base64 48生成
>
>SIGNUPS_ALLOWED等你注册好之后，如果你只是想自己用，可以把这边改成false
>```

```sh
docker-compose up -d
```

#### 打开服务器防火墙并访问网页

打开服务器防火墙的端口 **8080**

#### 更新 vaultwarden

```sh
 cd vaultwarden
 ​
 docker-compose pull
 ​
 docker-compose up -d    # 请不要使用 docker-compose stop 来停止容器，因为这么做需要额外的时间等待容器停止；docker-compose up -d 直接升级容器时会自动停止并立刻重建新的容器，完全没有必要浪费那些时间。
 ​
 docker image prune  # prune 命令用来删除不再使用的 docker 对象。删除所有未被 tag 标记和未被容器使用的镜像
```

>提示：
>
>```sh
>WARNING! This will remove all dangling images.
> Are you sure you want to continue? [y/N] 
>```

#### 卸载 vaultwarden

进入安装页面，先停止所有容器。

```sh
 cd vaultwarden
 ​
 docker-compose down
 ​
 cd ..
 ​
 rm -rf vaultwarden  # 完全删除
```

---

### docker-compose搭建it-tools

GitHub官方仓库：https://github.com/CorentinTh/it-tools 官方Demo：https://it-tools.tech/

docker-compose.yaml:

```yaml
 services:
     it-tools:
         container_name: it-tools
         restart: unless-stopped
         ports:
             - '8380:80'  #8380可以修改成服务器上未使用过的其他端口
         image: 'corentinth/it-tools:latest'
```

#### 打开服务器防火墙并访问网页

查看端口是否被占用（以 8380 为例），输入：

```sh
 lsof -i:8380  #查看 8380 端口是否被占用，如果被占用，重新自定义一个端口
 
 -bash: lsof: command not found  #出现这段代码
 apt install lsof  #安装 lsof
```

如果啥也没出现，表示端口未被占用

---

### docker-compose搭建一个小而美的网站流量监控——umami

docker-compose.yaml:

```yaml
 services:
   umami:
     image: docker.umami.dev/umami-software/umami:postgresql-latest
     ports:
       - "3000:3000"
     environment:
       DATABASE_URL: postgresql://umami:umami@db:5432/umami
       DATABASE_TYPE: postgresql
       APP_SECRET: replace-me-with-a-random-string
     depends_on:
       - db
     restart: always
   db:
     image: postgres:15-alpine
     environment:
       POSTGRES_DB: umami
       POSTGRES_USER: umami
       POSTGRES_PASSWORD: umami
     volumes:
       - ./sql/schema.postgresql.sql:/docker-entrypoint-initdb.d/schema.postgresql.sql:ro
       - ./umami-db-data:/var/lib/postgresql/data
     restart: always
```

[【好玩的Docker项目】搭建一个小而美的网站流量监控——Umami-我不是咕咕鸽 (laoda.de)](https://blog.laoda.de/archives/umami)

---

### docker-compose搭建一个又小又快的文本、代码粘贴工具—— Hasty Paste

docker-compose.yaml:

```yaml
services:
  paste-bin:
    image: ghcr.io/enchant97/hasty-paste:latest
    container_name: hasty-paste
    restart: unless-stopped
    ports:
      - 8000:8000 # 左边的8000可以自行修改成服务器上没有使用的端口
    volumes:
      - ./data:/app/data

```

给data文件夹777权限

```sh
chmod 777 data
```

#### 参考资料

GitHub官方仓库：https://github.com/enchant97/hasty-paste

官方文档地址：https://enchantedcode.co.uk/hasty-paste/

---

### 用Docker创建Nginx，自动申请免费的域名证书，并且配置重定向或反向代理

#### 搭建nginx

##### 创建nginx目录结构

```sh
mkdir -p /home/nginx

touch /home/nginx/nginx.conf

mkdir -p /home/nginx/certs
```

##### 申请证书

```sh
curl https://get.acme.sh | sh

~/.acme.sh/acme.sh --register-account -m xxxx@gmail.com

~/.acme.sh/acme.sh --issue -d 自己的域名 --standalone
```

##### 下载证书

```sh
~/.acme.sh/acme.sh --install-cert -d www.shiyunhao.cn \
> --key-file /home/nginx/ssl/private.key \
> --fullchain-file /home/nginx/ssl/cert.crt
```

##### 进入目录编辑文件

```sh
cd /home/nginx/ && vim nginx.conf
```

##### 重定向配置，跳转到域名

```sh
events {

    worker_connections  1024;

}

http {

  server {

    listen 80;

    server_name a.**kjlion.gq**;

    return 301 https://**www.baidu.com**$request_uri;

  }

  server {

    listen 443 ssl http2;

    server_name a.**kjlion.gq**;

    ssl_certificate /etc/nginx/certs/cert.pem;

    ssl_certificate_key /etc/nginx/certs/key.pem;

    return 301 https://**www.baidu.com**$request_uri;

  }

}

  

**反向代理配置，代理指定IP加端口**

events {

    worker_connections  1024;

}

http {

  client_max_body_size 1000m;  

  server {

    listen 80;

    server_name b.**kjlion.gq**;

    return 301 https://$host$request_uri;

  }

  server {

    listen 443 ssl http2;

    server_name b.**kjlion.gq**;

    ssl_certificate /etc/nginx/certs/cert.crt;

    ssl_certificate_key /etc/nginx/certs/private.key;

    location / {

      proxy_pass http://**127.0.0.1:5212**;

      proxy_set_header Host $host;

      proxy_set_header X-Real-IP $remote_addr;

      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    }

  }

}

  

**代理静态网页的配置方式**

events {

    worker_connections  1024;

}

server {

    listen 80;

    server_name c.**kjlion.gq**;

    return 301 https://$server_name$request_uri;

}

server {

    listen 443 ssl http2;

    server_name c.**kjlion.gq**;

    ssl_certificate /etc/nginx/certs/cert.pem;

    ssl_certificate_key /etc/nginx/certs/key.pem;

    charset utf-8;  # 添加这行来指定编码

    location / {

        root /usr/share/nginx/html;

        index index.html;

    }

}

```

部署容器

```sh
docker run -d --name nginx -p 80:80 -p 443:443 -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/certs:/etc/nginx/certs -v /home/nginx/html:/usr/share/nginx/html nginx:latest
```

##### 查看运行状态

```sh
docker ps -a
```

##### 开机自启动

```sh
docker update --restart=always nginx
```

---

### Docker-compose搭建一个功能强大的开源问卷考试系统-卷王

[官方demo](https://s.surveyking.cn/)

>```
>admin  
>123456
>```

#### 创建docker-compose.yml文件

```yaml
services:
    surveyking:
        image: surveyking/surveyking  #镜像名
        volumes:
            - './logs:/surveyking/logs'      #目录映射
            - './files:/surveyking/files'    #目录映射
            - './surveyking.mv.db:/surveyking/surveyking.mv.db'  #文件映射
        ports:
            - '1991:1991' #端口映射,:左侧的1991可以自定义
        environment:
            - PUID=0    # 用户ID,在终端输入id可以查看当前用户的id
            - PGID=0    # 组ID同上
            - TZ=Asia/Shanghai  #时区，可以自定义
        restart: always  #总是启动
```

---

### docker-compose搭建ddns-go

docker-compose.yaml:

```yaml
services:
  ddns-go:
    image: jeessy/ddns-go:latest
    container_name: ddns-go
    restart: always
    network_mode: host
    volumes:
      - ./ddns-go/data:/root  # 配置文件持久化目录
    environment:
      - NET_INTERFACE=ens192
      - TZ=Asia/Shanghai  # 设置时区（可选）
```

---

### docker-compose搭建easyimage

docker-compose.yaml:

```yaml
services:
  easyimage:
    image: ddsderek/easyimage:latest
    container_name: easyimage
    ports:
      - '3578:80'
    environment:
      - TZ=Asia/Shanghai
      - PUID=0
      - PGID=0
    volumes:
      - './config:/app/web/config'
      - './images:/app/web/images'
    restart: unless-stopped
```

---

### docker-compose搭建halo

docker-compose.yaml:

```yaml
services:
  halo:
    image: halohub/halo:2.20
    container_name: halo
    restart: always
    depends_on:
      halodb:
        condition: service_healthy
    networks:
      halo_network:
    volumes:
      - ./:/root/.halo2
    ports:
      - "8090:8090"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8090/actuator/health/readiness"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 30s
    command:
      - --spring.r2dbc.url=r2dbc:pool:mysql://halodb:3306/halo
      - --spring.r2dbc.username=root
      # MySQL 的密码，请保证与下方 MYSQL_ROOT_PASSWORD 的变量值一致。
      - --spring.r2dbc.password=o#DwN&JSa56
      - --spring.sql.init.platform=mysql
      # 外部访问地址，请根据实际需要修改
      - --halo.external-url=https://www.shiyunhao.cn/
      # 初始化的超级管理员用户名
      - --halo.security.initializer.superadminusername=admin
      # 初始化的超级管理员密码
      - --halo.security.initializer.superadminpassword=shi13579

  halodb:
    image: mysql:8.0.31
    container_name: halodb
    restart: always
    networks:
      halo_network:
    command: 
      - --default-authentication-plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_general_ci
      - --explicit_defaults_for_timestamp=true
    volumes:
      - ./mysql:/var/lib/mysql
      - ./mysqlBackup:/data/mysqlBackup
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 3s
      retries: 5
      start_period: 30s
    environment:
      # 请修改此密码，并对应修改上方 Halo 服务的 SPRING_R2DBC_PASSWORD 变量值
      - MYSQL_ROOT_PASSWORD=o#DwN&JSa56
      - MYSQL_DATABASE=halo

networks:
  halo_network:
```

---

### docker-compose搭建linux-command

docker-compose.yaml:

```yaml
services:
    linux-command:   
        container_name: linux-command    
        ports:
            - '3002:3000'  
        environment:
            - PUID=0    
            - PGID=0    
            - TZ=Asia/Shanghai  
        restart: always    
        image: wcjiang/linux-command:latest
```

---

### docker-compose搭建nextcloud

docker-compose.yaml:

```yaml
version: '3.8'

services:
  db:
    image: docker.1ms.run/library/mariadb:10.6
    container_name: nextcloud-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: shi13579
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: nextcloud
    volumes:
      - ./db_data:/var/lib/mysql
    networks:
      - nextcloud-net
    # 👇 添加健康检查
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-pshi13579"]
      timeout: 20s
      retries: 10
      interval: 5s
      start_period: 15s

  nextcloud:
    image: docker.1ms.run/library/nextcloud:27-apache
    container_name: nextcloud-app
    restart: always
    ports:
      - "8080:80"
    # 👇 修改为等待 db 完全健康
    depends_on:
      db:
        condition: service_healthy  # ✅ 关键修复
      redis:
        condition: service_started
    environment:
      MYSQL_HOST: db
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: nextcloud
      NEXTCLOUD_ADMIN_USER: shilith
      NEXTCLOUD_ADMIN_PASSWORD: shi13579
      REDIS_HOST: redis
      REDIS_HOST_PORT: 6379
    volumes:
      - ./nextcloud_data:/var/www/html
    networks:
      - nextcloud-net

  redis:
    image: docker.1ms.run/library/redis:alpine
    container_name: nextcloud-redis
    restart: always
    networks:
      - nextcloud-net

volumes:
  db_data:
  nextcloud_data:

networks:
  nextcloud-net:
    driver: bridge
```

---

### docker-compose搭建uptime-kuma

docker-compose.yaml:

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma
    container_name: uptime-kuma
    restart: unless-stopped
    volumes:
      - ./data:/app/data
    ports:
      - 3001:3001
```

---

### docker-compose搭建stirling-pdf

docker-compose.yaml:

```yaml
services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    ports:
      - '8092:8080'
    volumes:
      - ./trainingData:/usr/share/tessdata #Required for extra OCR languages
      - ./extraConfigs:/configs
#      - ./customFiles:/customFiles/
#      - ./logs:/logs/
    environment:
      - DOCKER_ENABLE_SECURITY=false
      - INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false
    restart: always
```

---

### docker-compose搭建wordpress

docker-compose.yaml:

```yaml
services:
  db:
    image: mysql:8.0 # 使用mysql镜像，不建议修改版本号，后续如果要升级，千万记得备份数据库
    container_name: wordpress-db
    restart: unless-stopped
    command: --max-binlog-size=200M --expire-logs-days=2
    environment:
      MYSQL_ROOT_PASSWORD: shi13579 # 这里是上面的root密码
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress # 这里是原来的密码
    volumes:
      - './db:/var/lib/mysql'
    networks:
      - default

  app:
    image: wordpress:latest
    container_name: wordpress-app
    restart: unless-stopped
    ports:
      - 8086:80  # 按需修改,左边的8080可以改成服务器上没有用过的端口
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress # 按需修改
    volumes:
      - './app:/var/www/html'
    links:
      - db:db
    depends_on:
      - redis
      - db
    networks:
      - default

  redis:
    image: redis:alpine
    container_name: wordpress-redis
    restart: unless-stopped
    volumes:
      - ./redis-data:/data
    networks:
      - default

networks:
  default:
    name: wordpress
```

---

### docker-compose搭建yourls

docker-compose.yaml:

```yaml
services:

  mysql:
    image: mysql     
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
      - MYSQL_DATABASE=yourls
      - MYSQL_USER=yourls
      - MYSQL_PASSWORD=yourls
    volumes:
      - ./mysql/db/:/var/lib/mysql
      - ./mysql/conf/:/etc/mysql/conf.d
    restart: always
    container_name: mysql

  yourls:
    image: yourls
    restart: always
    ports:
      - "8200:80"
    environment:
      YOURLS_DB_HOST: mysql
      YOURLS_DB_USER: yourls
      YOURLS_DB_PASS: yourls
      YOURLS_DB_NAME: yourls
      YOURLS_USER: admin     
      YOURLS_PASS: admin   
      YOURLS_SITE: https://shil.top 
      YOURLS_HOURS_OFFSET: 8
    volumes:
      - ./yourls_data/:/var/www/html   
    container_name: yourls_service
    links:
      - mysql:mysql
```

---

### docker-compose搭建nginx-proxy-manager

docker-compose.yaml:

```yaml
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: always
    ports:
      # These ports are in format <host-port>:<container-port>
      - '30021:80' # Public HTTP Port
      - '30022:443' # Public HTTPS Port
      - '30020:81' # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    environment:
      TZ: "Asia/Shanghai"
      # Mysql/Maria connection parameters:
      DB_MYSQL_HOST: "db"
      DB_MYSQL_PORT: 3306
      DB_MYSQL_USER: "npm"
      DB_MYSQL_PASSWORD: "npm"
      DB_MYSQL_NAME: "npm"
      # Optional SSL (see section below)
      # DB_MYSQL_SSL: 'true'
      # DB_MYSQL_SSL_REJECT_UNAUTHORIZED: 'true'
      # DB_MYSQL_SSL_VERIFY_IDENTITY: 'true'
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db

  db:
    image: 'jc21/mariadb-aria:latest'
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 'npm'
      MYSQL_DATABASE: 'npm'
      MYSQL_USER: 'npm'
      MYSQL_PASSWORD: 'npm'
      MARIADB_AUTO_UPGRADE: '1'
    volumes:
      - ./mysql:/var/lib/mysql
```

