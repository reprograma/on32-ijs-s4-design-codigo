import { ContaBancaria } from './conta';

export class Pagamento {
  constructor(public conta: ContaBancaria, public valor: number, public descricao: string) {}

  realizarPagamento(): void {
    if (this.valor <= this.conta.saldo) {
      this.conta.saldo -= this.valor;
      console.log(`Pagamento de ${this.valor} realizado para ${this.descricao}`);
    } else {
      console.log('Saldo insuficiente para realizar o pagamento');
    }
  }
}
