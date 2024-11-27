import styled from "styled-components";
import { format, isSameMonth, isToday } from "date-fns";
import generateCalendar from "./generateCalendar";
import { attendanceData } from "./attendance";

interface ICalendar {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  handleDateClick: (value: Date) => void;
}

/**
 * Calendar
 *
 * 월별 날짜를 표시하고, 이전/다음 달로 이동할 수 있는 캘린더 컴포넌트.
 * 날짜 클릭 이벤트를 처리할 수 있습니다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 props
 * @param {Date} props.currentDate - 현재 캘린더가 표시할 날짜 (월의 첫 날로 설정)
 * @param {Function} props.setCurrentDate - 현재 날짜를 설정하는 함수
 * @param {Function} props.handleDateClick - 특정 날짜를 클릭했을 때 호출되는 함수
 */
const Calendar = ({
  currentDate,
  setCurrentDate,
  handleDateClick,
}: ICalendar) => {
  const calendar = generateCalendar(currentDate);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const attendanceText = (day: Date) => {
    const attendanceObj = attendanceData[format(day, "yyyy-MM-dd")];
    return (
      <>
        {attendanceObj?.checkIn && (
          <Time>{`출근: ${format(attendanceObj.checkIn, "HH:mm")}`}</Time>
        )}
        {attendanceObj?.checkOut && (
          <Time>{`퇴근: ${format(attendanceObj.checkOut, "HH:mm")}`}</Time>
        )}
      </>
    );
  };

  return (
    <CalendarWrapper>
      {/* 월 네비게이션 */}
      <Header>
        <Button onClick={handlePrevMonth}>이전</Button>
        <MonthLabel>{format(currentDate, "yyyy년 MM월")}</MonthLabel>
        <Button onClick={handleNextMonth}>다음</Button>
      </Header>

      {/* 요일 헤더 */}
      <Weekdays>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <Weekday key={day}>{day}</Weekday>
        ))}
      </Weekdays>

      {/* 날짜 렌더링 */}
      <Days>
        {calendar.map((week, i) => (
          <Week key={i}>
            {week.map((day) => (
              <Day
                key={`${week}-${day}`}
                $isSameMonth={isSameMonth(day, currentDate)}
                $isToday={isToday(day)}
                onClick={() => handleDateClick(day)} // 날짜 클릭 이벤트
              >
                {format(day, "d")}
                {attendanceData[format(day, "yyyy-MM-dd")]
                  ? attendanceText(day)
                  : null}
              </Day>
            ))}
          </Week>
        ))}
      </Days>
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const MonthLabel = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const Week = styled.div`
  display: contents;
`;

const Day = styled.div<{ $isToday: boolean; $isSameMonth: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  width: 80px;
  height: 100px;
  border: 1px solid #e0e0e0;
  background-color: ${({ $isToday }) => ($isToday ? "#f0f8ff" : "transparent")};
  color: ${({ $isSameMonth }) => ($isSameMonth ? "#000000" : "#cccccc")};
  font-weight: ${({ $isToday }) => ($isToday ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Time = styled.span`
  font-size: 10px;
  font-weight: 400;
`;
