import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router';
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
  const [selectedMood, setSelectedMood] = useState();
  const [todayMood, setTodayMood] = useState();

  const navigate = useNavigate();
  
  const moods = [
    { id: 1, gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnBocTZyZGE1NzN2aTZwdGk3dnN4enRoZ24wYWx6cm9uc3gwZnczeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fUQ4rhUZJYiQsas6WD/giphy.gif", label: "Happy", emoji: "😊" },
    { id: 2, gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJnaW9wbjF4b2hyZnoyODc2Z2Fyamhka3VpaGJvZHJvY2E2b3M5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378giAZgxPw3eO52/giphy.gif", label: "Sad", emoji: "😢" },
    { id: 3, gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RocTh3emh0b3d4dTY0aTh6NGJyb2JvcXZ1ZGh6NHpoa2VtdHZlZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Wn0CXHY4CzOWSXpnWv/giphy.gif", label: "Excited", emoji: "🤩" },
    { id: 4, gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhqeDBkMGhucGY0bHlzYnA2c2Roa2w5NjdsenRhd3Fld3I1ZWUwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7RKuyUSWRTbE2H6zG3/giphy.gif", label: "Neutral", emoji: "😐" },
    { id: 5, gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazBodzU0cWo0dXF5aHZ5c29iODMzbHplNThqdHV6Ym4ybzF1aTBjaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bEs40jYsdQjmM/giphy.gif", label: "Tired", emoji: "😴" },
    { id: 6, gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajQzenE3NnQzeTlyMnVqeWliMDhscXJqem80cW5wMmo0YzdjMnJuNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11tTNkNy1SdXGg/giphy.gif", label: "Angry", emoji: "😠" },
    { id: 7, gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2xxM3p4Mmp3NjZmazh4NXd1cGtkMnlndXh0Y2s1eHpmeGc5am16OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kUhFF1dl140K5L4YyT/giphy.gif", label: "Loved", emoji: "🥰" }
  ];

  const handleSelectMood = (id) => {
    setSelectedMood(id);
  };

  const handleSubmit = () => {
    let calendar = JSON.parse(localStorage.getItem("calendar")) || {};
    const currentDate = new Date().toISOString().split('T')[0];

    calendar[currentDate] = selectedMood;
    localStorage.setItem("calendar", JSON.stringify(calendar));
    setTodayMood(selectedMood);
    toast.success("Mood Saved Successfully! 🎉");
  };

  useEffect(() => {
    const calendar = JSON.parse(localStorage.getItem("calendar")) || {}; 
    const currentDate = new Date().toISOString().split('T')[0];

    if(calendar[currentDate]){
      setTodayMood(calendar[currentDate]);
    }
  }, []);
  
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-blue-500 p-4 md:p-8">
        
        {/* Mood Display */}
        {todayMood && (
          <div className="text-2xl font-semibold text-white bg-indigo-600 bg-opacity-80 backdrop-blur-sm px-6 py-3 rounded-xl mb-6 shadow-lg">
            Today's Mood: <span className="text-white font-bold">{todayMood}</span> 
            <span className="ml-2 text-3xl">
              {moods.find(m => m.label === todayMood)?.emoji || ""}
            </span>
          </div>
        )}


        

        <div className="w-full max-w-6xl bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-10 text-center">
          {/* Animated Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How are you feeling today?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track your emotions and discover trends in your mood.
          </p>

          {/* Mood Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {moods.map((mood) => (
              <div
                key={mood.id}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedMood === mood.label ? 'ring-4 ring-indigo-500 scale-105 shadow-xl' : 'shadow-lg hover:shadow-xl'
                }`}
                onClick={() => handleSelectMood(mood.label)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={mood.gif} 
                  alt={mood.label} 
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 mt-8 text-center">
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <p className="text-white text-lg font-medium">{mood.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <button 
              className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200 text-lg"
              onClick={() => navigate('/stats')}
            >
              View History 📊
            </button>
            <button 
              className={`w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-lg ${
                !selectedMood ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
              }`}
              disabled={!selectedMood}
              onClick={handleSubmit}
            >
              Save Mood 💾
            </button>
          </div>
        </div>
        
        
      </div>
    </>
  );
};

export default Landing;