import express from 'express';
import { cantidad_productos_por_sku, getToken, obtener_productos_disponibles, obtenerEspacios } from './controllers_gestion.js';

const router = express.Router();

router.post('/token', getToken);
router.get('/espacios', obtenerEspacios);
router.get('/productos',obtener_productos_disponibles);
router.get('/porsku',cantidad_productos_por_sku);

export default router;