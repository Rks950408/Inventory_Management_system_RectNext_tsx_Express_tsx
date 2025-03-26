// src/components/AstrologerCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';

const AstrologerCard = ({ astrologer }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  
  const navigate = useNavigate();
  
  const handleBook = () => {
    // In a real app, this would make an API call to book the consultation
    console.log('Booking consultation with:', astrologer.name, selectedDate, selectedTime);
    navigate('/dashboard');
  };
  
  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  // Generate available times (9 AM to 9 PM, hourly)
  const getAvailableTimes = () => {
    const times = [];
    
    for (let hour = 9; hour <= 21; hour++) {
      times.push(`${hour}:00`);
    }
    
    return times;
  };
  
  return (
    <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-lightOrange/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-lightOrange">
              {astrologer.name.charAt(0)}
            </span>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{astrologer.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-lightOrange fill-lightOrange" />
                <span className="ml-1 text-sm">{astrologer.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mt-1">{astrologer.bio}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {astrologer.specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="bg-darkBlue px-2 py-1 rounded-full text-xs text-gray-300"
                >
                  {specialty}
                </span>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-lightOrange font-semibold">
                ${astrologer.price_per_minute.toFixed(2)}/min
              </div>
              
              <button 
                onClick={() => setShowBooking(!showBooking)}
                className="btn-secondary text-sm py-1 px-3"
              >
                {showBooking ? 'Cancel' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
        
        {showBooking && (
          <div className="mt-6 pt-4 border-t border-darkBlue-lighter">
            <h4 className="font-medium mb-3">Book a Consultation</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 text-lightOrange mr-2" />
                  Select Date
                </label>
                <select 
                  className="input w-full"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select a date</option>
                  {getAvailableDates().map((date, index) => (
                    <option key={index} value={date}>
                      {new Date(date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 text-lightOrange mr-2" />
                  Select Time
                </label>
                <select 
                  className="input w-full"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedDate}
                >
                  <option value="">Select a time</option>
                  {getAvailableTimes().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleBook}
                className="btn-primary"
                disabled={!selectedDate || !selectedTime}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstrologerCard;