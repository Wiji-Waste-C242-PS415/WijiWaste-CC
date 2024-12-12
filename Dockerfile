# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy seluruh source code aplikasi ke dalam container
COPY . .

# Expose port (ubah sesuai dengan port yang digunakan aplikasi Anda)
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
