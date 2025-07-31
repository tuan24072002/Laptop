# Stage 1: Build stage
FROM node:18-alpine AS builder

# Cài đặt các dependencies hệ thống cần thiết cho build (ví dụ: python, make, g++)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy các file package.json và package-lock.json của server
COPY package*.json ./

# Copy file package.json của client
COPY client/package*.json ./client/

# Cài đặt dependencies cho server và client
RUN npm install
RUN npm install --prefix client

# Copy toàn bộ mã nguồn
COPY . .

# Build client (chạy lệnh build trong thư mục client)
RUN npm run build --prefix client

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /app

# Copy file package.json và package-lock.json của server
COPY package*.json ./
# Cài đặt các dependency cho production
RUN npm install --production
# Copy mã nguồn server (vì server không cần build riêng)
COPY server ./server
COPY .env /app/.env

# Copy các file đã build của client từ stage builder
COPY --from=builder /app/client/dist ./client/dist

# Mở cổng 80 (hoặc cổng mà server của bạn lắng nghe)
EXPOSE 80

# Chạy ứng dụng server theo script "start"
CMD ["npm", "start"]
