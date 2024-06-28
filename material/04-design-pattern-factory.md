# Padrão de Design - Factory 🏭

O padrão Factory é um padrão de design de criação que abstrai o processo de criação de objetos, permitindo que uma classe cliente crie objetos sem especificar sua classe concreta. Isso é útil quando o tipo exato de objeto a ser criado só é determinado em tempo de execução ou quando queremos encapsular a lógica de criação de objetos em um local centralizado.

## Problema

Em muitos casos, uma classe cliente precisa criar instâncias de diferentes tipos de objetos, mas não sabe o tipo exato desses objetos até o momento da execução. Além disso, queremos evitar acoplar a classe cliente diretamente às classes concretas dos objetos que ela cria.

## Solução

O padrão Factory propõe a definição de uma interface comum para criar objetos e a implementação de subclasses ou métodos de fábrica que implementam essa interface e são responsáveis por criar objetos concretos. A classe cliente chama o método de fábrica para criar objetos, em vez de instanciá-los diretamente.

## Implementação

A implementação típica do padrão Factory envolve:

1. **Definição de uma interface ou classe base** que declara um método de fábrica para criar objetos.

2. **Implementação de uma ou mais subclasses ou métodos de fábrica** que fornecem implementações concretas do método de fábrica, cada uma criando um tipo específico de objeto.

3. **A classe cliente chama o método de fábrica para criar objetos**, sem precisar conhecer os detalhes da implementação concreta.

## Exemplo

```typescript
// Payment processor interface
interface IPaymentProcessor {
  process(amount: number): void;
}

// Concrete implementations
class CreditCardProcessor implements IPaymentProcessor {
  process(amount: number): void {
    console.log(`Payment processor of $${amount} via credit card.`);
  }
}

class PixProcessor implements IPaymentProcessor {
  process(amount: number): void {
    console.log(`Payment processor of $${amount} via PIX.`);
  }
}

// Factory
class PaymentProcessorFactory {
  static createProcessor(type: string): IPaymentProcessor {
    const paymentMethods = {
      "credit-card": new CreditCardProcessor(),
      "debit-account": new PixProcessor(),
    };

    return paymentMethods[type] || throw new Error("Tipo de processador de pagamento não suportado.");
  }
}

class OrderService {
    @Injectable
    constructor(paymentProcessor: IPaymentProcessor) {}

    createOrder({ amount }: Order) {
        // ....
        this.paymentProcessor.process(amount);
    }
}

// Usage
const paymentType = "credit-card";
const processor = PaymentProcessorFactory.createProcessor(paymentType);
const orderService = new OrderService(processor);
orderService.createOrder({ amount: 100 });
```

Consequências:

- Encapsula a lógica de criação de objetos na classe `PaymentProcessorFactory` seguindo o princípio da responsabilidade única. Tornando assim o código mais flexível e fácil de manter.

- Permite a extensão do código com novos tipos de objetos/meios de pagamento sem modificar a classe cliente `OrderService`. Basta apenas extender a classe factory para construir o novo objeto de pagamento.

- Promove o desacoplamento entre a classe cliente e as classes concretas dos objetos que ela cria.

- Ajuda a aderir ao princípio de inversão de dependência, permitindo que a classe cliente `OrderService` dependa de abstrações `IPaymentProcessor` em vez de implementações concretas.

## Links úteis

- [Refactoring Guru - Factory Pattern](https://refactoring.guru/pt-br/design-patterns/factory-method/typescript/example)
