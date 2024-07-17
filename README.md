<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Tema da Aula

Turma Online ON32 - Imersão JavaScript | Semana 4 | 2024 | Professora Lais Frigério

### Professora Lais


### Instruções

Antes de começar, vamos organizar nosso setup.

- Fork esse repositório
- Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
- Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)
- [Add outras intrucoes caso necessario]

### Objetivo

- Compreender o que é design de código e seus benefícios
- Entender que é Code Smells e como identificar as más práticas
- Aprender o que é Clean Code e como aplicar as boas práticas de programação
- Compreender o que são os princípios DRY e SOLID
- Entender o que são padrões de projetos e seus tipos, como Adapter, Factory e Observer

### Resumo

O que veremos na aula de hoje?

- [Tema da Aula](#tema-da-aula)

  - [Instruções](#instruções)
  - [Objetivo](#objetivo)
  - [Resumo](#resumo)

- [Conteúdo](#conteúdo)

  - [Code Smells](./material/01-code-smells.md)
  - [Clean Code](./material/02-clean-code.md)
  - [Princípios SOLID e DRY](./material/03-solid-dry.md)
  - [Padrões de projeto](./material/04-design-patterns.md)

  - [Exercícios](#exercícios)
  - [Material da aula](#material-da-aula)
  - [Links Úteis](./material/05-links-uteis.md)

- [Desafio Semanal](./material/06-desafio-semanal.md)

---

### Exercícios

- [Exercicio para sala](/exercicios/para-sala/)
- [Exercicio para casa](/exercicios/para-casa/)

### Material da aula

- [Material](/material)

<p align="center">
Desenvolvido com :purple_heart: por laisfrigerio
</p>

Resumo das Alterações
Este Pull Request visa melhorar a estruturação e a funcionalidade da aplicação através da reorganização das pastas, implementação de métodos de pagamento adicionais (boleto e PIX) e aplicação de princípios sólidos de design de código.

Alterações Implementadas
Estruturação de Pastas

Organização em Pastas Específicas: Reorganização dos arquivos em services, controllers, modules, models, interfaces.
Implementação de Métodos de Pagamento

Adição de Boleto e PIX: Integração de novos métodos de pagamento para oferecer mais opções aos clientes.
Aplicação dos Princípios SOLID

Single Responsibility Principle (SRP): Cada classe e método tem uma única responsabilidade definida.
Liskov Substitution Principle (LSP): Substituição de classes base (como Account) por suas subclasses (CurrentAccount, SavingsAccount).
Interface Segregation Principle (ISP): Interfaces específicas para diferentes contextos, como AccountOperations e PaymentMethod.
Dependency Inversion Principle (DIP): Injeção de dependências para reduzir o acoplamento e facilitar testes unitários.
Padrões de Design Implementados

Adapter: Implementação de DTOs (CurrentAccountDTO, SavingsAccountDTO) para adaptação de dados entre camadas da aplicação.
Princípios de Código Limpo e Eficiente

DRY (Don't Repeat Yourself): Redução da duplicação de código através da reutilização de métodos e padrões.
