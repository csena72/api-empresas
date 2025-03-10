# Usa la imagen oficial de Node.js 22
FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto donde correrá la API
EXPOSE 3000

# Comando para iniciar la API
CMD ["node", "server.js"]
