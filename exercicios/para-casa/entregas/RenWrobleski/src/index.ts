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
