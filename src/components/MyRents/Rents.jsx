import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, List } from 'antd';
import { useAuth } from '../../contexts/authContext';
import { getAllMyRentalsByUserHost } from '../../services/rentals';
import { Link } from 'react-router-dom';
import './rents.css'

const { Column, ColumnGroup } = Table;

const initialData = [
  {
    //tabla "usuario"
    id_usuario: 2,
    nombre_usuario: 'Estafano Fiorilo',
    correo_usuario: 'Estefano@gmail.com',
    foto_usuario: 'foto_usuario',
    //tabla "residencia"
    id_residencia: 2,
    titulo_residencia: 'Granja de Mac',
    //tags: [tipo_residencia, pais_residencia,ciudad_residencia],
    tags: ['Hotel', 'Bolivia','Cochabamba'],
    //tabla "reserva"
    id_reserva: 2,
    precio_total_reserva: 2000,
    fecha_inicio_reserva: '2023-11-23',
    fecha_fin_reserva: '2023-11-27',
    status: 'Confirmar',
  },
  {
    //tabla "usuario"
    id_usuario: 4,
    nombre_usuario: 'Carmen Corrales',
    correo_usuario: 'corales_Carmen@gmail.com',
    foto_usuario: 'foto_usuario',
    //tabla "residencia"
    id_residencia: 2,
    titulo_residencia: 'Mansion Patula',
    tags: ['Hotel', 'Bolivia','Cochabamba'],
    //tabla "reserva"
    id_reserva: 2,
    precio_total_reserva: 500,
    fecha_inicio_reserva: '2023-11-23',
    fecha_fin_reserva: '2023-11-27',
    status: 'Confirmar',
  },
  {
    //tabla "usuario"
    id_usuario: 5,
    nombre_usuario: 'Richard Choquerive',
    correo_usuario: 'richard_BK@gmail.com',
    foto_usuario: 'foto_usuario',
    //tabla "residencia"
    id_residencia: 2,
    titulo_residencia: 'Casa Bonita',
    tags: ['Casa', 'Peru','Lima'],
    //tabla "reserva"
    id_reserva: 2,
    precio_total_reserva: 1110,
    fecha_inicio_reserva: '2023-11-23',
    fecha_fin_reserva: '2023-11-27',
    status: 'Rentado',
  },
];

const Rents = () => {
  
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const { Item } = List;
  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllMyRentalsByUserHost(user.uid).then((data) => {
        setReservas(data);
      })
      setRefresh(false);
    }
  }, [isRefresh]);

  //por el momento
  const [data, setData] = useState(initialData);
  /*
  const handleConfirmClick = async (record) => {
    try {
      // Simulación de la petición al backend para cambiar el estado a Rentado
      // await api.put(`/api/rents/${record.id_reserva}`, { status: 'Rentado' });
      const updatedReservas = reservas.map((item) =>
        item.id_reserva === record.id_reserva ? { ...item, status: 'Rentado' } : item
      );
      setReservas(updatedReservas);
    } catch (error) {
      console.error('Error al cambiar el estado a Rentado:', error);
    }
  };

  const handleCancelClick = async (record) => {
    try {
      // Simulación de la petición al backend para borrar la fila
      // await api.delete(`/api/rents/${record.id_reserva}`);
      const updatedReservas = reservas.filter((item) => item.id_reserva !== record.id_reserva);
      setReservas(updatedReservas);
    } catch (error) {
      console.error('Error al borrar la fila:', error);
    }
  };
  */
  const handleConfirmClick = async (record) => {
    try {
      // Simulación de la petición al backend para cambiar el estado a Rentado
      // await api.put(`/api/rents/${record.key}`, { status: 'Rentado' });
      const updatedData = data.map((item) =>
        item.id_usuario === record.id_usuario ? { ...item, status: 'Rentado' } : item
      );
      setData(updatedData);
    } catch (error) {
      console.error('Error al cambiar el estado a Rentado:', error);
    }
  };

  const handleCancelClick = async (record) => {
    try {
      // Simulación de la petición al backend para borrar la fila
      // await api.delete(`/api/rents/${record.key}`);
      const updatedData = data.filter((item) => item.id_usuario !== record.id_usuario);
      setData(updatedData);
    } catch (error) {
      console.error('Error al borrar la fila:', error);
    }
  };

  const columns = [
    {
      title: 'Huesped',
      children: [
        {
          title: 'Nombre',
          dataIndex: 'nombre_usuario',
          key: 'nombre_usuario',
          align: 'center',
          render: (text, record) => (
            <Link to={`/usuario/${record.id_usuario}`}>{text}</Link>
          ),
        },
        { title: 'Correo', dataIndex: 'correo_usuario', key: 'correo_usuario', align: 'center', },
      ],
    },
    { title: 'Titulo Residencia', dataIndex: 'titulo_residencia', key: 'titulo_residencia', align: 'center', },
    { title: 'Precio Reserva', dataIndex: 'precio_total_reserva', key: 'precio_total_reserva', align: 'center', },
    {
      title: 'Fechas de Reserva',
      children: [
        {
          title: 'Inicio',
          dataIndex: 'fecha_inicio_reserva',
          key: 'fecha_inicio_reserva',
          align: 'center',
          style: { color: '#336699' },
        },
        {
          title: 'Fin',
          dataIndex: 'fecha_fin_reserva',
          key: 'fecha_fin_reserva',
          align: 'center',
        },
      ],
    },
    { title: 'Status', dataIndex: 'status', key: 'status', align: 'center', },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag} >
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'Confirmar' && (
            <>
              <a onClick={() => handleConfirmClick(record)}>Confirmar</a>
              <a onClick={() => handleCancelClick(record)}>Cancelar</a>
            </>
          )}
          {record.status === 'Rentado' && (
            <Button disabled>Okey</Button>
          )}
        </Space>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default Rents;
