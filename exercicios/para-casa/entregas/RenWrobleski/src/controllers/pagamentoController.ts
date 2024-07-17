import { Request, Response } from 'express';
import pagamentoService from '../services/pagamentoService';
import { ClienteService } from '../services/clienteService';

const clienteService = new ClienteService();

export const realizarPagamento = (req: Request, res: Response) => {
  const { clienteId, valor, descricao } = req.body;
  const cliente = clienteService.obterCliente(clienteId);
  
  if (!cliente) {
    return res.status(404).send('Cliente não encontrado');
  }

  const conta = cliente.contas.find(conta => conta.saldo >= valor);
  
  if (!conta) {
    return res.status(400).send('Saldo insuficiente ou conta não encontrada');
  }

  pagamentoService.realizarPagamento(conta, valor, descricao);
  res.status(200).send('Pagamento realizado com sucesso');
};
