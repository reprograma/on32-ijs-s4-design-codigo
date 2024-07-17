import { Cliente } from '../models/cliente';
import { ContaBancaria } from '../models/conta';
import { ContaCorrente } from '../models/contaCorrente';
import { ContaPoupanca } from '../models/contaPoupanca';

export class ContaFactory {
  static criarConta(tipo: string, numero: number, saldo: number, cliente: Cliente): ContaBancaria {
    if (tipo === 'corrente') {
      return new ContaCorrente(numero, saldo, cliente);
    } else if (tipo === 'poupanca') {
      return new ContaPoupanca(numero, saldo, cliente);
    } else {
      throw new Error('Tipo de conta não suportado');
    }
  }
}
