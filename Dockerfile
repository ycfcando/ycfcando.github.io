# 第一阶段：构建镜像
FROM node:22.14-alpine AS builder

# 设置工作路径：即 docker 中的工作路径，没有路径它会自行创建
WORKDIR /image

# 优先复制包管理文件以利用 Docker 缓存
COPY package.json package-lock.json* ./

# 安装依赖（使用 ci 命令保持一致性）
RUN npm ci --registry=https://registry.npm.taobao.org

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：运行应用
FROM node:22.14-alpine AS runner

# 设置工作目录
WORKDIR /app

# 只从构建阶段复制必要文件
COPY --from=builder /image/package.json ./package.json
COPY --from=builder /image/package-lock.json ./package-lock.json
COPY --from=builder /image/node_modules ./node_modules
COPY --from=builder /image/.next ./.next
COPY --from=builder /image/src/mdx ./mdx

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE ${PORT}

# 启动命令
CMD ["npm", "start"]