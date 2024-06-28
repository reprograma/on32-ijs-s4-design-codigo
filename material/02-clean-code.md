# Clean Code

"Clean Code" refere-se a um conjunto de princípios e práticas que visam escrever código que é fácil de ler, entender e manter. O termo foi popularizado pelo livro "Clean Code: A Handbook of Agile Software Craftsmanship" de Robert C. Martin (também conhecido como Uncle Bob). Código limpo é aquele que segue boas práticas de programação, é bem estruturado e comunica claramente sua intenção.

> "Você é um autor. Todos que leem seu código são leitores. Escreva seu código como se fosse uma história que você deseja contar. Clareza é essencial. Siga os princípios e práticas que tornam seu código fácil de ler e entender. Lembre-se, seu objetivo principal é comunicar suas intenções de forma clara e inequívoca."

## Princípios do Clean Code

1.  **Legibilidade:** O código deve ser fácil de ler e entender. Outros desenvolvedores (ou mesmo o próprio autor, após algum tempo) devem ser capazes de compreender o que o código faz sem esforço excessivo.

2.  **Simplicidade:** O código deve ser o mais simples possível, evitando complexidades desnecessárias. Isso não significa falta de funcionalidade, mas sim que cada parte do código deve ter uma razão clara para existir.

3.  **Nomes Significativos:** Variáveis, funções, classes, e outros identificadores devem ter nomes descritivos que indicam seu propósito ou uso.

4.  **Funções Pequenas:** Funções devem ser pequenas e focadas em uma única responsabilidade. Isso facilita a compreensão e a reutilização do código.

5.  **Evitar Comentários Desnecessários:** Código bem escrito deve ser autoexplicativo. Comentários devem ser usados para explicar "porquês" e não "o quês" ou "comos".

6.  **Formatação Consistente:** Seguir uma convenção de formatação consistente torna o código mais legível. Isso inclui indentação, espaçamento, e quebra de linhas apropriadas.

7.  **Remover código morto:** Remova códigos que não são usados, como variáveis, funções.

8.  **Responsabilidade Única:** Cada classe ou função deve ter uma única responsabilidade. Isso é conhecido como o princípio da responsabilidade única (SRP - Single Responsibility Principle).

## Benefícios do Clean Code

1. **Facilidade de Manutenção:** Código limpo é mais fácil de entender e modificar, reduzindo o tempo e esforço necessários para manutenção.

2. **Redução de Erros:** Código bem organizado e claro tende a ter menos bugs e facilita a identificação e correção de erros.

3. **Facilidade na Adição de Novas Funcionalidades:** Um código limpo e bem estruturado facilita a extensão e a adição de novas funcionalidades sem introduzir bugs ou complexidade desnecessária.

## Refatorando nosso exemplo

Nessa sessão vamos refatorar e aplicar boas práticas de programação na função `validCard`.

### Renomeando funções e variáveis

<video src='https://github.com/reprograma/on32-ijs-s4-design-codigo/blob/main/assets/01-video-refactor-rename.movv' width="100%" />
