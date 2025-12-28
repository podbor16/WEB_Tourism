import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import { getTourismColor } from '../constants/tourismColors';
import styles from './Calendar.module.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [viewMode, setViewMode] = useState('month');
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

  // Получить дни месяца
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Получить первый день недели месяца (Пн=0, Вс=6)
  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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

  // Функция для расчета позиций событий (алгоритм размещения без наложений)
  const calculateEventLayouts = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Создаем массив дней месяца
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const dayOfWeek = (date.getDay() + 6) % 7; // Пн=0, Вс=6
      return {
        date,
        dayOfWeek,
        events: [],
      };
    });

    // Фильтруем туры, которые попадают в текущий месяц
    const monthTours = tours.filter(tour => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.end_date || tour.start_date);
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      return tourEnd >= monthStart && tourStart <= monthEnd;
    });

    // Распределяем события по дням
    monthTours.forEach((tour) => {
      const startDate = new Date(tour.start_date);
      const endDate = new Date(tour.end_date || tour.start_date);

      // Нормализуем даты к началу дня
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Определяем дни, когда событие активно
      const eventStartDay = Math.max(
        startDate.getDate(),
        startDate.getMonth() === month ? startDate.getDate() : 1
      );

      const eventEndDay = Math.min(
        endDate.getDate(),
        endDate.getMonth() === month ? endDate.getDate() : daysInMonth
      );

      // Добавляем событие в каждый день его активности
      for (let day = eventStartDay; day <= eventEndDay; day++) {
        if (day >= 1 && day <= daysInMonth) {
          days[day - 1].events.push({
            ...tour,
            isFirstDay: day === eventStartDay,
            isLastDay: day === eventEndDay,
            duration: eventEndDay - eventStartDay + 1,
            currentDay: day - eventStartDay,
            startDayInMonth: eventStartDay - 1,
          });
        }
      }
    });

    // Рассчитываем позиции событий (раскладка как в Google Calendar)
    const eventRows = [];
    const maxRowsPerDay = Array(daysInMonth).fill(0);

    // Группируем события по их начальному дню
    const eventsByStartDay = {};

    monthTours.forEach(tour => {
      const startDate = new Date(tour.start_date);
      const eventStartDay = Math.max(
        startDate.getDate(),
        startDate.getMonth() === month ? startDate.getDate() : 1
      ) - 1;

      if (!eventsByStartDay[eventStartDay]) {
        eventsByStartDay[eventStartDay] = [];
      }
      eventsByStartDay[eventStartDay].push(tour);
    });

    // Матрица занятости: daysInMonth x maxRows
    const maxRows = 10; // Максимальное количество строк для событий
    const occupancyMatrix = Array.from({ length: daysInMonth }, () =>
      Array.from({ length: maxRows }, () => false)
    );

    // Функция для поиска доступной строки для события
    const findAvailableRow = (startDay, duration) => {
      for (let row = 0; row < maxRows; row++) {
        let available = true;
        for (let d = 0; d < duration; d++) {
          const day = startDay + d;
          if (day >= daysInMonth || occupancyMatrix[day][row]) {
            available = false;
            break;
          }
        }
        if (available) {
          // Занимаем строку
          for (let d = 0; d < duration; d++) {
            const day = startDay + d;
            if (day < daysInMonth) {
              occupancyMatrix[day][row] = true;
              maxRowsPerDay[day] = Math.max(maxRowsPerDay[day], row + 1);
            }
          }
          return row;
        }
      }
      // Если не нашли строку, используем следующую
      const newRow = maxRows;
      for (let d = 0; d < duration; d++) {
        const day = startDay + d;
        if (day < daysInMonth) {
          maxRowsPerDay[day] = Math.max(maxRowsPerDay[day], newRow + 1);
        }
      }
      return newRow;
    };

    // Обрабатываем каждое событие
    monthTours.forEach(tour => {
      const startDate = new Date(tour.start_date);
      const endDate = new Date(tour.end_date || tour.start_date);

      const eventStartDay = Math.max(
        startDate.getDate(),
        startDate.getMonth() === month ? startDate.getDate() : 1
      ) - 1;

      const eventEndDay = Math.min(
        endDate.getDate(),
        endDate.getMonth() === month ? endDate.getDate() : daysInMonth
      ) - 1;

      const duration = eventEndDay - eventStartDay + 1;

      // Находим строку для события
      const row = findAvailableRow(eventStartDay, duration);

      // Разбиваем событие на недельные сегменты
      let currentDay = eventStartDay;
      let segmentNumber = 0;

      while (currentDay <= eventEndDay) {
        const weekStart = Math.floor((currentDay + firstDay) / 7) * 7 - firstDay;
        const weekEnd = weekStart + 6 - firstDay;

        const segmentStart = Math.max(currentDay, weekStart);
        const segmentEnd = Math.min(eventEndDay, weekEnd);

        if (segmentStart <= segmentEnd) {
          const segmentDuration = segmentEnd - segmentStart + 1;

          eventRows.push({
            tour,
            row,
            segmentNumber,
            startDay: segmentStart,
            endDay: segmentEnd,
            duration: segmentDuration,
            isFirstSegment: segmentStart === eventStartDay,
            isLastSegment: segmentEnd === eventEndDay,
            weekNumber: Math.floor((segmentStart + firstDay) / 7),
          });

          currentDay = segmentEnd + 1;
          segmentNumber++;
        }
      }
    });

    return { days, eventRows, maxRows: Math.max(...maxRowsPerDay, 1), firstDay };
  }, [tours, currentDate]);

  // Рендер месячного календаря
  const renderMonthView = () => {
    const { days, eventRows, maxRows, firstDay } = calculateEventLayouts;
    const monthName = currentDate.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });

    const totalCells = Math.ceil((days.length + firstDay) / 7) * 7;

    // Создаем массив всех ячеек календаря
    const calendarCells = [];

    // Пустые ячейки до начала месяца
    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Ячейки дней месяца
    days.forEach((day, dayIndex) => {
      const date = new Date(day.date);
      const isSelected = selectedDate &&
        selectedDate.toDateString() === date.toDateString();
      const hasEvents = day.events.length > 0;

      // Находим все сегменты событий, которые начинаются в этот день
      const dayEventSegments = eventRows.filter(event => event.startDay === dayIndex);

      calendarCells.push(
        <div
          key={`day-${dayIndex}`}
          className={`${styles.dayCell} ${hasEvents ? styles.hasEvents : ''} ${isSelected ? styles.selected : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={styles.dayNumber}>{dayIndex + 1}</div>

          {/* Контейнер для событий */}
          <div className={styles.eventsContainer}>
            {dayEventSegments.map(event => {
              const colors = getTourismColor(event.tour.type);

              // Определяем, сколько дней до конца недели
              const daysInWeek = 7;
              const dayOfWeek = (date.getDay() + 6) % 7; // Пн=0, Вс=6
              const daysToWeekEnd = daysInWeek - dayOfWeek - 1;

              // Вычисляем длину сегмента
              const segmentLength = Math.min(event.duration, daysToWeekEnd + 1);

              // Ширина в процентах
              const widthPercent = segmentLength * 100;

              return (
                <div
                  key={`event-${event.tour.id}-${event.segmentNumber}`}
                  className={styles.calendarEvent}
                  style={{
                    backgroundColor: colors.light,
                    borderLeft: `3px solid ${colors.primary}`,
                    width: `calc(${widthPercent}% - ${(segmentLength - 1) * 2}px)`,
                    top: `${event.row * 24}px`,
                    height: '20px',
                    // Скругления углов
                    borderTopLeftRadius: event.isFirstSegment ? '4px' : '0',
                    borderBottomLeftRadius: event.isFirstSegment ? '4px' : '0',
                    borderTopRightRadius: event.isLastSegment ? '4px' : '0',
                    borderBottomRightRadius: event.isLastSegment ? '4px' : '0',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tours/${event.tour.id}`);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(0.9)';
                    e.currentTarget.style.zIndex = '10';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.zIndex = 'auto';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span className={styles.eventTitle}>
                    {event.tour.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    // Пустые ячейки после конца месяца
    const remainingCells = totalCells - (firstDay + days.length);
    for (let i = 0; i < remainingCells; i++) {
      calendarCells.push(<div key={`empty-end-${i}`} className={styles.emptyDay}></div>);
    }

    // Рассчитываем количество строк (недель)
    const weekCount = Math.ceil(totalCells / 7);

    // Устанавливаем высоту контейнера дней в зависимости от количества строк событий
    const eventsContainerHeight = maxRows * 24 + 10;

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

        <div
          className={styles.daysGrid}
          style={{
            gridTemplateRows: `repeat(${weekCount}, minmax(${eventsContainerHeight}px, auto))`,
          }}
        >
          {calendarCells}
        </div>

        {selectedDate && (
          <div className={styles.selectedDateInfo}>
            <h4>{selectedDate.toLocaleDateString('ru-RU', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</h4>
            {renderToursForSelectedDate(selectedDate)}
          </div>
        )}
      </div>
    );
  };

  // Рендер туров для выбранной даты
  const renderToursForSelectedDate = (date) => {
    if (!date) return null;

    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);

    const toursOnDate = tours.filter(tour => {
      const tourStart = new Date(tour.start_date);
      const tourEnd = new Date(tour.end_date || tour.start_date);
      tourStart.setHours(0, 0, 0, 0);
      tourEnd.setHours(0, 0, 0, 0);

      return selectedDay >= tourStart && selectedDay <= tourEnd;
    });

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
      </div>

      <div className={styles.viewContent}>
        {viewMode === 'month' && renderMonthView()}
      </div>
    </div>
  );
};

export default Calendar;