import { useState } from "react";
import Calendar from "./Calendar";
import styled from "styled-components";
// import CalendarIntermediate from "./CalendarIntermediate";

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 캘린더의 현재 월

  // 날짜 클릭 시 처리할 로직
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // 오늘 날짜로 돌아가기
  const handleResetDate = () => {
    const today = new Date();
    setSelectedDate(today); // 선택된 날짜 업데이트
    setCurrentDate(today); // 캘린더의 현재 월도 오늘로 설정
  };

  return (
    <Layout>
      <BtnReset onClick={handleResetDate}>오늘</BtnReset>
      {/* 완성 - 출퇴근시간 포함 */}
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        handleDateClick={handleDateClick}
      />
      {/* 중간결과 - 출퇴근시간 미포함  */}
      {/* <CalendarIntermediate
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        handleDateClick={handleDateClick}
      /> */}
      {<p>선택된 날짜: {selectedDate ? selectedDate.toDateString() : null}</p>}
    </Layout>
  );
};

export default App;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BtnReset = styled.button``;
