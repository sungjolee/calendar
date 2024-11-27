import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

const generateCalendar = (date: Date) => {
  // 1. 해당 월의 첫 날과 마지막 날
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // 주의 시작: 일요일
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 0 }); // 주의 끝: 일요일

  const calendar = [];
  let currentDate = startDate;

  // 2. 주 단위로 반복하여 날짜 추가
  while (currentDate <= endDate) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));
    calendar.push(week);
    currentDate = addDays(currentDate, 7); // 다음 주로 이동
  }

  return calendar; // 2D 배열 (주 단위로 구성된 달력)
};

export default generateCalendar;
