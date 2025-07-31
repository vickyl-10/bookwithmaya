import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookingConfirmation() {
  const { query } = useRouter();
  const [name, setName] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (query.name) setName(query.name);
    if (query.health_conditions) setHealthConditions(query.health_conditions);
  }, [query]);

  const handleConfirmBooking = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D3557] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank You for Booking</h1>
        <p className="text-lg">
          Thank you{ name ? `, ${name}` : '' } for drafting your booking request.
          Please review the information below and confirm your booking.

          If the information is correct, please confirm your booking by clicking the button below.
          
        </p>
        {healthConditions && (
          <p className="mt-4 text-md">
            <strong>Health Conditions:</strong> {healthConditions}
          </p>
        )}
        
        {!isConfirmed ? (
          <button
            onClick={handleConfirmBooking}
            className="mt-6 bg-[#A8DADC] text-[#1D3557] font-semibold px-8 py-3 rounded-md hover:bg-[#90C3C8] transition-colors duration-200 shadow-md"
          >
            Confirm Booking
          </button>
        ) : (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md">
            <p className="text-green-800 font-semibold">✅ Booking Confirmed!</p>
            <p className="text-green-700 text-sm mt-1">We'll be in touch soon to finalize your appointment.</p>
          </div>
        )}
        
        <p className="mt-6 italic">Sincerely,</p>
        <p className="font-semibold">Dr. Maya Ellison, M.D.</p>
      </div>
    </div>
  );
}
