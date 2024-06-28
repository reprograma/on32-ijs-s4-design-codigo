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

```typescript
function validCard(
  cardBrand: string,
  cardNumber: string,
  numberOfInstallments: number,
  cardExpirationDate: string,
  cvv: string
) {
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (
    cardBrand === "visa" ||
    cardBrand === "mastercard" ||
    cardBrand === "amex"
  ) {
    if (cardBrand === "amex") {
      if (!/^3[47][0-9]{13}$/.test(cardNumber)) {
        throw new Error("Invalid card number from amex");
      } else if (!/^\d{4}$/.test(cvv)) {
        throw new Error("CVV invalid for Amex");
      }
    } else {
      if (cardBrand === "visa") {
        if (!/^4[0-9]{15}$/.test(cardNumber)) {
          throw new Error("Invalid card number from visa");
        } else if (!/^\d{3}$/.test(cvv)) {
          throw new Error("CVV invalid for Visa");
        }
      } else {
        if (cardBrand === "mastercard") {
          if (!/^5[1-5][0-9]{14}$/.test(cardNumber)) {
            throw new Error("Invalid card number from mastercard");
          } else if (!/^\d{3}$/.test(cvv)) {
            throw new Error("CVV invalid for Master Card");
          }
        }
      }
    }
    if (numberOfInstallments < 1 || numberOfInstallments > 12) {
      throw new Error("Invalid installment count");
    } else if (
      parseInt(cardExpirationYear) < currentYear ||
      (parseInt(cardExpirationYear) === currentYear &&
        parseInt(cardExpirationMonth) < currentMonth)
    ) {
      throw new Error("Expired card");
    }

    return true;
  } else {
    throw new Error("Invalid card brand");
  }
}
```

- A variável `brand` foi renomeada para `cardBrand`
- A variável `cardNumbers` foi renomeada para `cardNumber`
- A variável `installments` foi renomeada para `numberOfInstallments`
- A variável `dateValidate` foi renomeada para `cardExpirationDate`
- As variáveis `m` e `y` foram renomeada para `cardExpirationMonth` e `cardExpirationYear` respectivamente
- A variável `date` foi renomeada para `currentDate`
- As variáveis `mCurrent` e `yCurrent` foram renomeada para `currentMonth` e `currentYear` respectivamente

### Removendo números mágicos

```typescript
const CARD_BRAND_VISA = "visa";
const CARD_BRAND_MASTERCARD = "mastercard";
const CARD_BRAND_AMEX = "amex";

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function validCard(
  cardBrand: string,
  cardNumber: string,
  numberOfInstallments: number,
  cardExpirationDate: string,
  cvv: string
) {
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (CARD_BRANDS.includes(cardBrand)) {
    if (cardBrand === CARD_BRAND_AMEX) {
      if (!/^3[47][0-9]{13}$/.test(cardNumber)) {
        throw new Error("Invalid card number from amex");
      } else if (!/^\d{4}$/.test(cvv)) {
        throw new Error("CVV invalid for Amex");
      }
    } else {
      if (cardBrand === CARD_BRAND_VISA) {
        if (!/^4[0-9]{15}$/.test(cardNumber)) {
          throw new Error("Invalid card number from visa");
        } else if (!/^\d{3}$/.test(cvv)) {
          throw new Error("CVV invalid for Visa");
        }
      } else {
        if (cardBrand === CARD_BRAND_MASTERCARD) {
          if (!/^5[1-5][0-9]{14}$/.test(cardNumber)) {
            throw new Error("Invalid card number from mastercard");
          } else if (!/^\d{3}$/.test(cvv)) {
            throw new Error("CVV invalid for Master Card");
          }
        }
      }
    }
    if (
      numberOfInstallments < MIN_INSTALLMENTS ||
      numberOfInstallments > MAX_INSTALLMENTS
    ) {
      throw new Error("Invalid installment count");
    } else if (
      parseInt(cardExpirationYear) < currentYear ||
      (parseInt(cardExpirationYear) === currentYear &&
        parseInt(cardExpirationMonth) < currentMonth)
    ) {
      throw new Error("Expired card");
    }

    return true;
  } else {
    throw new Error("Invalid card brand");
  }
}
```

