import React, { useEffect, useState } from 'react';
import { registrationsAPI } from '../api';
import '../styles/MyRegistrations.css';

function MyRegistrations({ user }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationsAPI.getMy();
      setRegistrations(response.data.results || response.data);
    } catch (err) {
      setError('Ошибка при загрузке регистраций');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Вы уверены, что хотите отменить регистрацию?')) {
      try {
        await registrationsAPI.cancel(id);
        setRegistrations(registrations.map(reg =>
          reg.id === id ? { ...reg, status: 'cancelled' } : reg
        ));
      } catch (err) {
        alert('Ошибка при отмене регистрации');
        console.error(err);
      }
    }
  };

  const handleReactivate = async (id) => {
    try {
      await registrationsAPI.reactivate(id);
      setRegistrations(registrations.map(reg =>
        reg.id === id ? { ...reg, status: 'pending' } : reg
      ));
    } catch (err) {
      alert('Ошибка при восстановлении регистрации');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Ожидание';
      case 'confirmed':
        return 'Подтверждено';
      case 'cancelled':
        return 'Отменено';
      default:
        return status;
    }
  };

  if (loading) return <div className="loading">Загрузка регистраций...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="registrations-container">
      <h1>Мои регистрации на туры</h1>

      {registrations.length > 0 ? (
        <div className="registrations-list">
          {registrations.map(registration => (
            <div key={registration.id} className="registration-card">
              <div className="registration-header">
                <h3>{registration.tour_name}</h3>
                <span className={`status ${getStatusColor(registration.status)}`}>
                  {getStatusText(registration.status)}
                </span>
              </div>

              <div className="registration-info">
                <p>
                  <strong>Дата регистрации:</strong>{' '}
                  {new Date(registration.registration_date).toLocaleDateString('ru-RU')}
                </p>
              </div>

              <div className="registration-actions">
                {registration.status !== 'cancelled' ? (
                  <button
                    onClick={() => handleCancel(registration.id)}
                    className="btn btn-danger"
                  >
                    Отменить
                  </button>
                ) : (
                  <button
                    onClick={() => handleReactivate(registration.id)}
                    className="btn btn-success"
                  >
                    Восстановить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-registrations">
          У вас нет регистраций. <a href="/tours">Найдите интересующий вас тур</a>
        </p>
      )}
    </div>
  );
}

export default MyRegistrations;
