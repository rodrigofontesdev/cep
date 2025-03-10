# CEP

Uma interface com o objetivo de consumir a API dos Correios para buscar informações de endereço a partir de um CEP.

É possível ver o projeto através do link: [https://granatech.vercel.app](https://granatech.vercel.app)

A estrutura do projeto está organizada da seguinte forma:

- :open_file_folder: **/src:**

  - :open_file_folder: **/components:** Componentes de UI que podem ser reaproveitados.

  - :open_file_folder: **/components/ui:** Snippets de componentes do Chakra UI.

  - :open_file_folder: **/hooks:** Custom hooks para separar e reaproveitar lógica.

  - :open_file_folder: **/themes:** Sistema de temas do Chakra UI.

  - :open_file_folder: **/utils:** Funções auxiliares.

## Pré-requisitos

- Git
- Node 20 (ou superior)

## Como iniciar

Clone o repositório em um novo diretório:

```
git clone git@github.com:rodrigofontesdev/cep.git
```

```
cd cep
```

Instale as dependências do projeto:

```
npm install
```

Inicie o projeto em ambiente de desenvolvimento:

```
npm run dev
```

## Funcionalidades

- Buscar endereço a partir do CEP
- Salvar endereço na tabela
- Visualizar dados do endereço

## Comentários

A busca de endereço por CEP é realizada utilizando o webservice **ViaCEP**, por oferecer uma integração simples sem necessidade de autenticação e não possuir cobranças.

A comunicação com a API utiliza o **Fetch API**, um cliente HTTP nativo do JavaScript que possibilita requisições assíncronas. Diferentemente de bibliotecas como Axios, o Fetch API não possui suporte a tipagem.

## Construído com

- **Vite:** Build e bundling otimizado da aplicação.

- **React:** Construção de interfaces de usuário (UI).

- **TypeScript:** Tipagem estática para JavaScript.

- **Chakra UI:** Sistema de componentes para construção de UI.

- **React Hook Form:** Gerenciamento de formulários.

- **Zod:** Esquemas para validação de dados.

- **Fetch API:** Requisições HTTP.

- **ViaCEP:** Serviço gratuito para consultar CEP.

- **ESLint:** Análise estática de código.

- **Prettier:** Formatação consistente de código.

- **Husky:** Gerenciador de Git hooks, executando o Prettier antes dos commits.

- **Commitlint:** Padronização de mensagens de commit, aplicando o padrão "Conventional Commits".

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE) para obter detalhes.
