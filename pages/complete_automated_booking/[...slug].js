import { useRouter } from 'next/router';

export default function BookingConfirmation() {
  const { query } = useRouter();

  const name = query.name;
  const healthConditions = query.health_conditions;

  return (
    <div className="min-h-screen bg-white text-[#1D3557] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank You for Booking</h1>
        <p className="text-lg">
          Thank you for booking your appointment{ name ? `, ${name}` : "" }.
          Your information has been received.
          I look forward to meeting you soon.
        </p>
        <p className="mt-6 italic">Sincerely,</p>
        <p className="font-semibold">Dr. Maya Ellison, Ph.D.</p>
      </div>
    </div>
  );
}
