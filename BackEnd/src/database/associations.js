// Importación de modelos para hacer las asociaciones
const Usuario = require('./models/Usuario');
const Solicitud = require('./models/Solicitud');
const Producto = require('./models/Producto');
const Perdida = require('./models/Perdida');
const PedidoProducto = require('./models/PedidoProducto');
const PedidoMaquina = require('./models/PedidoMaquina');
const Pedido = require('./models/Pedido');
const Opinion = require('./models/Opinion');
const Maquina = require('./models/Maquina');
const Ganancia = require('./models/Ganancia');
const Factura = require('./models/Factura');
const Empresa = require('./models/Empresa');
const Cuenta = require('./models/Cuenta');

// Relación Usuario realiza Solicitud 1:N

Usuario.hasMany(Solicitud, { foreignKey: 'id_usuario'});
Maquina.hasMany(Solicitud, { foreignKey: 'id_maquina'});
Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario'});
Solicitud.belongsTo(Maquina, { foreignKey: 'id_maquina'});

// Relación Usuario escribe Opinion 1:N

Usuario.hasMany(Opinion, { foreignKey: 'id_usuario'});
Opinion.belongsTo(Usuario, { foreignKey: 'id_usuario'});

// Relación Usuario hace Pedido 1:N

Usuario.hasMany(Pedido, { foreignKey: 'id_usuario'});
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario'});

// Relación Empresa recibe Opinión 1:N

Empresa.hasMany(Opinion, { foreignKey: 'id_empresa'});
Opinion.belongsTo(Empresa, { foreignKey: 'id_empresa'});

// Relación Empresa tiene Cuenta 1:1

Empresa.hasOne(Cuenta, { foreignKey: 'id_empresa'});
Cuenta.belongsTo(Empresa, { foreignKey: 'id_empresa'});

// Relación Cuenta recibe Ganancia 1:N

Cuenta.hasMany(Ganancia, { foreignKey: 'id_cuenta'});
Ganancia.belongsTo(Cuenta, { foreignKey: 'id_cuenta'});

// Relación Cuenta recibe Perdida 1:N

Cuenta.hasMany(Perdida, { foreignKey: 'id_cuenta'});
Perdida.belongsTo(Cuenta, { foreignKey: 'id_cuenta'});

// Relación Maquina se asocia con PedidoMaquina 1:N

Maquina.hasMany(PedidoMaquina, { foreignKey: 'id_maquina'});
PedidoMaquina.belongsTo(Maquina, { foreignKey: 'id_maquina'});

// Relación Pedido se asocia con PedidoMaquina 1:N

Pedido.hasMany(PedidoMaquina, { foreignKey: 'id_pedido'});
PedidoMaquina.belongsTo(Pedido, { foreignKey: 'id_pedido'});

// Relación Producto se asocia con PedidoProducto 1:N

Producto.hasMany(PedidoProducto, { foreignKey: 'id_producto'});
PedidoProducto.belongsTo(Producto, { foreignKey: 'id_producto'});

// Relación Pedido se asocia con PedidoProducto 1:N

Pedido.hasMany(PedidoProducto, { foreignKey: 'id_pedido'});
PedidoProducto.belongsTo(Pedido, { foreignKey: 'id_pedido'});

// Relación Pedido se asocia con Factura 1:1

Pedido.hasOne(Factura, { foreignKey: 'id_pedido'});
Factura.belongsTo(Pedido, { foreignKey: 'id_pedido'});


