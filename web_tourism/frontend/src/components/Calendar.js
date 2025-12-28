import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import { getTourismColor } from '../constants/tourismColors';
import styles from './Calendar.module.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [viewMode, setViewMode] = useState('month'); // month, day, list
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listFilter, setListFilter] = useState('upcoming'); // upcoming, past, all

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
      checkDate.setHours(0, 0, 0, 0);
      tourStart.setHours(0, 0, 0, 0);
      tourEnd.setHours(0, 0, 0, 0);

      return checkDate >= tourStart && checkDate <= tourEnd;
    });
  };

  // Получить события для дня с информацией об их протяженности
  const getEventBlocksForDay = (date) => {
    const dayTours = getToursForDate(date);
    const eventBlocks = [];

    dayTours.forEach(tour => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.end_date || tour.start_date);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      tourStart.setHours(0, 0, 0, 0);
      tourEnd.setHours(0, 0, 0, 0);

      // Определяем позицию дня в диапазоне тура
      const isFirst = checkDate.getTime() === tourStart.getTime();
      const isLast = checkDate.getTime() === tourEnd.getTime();
      const isSingleDay = isFirst && isLast;

      eventBlocks.push({
        ...tour,
        isFirst,
        isLast,
        isSingleDay,
      });
    });

    return eventBlocks;
  };

  // Получить туры на месяц
  const getToursForMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Первый и последний день месяца
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);

    return tours.filter(tour => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.end_date || tour.start_date);

      // Тур пересекается с месяцем если:
      // его конец >= начало месяца И его начало <= конец месяца
      return tourEnd >= monthStart && tourStart <= monthEnd;
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

  // Получить первый день недели месяца (Пн=0, Вс=6)
  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // День недели: 0=Вс, 1=Пн, 2=Вт... 6=Сб
    // Нам нужно: 0=Пн, 1=Вт, 2=Ср, 3=Чт, 4=Пт, 5=Сб, 6=Вс
    return day === 0 ? 6 : day - 1;
  };

  // Перейти к сегодня
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
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
      const eventBlocks = getEventBlocksForDay(date);
      const isSelected = selectedDate &&
        selectedDate.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`${styles.day} ${eventBlocks.length > 0 ? styles.hasEvents : ''} ${isSelected ? styles.selected : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={styles.dayNumber}>{day}</div>
          {eventBlocks.length > 0 && (
            <div className={styles.eventBlocks}>
              {eventBlocks.map((event, idx) => {
                const colors = getTourismColor(event.type);
                const borderRadius = {
                  borderRadius: `${event.isFirst ? '6px' : '0'} ${event.isLast ? '6px' : '0'} ${event.isLast ? '6px' : '0'} ${event.isFirst ? '6px' : '0'}`,
                };

                return (
                  <div
                    key={`${event.id}-${idx}`}
                    className={styles.eventBlock}
                    style={{
                      backgroundColor: colors.light,
                      borderLeft: `3px solid ${colors.primary}`,
                      ...borderRadius,
                    }}
                    title={event.name}
                  >
                    {event.isFirst && (
                      <span className={styles.eventName}>{event.name.substring(0, 15)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={styles.monthView}>
        <div className={styles.monthHeader}>
          <button className={styles.navButton} onClick={() => changeMonth(-1)}>←</button>
          <h3>{monthName}</h3>
          <button className={styles.navButton} onClick={() => changeMonth(1)}>→</button>
          <button className={styles.todayButton} onClick={goToToday}>Сегодня</button>
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
                  <div 
                    key={tourIdx} 
                    className={styles.tourItem} 
                    onClick={() => navigate(`/tours/${tour.id}`)}
                    style={{
                      borderLeftColor: getTourismColor(tour.type).primary,
                    }}
                  >
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredTours = [...tours].sort((a, b) =>
      new Date(a.start_date) - new Date(b.start_date)
    );

    // Применяем фильтр по датам
    if (listFilter === 'upcoming') {
      filteredTours = filteredTours.filter(tour =>
        new Date(tour.start_date) >= today
      );
    } else if (listFilter === 'past') {
      filteredTours = filteredTours.filter(tour => {
        const endDate = new Date(tour.end_date || tour.start_date);
        return endDate < today;
      });
    }

    return (
      <div className={styles.listView}>
        <div className={styles.listHeader}>
          <h3>Туры</h3>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${listFilter === 'upcoming' ? styles.active : ''}`}
              onClick={() => setListFilter('upcoming')}
            >
              📅 Предстоящие
            </button>
            <button
              className={`${styles.filterBtn} ${listFilter === 'past' ? styles.active : ''}`}
              onClick={() => setListFilter('past')}
            >
              ✓ Прошедшие
            </button>
            <button
              className={`${styles.filterBtn} ${listFilter === 'all' ? styles.active : ''}`}
              onClick={() => setListFilter('all')}
            >
              📋 Все
            </button>
          </div>
        </div>
        <div className={styles.toursList}>
          {filteredTours.length === 0 ? (
            <p className={styles.noTours}>
              {listFilter === 'upcoming' && 'Нет предстоящих туров'}
              {listFilter === 'past' && 'Нет прошедших туров'}
              {listFilter === 'all' && 'Нет туров'}
            </p>
          ) : (
            filteredTours.map((tour) => (
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
            ))
          )}
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
        {toursOnDate.map((tour) => {
          const colors = getTourismColor(tour.type);
          return (
            <div 
              key={tour.id} 
              className={styles.tourCard} 
              onClick={() => navigate(`/tours/${tour.id}`)}
              style={{
                borderLeftColor: colors.primary,
              }}
            >
              <div className={styles.tourCardHeader}>
                <h5>{tour.name}</h5>
                <span className={styles.tourType} style={{
                  backgroundColor: colors.light,
                  color: colors.primary,
                }}>
                  {tour.type}
                </span>
              </div>
              <div className={styles.tourDates}>
                {new Date(tour.start_date).toLocaleDateString('ru-RU')}
                {tour.end_date && ` — ${new Date(tour.end_date).toLocaleDateString('ru-RU')}`}
              </div>
              {tour.price && <div className={styles.tourPrice}>{tour.price} ₽</div>}
              <div className={styles.tourClickHint}>Нажмите для подробностей →</div>
            </div>
          );
        })}
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
