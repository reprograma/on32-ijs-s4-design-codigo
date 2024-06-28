# Code Smells

"Code smells" são indicações de possíveis problemas no código. Estes problemas não são bugs propriamente ditos, ou seja, não quebram o funcionamento do software, mas indicam que há algo errado que pode se tornar um problema maior no futuro. Geralmente, um code smell sugere que o código é mal projetado, difícil de manter ou evoluir.

Aqui estão alguns exemplos comuns de code smells:

1. **Nomes Pouco Descritivos:** Nomes de variáveis, métodos ou classes que não são claros sobre o que fazem ou representam.
2. **Métodos Longos:** Métodos ou funções que são muito longos e fazem muitas coisas.
3. **Funções com muitos parâmetros:** Métodos ou funções que tem 3 ou mais parâmetros é um indicativo de multiplas responsabilidades.
4. **Classes Grandes:** Classes que têm muitas responsabilidades e atributos.
5. **Código duplicado:** Quando o mesmo trecho de código aparece em vários lugares.
6. **Comentários em Excesso:** Necessidade de muitos comentários para explicar o que o código faz, o que pode indicar que o código não é autoexplicativo.
7. **Múltiplos Níveis de Herança:** Muitas camadas de herança que complicam o entendimento do código.
8. **Código Morto:** Trechos de código que nunca são executados ou utilizados.
9. **Excesso de if aninhados:** Muitos if aninhados dificulta a leitura e compreensão do código.
10. **Números mágicos:** Números mágicos referem-se ao uso de valores literais no código sem qualquer explicação ou contexto sobre o que representam.

Detectar e corrigir code smells é uma prática importante na manutenção de software, ajudando a garantir que o código permaneça limpo, eficiente e fácil de entender e modificar. Refatoração é a prática usual para resolver code smells, melhorando a estrutura interna do código sem alterar seu comportamento externo.

## Exercício

Análise o seguinte trecho de código e identifique quais são os possíveis "Code Smells". Faça sua análise antes de prosseguir na leitura:

```typescript
function validCard(
  brand: string,
  cardNumbers: string,
  installments: number,
  dateValidate: string,
  cvv: string
) {
  const [m, y] = dateValidate.split("/");
  const date = new Date();
  const mCurrent = date.getMonth() + 1;
  const yCurrent = date.getFullYear() % 100;

  if (brand === "visa" || brand === "mastercard" || brand === "amex") {
    if (brand === "amex") {
      if (!/^3[47][0-9]{13}$/.test(cardNumbers)) {
        throw new Error("Invalid card number from amex");
      } else if (!/^\d{4}$/.test(cvv)) {
        throw new Error("CVV invalid for Amex");
      }
    } else {
      if (brand === "visa") {
        if (!/^4[0-9]{15}$/.test(cardNumbers)) {
          throw new Error("Invalid card number from visa");
        } else if (!/^\d{3}$/.test(cvv)) {
          throw new Error("CVV invalid for Visa");
        }
      } else {
        if (brand === "mastercard") {
          if (!/^5[1-5][0-9]{14}$/.test(cardNumbers)) {
            throw new Error("Invalid card number from mastercard");
          } else if (!/^\d{3}$/.test(cvv)) {
            throw new Error("CVV invalid for Master Card");
          }
        }
      }
    }
    if (installments < 1 || installments > 12) {
      throw new Error("Invalid installment count");
    } else if (
      parseInt(y) < yCurrent ||
      (parseInt(y) === yCurrent && parseInt(m) < mCurrent)
    ) {
      throw new Error("Expired card");
    }

    return true;
  } else {
    throw new Error("Invalid card brand");
  }
}
```

Code smells que podem ser identificados nesse trecho de código:

- **Função Longa:** esse trecho de código tem mais de uma responsabilidade:

  - Verifica se a bandeira do cartão é válida
  - Verifica se o número total de digítos do cartão é igual à 16
  - Verifica se o número do cartão é válido de acordo com a bandeira
  - Verifica se o número CVV é válido de acordo com a bandeira
  - Verifica se o número de prestações está dentro do range 1 à 12
  - Verifica se a data de validade do cartão é igual ou superior ao mês/ano atual
  - Instância um objeto da classe `CreditCardPaymentDetail` se todas as validações anteriores são válidas

- **Excesso de if aninhados:** A função tem muitos if aninhados (um if dentro do outro). O que dificulta a compreensão da função.

- **Código duplicado:** A validação do número CVV está duplicado para as bandeiras master e visa.

- **Nomes Pouco Descritivos:** Nomes que não são descritivos ou podem trazer duabilidade sobre seu significado. Ex: O que significa as variaveis **y** e **m**?

- **Números mágicos:** Existem alguns números expalhados dentro da função. Ex:

  - O que significa o número 16?
  - E se eu precisa realizar a mesma verificação em outro trecho de código?
  - E se os cartões de crédito passarem a ter 18 números, vai ser necessário trocar o valor de 16 para 18 em todos os lugares?

- **Função com múltiplos parâmetros**: A validação `validCard` possuie 6 parâmetros. O que você acha de usar que apenas 1 objeto como parâmetro que contenha todos os atributos?

> Como podemos melhorar esse trecho de código? Aplicando boas práticas de programação com **Clean Code** através de uma **refatoração**!
