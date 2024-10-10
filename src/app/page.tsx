'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaSun, FaMoon, FaCloud, FaWind, FaThermometerHalf, FaTint, FaCompress } from 'react-icons/fa';
import DisplayLudgi from './components/DisplayLudgi';

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        console.error('Error getting location:', error);
        getWeather(37.5665, 126.9780); // 서울의 기본 좌표
      });
    } else {
      getWeather(37.5665, 126.9780); // 서울의 기본 좌표
    }
  };

  const getWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await axios.get('/weather', {
        params: { lat, lon },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('날씨 데이터 가져오기 오류:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('/weather', {
        params: { city },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('날씨 데이터 가져오기 오류:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-col">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-8">Weather Wonderland</h1>
        <form onSubmit={handleSearch} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaSearch className="h-5 w-5 text-white mr-2" />
              Search
            </motion.button>
          </div>
        </form>

        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="flex justify-center items-center"
          >
            <FaSun className="h-12 w-12 text-yellow-400" />
          </motion.div>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">{weather.name}, {weather.sys.country}</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-xl capitalize">{weather.weather[0].description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg flex items-center justify-end">
                  <FaThermometerHalf className="mr-2" />
                  Feels like: {Math.round(weather.main.feels_like)}°C
                </p>
                <p className="text-lg flex items-center justify-end">
                  <FaTint className="mr-2" />
                  Humidity: {weather.main.humidity}%
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 rounded-lg p-4"
              >
                <FaWind className="h-8 w-8 text-white mb-2" />
                <p className="text-lg font-semibold">Wind</p>
                <p className="text-2xl">{weather.wind.speed} m/s</p>
                <p className="text-sm">Direction: {weather.wind.deg}°</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 rounded-lg p-4"
              >
                <FaCloud className="h-8 w-8 text-white mb-2" />
                <p className="text-lg font-semibold">Cloudiness</p>
                <p className="text-2xl">{weather.clouds.all}%</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 rounded-lg p-4"
              >
                <FaCompress className="h-8 w-8 text-white mb-2" />
                <p className="text-lg font-semibold">Pressure</p>
                <p className="text-2xl">{weather.main.pressure} hPa</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-20 rounded-lg p-4"
              >
                <FaMapMarkerAlt className="h-8 w-8 text-white mb-2" />
                <p className="text-lg font-semibold">Coordinates</p>
                <p className="text-md">Lat: {weather.coord.lat}</p>
                <p className="text-md">Lon: {weather.coord.lon}</p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
      <DisplayLudgi />
    </div>
  );
};

export default WeatherApp;