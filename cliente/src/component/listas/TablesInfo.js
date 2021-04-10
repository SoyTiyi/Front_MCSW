

export const sobregirosCols = [
  { field: 'id', headerName: 'ID sobregiro', flex: 0.8, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'cuenta_id', headerName: 'Cuenta', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' },
  { field: 'saldo', headerName: 'Saldo', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'estado', headerName: 'Estado de sobregiro', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' },
  {field: 'fecha', headerName: 'Fecha de creación', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  {field: 'porcentaje', headerName: 'Porcentaje', flex: 0.5, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' }
];

export const sobregirosColsClient = [
  { field: 'id', headerName: 'Número', flex: 0.8, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'cuenta_id', headerName: 'Cuenta', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' },
  { field: 'saldo', headerName: 'Saldo', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'estado', headerName: 'Estado de sobregiro', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' },
  {field: 'fecha', headerName: 'Fecha de creación', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header' },
  {field: 'porcentaje', headerName: 'Porcentaje', flex: 0.5, headerAlign: 'center', align: 'center', headerClassName: 'super-app-theme--header2' }
];

export const transCols = [
  { field: 'origen', headerName: 'Cuenta origen', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header' },
  { field: 'banco_destino', headerName: 'Banco destino', flex: 0.8, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header2' },
  { field: 'destino', headerName: 'Cuenta destino', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header' },
  { field: 'saldo', headerName: 'Saldo', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header2' },
  {field: 'estado', headerName: 'Estado', flex: 0.5, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header' },
  {field: 'fecha', headerName: 'Fecha', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'trans-app-theme--header2' }
];

export const estadoSobregiros = ['', 'aprobado', 'en proceso', 'rechazado'];

export const tiposUsuario = ['', 'cliente', 'admin', 'auditor'];

export const bancosValidos = ['', 'MIBANCO', 'COLPATRIA', 'BANCOLOMBIA', 'BBVA', 'BANCOBOGOTA'];
