import axios from 'axios';
import { Order } from './models/Order.js';

const URL_API_ORDENES = 'https://dev.proyecto.2025-1.tallerdeintegracion.cl/ordenes-compra';
let TOKEN = null;

// Asume que ya se obtuvo el token del sistema de gestión y se guarda aquí
export const setTokenOrdenes = (token) => {
  TOKEN = token;
};

// Registrar una orden manualmente (útil para pruebas)
export const registrarOrden = async (req, res) => {
  try {
    const { orderId, sku, quantity, channel, receivedAt, deadline } = req.body;
    const nuevaOrden = await Order.create({ orderId, sku, quantity, channel, receivedAt, deadline });
    res.status(201).json(nuevaOrden);
  } catch (error) {
    console.error('Error al registrar orden:', error);
    res.status(500).json({ error: 'Error al registrar orden' });
  }
};

// Obtener todas las órdenes
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.findAll({ order: [['receivedAt', 'DESC']] });
    res.json(ordenes);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

// Sincronizar órdenes externas (desde la API oficial del proyecto)
export const sincronizarOrdenesExternas = async (req, res) => {
  try {
    if (!TOKEN) {
      return res.status(401).json({ error: 'Token no disponible' });
    }

    const response = await axios.get(`${URL_API_ORDENES}/orders`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const ordenes = response.data;

    let nuevas = 0;
    for (const orden of ordenes) {
      const [ordenExistente, created] = await Order.findOrCreate({
        where: { orderId: orden._id },
        defaults: {
          sku: orden.sku,
          quantity: orden.cantidad,
          channel: orden.canal,
          receivedAt: orden.createdAt,
          deadline: orden.fechaEntrega,
          status: 'pendiente'
        }
      });
      if (created) nuevas++;
    }

    res.json({ mensaje: 'Órdenes sincronizadas correctamente', nuevas });
  } catch (error) {
    console.error('Error al sincronizar órdenes externas:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al sincronizar órdenes externas' });
  }
};