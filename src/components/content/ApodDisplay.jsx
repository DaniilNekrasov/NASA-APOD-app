import React, { useState, useEffect } from 'react';
import { Card, DatePicker } from 'antd';
import ApiService from '../API/ApiService';

const { RangePicker } = DatePicker;

const ApodDisplay = () => {
  const [apodArray, setApodArray] = useState([]);
  const [error, setError] = useState("");
  const [dateVal, setDateVal] = useState(null);
  const [rangeVal, setRangeVal] = useState(null);


  useEffect(() => {
    fetchApodForToday();
  }, []);

  const fetchApodForToday = async () => {
    try {
      const data = await ApiService.getApodForToday();
      let arr = []
      arr.push(data)
      setApodArray(arr);
    } catch (error) {
      // Обработка ошибки при запросе
      console.error('Error fetching APOD for today:', error);
      setError("Error fetching APOD for today")
      setApodArray([])
    }
  };

  const fetchApodForDate = async (date) => {
    try {
      const data = await ApiService.getApodForDate(date);
      let arr = []
      arr.push(data)
      setApodArray(arr);    
    } catch (error) {
      // Обработка ошибки при запросе
      console.error('Error fetching APOD for date:', error);
      setError("Error fetching APOD for date")
      setApodArray([])
    }
  };

  const fetchApodForDateRange = async (start, end) => {
    try {
      const data = await ApiService.getApodListForDateRange(start, end);
      setApodArray(data);
    } catch (error) {
      // Обработка ошибки при запросе
      console.error('Error fetching APOD for date range:', error);
      setError("Error fetching APOD for date range")
      setApodArray([])
    }
  };

  const handleRangePickerChange = (date, dateString) => {
   fetchApodForDateRange(dateString[0], dateString[1])
   setError(0)
   setRangeVal(date)
   setDateVal(null)
  };

  const handleDatePickerChange = (date, dateString) => {
    fetchApodForDate(dateString)
    setError(0)
    setDateVal(date)
    setRangeVal(null)
   };

  const disabledDate = (current) => {
    return current && current > new Date();
  };
  
debugger
  return (
    <div>
      <h3>Select date range</h3>
      <RangePicker disabledDate={disabledDate} value={rangeVal} onChange={handleRangePickerChange} />
      <h3>Select date</h3>
      <DatePicker disabledDate={disabledDate} value={dateVal} onChange={handleDatePickerChange}></DatePicker>
      {error == 0 ?
      apodArray.map((apod) => <Card
        title={apod?.title}
        cover={<img alt={apod?.title} src={apod?.url} />}
      >
        <p>{apod?.explanation}</p>
        <p>Date: {apod?.date}</p>
      </Card>)
      : <h1>Error (probably, picture of current day is not loaded yet)</h1>}
    </div>
  );
};

export default ApodDisplay;
