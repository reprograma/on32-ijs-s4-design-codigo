# Liskov Substitution Principle - LSP

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
