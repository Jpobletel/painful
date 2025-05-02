import express from 'express';
import { cantidad_productos_por_sku, getToken, obtener_productos_disponibles, obtenerEspacios } from './controllers_gestion.js';

//import de las ordenes de compra
import {registrarOrden, obtenerOrdenes, sincronizarOrdenesExternas} from './controllers_ordenes.js';

const router = express.Router();

router.post('/token', getToken);
router.get('/espacios', obtenerEspacios);
router.get('/productos',obtener_productos_disponibles);
router.get('/porsku',cantidad_productos_por_sku);

//rutas de las ordenes de compras
router.post('/ordenes', registrarOrden);
router.get('/ordenes', obtenerOrdenes);
router.get('/sincronizar-ordenes', sincronizarOrdenesExternas);

export default router;