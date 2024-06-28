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

O princípio SOLID é um conjunto de cinco princípios de design de software que visam criar sistemas mais fáceis de entender, manter e expandir. Cada letra do acrônimo SOLID representa um princípio específico.

Esses princípios trabalham em conjunto para promover um design de software mais flexível, modular e fácil de manter. Ao aplicar esses princípios, as desenvolvedoras podem criar sistemas que são mais robustos, extensíveis e menos propensos a erros.

1. **S**ingle Responsibility Principle - SRP (Princípio da Responsabilidade Única)
2. **O**pen/Closed Principle - OCP (Princípio Aberto/Fechado)
3. **L**iskov Substitution Principle - LSP (Princípio da Substituição de Liskov)
4. **I**nterface Segregation Principle - ISP (Princípio da Segregação de Interface)
5. **D**ependency Inversion Principle - DIP (Princípio da Inversão de Dependência)

### Single Responsibility Principle - SRP

Uma classe deve ter apenas uma responsabilidade, ou seja, apenas um motivo para mudar.

Quando uma classe tem mais de uma responsabilidade, ela se torna complexa e difícil de manter. Mudanças em uma responsabilidade podem afetar outras:

```typescript
class Product {
  // Responsável por gerenciar produtos
  constructor(
    public producId: number,
    public name: string,
    public price: number,
    public stockQuantity: number
  ) {}
}

class ProductOrder {
  // Responsável por gerenciar items de um pedido
  constructor(public product: Product, public quantity: number) {}
}

class Order {
  // Responsável por gerenciar pedidos
  constructor(
    public orderId: number,
    public paymentMethod: string,
    public items: ProductOrder[]
  ) {}

  // Responsável por calcular o total do pedido
  calculateTotal(): number {
    return this.items.reduce(
      (acc, item),
      () => item.product.price * item.quantity
    );
  }

  // Responsável por processar pagamento
  processPayment(): void {
    console.log(`Process payment here of ${paymentMethod}`);
  }

  // Responsável por enviar confirmação por e-mail
  sendConfirmationEmail(): void {
    console.log(`Sending confirmation email for order ${this.orderId}`);
  }
}
```

O melhor caminho é separar as responsabilidades em diferentes classes:

```typescript
class Product {
  // Responsável por gerenciar produtos
  constructor() {} // ...
}

class ProductOrder {
  // Responsável por gerenciar items de um pedido
  constructor() {} // ...
}

class Order {
  constructor(
    public orderId: number,
    public paymentMethod: string,
    public items: ProductOrder[]
  ) {}
}

class OrderService {
  calculateTotal(order): number {
    return order.items.reduce(
      (acc, item),
      () => item.product.price * item.quantity
    );
  }
}

class PaymentService {
  processPayment(order: Order): void {
    console.log(`Process payment here of ${order.paymentMethod}`);
  }
}

class EmailService {
  sendConfirmationEmail(order: Order): void {
    console.log(`Sending confirmation email for order ${order.orderId}`);
  }
}

// Uso
const order = new Order(1, "credit-card", [
  { product: { productId: 1, name: "Shoes", price: 10 }, quantity: 2 },
]);
const orderService = new OrderService();
const emailService = new EmailService();

const total = orderService.calculateTotal(order);
emailService.sendConfirmationEmail(order);
```

### Open/Closed Principle - OCP

O Princípio Aberto/Fechado diz que as Entidades de software (classes, módulos, funções, etc.) devem estar abertas para extensão, mas fechadas para modificação. Isso significa que você deve ser capaz de adicionar novas funcionalidades ao sistema sem alterar o código existente.

O princípio do aberto/fechado é muito utilizado quando:

1. **Múltiplas Condições em um Método**, com muitos if/else ou switch cases que determinam comportamentos diferentes
2. **Código com Mudanças Frequentes** para adicionar novos comportamentos ou funcionalidades
3. **Duplicação de Código**, onde novos comportamentos são adicionados copiando e colando código existente com pequenas variações.

Veja o exemplo de uma classe responsável por processar pagamentos. O processo de pagamento com cartão de crédito é diferente do débito em conta. Além do mais, existe uma alta chance desse e-commerce fazer a integração com outros sistemas de pagamento, como PIX:

```typescript
class PaymentProcessor {
  process(paymentMethod: string): void {
    if (paymentMethod === "credit-card") {
      console.log("Processing credit card payment");
    } else if (paymentMethod === "debit-account") {
      console.log("Processing Debit account payment");
    }
  }
}
```

Ao utilizar os recursos da orientação objetos, como interfaces e herança, é possível extrair a lógica de cada tipo de pagamento para sua classe independente:

```typescript
interface PaymentStrategy {
  process(): void;
}

class CreditCardPayment implements PaymentStrategy {
  process(): void {
    console.log("Processing credit card payment");
  }
}

class DebitAccountPayment implements PaymentStrategy {
  process(): void {
    console.log("Processing debit account payment");
  }
}

class PaymentProcessor {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  process(): void {
    this.strategy.process();
  }
}

// Uso
const creditCardPayment = new CreditCardPayment();
const debitAccountPayment = new DebitAccountPayment();

const processor = new PaymentProcessor(creditCardPayment);
processor.process(); // Processing credit card payment

const processor2 = new PaymentProcessor(debitAccountPayment);
processor2.process(); // Processing debit account payment
```

Ao aplicar o princípio aberto/fechado torna mais fácil a adição de um novo meio de pagamento!

### Liskov Substitution Principle - LSP

No princípio de Susbtiuição de Liskov, os subtipos devem ser substituíveis por seus tipos base sem alterar o funcionamento correto do programa.

Esse princípio enfatiza o uso correto da herança e a consistência do comportamento, assegurando que as subclasses preservem a funcionalidade da classe base.

O código a seguir não aplica o princípio de substituição de Liskov pois a subclasse está alterando o comportamento da superclase:

```typescript
class Discount {
  constructor(public percentage: number) {}

  calculate(price: number): number {
    return price - price * (this.percentage / 100);
  }
}

class NoDiscount extends Discount {
  calculate(price: number): number {
    return price; // Sem desconto
  }
}

function applyDiscount(discount: Discount, price: number): number {
  return discount.calculate(price);
}

// Uso
const discount = new Discount(10);
const noDiscount = new NoDiscount(0);

console.log(applyDiscount(discount, 100)); // 90
console.log(applyDiscount(noDiscount, 100)); // 100
```

Ao refatorar esse exemplo aplicando o princípio LSP:

```typescript
interface DiscountStrategy {
  calculate(price: number): number;
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}

  calculate(price: number): number {
    return price - price * (this.percentage / 100);
  }
}

class NoDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price; // Sem desconto
  }
}

function applyDiscount(discount: DiscountStrategy, price: number): number {
  return discount.calculate(price);
}

// Uso
const discount = new PercentageDiscount(10);
const noDiscount = new NoDiscount();

console.log(applyDiscount(discount, 100)); // 90
console.log(applyDiscount(noDiscount, 100)); // 100
```

O Princípio de Substituição de Liskov é essencial para garantir que o uso da herança em seu código seja correto e mantenha a integridade do comportamento do sistema. Ao aplicar LSP, você cria um código mais robusto e menos propenso a erros ao utilizar polimorfismo e herança.

### Interface Segregation Principle - ISP

### Dependency Injection Principle - DIP
