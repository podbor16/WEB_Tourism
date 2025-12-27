import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import styles from './Calendar.module.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [viewMode, setViewMode] = useState('month'); // month, day, list
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await toursAPI.getTours();
      setTours(response.data.results || response.data || []);
    } catch (err) {
      console.error('Ошибка при загрузке туров:', err);
    } finally {
      setLoading(false);
    }
  };

  // Получить туры на конкретную дату
  const getToursForDate = (date) => {
    return tours.filter(tour => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.end_date || tour.start_date);
      const checkDate = new Date(date);
      
      return checkDate >= tourStart && checkDate <= tourEnd;
    });
  };

  // Получить туры на месяц
  const getToursForMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    return tours.filter(tour => {
      const tourStart = new Date(tour.start_date);
      return tourStart.getFullYear() === year && tourStart.getMonth() === month;
    });
  };

  // Проверить, есть ли туры на дату
  const hasToursOnDate = (date) => {
    return getToursForDate(date).length > 0;
  };

  // Получить дни месяца
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Получить первый день недели месяца
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Изменить месяц
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  // Рендер месячного календаря
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthName = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

    // Пустые ячейки для дней до начала месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const toursOnDay = getToursForDate(date);
      const isSelected = selectedDate && 
        selectedDate.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`${styles.day} ${toursOnDay.length > 0 ? styles.hasEvents : ''} ${isSelected ? styles.selected : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={styles.dayNumber}>{day}</div>
          {toursOnDay.length > 0 && (
            <>
              <div className={styles.eventCount}>{toursOnDay.length}</div>
              <div className={styles.tourTitles}>
                {toursOnDay.map((tour) => (
                  <span key={tour.id} className={styles.tourTag}>{tour.name}</span>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className={styles.monthView}>
        <div className={styles.monthHeader}>
          <button onClick={() => changeMonth(-1)}>←</button>
          <h3>{monthName}</h3>
          <button onClick={() => changeMonth(1)}>→</button>
        </div>

        <div className={styles.weekDays}>
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>

        <div className={styles.daysGrid}>{days}</div>

        {selectedDate && (
          <div className={styles.selectedDateInfo}>
            <h4>{selectedDate.toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</h4>
            {renderToursForSelectedDate()}
          </div>
        )}
      </div>
    );
  };

  // Рендер дневного календаря
  const renderDayView = () => {
    const today = new Date();
    const nextDays = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      nextDays.push(date);
    }

    return (
      <div className={styles.dayView}>
        <h3>Ближайшие туры</h3>
        <div className={styles.daysList}>
          {nextDays.map((date, idx) => {
            const toursOnDay = getToursForDate(date);
            if (toursOnDay.length === 0) return null;

            return (
              <div key={idx} className={styles.dayCard}>
                <h4>{date.toLocaleDateString('ru-RU', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</h4>
                {toursOnDay.map((tour, tourIdx) => (
                  <div key={tourIdx} className={styles.tourItem} onClick={() => navigate(`/tours/${tour.id}`)}>
                    <div className={styles.tourName}>{tour.name}</div>
                    <div className={styles.tourDates}>
                      {new Date(tour.start_date).toLocaleDateString('ru-RU')} 
                      {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
                    </div>
                    {tour.price && <div className={styles.tourPrice}>{tour.price} ₽</div>}
                    <div className={styles.tourClickHint}>Подробнее →</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Рендер списка всех туров
  const renderListView = () => {
    const sortedTours = [...tours].sort((a, b) => 
      new Date(a.start_date) - new Date(b.start_date)
    );

    return (
      <div className={styles.listView}>
        <h3>Все туры</h3>
        <div className={styles.toursList}>
          {sortedTours.map((tour) => (
            <div key={tour.id} className={styles.tourCard} onClick={() => navigate(`/tours/${tour.id}`)}>
              <div className={styles.tourCardHeader}>
                <h4>{tour.name}</h4>
                <span className={styles.tourType}>{tour.type}</span>
              </div>
              <div className={styles.tourCardBody}>
                <div className={styles.tourDates}>
                  📅 {new Date(tour.start_date).toLocaleDateString('ru-RU')}
                  {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
                </div>
                {tour.price && (
                  <div className={styles.tourPrice}>💰 {tour.price} ₽</div>
                )}
                {tour.description && (
                  <p className={styles.tourDescription}>{tour.description.substring(0, 150)}...</p>
                )}
              </div>
              <div className={styles.tourClickHint}>Подробнее →</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Рендер туров для выбранной даты
  const renderToursForSelectedDate = () => {
    const toursOnDate = getToursForDate(selectedDate);

    if (toursOnDate.length === 0) {
      return <p className={styles.noTours}>Нет туров на эту дату</p>;
    }

    return (
      <div className={styles.toursList}>
        {toursOnDate.map((tour) => (
          <div key={tour.id} className={styles.tourCard} onClick={() => navigate(`/tours/${tour.id}`)}>
            <div className={styles.tourCardHeader}>
              <h5>{tour.name}</h5>
              <span className={styles.tourType}>{tour.type}</span>
            </div>
            <div className={styles.tourDates}>
              {new Date(tour.start_date).toLocaleDateString('ru-RU')}
              {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
            </div>
            {tour.price && <div className={styles.tourPrice}>{tour.price} ₽</div>}
            <div className={styles.tourClickHint}>Нажмите для подробностей →</div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка календаря...</div>;
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.viewModeButtons}>
        <button 
          className={viewMode === 'month' ? styles.active : ''} 
          onClick={() => setViewMode('month')}
        >
          📅 Месяц
        </button>
        <button 
          className={viewMode === 'day' ? styles.active : ''} 
          onClick={() => setViewMode('day')}
        >
          📆 Ближайшие
        </button>
        <button 
          className={viewMode === 'list' ? styles.active : ''} 
          onClick={() => setViewMode('list')}
        >
          📋 Список
        </button>
      </div>

      <div className={styles.viewContent}>
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'list' && renderListView()}
      </div>
    </div>
  );
};

export default Calendar;
