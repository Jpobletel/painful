import axios from 'axios';
const URL_API_GEST = 'https://dev.proyecto.2025-1.tallerdeintegracion.cl/starlink-factory';
//variable que se usara para almacenar el token internamente en el backend
let TOKEN = null;


//Funcion de autenticacion (lista y funcional)
const getToken = async (req, res) => {
  try {
    const response = await axios.post(`${URL_API_GEST}/auth`, {
      group: 4,
      secret: 'secret',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = response.data.token;
    //Guardamos el token para poder usarlo internamente en el backend
    TOKEN = response.data.token
    res.json({ token }); 
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error al obtener el token' });
  }
};



//---------------------------------------------Funciones correspondientes a Espacios------------------------------------------
  //Aquellas funciones que entregan informacion sobre los espacios en la documentacion de la api
  //Funcion que permite obtener los espacios de la fabrica (lista y funcional)
  const obtenerEspacios = async (req, res) => {
    try {
      if (TOKEN) {
        const response = await axios.get(`${URL_API_GEST}/spaces`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,  
          },
        });
        console.log('Espacios obtenidos en back:', response.data);
        return res.json(response.data); 
      }
  
    } catch (error) {
      console.error('Error al obtener espacios:', error);
      return res.status(500).json({ error: 'Error al obtener los espacios' });  
    }
  };



  //Funcion para obtener los productos en un espacio
  const obtener_productos_en_espacio = async (token, storeId, sku, limit) => {
    try {
      let url = `/api/spaces/${storeId}/products?sku=${sku}`;
      if (limit !== undefined) {
        url += `&limit=${limit}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Productos obtenidos en espacio:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos del espacio:', error);
      return [];
    }
  };



// Funcion para contar los productos por sku para un espacio indicado (lista y funcional)
  const obtener_conteo_productos = async (req, res) => {
    try {
      const { storeId } = req.params; 
      if (!TOKEN) {
        return res.status(401).json({ error: 'Token no disponible' });
      }
      const response = await axios.get(`${URL_API_GEST}/spaces/${storeId}/inventory`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log('Productos obtenidos en conteo:', response.data);
      return res.json(response.data);
    } catch (error) {
      console.error('Error al obtener productos del espacio:', error.response?.data || error.message);
      return res.status(500).json({ error: 'Error al obtener productos del espacio' });
    }
  };
  //---------------------FIN--------------------------Funciones correspondientes a Espacios------------------------FIN-----------------------







  //--------------------------------------------------Funciones correspondientes a Productos-----------------------------------------------
  //Aquellas funciones que entregan informacion sobre los producsot en la documentacion de la api

  //Funcion para solicitar productos a megafactory o taller
  const solicitar_productos = async (token, sku, cantidad) => {
    try {
      const response =  await axios.post ('/api/products', {
        sku: sku,
        quantity: cantidad
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Solicitud Realizada:', response.data);
      return response.data;
    }catch (error){
      console.log('Error al solicitar productos:', error);
      return null;
    }
  };


  //Funcion para entregar productos de solicitud 
  //(Intenta obtener productos de una solicitud si la fecha de entrega ya ha sido cumplida,
  //Crea los productos y retorna el ID de el o los productos creados)
  
  
    //const entregar_productos_de_solicitud = async (token, requestId) => {
    //  try {
    //    const response = await axios.post (`/api/products/requests/${requestId}/deliver`,{}, {
    //      headers: {
    //        Authorization: `Bearer ${token}`,
    //      },
    //    });
    //    console.log('Entregar productos de solicitud exitoso:', response.data);
    //    return response.data;
    //  } catch (error){
    //    console.log('Error al entregar productos de solicitud', error);
    //    return null;
    //  }
    //};

  const entregar_productos_de_solicitud = async (req, res) => {
    try {
      const { requestId } = req.params; // Obtener el requestId de los parámetros de la URL
  
      const response = await axios.post(`${URL_API_GEST}/products/requests/${requestId}/deliver`, {}, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      console.log('Entregar productos de solicitud exitoso:', response.data);
      return res.json(response.data); // Enviar la respuesta al front-end
    } catch (error) {
      console.error('Error al entregar productos de solicitud', error);
      return res.status(500).json({ error: 'Error al entregar productos de solicitud' });
    }
  };



  //Funcion para mover producto de espacio, mueve producto no vencido a otro espacio de la misma fábrica
  const mover_producto_de_espacio = async (token, prodId, storeId) => {
    try {
      const response = await axios.patch(`/api/products/${prodId}`, {
        store: storeId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Producto movido exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error al mover producto de espacio:', error);
      return null;
    }
  };



  //Funcion para eliminar un producto
  //Elimina un producto especifico del espacio de retiro de productos del grupo autenticado
  const eliminar_producto = async (token, prodId) => {
    try {
      const response = await axios.delete(`/api/products/${prodId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Producto eliminado exitosamente:', response.data);
      return response.data;  
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return null;
    }
  };



  //Enviar producto a otro grupo
  //Envía un producto no vendido desde el espacio de retiro de productos de la fábrica del grupo autenticado a la bodega de la fábrica del grupo indicado
  const enviar_producto_a_grupo = async (token, prodId, grupo) => {
    try {
      const response = await axios.post(`/api/products/${prodId}/group`, {
        group: grupo
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Producto enviado a grupo:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar producto a grupo:', error.response?.data || error.message);
      return null;
    }
  };



  //Entregar productos
  //Entrega productos asociados a una orden de compra. El producto debe estar en el espacio de retiro de la fábrica y la orden en estado aceptada.
  const entregar_producto = async (token, productId, orderId) => {
    try {
      const response = await axios.post('/api/dispatch', {
        productId: productId,
        orderId: orderId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Producto entregado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al entregar producto:', error.response?.data || error.message);
      return false;
    }
  };



  //Obtener productos disponibles
  //Entrega una lista de los productos disponibles en el sistema (lista y funcional)
  const obtener_productos_disponibles = async (req,res) => {
    try {
      const response = await axios.get(`${URL_API_GEST}/products/available`);
      console.log('Productos disponibles llego al controlador:', response.data);
      return res.json(response.data);
    } catch (error) {
      console.error('Error al obtener productos disponibles:', error.response?.data || error.message);
      return res.status(500).json({ error: 'Error al obtener productos disponibles' });
    }
  };
  //------------------------FIN-----------------------Funciones correspondientes a Productos------------------------FIN-----------------------
  







  // -------------------------------------------------Funciones para calculo de métricas------------------------------------------------------

  //Permite obtener la cantidad de productos por sku que se tiene en la fábrica entre todos los espacios(lista y funcional)
  const cantidad_productos_por_sku = async (req, res) => {
    console.log("Entrando a productos por sku en back")
    try {
      // Obtener productos disponibles
      const productos = await axios.get(`${URL_API_GEST}/products/available`);
      // Obtener espacios
      const espacios = await axios.get(`${URL_API_GEST}/spaces`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,  // Usa tokenGlobal
        },
      });
      const totalesPorSku = {};
      // Inicializar los SKUs con 0
      for (const producto of productos.data) {
        totalesPorSku[producto.sku] = 0;
      }
      // Recorrer cada espacio y sumar los conteos por SKU
      for (const espacio of espacios.data) {
        const conteo = await axios.get(`${URL_API_GEST}/spaces/${espacio._id}/inventory`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        // Verificar si conteo.data es un objeto y recorrer los SKUs
        if (conteo.data && typeof conteo.data === 'object') {
          for (const sku in conteo.data) {
            if (totalesPorSku.hasOwnProperty(sku)) {
              totalesPorSku[sku] += conteo.data[sku];
            }
          }
        }
      }
      // Enviar la respuesta con los totales por SKU al front-end
      console.log('imprimiendo totales porsku',totalesPorSku)
      return res.json(totalesPorSku);
    } catch (error) {
      console.error('Error al calcular cantidades totales por SKU:', error);
      // Devolver un error si algo falla
      return res.status(500).json({ error: 'Error al calcular cantidades totales por SKU' });
    }
  };




  //Funcion para obtener los productos obsoletos en las proximas x horas.


  // ---------------------FIN-------------------------Funciones para calculo de métricas-------------------------------FIN--------------------

  export {
    obtenerEspacios,
    obtener_productos_en_espacio,
    obtener_conteo_productos,
    solicitar_productos,
    entregar_productos_de_solicitud,
    mover_producto_de_espacio,
    eliminar_producto,
    enviar_producto_a_grupo,
    entregar_producto,
    obtener_productos_disponibles,
    cantidad_productos_por_sku,
    proximos_obsoletos,
    getToken
  };