export default function Availability() {
  const dates = [
    { date: '8/4', fullDate: 'August 4, 2025' },
    { date: '8/5', fullDate: 'August 5, 2025' },
    { date: '8/6', fullDate: 'August 6, 2025' },
    { date: '8/7', fullDate: 'August 7, 2025' },
    { date: '8/8', fullDate: 'August 8, 2025' }
  ];
  const timeSlots = ['9:00 AM', '2:00 PM', '3:30 PM'];

  return (
    <div className="min-h-screen bg-[#f6f8f9] text-[#1D3557] font-sans p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif mb-2">Dr. Maya Ellison, M.D.</h1>
        </header>

        {/* Availability by Date */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Available Times by Date</h2>
            <div className="space-y-6">
              {dates.map((dateInfo) => (
                <div key={dateInfo.date} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-[#1D3557] mb-3 text-center">
                    {dateInfo.fullDate}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <div key={time} className="text-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-[#457B9D]">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                <li>Initial consultation: 60 minutes</li>
                <li>Follow-up sessions: 50 minutes</li>
                <li>Virtual and in-person options available</li>
                <li>Insurance accepted</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#457B9D] mb-2">Time Zone</h4>
              <ul className="space-y-1 text-sm">
                <li>All times shown in Eastern Standard Time (EST)</li>
                <li>Please adjust for your local timezone</li>
                <li>Virtual sessions available worldwide</li>
                <li>In-person sessions in New York area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 