import { Pagamento } from '../models/pagamento';
import { ContaBancaria } from '../models/conta';
import { NotificacaoObserver, Subject } from './notificacaoObserver';

class PagamentoService extends Subject {
  realizarPagamento(conta: ContaBancaria, valor: number, descricao: string): void {
    const pagamento = new Pagamento(conta, valor, descricao);
    pagamento.realizarPagamento();
    this.notifyObservers(`Pagamento de ${valor} realizado para ${descricao}`);
  }
}

const pagamentoService = new PagamentoService();
pagamentoService.addObserver(new NotificacaoObserver());

export default pagamentoService;
