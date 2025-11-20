#### 针对一个 vue 文件

##### 编译阶段：

##### npm run build 时发生的事情

1. TypeScript 类型检查
2. Vue SFC 编译 (template, script, style)
3. 依赖分析和打包
4. 静态资源处理（图片、字体等）
5. 代码压缩和优化
6. 生成最终的 bundle 文件

##### 运行阶段（浏览器中）：

// 1. 组件挂载时
const instance = createApp(OperationalReportOne);
// - Props 初始化
// - 计算属性求值
// - 模板首次渲染

// 2. 数据更新时  
currentRow.value = newData;
// - 响应式系统检测变化
// - 重新计算相关计算属性
// - 虚拟 DOM 对比
// - 更新真实 DOM

// 3. 用户交互时
// - 事件处理函数执行
// - 可能触发数据更新
// - 重新渲染相关部分

#### Docker 构建缓存的本质

1. Dockerfile 每一行命令（如 COPY、RUN）都会生成一层镜像（layer）。
2. 只要这一行的输入内容没变，Docker 就会用上次构建时的缓存，不会重新执行。
3. 一旦某一层的输入变了，这一层和后面的所有层都会重新执行。
4. 先 COPY 依赖声明文件，再 RUN 安装依赖，最后 COPY 业务代码。
   这样 node_modules 只会在依赖变动时才重装，业务代码变动不会影响依赖缓存。

注意点：
.dockerignore 文件，去掉不必要文件 这样在 copy ..阶段 I/O 操作更少，速度更快
node_modules
dist
.git
.gitignore
Dockerfile
npm-debug.log
\*.md
.vscode
.env

#### 两种不同的项目部署方式

1. 直接把 dist 文件放到服务器
   流程：
   用本地或 CI 构建出 dist 文件夹。
   通过 scp、ftp、ssh、Jenkins 等方式，把 dist 目录上传到服务器的指定目录。
   服务器上通常已经有 nginx、Apache 或其它 Web 服务器，配置好静态目录即可访问。
   特点：
   服务器环境和 Web 服务（如 nginx）是提前装好的，dist 只是静态资源。
   部署快，操作简单，适合传统静态站点。
   服务器环境不易统一，容易出现“本地能跑，线上有问题”。
   需要手动或脚本维护服务器上的 nginx 配置、依赖等。
2. 镜像部署（Docker 镜像）
   流程：
   用 Dockerfile 构建镜像，把 dist 文件（或整个服务环境）打包进镜像（如多阶段构建+nginx）。
   镜像推送到镜像仓库，服务器用 docker run 启动容器，容器内自带 nginx 并自动 serve dist。
   一台服务器可以跑多个不同版本的镜像，环境完全隔离。
   特点：
   部署环境、依赖、Web 服务都封装在镜像里，环境一致性极高。
   易于回滚、扩容、迁移，适合云原生、K8s 等现代运维体系。
   只需启动容器即可访问，无需手动配置 nginx。
   初期学习和配置成本略高，但长期维护简单。

##### 镜像部署如果想自定义 nginx 配置如何做？

项目根目录新建一个 nginx.conf 文件，
然后在 Dockerfile 里面加上下面得命令
COPY nginx.conf /etc/nginx/conf.d/default.conf
把你自定义的 nginx 配置覆盖到 nginx 镜像的默认配置。
