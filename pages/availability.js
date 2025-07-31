import { useState } from 'react';

export default function Availability() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  // Availability for August 4-8, 2024 (EST)
  const availableSlots = {
    '2024-08-04': ['10:00 AM', '2:00 PM', '4:00 PM'],
    '2024-08-05': ['9:00 AM', '11:00 AM', '3:00 PM'],
    '2024-08-06': ['10:00 AM', '1:00 PM', '5:00 PM'],
    '2024-08-07': ['9:00 AM', '2:00 PM', '4:00 PM'],
    '2024-08-08': ['11:00 AM', '3:00 PM'],
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment booked for ${selectedDate} at ${selectedTime}! You will receive a confirmation email shortly.`);
      // In a real app, this would make an API call to book the appointment
    }
  };

  // Generate calendar days for August 2024
  const generateCalendarDays = () => {
    const august2024 = new Date(2024, 7, 1); // August is month 7 (0-indexed)
    const firstDay = new Date(2024, 7, 1);
    const lastDay = new Date(2024, 7 + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(2024, 7, day);
      const dateString = date.toISOString().split('T')[0];
      const isAvailable = availableSlots[dateString];
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push({
        day,
        date: dateString,
        isAvailable: isAvailable && isAvailable.length > 0,
        isToday,
        slots: isAvailable || []
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const currentMonth = 'August';
  const currentYear = 2024;

  return (
    <div className="min-h-screen bg-[#f6f8f9] text-[#1D3557] font-sans p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif mb-2">Dr. Maya Ellison, M.D.</h1>
          <p className="text-lg text-[#457B9D]">Available Appointment Times</p>
          <p className="text-sm text-gray-600 mt-2">August 4-8, 2024 • All times in EST</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {currentMonth} {currentYear}
              </h2>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`text-center py-3 cursor-pointer transition-colors ${
                      !day ? 'invisible' : ''
                    } ${
                      day?.isToday 
                        ? 'bg-[#A8DADC] text-[#1D3557] font-semibold' 
                        : day?.isAvailable 
                          ? 'hover:bg-[#F1FAEE] cursor-pointer' 
                          : 'text-gray-400'
                    } ${
                      selectedDate === day?.date ? 'ring-2 ring-[#457B9D] bg-[#F1FAEE]' : ''
                    }`}
                    onClick={() => day && handleDateClick(day.date)}
                  >
                    {day?.day}
                    {day?.isAvailable && (
                      <div className="text-xs text-[#457B9D] mt-1">
                        {day.slots.length} slots
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#A8DADC] rounded mr-2"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#F1FAEE] rounded mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {selectedDate ? `Available Times - ${new Date(selectedDate).toLocaleDateString()}` : 'Select a Date'}
              </h3>
              
              {selectedDate && availableSlots[selectedDate] ? (
                <div className="space-y-3">
                  {availableSlots[selectedDate].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-[#A8DADC] border-[#457B9D] text-[#1D3557]'
                          : 'bg-white border-gray-300 hover:bg-[#F1FAEE]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  
                  {selectedTime && (
                    <button
                      onClick={handleBookAppointment}
                      className="w-full mt-4 bg-[#457B9D] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#1D3557] transition-colors"
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              ) : selectedDate ? (
                <p className="text-gray-500 text-center py-8">No available times for this date</p>
              ) : (
                <p className="text-gray-500 text-center py-8">Please select a date to view available times</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Appointment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#457B9D] mb-2">Session Details</h4>
              <ul className="space-y-1 text-sm">
                <li>• Initial consultation: 60 minutes</li>
                <li>• Follow-up sessions: 50 minutes</li>
                <li>• Virtual and in-person options available</li>
                <li>• Insurance accepted</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#457B9D] mb-2">Time Zone</h4>
              <ul className="space-y-1 text-sm">
                <li>• All times shown in Eastern Standard Time (EST)</li>
                <li>• Please adjust for your local timezone</li>
                <li>• Virtual sessions available worldwide</li>
                <li>• In-person sessions in New York area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 