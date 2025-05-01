import { useEffect, useState } from "react";
import { Card, Row, Col, Table, Button, Modal, Tag, Divider, Switch, ConfigProvider, Layout } from "antd";
import { theme } from "antd";
import axios from 'axios';

import {
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
    proximos_obsoletos
  } from '../backend/controllers_gestion';

const { Header, Content } = Layout;
const URL = 'http://localhost:5000';

const metricsDataExample = {
    spaceUsage: {
        "Recepción": "70%",
        "Bodega Principal": "85%",
        "Bodega Externa": "50%",
        "Taller": "40%",
        "Retiro": "20%"
    },
    stockBySKU: [
        { sku: "SAT-A1", stock: 50 },
        { sku: "SAT-B2", stock: 20 },
        { sku: "COMP-X", stock: 100 },
    ],
    ordersByHour: [12, 20, 15, 18, 22],
    obsoleteProducts: [
        { sku: "SAT-A1", quantity: 2 },
        { sku: "COMP-X", quantity: 5 },
    ],
};

const ordersDataExample = [
    {
        id: "ORD001",
        receivedAt: "2025-04-28 10:00",
        items: [{ sku: "SAT-A1", quantity: 2 }, { sku: "COMP-X", quantity: 5 }],
        status: "Pendiente",
    },
    {
        id: "ORD002",
        receivedAt: "2025-04-28 09:30",
        items: [{ sku: "SAT-B2", quantity: 1 }],
        status: "Completado",
    },
];

