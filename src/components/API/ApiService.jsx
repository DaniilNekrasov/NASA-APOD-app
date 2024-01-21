import axios from 'axios';

const API_KEY = '8BcZJmeQRzSFoyISZZAuSkou3JOUWGn8hFmRqbul';

const ApiService = {
  // Функция для получения картинки дня за сегодня
  getApodForToday: async () => {
    const todayDate = new Date().toISOString().split('T')[0];
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${todayDate}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD for today:', error);
      throw error;
    }
  },

  // Функция для получения списка картинок за отрезок времени
  getApodListForDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD list for date range:', error);
      throw error;
    }
  },

  // Функция для получения картинки для конкретной даты
  getApodForDate: async (date) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD for date:', error);
      throw error;
    }
  },
};

export default ApiService;
