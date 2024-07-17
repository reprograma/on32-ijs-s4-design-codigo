import { Router } from 'express';
import { realizarPagamento } from '../controllers/pagamentoController';

const router = Router();

router.post('/pagamentos', realizarPagamento);

export default router;