- As strings literais `visa`, `mastercard` e `amex` foram trocadas por constantes
- Os números `1` e `12` que representam, respectivamente, o número minímo e máximo de parcelas foram substiuídas por constantes

### Extraindo e reutilizando funções

```typescript
const CARD_BRAND_VISA = "visa";
const CARD_BRAND_MASTERCARD = "mastercard";
const CARD_BRAND_AMEX = "amex";

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

function validCard(
  cardBrand: string,
  cardNumber: string,
  numberOfInstallments: number,
  cardExpirationDate: string,
  cvv: string
) {
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (CARD_BRANDS.includes(cardBrand)) {
    if (cardBrand === CARD_BRAND_AMEX) {
      verifyRegex(
        /^3[47][0-9]{13}$/,
        cardNumber,
        "Invalid card number from amex"
      );
      verifyRegex(/^\d{4}$/, cvv, "CVV invalid for Amex");
    } else {
      if (cardBrand === CARD_BRAND_VISA) {
        verifyRegex(
          /^4[0-9]{15}$/,
          cardNumber,
          "Invalid card number from visa"
        );
        verifyRegex(/^\d{3}$/, cvv, "CVV invalid for Visa");
      } else {
        if (cardBrand === CARD_BRAND_MASTERCARD) {
          verifyRegex(
            /^5[1-5][0-9]{14}$/,
            cardNumber,
            "Invalid card number from mastercard"
          );
          verifyRegex(/^\d{3}$/, cvv, "CVV invalid for Master Card");
        }
      }
    }
    if (
      numberOfInstallments < MIN_INSTALLMENTS ||
      numberOfInstallments > MAX_INSTALLMENTS
    ) {
      throw new Error("Invalid installment count");
    } else if (
      parseInt(cardExpirationYear) < currentYear ||
      (parseInt(cardExpirationYear) === currentYear &&
        parseInt(cardExpirationMonth) < currentMonth)
    ) {
      throw new Error("Expired card");
    }

    return true;
  } else {
    throw new Error("Invalid card brand");
  }
}
```

- As validações de regex foram substituídas pela função `verifyRegex`
- A logica duplicada de verificar regex foi removida
- Passamos a reutilizar a função criada

### Removendo if aninhados

```typescript
const CARD_BRAND_VISA = "visa";
const CARD_BRAND_MASTERCARD = "mastercard";
const CARD_BRAND_AMEX = "amex";

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

function validCard(
  cardBrand: string,
  cardNumber: string,
  numberOfInstallments: number,
  cardExpirationDate: string,
  cvv: string
) {
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (!CARD_BRANDS.includes(cardBrand)) {
    throw new Error("Invalid card brand");
  }

  if (cardBrand === CARD_BRAND_AMEX) {
    verifyRegex(
      /^3[47][0-9]{13}$/,
      cardNumber,
      "Invalid card number from amex"
    );
    verifyRegex(/^\d{4}$/, cvv, "CVV invalid for Amex");
  }

  if (cardBrand === CARD_BRAND_VISA) {
    verifyRegex(/^4[0-9]{15}$/, cardNumber, "Invalid card number from visa");
    verifyRegex(/^\d{3}$/, cvv, "CVV invalid for Visa");
  }

  if (cardBrand === CARD_BRAND_MASTERCARD) {
    verifyRegex(
      /^5[1-5][0-9]{14}$/,
      cardNumber,
      "Invalid card number from mastercard"
    );
    verifyRegex(/^\d{3}$/, cvv, "CVV invalid for Master Card");
  }

  if (
    numberOfInstallments < MIN_INSTALLMENTS ||
    numberOfInstallments > MAX_INSTALLMENTS
  ) {
    throw new Error("Invalid installment count");
  }

  if (
    parseInt(cardExpirationYear) < currentYear ||
    (parseInt(cardExpirationYear) === currentYear &&
      parseInt(cardExpirationMonth) < currentMonth)
  ) {
    throw new Error("Expired card");
  }

  return true;
}
```

