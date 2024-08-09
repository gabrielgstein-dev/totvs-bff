# Use uma imagem oficial do Node como imagem base
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências necessárias
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta 3000 para o mundo fora deste container
EXPOSE 3000

# Defina o comando para executar a aplicação
CMD ["node", "dist/main"]
