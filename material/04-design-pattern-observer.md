# Padrões de Design: Observer 👀

O padrão Observer é um padrão comportamental que define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente. Ele permite que objetos interessados sejam notificados de mudanças em outro objeto sem acoplamento rígido entre eles.

## Problema

Em muitas situações, precisamos que um ou mais objetos sejam notificados automaticamente quando o estado de outro objeto mudar. No entanto, queremos evitar o acoplamento direto entre os objetos, de modo que eles possam ser facilmente reutilizados e modificados independentemente uns dos outros.

## Solução

O padrão Observer propõe uma solução onde objetos interessados (observadores) se registram em um objeto alvo (publicador) e são notificados automaticamente quando ocorrem mudanças no estado do publicador. Isso é alcançado por meio de uma interface comum que os observadores implementam para receber notificações.

## Implementação

A implementação típica do padrão Observer envolve:

1. Definir uma interface comum para os observadores implementarem, especificando o método de notificação.
2. Implementar uma classe de publicador que mantém uma lista de observadores registrados e fornece métodos para adicionar, remover e notificar observadores.
3. Os observadores se registram no publicador e são notificados automaticamente quando o estado do publicador muda.

## Exemplo

```typescript
// Observer interface
interface Observer {
  update(event: string, data: any): void;
}

class Order {
  private observers: Observer[] = [];

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(event: string, data: any): void {
    for (const observer of this.observers) {
      observer.update(event, data);
    }
  }

  // Method to create an order
  createOrder(orderDetails: { amount: number; customerName: string }): void {
    // Logic to create an order
    console.log(
      `Order created for ${orderDetails.customerName} with amount $${orderDetails.amount}`
    );
    this.notifyObservers("orderCreated", orderDetails);
  }
}

// Concrete implementation of Observer: Email Notification
class EmailNotification implements Observer {
  update(event: string, data: any): void {
    if (event === "orderCreated") {
      console.log(
        `Email sent to ${data.customerName} for order amount $${data.amount}`
      );
    }
  }
}

// Concrete implementation of Observer: SMS Notification
class SMSNotification implements Observer {
  update(event: string, data: any): void {
    if (event === "orderCreated") {
      console.log(
        `SMS sent to ${data.customerName} for order amount $${data.amount}`
      );
    }
  }
}

// Usage
const order = new Order();

const emailNotification = new EmailNotification();
const smsNotification = new SMSNotification();

order.registerObserver(emailNotification);
order.registerObserver(smsNotification);

order.createOrder({ amount: 100, customerName: "John Doe" });

// To demonstrate unregistering an observer
order.unregisterObserver(emailNotification);

order.createOrder({ amount: 200, customerName: "Jane Doe" });
```

- Desacopla os observadores `EmailNotification` e `SMSNotification` do publicador `Order`, permitindo que eles sejam modificados e reutilizados independentemente.
- Permite uma comunicação eficiente entre objetos sem acoplamento direto, melhorando a modularidade e a flexibilidade do código.
- Suporta a adição dinâmica e a remoção de observadores em tempo de execução, permitindo uma extensibilidade fácil do sistema.

## Links úteis

- [Refactoring Guru - Observer Pattern](https://refactoring.guru/pt-br/design-patterns/observer)
