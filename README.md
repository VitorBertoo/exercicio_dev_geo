# Teste para Desenvolvedor Fullstack - Kognita

Aplicação desenvolvida como teste para a vaga de Desenvolvedor Fullstack da Kognita

# Executando:

Antes de executar qualquer um dos comandos abaixo, é necessário primeiro renomear os arquivos `example.env` e `example.env.local` que estão presentes nas pastas `frontend` e `backend`. Removendo "example" de seus respectivos nomes, isso irá configurar as variáveis de ambiente tanto de frontend e backend.

### IMPORTANTE

Será necessário também alterar o conteúdo do arquivo `.env.local` adicionando um token do mapbox válido ao campo `NEXT_PUBLIC_MAPBOX_TOKEN`.

## Backend

### Docker

Se docker estiver instalado, o backend e o banco de dados são executados com um simples comando na pasta raiz do projeto:

```
docker compose up --build -d
```

Ou na pasta backend:

```
npm run docker:up
```

### Sem Docker

Para inicializar a aplicação sem utilizar o docker é necessário ter o Node instalado e um banco de dados que possa ser utilizado pelo backend.

Com um banco de dados criado e pronto pra uso siga os seguintes passos:

- Altere o campo `DATABASE_URL` do arquivo `example.env` dentro da pasta backend para a URL de conexão do seu banco
- Dentro da pasta backend execute o comando:

```
npm i; npx prisma migrate deploy; npx prisma generate; npx prisma db seed; npm run dev
```

Esse comando executa as funções de migração do banco, instala as dependências e inicia a aplicação.

Pronto, o backend está de pé e pronto pra uso

## Frontend

Com o backend em execução, resta apenas executar o frontend, o que exige muito menos passos. Para fazer isto, na pasta "frontend" execute o comando:

```
npm install
```

Isso vai instalar as dependências do projeto. Quando as dependências estiverem instaladas, na mesma pasta, execute o seguinte comando:

```
npm run dev
```

# Testando a aplicação

As principais funcionalidades da aplicação são:

-

## Fazendo login

A aplicação utiliza rotas autenticadas com JWT, então para acessar as funcionalidades é necessário realizar login primeiro.
Utilizar uma conta de teste criada através das seeds:
email: usuario.teste@gmail.com
senha: senha123

![](https://i.imgur.com/V5h3Icm.png)

Outra opção é criar uma conta nova, com um email e senha de sua preferencia:

![](https://i.imgur.com/woXYUGc.png)

## Interagindo com o mapa

Ao acessar a aplicação você terá acesso ao mapa (a quantidade de pontos que são retornados pela API é limitada a 200 por questões de desempenho)
![](https://i.imgur.com/3UXMouY.png)

Ao clicar em qualquer um dos pontos você deve ser capaz de visualizar informações daquele marcador em específico.
![](https://i.imgur.com/LzqAFmA.png)
No canto superior direito da tela existe um controle para criação e exclusão de polígonos.

Ao criar os polígonos, sua área será demarcada e operações serão realizadas nos marcadores localizados no interior da área.
No canto superior direito é possível ver o resultado destas operações, sendo elas:

- Contagem do total de marcadores
- Soma dos valores dos pontos selecionados
- Média dos valores dos pontos
- Mediana dos valores dos pontos

Duplo clique fará aparecer um ponto azul

![](https://i.imgur.com/CiUPw5X.png)
Esse ponto utiliza dados da integração com a API do openStreetMaps para apresentar informações no mapa.
