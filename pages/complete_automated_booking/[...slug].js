import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookingConfirmation() {
  const { query } = useRouter();
  const [name, setName] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (query.name) setName(query.name);
    if (query.health_conditions) setHealthConditions(query.health_conditions);
    if (query.phone_number) setPhoneNumber(query.phone_number);
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-[#1D3557] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Booking Request Received</h1>
        <p className="text-lg mb-4">
          Thank you{ name ? `, ${name}` : '' }, your booking details have been received.
        </p>

        <div className="text-md space-y-2 mb-6">
          {healthConditions && (
            <p><strong>Health Conditions:</strong> {healthConditions}</p>
          )}
          {phoneNumber && (
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
          )}
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 font-semibold mb-1">
            Next Step:
          </p>
          <p className="text-blue-700 text-sm">
            You will receive a text message at <strong>{phoneNumber || '[phone number]'}</strong> asking you to confirm your appointment.
            Reply with <code>Y</code> to confirm or <code>N</code> to cancel.
          </p>
        </div>

        <p className="mt-6 italic">Sincerely,</p>
        <p className="font-semibold">Dr. Maya Ellison, M.D.</p>
      </div>
    </div>
  );
}
