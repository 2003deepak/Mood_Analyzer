import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { format } from 'date-fns';

const Stats = () => {
  const [moodHistory, setMoodHistory] = useState({});
  const [moodFrequency, setMoodFrequency] = useState([]);
  const navigate = useNavigate();

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Excited", emoji: "🤩" },
    { label: "Neutral", emoji: "😐" },
    { label: "Tired", emoji: "😴" },
    { label: "Angry", emoji: "😠" },
    { label: "Loved", emoji: "🥰" }
  ];

  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem("calendar")) || {};
    setMoodHistory(storedMoods);

    const moodCount = {};
    Object.values(storedMoods).forEach((mood) => {
      moodCount[mood] = (moodCount[mood] || 0) + 1;
    });

    const chartData = Object.keys(moodCount).map((mood) => ({
      mood,
      count: moodCount[mood]
    }));

    setMoodFrequency(chartData);
  }, []);

  const getMoodEmoji = (label) => moods.find(m => m.label === label)?.emoji || "";

  const moodColors = {
    "Happy": "#FFD700",
    "Sad": "#1E90FF",
    "Excited": "#FF4500",
    "Neutral": "#808080",
    "Tired": "#8B4513",
    "Angry": "#FF0000",
    "Loved": "#FF69B4"
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
          <p className="text-base font-medium">{payload[0].payload.mood} {getMoodEmoji(payload[0].payload.mood)}</p>
          <p className="text-gray-700">Count: <span className="font-bold">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-blue-500 p-4 md:p-6">
      
      <div className="w-full max-w-4xl bg-white bg-opacity-95 shadow-xl rounded-xl p-5 md:p-8 text-center relative">
        
        <button 
          className="absolute top-4 right-4 px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200 text-md"
          onClick={() => navigate('/')}
        >
          Home Page 🏠
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Your Mood Stats 📊</h1>

        <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Mood Calendar 🗓️</h2>
          <div className="w-full overflow-hidden p-2">
            <div className="mx-auto transform scale-105 origin-top">
              <Calendar
                tileContent={({ date }) => {
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  return <div className="text-xl">{getMoodEmoji(moodHistory[formattedDate])}</div>;
                }}
                className="w-full mx-auto" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 shadow-md rounded-lg mb-6">
          <h3 className="text-base font-medium mb-2">Mood Key</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {moods.map(mood => (
              <div key={mood.label} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-lg">{mood.emoji}</span>
                <span className="font-medium text-sm">{mood.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mood Frequency</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moodFrequency}>
                <XAxis dataKey="mood" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count">
                  {moodFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[entry.mood] || "#cccccc"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodFrequency}
                  dataKey="count"
                  nameKey="mood"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {moodFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[entry.mood] || "#cccccc"} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
