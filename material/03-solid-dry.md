# Princípios de design de código

Os princípios de design de código são diretrizes e boas práticas que as desenvolvedoras seguem ao escrever software para garantir que o código seja legível, sustentável, escalável e de fácil manutenção.

## DRY (Don't Repeat Yourself)

O princípio DRY (Don't Repeat Yourself) é uma filosofia de design de software que promove a eliminação de duplicação de código. Ele sugere que cada parte do sistema deve ter uma única representação autoritativa, e qualquer duplicação deve ser removida. Isso reduz a redundância no código, facilitando sua manutenção e evolução.

### Antes de aplicar DRY

Duplicação do trecho de verificar regex:

```typescript
function validCard(card: CreditCard) {
  // more code here...

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
    // more code here...
}
```

### Depois de aplicar DRY

Extraindo o trecho de código duplicado para dentro da função `verifyRegex` e reutilizando-a:

```typescript
function verifyRegex(regex, value, errorMessage) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

function validCard(card: CreditCard) {
  // more code here...

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

    // more code here...
}
```

### Benefícios do Princípio DRY:

1. **Manutenibilidade:** Quando a lógica está centralizada em um único lugar, fazer alterações ou correções se torna mais simples, porque você só precisa alterar um ponto no código.

2. **Legibilidade:** Código sem duplicações é mais limpo e mais fácil de entender. Repetições podem tornar o código confuso e difícil de seguir.

3. **Redução de Erros:** A duplicação aumenta a probabilidade de erros, pois pode ser fácil esquecer de atualizar todas as cópias do código duplicado. Seguir o DRY ajuda a evitar inconsistências.

## SOLID

```

```
