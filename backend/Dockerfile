# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando por defecto
CMD ["node", "server.js"]
