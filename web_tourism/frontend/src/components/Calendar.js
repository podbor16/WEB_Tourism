import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../api';
import { getTourismColor } from '../constants/tourismColors';
import styles from './Calendar.module.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Исправленная функция normalizeDate, которая обрабатывает и строки, и объекты Date
  const normalizeDate = (dateInput) => {
    if (!dateInput) return null;

    let date;

    if (typeof dateInput === 'string') {
      // Если это строка формата YYYY-MM-DD
      const parts = dateInput.split('-');
      if (parts.length !== 3) return null;

      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      date = new Date(Date.UTC(year, month, day));
    } else if (dateInput instanceof Date) {
      // Если это объект Date, обнуляем время
      date = new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    } else {
      return null;
    }

    return date;
  };

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
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Изменить месяц
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // Перейти к конкретному месяцу
  const goToSpecificMonth = (year, month) => {
    setCurrentDate(new Date(year, month, 1));
  };

  // Массив названий месяцев на русском
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Массив коротких названий месяцев для быстрой навигации
  const shortMonths = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];

  // Генерация списка годов (от текущего - 5 до текущего + 5)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  // Получить следующие N месяцев, начиная с текущего
  const getNextMonths = (count = 12) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const nextMonths = [];

    for (let i = 0; i < count; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      nextMonths.push({
        month: monthIndex,
        year: year,
        name: shortMonths[monthIndex],
        isCurrent: monthIndex === currentDate.getMonth() && year === currentDate.getFullYear(),
        isTodayMonth: monthIndex === today.getMonth() && year === today.getFullYear()
      });
    }

    return nextMonths;
  };

  // Обработчик изменения месяца через селектор
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
    setCurrentDate(newDate);
  };

  // Обработчик изменения года через селектор
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    const newDate = new Date(newYear, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
  };

  // Быстрая навигация по месяцам
  const quickMonthNavigate = (year, month) => {
    goToSpecificMonth(year, month);
  };

  // Рассчитать календарь
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const weeks = [];
    let currentWeek = [];

    // Пустые дни до начала месяца
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    // Заполняем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Добавляем последнюю неделю
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentDate]);

  // Получить события для конкретной даты
  const getEventsForDate = (date) => {
    if (!date) return [];

    const checkDate = normalizeDate(date);
    if (!checkDate) return [];

    return tours.filter(tour => {
      const tourStart = normalizeDate(tour.start_date);
      const tourEnd = normalizeDate(tour.end_date || tour.start_date);

      if (!tourStart || !tourEnd || !checkDate) return false;

      return checkDate >= tourStart && checkDate <= tourEnd;
    });
  };

  // Рассчитать расположение событий в календаре
  const calculateEventLayouts = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    // Создаем массив событий для месяца
    const monthEvents = tours.filter(tour => {
      const tourStart = normalizeDate(tour.start_date);
      const tourEnd = normalizeDate(tour.end_date || tour.start_date);

      if (!tourStart || !tourEnd) return false;

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      return (tourStart <= monthEnd && tourEnd >= monthStart);
    });

    // Функция для расчета позиции события
    const calculateEventPosition = (event) => {
      const eventStart = normalizeDate(event.start_date);
      const eventEnd = normalizeDate(event.end_date || event.start_date);

      if (!eventStart || !eventEnd) return [];

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);

      // Определяем видимую часть события в текущем месяце
      let visibleStartDay = 1;
      let visibleEndDay = daysInMonth;

      if (eventStart >= monthStart) {
        visibleStartDay = eventStart.getDate();
      }

      if (eventEnd <= monthEnd) {
        visibleEndDay = eventEnd.getDate();
      }

      if (visibleStartDay > visibleEndDay) {
        return [];
      }

      // Разбиваем событие на сегменты по неделям
      const segments = [];
      let currentDay = visibleStartDay;
      let segmentNumber = 0;

      while (currentDay <= visibleEndDay) {
        const date = new Date(year, month, currentDay);
        // День недели: Пн=0, Вс=6
        let dayOfWeek = date.getDay();
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        // Находим конец недели (Вс=6)
        const daysToWeekEnd = 6 - dayOfWeek;
        const segmentEndDay = Math.min(visibleEndDay, currentDay + daysToWeekEnd);
        const segmentDuration = segmentEndDay - currentDay + 1;

        if (segmentDuration > 0) {
          const isFirstSegment = currentDay === visibleStartDay;
          const isLastSegment = segmentEndDay === visibleEndDay;
          const isActualFirstDay = (eventStart.getDate() === currentDay &&
                                   eventStart.getMonth() === month);
          const isActualLastDay = (eventEnd.getDate() === segmentEndDay &&
                                  eventEnd.getMonth() === month);

          segments.push({
            event,
            startDay: currentDay,
            endDay: segmentEndDay,
            duration: segmentDuration,
            dayOfWeek,
            segmentNumber,
            isFirstSegment,
            isLastSegment,
            isActualFirstDay,
            isActualLastDay,
            weekNumber: Math.floor((currentDay - 1 + firstDayOfMonth) / 7)
          });

          segmentNumber++;
        }

        currentDay = segmentEndDay + 1;
      }

      return segments;
    };

    // Рассчитываем позиции для всех событий
    const allSegments = [];
    monthEvents.forEach(event => {
      const segments = calculateEventPosition(event);
      allSegments.push(...segments);
    });

    // Группируем сегменты по неделям
    const segmentsByWeek = {};
    allSegments.forEach(segment => {
      const weekNumber = Math.floor((segment.startDay - 1 + firstDayOfMonth) / 7);

      if (!segmentsByWeek[weekNumber]) {
        segmentsByWeek[weekNumber] = [];
      }
      segmentsByWeek[weekNumber].push(segment);
    });

    // Для каждой недели распределяем события по строкам
    Object.keys(segmentsByWeek).forEach(weekKey => {
      const weekSegments = segmentsByWeek[weekKey];
      const maxRows = 10;
      const weekMatrix = Array.from({ length: 7 }, () =>
        Array.from({ length: maxRows }, () => null)
      );

      // Сортируем сегменты по начальному дню и длительности
      weekSegments.sort((a, b) => {
        if (a.startDay !== b.startDay) return a.startDay - b.startDay;
        return b.duration - a.duration;
      });

      // Распределяем сегменты по строкам
      weekSegments.forEach(segment => {
        let availableRow = 0;
        let found = false;

        while (!found && availableRow < maxRows) {
          let canPlace = true;
          for (let d = 0; d < segment.duration; d++) {
            const dayIndex = segment.dayOfWeek + d;
            if (dayIndex >= 7 || weekMatrix[dayIndex][availableRow]) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            found = true;
            // Занимаем место
            for (let d = 0; d < segment.duration; d++) {
              const dayIndex = segment.dayOfWeek + d;
              if (dayIndex < 7) {
                weekMatrix[dayIndex][availableRow] = segment.event.id;
              }
            }
            segment.row = availableRow;
          } else {
            availableRow++;
          }
        }
      });
    });

    return { segments: allSegments, segmentsByWeek };
  }, [tours, currentDate]);

  // Функция для определения, нужно ли показывать название события
  const shouldShowEventTitle = (segment) => {
    return segment.segmentNumber === 0 || segment.duration >= 2;
  };

  // Рендер календаря
  const renderCalendar = () => {
    const monthName = currentDate.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const years = generateYears();
    const nextMonths = getNextMonths(12);

    return (
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarHeader}>
          <div className={styles.calendarControls}>
            {/* Селекторы для выбора месяца и года */}
            <div className={styles.monthYearSelectors}>
              <select
                  className={styles.monthSelector}
                  value={currentMonth}
                  onChange={handleMonthChange}
                  title="Выберите месяц"
              >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                ))}
              </select>

              <select
                  className={styles.yearSelector}
                  value={currentYear}
                  onChange={handleYearChange}
                  title="Выберите год"
              >
                {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                ))}
              </select>
            </div>

            {/* Быстрая навигация по месяцам - начиная с текущего */}
            <div className={styles.quickMonthNav}>
              {nextMonths.map((monthData, index) => (
                  <button
                      key={`${monthData.year}-${monthData.month}`}
                      className={`${styles.quickMonthButton} ${
                          monthData.isCurrent ? styles.quickMonthButtonActive : ''
                      } ${
                          monthData.isTodayMonth ? styles.quickMonthButtonToday : ''
                      }`}
                      onClick={() => quickMonthNavigate(monthData.year, monthData.month)}
                      title={`${months[monthData.month]} ${monthData.year}`}
                  >
                    {monthData.name}
                    {index === 0 && (
                        <span className={styles.currentMonthIndicator}>●</span>
                    )}
                  </button>
              ))}
            </div>

            <div className={styles.calendarTitle}>
              {/*<button*/}
              {/*  className={styles.monthNav}*/}
              {/*  onClick={() => changeMonth(-1)}*/}
              {/*  title="Предыдущий месяц"*/}
              {/*>*/}
              {/*  ←*/}
              {/*</button>*/}
              <h2>{monthName}</h2>
              {/*<button*/}
              {/*  className={styles.monthNav}*/}
              {/*  onClick={() => changeMonth(1)}*/}
              {/*  title="Следующий месяц"*/}
              {/*>*/}
              {/*  →*/}
              {/*</button>*/}
            </div>

            <div className={styles.monthQuickNav}>
              <button
                  className={styles.todayButton}
                  onClick={goToToday}
              >
                Сегодня
              </button>
            </div>
          </div>
        </div>

        <div className={styles.calendarGrid}>
          {/* Дни недели */}
          <div className={styles.weekDays}>
            <div>Пн</div>
            <div>Вт</div>
            <div>Ср</div>
            <div>Чт</div>
            <div>Пт</div>
            <div>Сб</div>
            <div>Вс</div>
          </div>

          {/* Недели календаря */}
          {calendarData.map((week, weekIndex) => {
            const weekSegments = calculateEventLayouts.segmentsByWeek[weekIndex] || [];

            return (
                <div key={weekIndex} className={styles.weekRow}>
                {/* Контейнер для событий */}
                <div className={styles.weekEventsContainer}>
                  {weekSegments.map((segment, segmentIndex) => {
                    const colors = getTourismColor(segment.event.type);
                    const leftPercent = (segment.dayOfWeek * (100 / 7));
                    const widthPercent = (segment.duration * (100 / 7));
                    const top = segment.row * 24;

                    const eventClasses = [
                      styles.calendarEvent,
                      !segment.isActualFirstDay && segment.isFirstSegment ? styles.continued : '',
                      !segment.isActualLastDay && segment.isLastSegment ? styles.continuing : '',
                    ].filter(Boolean).join(' ');

                    return (
                      <div
                        key={`event-${segment.event.id}-${segment.segmentNumber}`}
                        className={eventClasses}
                        style={{
                          backgroundColor: colors.light,
                          borderLeft: `3px solid ${colors.primary}`,
                          position: 'absolute',
                          left: `${leftPercent}%`,
                          width: `calc(${widthPercent}% - 2px)`,
                          top: `${top}px`,
                          height: '22px',
                          zIndex: segment.row + 3,
                          borderTopLeftRadius: segment.isActualFirstDay || segment.isFirstSegment ? '4px' : '0',
                          borderBottomLeftRadius: segment.isActualFirstDay || segment.isFirstSegment ? '4px' : '0',
                          borderTopRightRadius: segment.isActualLastDay || segment.isLastSegment ? '4px' : '0',
                          borderBottomRightRadius: segment.isActualLastDay || segment.isLastSegment ? '4px' : '0',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tours/${segment.event.id}`);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'brightness(0.9)';
                          e.currentTarget.style.zIndex = '20';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'brightness(1)';
                          e.currentTarget.style.zIndex = `${segment.row + 3}`;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        title={`${segment.event.name}\n${new Date(segment.event.start_date).toLocaleDateString()} - ${new Date(segment.event.end_date || segment.event.start_date).toLocaleDateString()}`}
                      >
                        <span className={styles.eventTitle}>
                          {shouldShowEventTitle(segment) ? segment.event.name : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Ячейки дней */}
                {week.map((date, dayIndex) => {
                  const day = date ? date.getDate() : null;
                  const isToday = date && date.toDateString() === new Date().toDateString();
                  const isSelected = date && selectedDate &&
                    date.toDateString() === selectedDate.toDateString();

                  return (
                    <div
                      key={dayIndex}
                      className={`${styles.dayCell} ${date ? '' : styles.emptyDay} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                      onClick={() => date && setSelectedDate(date)}
                    >
                      {date && (
                        <div className={styles.dayNumber}>
                          {day}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Рендер событий выбранной даты
  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const events = getEventsForDate(selectedDate);

    if (events.length === 0) {
      return (
        <div className={styles.noEvents}>
          <p>На эту дату нет мероприятий</p>
        </div>
      );
    }

    return (
      <div className={styles.selectedEvents}>
        <h3>{selectedDate.toLocaleDateString('ru-RU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</h3>

        <div className={styles.eventsList}>
          {events.map(event => {
            const colors = getTourismColor(event.type);

            return (
              <div
                key={event.id}
                className={styles.eventCard}
                style={{
                  borderLeft: `4px solid ${colors.primary}`,
                }}
                onClick={() => navigate(`/tours/${event.id}`)}
              >
                <div className={styles.eventHeader}>
                  <h4>{event.name}</h4>
                  <span
                    className={styles.eventType}
                    style={{
                      backgroundColor: colors.light,
                      color: colors.primary,
                    }}
                  >
                    {event.type}
                  </span>
                </div>

                <div className={styles.eventDetails}>
                  <div className={styles.eventDate}>
                    <span className={styles.detailIcon}>📅</span>
                    {new Date(event.start_date).toLocaleDateString('ru-RU')}
                    {event.end_date && ` — ${new Date(event.end_date).toLocaleDateString('ru-RU')}`}
                  </div>

                  {event.price && (
                    <div className={styles.eventPrice}>
                      <span className={styles.detailIcon}>💰</span>
                      {event.price} ₽
                    </div>
                  )}

                  {event.description && (
                    <p className={styles.eventDescription}>
                      {event.description.length > 150
                        ? `${event.description.substring(0, 150)}...`
                        : event.description}
                    </p>
                  )}
                </div>

                <div className={styles.eventActions}>
                  <button
                    className={styles.moreButton}
                    onClick={() => navigate(`/tours/${event.id}`)}
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка календаря...</div>;
  }

  return (
    <div className={styles.calendarContainer}>
      {renderCalendar()}
      {renderSelectedDateEvents()}
    </div>
  );
};

export default Calendar;