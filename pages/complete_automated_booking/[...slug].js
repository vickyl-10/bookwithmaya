import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookingConfirmation() {
  const { query, asPath } = useRouter();
  const [name, setName] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (query.name) setName(query.name);
    if (query.health_conditions) setHealthConditions(query.health_conditions);
  }, [query]);

  useEffect(() => {
    if (!isConfirmed) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsConfirmed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isConfirmed]);

  return (
    <div className="min-h-screen bg-white text-[#1D3557] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank You for Booking</h1>
        <p className="text-lg">
          Thank you{ name ? `, ${name}` : '' } for drafting your booking request.
          Please review the information below and confirm your booking.

          If the information is correct, your booking will confirm after {countdown} seconds.
          
        </p>
        {healthConditions && (
          <p className="mt-4 text-md">
            <strong>Health Conditions:</strong> {healthConditions}
          </p>
        )}
        
        {!isConfirmed ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 font-semibold">Booking will confirm in {countdown} seconds</p>
              <p className="text-blue-600 text-sm mt-1">To cancel, navigate to: <code className="bg-blue-100 px-2 py-1 rounded">{asPath}/cancel</code></p>
            </div>
          </div>
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
