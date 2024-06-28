# Padrão de Design: Adapter 🔌

O padrão Adapter é um padrão estrutural que permite que objetos com interfaces incompatíveis possam colaborar entre si. Ele atua como um intermediário entre dois objetos, convertendo a interface de um objeto em outra interface que um cliente espera encontrar.

## Problema

Muitas vezes, temos classes ou objetos com interfaces incompatíveis que precisam colaborar. No entanto, não podemos modificar a interface existente devido a restrições de código legado ou de terceiros.

## Solução

O padrão Adapter propõe a criação de uma classe intermediária que atua como um adaptador entre dois objetos ou sistemas. Esse adaptador implementa a interface esperada pelo cliente e delega as chamadas de métodos para a classe real, convertendo os resultados conforme necessário.

## Implementação

A implementação típica do padrão Adapter envolve:

1. Definir uma interface alvo que representa a interface esperada pelo cliente.
2. Implementar uma classe adaptadora que adapta a interface do objeto existente para a interface alvo.
3. Criar uma instância do adaptador e usá-la no lugar do objeto real onde a interface adaptada é necessária.

## Exemplo

Um e-commerce posso fazer integração com 1 ou mais Gateways de Pagamento por inúmeras razões, como exemplo redundância, ou até migração de um provedor para outro.

Imagine o cenário de um e-commerce que tem uma integração com a Cielo. A Cielo é uma empresa que faz o processamento de pagamentos de cartão de crédito. A partir do próximo ano, além da integração com a Cielo, também teremos uma integração com a Pagar.Me, que também faz o processamento de pagamentos de cartão de crédito. Entretanto, os dados do cartão são salvos de uma maneira no banco de dados do e-commerce, que não é o mesmo formato usado pela Pagar.Me.

Portanto, precisamos de um Adapter para fazer a comunicação entre os 2 sistemas: e-commerce e sistema de processamento de pagamentos - Pagar.Me!

```typescript
// Interface do processador de pagamento
interface IPaymentGateway {
  processPayment(cardInfo: string, amount: number): void;
}

// Implementação do processador de pagamento Cielo
class CieloPaymentGateway implements IPaymentGateway {
  processPayment(cardInfo: string, amount: number): void {
    console.log(
      `Pagamento de $${amount} processado pela Cielo com as informações do cartão: ${cardInfo}`
    );
  }
}

// Implementação do processador de pagamento Pagar.Me
// Essa classe não implementa a interface IPaymentGateway
class PagarMePaymentGateway {
  pagarMeProcess(
    cardNumber: string,
    cardHolderName: string,
    cardExpiry: string,
    cardCVV: string,
    amount: number
  ): void {
    console.log(
      `Pagamento de $${amount} processado pelo Pagar.Me com o cartão número: ${cardNumber}, nome: ${cardHolderName}, validade: ${cardExpiry}, CVV: ${cardCVV}`
    );
  }
}

// Classe Adapter para Pagar.Me
// O adapter implementa a interface
class PagarMeAdapter implements IPaymentGateway {
  private pagarMeGateway: PagarMePaymentGateway;

  constructor(pagarMeGateway: PagarMePaymentGateway) {
    this.pagarMeGateway = pagarMeGateway;
  }

  processPayment(cardInfo: string, amount: number): void {
    // Supondo que cardInfo está no formato "numero|nome|validade|cvv"
    const [cardNumber, cardHolderName, cardExpiry, cardCVV] =
      cardInfo.split("|");
    this.pagarMeGateway.pagarMeProcess(
      cardNumber,
      cardHolderName,
      cardExpiry,
      cardCVV,
      amount
    );
  }
}

// Classe OrderService que usa o gateway de pagamento
class OrderService {
  private paymentGateway: IPaymentGateway;

  constructor(paymentGateway: IPaymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  createOrder(cardInfo: string, amount: number): void {
    // Lógica de criação de pedido
    console.log("Pedido criado.");
    this.paymentGateway.processPayment(cardInfo, amount);
  }
}

// Uso dos gateways de pagamento
const cieloGateway = new CieloPaymentGateway();
const pagarMeGateway = new PagarMeAdapter(new PagarMePaymentGateway());

const orderServiceCielo = new OrderService(cieloGateway);
orderServiceCielo.createOrder("1234567890123456|John Doe|12/23|123", 100); // Saída: Pedido criado. Pagamento de $100 processado pela Cielo com as informações do cartão: 1234567890123456|John Doe|12/23|123

const orderServicePagarMe = new OrderService(pagarMeGateway);
orderServicePagarMe.createOrder("1234567890123456|John Doe|12/23|123", 200); // Saída: Pedido criado. Pagamento de $200 processado pelo Pagar.Me com o cartão número: 1234567890123456, nome: John Doe, validade: 12/23, CVV: 123
```

Nesse exemplo, PagarMeAdapter é o adaptador que permite que o OrderService, que espera um IPaymentGateway, use o PagarMePaymentGateway, adaptando os dados do cartão de crédito para o formato necessário pelo Pagar.Me. Assim, podemos integrar ambos os gateways de pagamento sem modificar o código do OrderService:

- Nessa implementação, cada classe `PagarMePaymentGateway`, `CieloPaymentGateway` e `PagarMeAdapter` tem sua responsabildiade única: as duas primeiras de processo o pagamento e a terceira de realizar a adaptação

- Se necessário a integração com novos meios de pagamento, bastata criar uma classe nova ou adaptador que implemente a interface `IPaymentGateway`. Desta maneira você está adicionando um novo tipo de adaptador sem quebrar o código cliente existente `OrderService`.

- Este padrão ajuda a aderir ao princípio de inversão de dependência, permitindo que a classe cliente `OrderService` dependa de abstrações `IPaymentGateway` em vez de implementações concretas.