- Removemos todos os if aninhados e deixamos apenas 1 nível
- Deixando o código mais legível e fácil de ler

### Ainda dá para melhorar esse código?

Sim! É possível extrair todas as mensagens de erro para constantes, pensando em cenários de reaproveitamento de código, já que essas mensagens podem ser utilizadas em outras partes do sistema:

```typescript
const CARD_BRAND_VISA = "visa";
const CARD_BRAND_MASTERCARD = "mastercard";
const CARD_BRAND_AMEX = "amex";

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const REGEX_CVV_3_DIGITS = /^\d{3}$/;
const REGEX_CVV_4_DIGITS = /^\d{4}$/;

const REGEX_CARD_NUMBER_VISA = /^4[0-9]{15}$/;
const REGEX_CARD_NUMBER_MASTER_CARD = /^5[1-5][0-9]{14}$/;
const REGEX_CARD_NUMBER_AMEX = /^3[47][0-9]{13}$/;

const CVV_ERROR_MESSAGES = {
  [CARD_BRAND_AMEX]: "CVV invalid for Amex",
  [CARD_BRAND_VISA]: "CVV invalid for Visa",
  [CARD_BRAND_MASTERCARD]: "CVV invalid for Master Card",
};

const CARD_NUMBER_ERROR_MESSAGES = {
  [CARD_BRAND_AMEX]: "Invalid card number from amex",
  [CARD_BRAND_VISA]: "Invalid card number from visa",
  [CARD_BRAND_MASTERCARD]: "Invalid card number from mastercard",
};

const CARD_BRAND_ERROR_MESSAGE = "Invalid card brand";

const EXPIRED_CARD_ERROR_MESSAGE = "Expired card";

const INVALID_INSTALLMENTS_ERROR_MESSAGE = "Invalid installment count";

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

function validCard(
  cardBrand: string,
  cardNumber: string,
  numberOfInstallments: number,
  cardExpirationDate: string,
  cvv: string
) {
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (!CARD_BRANDS.includes(cardBrand)) {
    throw new Error(CARD_BRAND_ERROR_MESSAGE);
  }

  if (cardBrand === CARD_BRAND_AMEX) {
    verifyRegex(
      REGEX_CARD_NUMBER_AMEX,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_AMEX]
    );
    verifyRegex(REGEX_CVV_4_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_AMEX]);
  }

  if (cardBrand === CARD_BRAND_VISA) {
    verifyRegex(
      REGEX_CARD_NUMBER_VISA,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_VISA]
    );
    verifyRegex(REGEX_CVV_3_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_VISA]);
  }

  if (cardBrand === CARD_BRAND_MASTERCARD) {
    verifyRegex(
      REGEX_CARD_NUMBER_MASTER_CARD,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]
    );
    verifyRegex(
      REGEX_CVV_3_DIGITS,
      cvv,
      CVV_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]
    );
  }

  if (
    numberOfInstallments < MIN_INSTALLMENTS ||
    numberOfInstallments > MAX_INSTALLMENTS
  ) {
    throw new Error(INVALID_INSTALLMENTS_ERROR_MESSAGE);
  }

  if (
    parseInt(cardExpirationYear) < currentYear ||
    (parseInt(cardExpirationYear) === currentYear &&
      parseInt(cardExpirationMonth) < currentMonth)
  ) {
    throw new Error(EXPIRED_CARD_ERROR_MESSAGE);
  }

  return true;
}
```

É possível também passar um objeto como parâmetro de entrada da função `validCard`, ao invés de 5 parâmetros. Passar um objeto como parâmetro torna a função mais flexível:

