<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Tema da Aula

Turma Online ON32 - Imersão JavaScript | Semana 4 | 2024 | Professora Lais Frigério

### Professora Lais

<h1>
  <img src="./assets/lais.png" alt="foto lais" width="200">
</h1>

Eu sou engenheira de software, professora de programação e compartilho conteúdo técnico em minhas redes sociais!

Fui aluna da segunda turma do curso Eudca{devas} em 2023!
Hoje trabalho como Engenheira de Software no Nubank.

- 💌 Email: laisfrigerio.dev@gmail.com
- 📸 Instagram: [@laisfrigerio](https://www.instagram.com/laisfrigerio/)
- 💼 LinkedIn: [in/laisfrigerio](https://www.linkedin.com/in/laisfrigerio/)
- 👩‍💻 Github:[/laisfrigerio](https://github.com/laisfrigerio)

### Instruções

Antes de começar, vamos organizar nosso setup.

- Fork esse repositório
- Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
- Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)

### Sistema

Este projeto consiste em uma API de cadastro de usuários, que podem ser:

- Admin
- Gerente
- Customer

Todos esses usuários tem em comum:

- Nome
- Email
- Senha
- CPF

Somente o admin tem um atributo `superSenha`. E ambos, admin e manager, tem um atributo `employeeCode`.

Atualmente, essa API contém as seguintes APIs:

- `GET` http://localhost:3000/users
- `GET` http://localhost:3000/users/:id
- `POST` http://localhost:3000/users
- `PUT` http://localhost:3000/users/:id
- `DELETE` http://localhost:3000/users/:id

Existem algumas regras de validação para cadastro/edição de usuários, dentro as quais:

- Validação de CPF
- Validação de E-mail
- Validação de senha
  - Minimo de 8 digitos
  - Minimo de 1 letra maiúscula
  - Minimo de 1 caracter especial
  - Minimo de 1 número
- O e-mail deve ser único
- CPF deve ser único

Todos essas regras estão dentro do arquivo `user.service.ts`

### Atividade

- Em grupo de 5 pessoas
- Analisar o código e refatorá-lo aplicando boas práticas de programação e/ou padrões de projeto

### Recomendações

- Recomendo uma aluna do grupo fazer o fork e clonar o repositório
- Dar acesso ao repo para que outras alunas possam realizar commit/push
- Sugiro que cada aluna fique no "comando" das alterações por entre 6/7 minutos. Assim, todos terão a oportunidade de colocar a "mão na massa" e simular uma sessão de Pair Programming

<p align="center">
Desenvolvido com :purple_heart: por laisfrigerio
</p>
