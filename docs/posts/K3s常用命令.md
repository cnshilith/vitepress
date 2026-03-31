---
title: k3s 服务管理命令
date: 2026-03-31
---

# K3s常用命令

### 1. k3s 服务管理命令

这些命令用于启动、停止、查看 k3s 服务的状态。

| 命令                         | 说明                         |
| :--------------------------- | :--------------------------- |
| `sudo systemctl start k3s`   | 启动 k3s 服务（Server 节点） |
| `sudo systemctl stop k3s`    | 停止 k3s 服务                |
| `sudo systemctl restart k3s` | 重启 k3s 服务                |
| `sudo systemctl status k3s`  | 查看 k3s 服务状态            |
| `sudo systemctl enable k3s`  | 设置 k3s 开机自启            |
| `sudo systemctl disable k3s` | 禁用 k3s 开机自启            |

**对于 Agent 节点，将 `k3s` 替换为 `k3s-agent`**，例如：`sudo systemctl status k3s-agent`。

------

### 2. k3s 特定命令

这些是 `k3s` 命令行工具本身的功能。

| 命令                                         | 说明                                              |
| :------------------------------------------- | :------------------------------------------------ |
| `k3s --version`                              | 查看 k3s 版本                                     |
| `k3s kubectl ...`                            | 运行 kubectl 命令（详见下一节）                   |
| `k3s crictl ...`                             | 直接使用容器运行时命令行工具（默认为 containerd） |
| `sudo k3s crictl ps`                         | 查看 k3s 管理的容器                               |
| `sudo k3s crictl images`                     | 查看 k3s 管理的镜像                               |
| `sudo k3s etcd-snapshot save`                | 为内嵌的 etcd 创建快照（备份）                    |
| `cat /var/lib/rancher/k3s/server/node-token` | **查看 Node Token**，用于添加 Agent 节点          |

------

### 3. kubectl 核心命令

这是最常用的部分，用于与 Kubernetes 集群交互。所有命令都通过 `k3s kubectl` 执行，或者将 kubeconfig 文件（默认为 `/etc/rancher/k3s/k3s.yaml`）导出后直接使用 `kubectl`。

**配置环境变量（方便直接使用 `kubectl`）：**

bash

```
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
# 然后就可以直接使用 kubectl 了
kubectl get nodes
```



#### 3.1 集群信息与资源查看

| 命令                                    | 说明                                          |
| :-------------------------------------- | :-------------------------------------------- |
| `k3s kubectl get nodes`                 | 查看所有节点及其状态                          |
| `k3s kubectl describe node <node-name>` | 查看指定节点的详细信息                        |
| `k3s kubectl get pods -A`               | **查看所有命名空间的 Pod**                    |
| `k3s kubectl get pods -n <namespace>`   | 查看指定命名空间的 Pod                        |
| `k3s kubectl get svc -A`                | 查看所有服务                                  |
| `k3s kubectl get deployments -A`        | 查看所有部署                                  |
| `k3s kubectl get namespaces`            | 查看所有命名空间                              |
| `k3s kubectl cluster-info`              | 显示集群基本信息                              |
| `k3s kubectl top nodes`                 | 查看节点资源使用情况（需安装 metrics-server） |
| `k3s kubectl top pods`                  | 查看 Pod 资源使用情况                         |

#### 3.2 Pod 管理

| 命令                                                        | 说明                           |
| :---------------------------------------------------------- | :----------------------------- |
| `k3s kubectl describe pod <pod-name> -n <namespace>`        | 查看 Pod 的详细描述和事件      |
| `k3s kubectl logs <pod-name> -n <namespace>`                | 查看 Pod 日志                  |
| `k3s kubectl logs -f <pod-name> -n <namespace>`             | **实时跟踪（Follow）Pod 日志** |
| `k3s kubectl exec -it <pod-name> -n <namespace> -- /bin/sh` | **进入 Pod 的容器内部**        |
| `k3s kubectl delete pod <pod-name> -n <namespace>`          | 删除一个 Pod                   |
| `k3s kubectl apply -f <file.yaml>`                          | 通过 YAML 文件创建或更新资源   |
| `k3s kubectl delete -f <file.yaml>`                         | 删除通过 YAML 文件创建的资源   |

#### 3.3 部署与故障排查

| 命令                                                         | 说明                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| `k3s kubectl create deployment <name> --image=<image>`       | 创建一个部署                               |
| `k3s kubectl expose deployment <name> --port=80 --type=NodePort` | 为部署创建一个 Service                     |
| `k3s kubectl scale deployment/<name> --replicas=3`           | 扩容/缩容 Pod 副本数                       |
| `k3s kubectl edit deployment/<name>`                         | 在线编辑部署配置                           |
| `k3s kubectl api-resources`                                  | 查看所有可用的 API 资源类型                |
| `k3s kubectl explain <resource>`                             | 查看某个资源的字段说明，写 YAML 时非常有用 |

------

### 4. 卸载 k3s

如果需要完全卸载 k3s，请在各个节点上执行其自带的卸载脚本。

| 命令                                         | 说明                                   |
| :------------------------------------------- | :------------------------------------- |
| `sudo /usr/local/bin/k3s-uninstall.sh`       | **在 Server 节点上执行，彻底卸载 k3s** |
| `sudo /usr/local/bin/k3s-agent-uninstall.sh` | **在 Agent 节点上执行，彻底卸载 k3s**  |

------

### 常用命令组合与技巧

1. **快速查看所有运行中的 Pod：**

   bash

   ```
   k3s kubectl get pods -A --field-selector=status.phase=Running
   ```

   

2. **查看 Pod 的完整定义（用于写 YAML 参考）：**

   bash

   ```
   k3s kubectl get pod <pod-name> -n <namespace> -o yaml
   ```

   

3. **强制删除一个卡在 `Terminating` 状态的 Pod：**

   bash

   ```
   k3s kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
   ```

   

4. **端口转发（将本地端口映射到集群中的 Pod）：**

   bash

   ```
   k3s kubectl port-forward <pod-name> 8080:80 -n <namespace>
   # 然后可以在本地通过 http://localhost:8080 访问 Pod 的 80 端口
   ```

   

5. **查看 Service 的 Endpoints（确认 Pod 是否被正确关联）：**

   bash

   ```
   k3s kubectl get endpoints <service-name> -n <namespace>
   ```