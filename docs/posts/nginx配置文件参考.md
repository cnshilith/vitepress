### **1. 配置文件结构**
Nginx 配置文件通常位于 `/etc/nginx/nginx.conf`，并通过 `include` 指令加载其他配置（如站点配置在 `/etc/nginx/conf.d/` 或 `/etc/nginx/sites-enabled/`）。

```nginx
# 全局配置（影响所有层级）
user nginx;          # 运行Nginx的用户和组
worker_processes auto; # 工作进程数（通常设为CPU核心数）
error_log /var/log/nginx/error.log warn; # 错误日志路径和级别

# 事件模块配置
events {
    worker_connections 1024; # 每个进程的最大连接数
    use epoll;               # 高效事件模型（Linux）
}

# HTTP模块配置
http {
    include /etc/nginx/mime.types;  # 包含MIME类型定义
    default_type application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;        # 启用高效文件传输
    tcp_nopush on;      # 优化数据包发送
    keepalive_timeout 65; # 长连接超时时间

    # 加载其他配置（如虚拟主机）
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### **2. 常见场景配置示例**

#### **场景1：静态文件服务**
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;       # 静态文件根目录
        index index.html index.htm;
        try_files $uri $uri/ =404; # 按顺序查找文件
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

#### **场景2：反向代理到应用服务器**
```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:3000; # 转发到本地的Node.js应用
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### **场景3：启用HTTPS（SSL/TLS）**
```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;       # 安全协议版本
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256; # 加密套件
    ssl_prefer_server_ciphers on;

    location / {
        root /var/www/html;
        index index.html;
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

#### **场景4：负载均衡**
```nginx
http {
    upstream backend {
        server 10.0.0.1:8080 weight=3; # 权重3，处理更多请求
        server 10.0.0.2:8080;
        server 10.0.0.3:8080 backup;   # 备用服务器
    }

    server {
        listen 80;
        server_name loadbalancer.example.com;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

#### **场景5：URL重写与重定向**
```nginx
server {
    listen 80;
    server_name old.example.com;

    # 永久重定向到新域名
    return 301 https://new.example.com$request_uri;
}

server {
    listen 80;
    server_name example.com;

    # 重写旧路径到新路径
    location /old-path {
        rewrite ^/old-path/(.*)$ /new-path/$1 permanent;
    }
}
```

---

### **3. 关键调试技巧**
1. **检查语法错误**  
   ```bash
   nginx -t
   ```

2. **重新加载配置（不中断服务）**  
   ```bash
   nginx -s reload
   ```

3. **查看日志定位问题**  
   - 错误日志：`tail -f /var/log/nginx/error.log`
   - 访问日志：`tail -f /var/log/nginx/access.log`

4. **常见错误排查**  
   - **502 Bad Gateway**：上游服务未启动或代理配置错误。
   - **403 Forbidden**：文件权限不足或 `root` 路径错误。
   - **404 Not Found**：文件不存在或 `try_files` 配置不当。

---

### **4. 性能与安全优化**
- **启用Gzip压缩**  
  ```nginx
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
  ```

- **缓存静态资源**  
  ```nginx
  location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
      expires 30d;
      add_header Cache-Control "public, no-transform";
  }
  ```

- **隐藏Nginx版本号**  
  ```nginx
  server_tokens off;
  ```

- **安全头设置**  
  ```nginx
  add_header X-Content-Type-Options "nosniff";
  add_header X-Frame-Options "SAMEORIGIN";
  add_header Content-Security-Policy "default-src 'self'";
  ```