```typescript
const CARD_BRAND_VISA = "visa";
const CARD_BRAND_MASTERCARD = "mastercard";
const CARD_BRAND_AMEX = "amex";

const CARD_BRANDS = [CARD_BRAND_VISA, CARD_BRAND_MASTERCARD, CARD_BRAND_AMEX];

const REGEX_CVV_3_DIGITS = /^\d{3}$/;
const REGEX_CVV_4_DIGITS = /^\d{4}$/;

const REGEX_CARD_NUMBER_VISA = /^4[0-9]{15}$/;
const REGEX_CARD_NUMBER_MASTER_CARD = /^5[1-5][0-9]{14}$/;
const REGEX_CARD_NUMBER_AMEX = /^3[47][0-9]{13}$/;

const CVV_ERROR_MESSAGES = {
  [CARD_BRAND_AMEX]: "CVV invalid for Amex",
  [CARD_BRAND_VISA]: "CVV invalid for Visa",
  [CARD_BRAND_MASTERCARD]: "CVV invalid for Master Card",
};

const CARD_NUMBER_ERROR_MESSAGES = {
  [CARD_BRAND_AMEX]: "Invalid card number from amex",
  [CARD_BRAND_VISA]: "Invalid card number from visa",
  [CARD_BRAND_MASTERCARD]: "Invalid card number from mastercard",
};

const CARD_BRAND_ERROR_MESSAGE = "Invalid card brand";

const EXPIRED_CARD_ERROR_MESSAGE = "Expired card";

const INVALID_INSTALLMENTS_ERROR_MESSAGE = "Invalid installment count";

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 12;

function verifyRegex(regex, value, errorMessage) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

function validCard(card: CreditCard) {
  const {
    cardBrand,
    cardNumber,
    numberOfInstallments,
    cardExpirationDate,
    cvv,
  } = card;
  const [cardExpirationMonth, cardExpirationYear] =
    cardExpirationDate.split("/");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (!CARD_BRANDS.includes(cardBrand)) {
    throw new Error(CARD_BRAND_ERROR_MESSAGE);
  }

  if (cardBrand === CARD_BRAND_AMEX) {
    verifyRegex(
      REGEX_CARD_NUMBER_AMEX,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_AMEX]
    );
    verifyRegex(REGEX_CVV_4_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_AMEX]);
  }

  if (cardBrand === CARD_BRAND_VISA) {
    verifyRegex(
      REGEX_CARD_NUMBER_VISA,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_VISA]
    );
    verifyRegex(REGEX_CVV_3_DIGITS, cvv, CVV_ERROR_MESSAGES[CARD_BRAND_VISA]);
  }

  if (cardBrand === CARD_BRAND_MASTERCARD) {
    verifyRegex(
      REGEX_CARD_NUMBER_MASTER_CARD,
      cardNumber,
      CARD_NUMBER_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]
    );
    verifyRegex(
      REGEX_CVV_3_DIGITS,
      cvv,
      CVV_ERROR_MESSAGES[CARD_BRAND_MASTERCARD]
    );
  }

  if (
    numberOfInstallments < MIN_INSTALLMENTS ||
    numberOfInstallments > MAX_INSTALLMENTS
  ) {
    throw new Error(INVALID_INSTALLMENTS_ERROR_MESSAGE);
  }

  if (
    parseInt(cardExpirationYear) < currentYear ||
    (parseInt(cardExpirationYear) === currentYear &&
      parseInt(cardExpirationMonth) < currentMonth)
  ) {
    throw new Error(EXPIRED_CARD_ERROR_MESSAGE);
  }

  return true;
}
```

Também é importante seguir padrões de escrita nos nomes de funções e variáveis. Escolha um padrão e seja fiel a ele:

- PascalCase
- camelCase
- snake_case
- kebab-case

Na função `validCard`, utilizamos o padrão `SNAKE_CASE` para constantes com todas as letras maiúsculas. Já para funções e variáveis seguimos o padrão `camelCase`.

**Essas alterações tornam o código mais limpo, modular e fácil de entender, seguindo os princípios de clean code e boas práticas de programação!**
