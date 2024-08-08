<style>
  .logo-light, .logo-dark {
    display: none;
  }
  @media (prefers-color-scheme: dark) {
    .logo-dark {
      display: block;
    }
  }
  @media (prefers-color-scheme: light) {
    .logo-light {
      display: block;
    }
  }
</style>

<p align="center">
  <img src="https://www.totvs.com/wp-content/themes/totvs-theme/dist/images/logo-dark_8346d745.png" alt="TOTVs Light Logo" class="logo-light">
  <img src="https://www.totvs.com/wp-content/uploads/2019/09/logo.png" alt="TOTVs Dark Logo" class="logo-dark">
</p>

## Bem-vindo ao Empodera da TOTVs!

Este projeto utiliza Docker Compose para gerenciar o ambiente de desenvolvimento, teste e produção de forma simplificada. Abaixo, você encontrará as instruções para configurar e rodar o projeto de maneira eficiente.

### Configuração do Ambiente

Utilizamos arquivos `.env` para gerenciar variáveis de ambiente específicas para cada contexto. Antes de iniciar o Docker Compose, você precisa configurar o arquivo `.env`.

### Passos para Configuração

1. **Clone o repositório:**

   Primeiro, clone o repositório em sua máquina local:

   ```sh
   git clone https://github.com/usuario/empodera-totvs.git
   cd empodera-totvs
   ```

2. **Escolha o ambiente e copie o arquivo `.env` apropriado:**

   - Para desenvolvimento:

     ```sh
     cp .env.development .env
     ```

   - Para teste:

     ```sh
     cp .env.test .env
     ```

   - Para produção:

     ```sh
     cp .env.production .env
     ```

     **ou apenas copie manualmente**

3. **Suba os contêineres Docker:**

   Em seguida, suba os contêineres utilizando Docker Compose:

   ```sh
   docker-compose up --build
   ```

### Alternar para Outros Ambientes

Se você precisar mudar de ambiente, basta copiar o arquivo `.env` apropriado novamente.

#### Ex: ambiente de teste

Para rodar o projeto em um ambiente de teste, utilize o comando:

```sh
cp .env.test .env
docker-compose up --build
```
