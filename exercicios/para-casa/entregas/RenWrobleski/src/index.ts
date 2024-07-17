import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clienteRoutes';
import gerenteRoutes from './routes/gerenteRoutes';
import pagamentoRoutes from './routes/pagamentoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', clienteRoutes);
app.use('/api', gerenteRoutes);
app.use('/api', pagamentoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Código de inicialização adicional (anteriormente em main.ts)
import { Cliente } from './models/cliente';
import { Gerente } from './models/gerente';
import { ContaFactory } from './services/contaFactory';
import { ClienteService } from './services/clienteService';
import { GerenteService } from './services/gerenteService';

const clienteService = new ClienteService();
const gerenteService = new GerenteService();

const gerente = new Gerente('Maria Gerente', '1');
gerenteService.adicionarGerente(gerente);

const cliente = new Cliente('João Cliente', '1', 'Rua A, 123', '9999-8888', 1000);
clienteService.adicionarCliente(cliente);

const contaCorrente = ContaFactory.criarConta('corrente', 1, 0, cliente);
const contaPoupanca = ContaFactory.criarConta('poupanca', 2, 0, cliente);

gerente.abrirConta(cliente, contaCorrente);
gerente.abrirConta(cliente, contaPoupanca);

console.log('Clientes:', clienteService.obterCliente('1'));
console.log('Gerentes:', gerenteService.obterGerente('1'));
