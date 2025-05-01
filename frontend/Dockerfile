# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["serve", "-s", "dist"]