export default function Dashboard() {
    const [metricsData, setMetricsData] = useState(metricsDataExample);
    const [ordersData, setOrdersData] = useState(ordersDataExample);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [stockBySKU, setStockBySKU] = useState([]);
    const [obsoletos, setObsoletos] = useState([]);

    const [token, setToken] = useState(null);
    const [espacios, setEspacios] = useState([]);

    

    useEffect(() => {

        //Obtenemos el token
        const fetchToken = async () => {
            try {
                const response = await axios.post(`${URL}/token`);
                //Guardamos el token
                const tokenObtenido = response.data.token
                setToken(response.data.token);
            } catch (error) {
                console.error('Hubo un problema obteniendo el token:', error);
            }
        };

        const obtener_espacios = async () => {
            try {
                const espaciosObtenidos = await axios.get(`${URL}/espacios`);
                setEspacios(espaciosObtenidos.data);
                console.log('estos son los espacios en el front',espaciosObtenidos.data)
            } catch (error) {
                console.error('Hubo un problema al obtener los espacios', error);
            }

        };
        //Aca se obtienen laa cantidad de productos por sku para toda la fabrica
        const productos_por_sku = async () => {
            try {
                const conteo = await axios.get(`${URL}/porsku`);
                console.log(conteo.data); 
                const stockList = Object.entries(conteo.data)
                    .map(([sku, stock]) => ({ sku, stock }))
                    .sort((a, b) => b.stock - a.stock); // Ordena por stock de mayor a menor
                setStockBySKU(stockList); // Establece los datos en el estado
            } catch (error) {
                console.error('Hubo un problema al contar los sku totales', error);
            }
        };

        fetchToken();
        obtener_espacios();
        productos_por_sku();
    }, []);


    const columns = [
        {
            title: "Fecha y Hora",
            dataIndex: "receivedAt",
            key: "receivedAt",
        },
        {
            title: "ID Pedido",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "SKUs y Cantidad",
            key: "items",
            render: (_, record) =>
                record.items.map(item => `${item.sku} (x${item.quantity})`).join(", "),
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            render: status => (
                <Tag color={status === "Completado" ? "green" : "blue"}>{status}</Tag>
            ),
        },
        {
            title: "Ver más",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => setSelectedOrder(record)}>
                    Ver más
                </Button>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                {/* NavBar */}
                <Header style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 24px",
                    backgroundColor: darkMode ? "#141414" : "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: darkMode ? "#ffffff" : "#000000"
                    }}>
                        🚀 Starlink Factory
                    </div>
                    <div>
                        <span style={{ marginRight: 8, color: darkMode ? "#ffffff" : "#000000" }}>Modo oscuro</span>
                        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </div>
                </Header>

                <Content style={{ padding: 24 }}>
                    <h1 style={{ textAlign: "center", marginBottom: 24 }}>Dashboard de Fábrica</h1>

                    <Row gutter={[16, 16]}>
                        {/* Espacio utilizado */}
                        <Col xs={24} md={12} lg={6}>
                            <Card title="Espacio Utilizado" variant>
                                {espacios.length > 0 ? (
                                    espacios.map((espacio, index) => {
                                    let nombreEspacio = '';
                                    if (espacio.checkIn) nombreEspacio = 'Check-In';
                                    else if (espacio.checkOut) nombreEspacio = 'Check-Out';
                                    else if (espacio.buffer) nombreEspacio = 'Buffer';
                                    else if (espacio.workshop) nombreEspacio = 'Workshop';
                                    else nombreEspacio = `Espacio ${index + 1}`;

                                    // Simulamos un % de uso si no tienes aún
                                    const usoSimulado = espacio.usedSpace/espacio.totalSpace;

                                    return (
                                        <p key={espacio._id}>
                                        <strong>{nombreEspacio}:</strong> {usoSimulado}% utilizado
                                        </p>
                                    );
                                    })
                                ) : (
                                    <p>Cargando espacios...</p>
                                )}
                                </Card>
                        </Col>

                        {/* Stock por SKU */}
                        <Col xs={24} md={12} lg={6}>
                            <Card title="Stock por SKU" variant>
                                <div style={{ maxHeight: '195px', overflowY: 'auto' }}>
                                {stockBySKU.map(item => (
                                    <p key={item.sku} style={{ marginBottom: '8px' }}>
                                    <strong>{item.sku}:</strong> {item.stock} unidades
                                    </p>
                                ))}
                                </div>
                            </Card>
                        </Col>

                        {/* Pedidos por hora */}
                        <Col xs={24} md={12} lg={6}>
                            <Card title="Pedidos por Hora" variant>
                                {metricsData.ordersByHour.map((count, index) => (
                                    <p key={index}>
                                        <strong>Hora {index + 1}:</strong> {count} pedidos
                                    </p>
                                ))}
                            </Card>
                        </Col>

                        {/* Productos obsoletos */}
                        <Col xs={24} md={12} lg={6}>
                            <Card title="Obsolescencia (3h)" variant>
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {Object.entries(obsoletos).map(([sku, ids]) => (
                                    <div key={sku} style={{ marginBottom: '10px' }}>
                                    <strong>{sku}:</strong> {ids.length} unidades
                                    <ul style={{ marginLeft: '1em' }}>
                                        {ids.map(id => (
                                        <li key={id}>{id}</li>
                                        ))}
                                    </ul>
                                    </div>
                                ))}
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Tabla de pedidos */}
                    <Card title="Pedidos Recibidos" variant style={{ marginTop: 24 }}>
                        <Table
                            columns={columns}
                            dataSource={ordersData}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>

                    {/* Modal de detalles */}
                    <Modal
                        title={`Detalles del Pedido ${selectedOrder?.id}`}
                        open={!!selectedOrder}
                        onCancel={() => setSelectedOrder(null)}
                        footer={null}
                        centered
                    >
                        {selectedOrder && (
                            <>
                                <p><strong>Fecha y hora:</strong> {selectedOrder.receivedAt}</p>
                                <p><strong>Estado:</strong> {selectedOrder.status}</p>
                                <Divider />
                                <h4>Productos solicitados:</h4>
                                {selectedOrder.items.map(item => (
                                    <p key={item.sku}>
                                        {item.sku} - Cantidad: {item.quantity}
                                    </p>
                                ))}
                            </>
                        )}
                    </Modal>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
