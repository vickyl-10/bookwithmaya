import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8f9] text-[#1D3557] font-sans flex flex-col items-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-serif">Dr. Maya Ellison, M.D.</h1>
        <p className="text-lg mt-2">Licensed Clinical Psychologist</p>
        <p className="text-sm text-[#457B9D] mt-1">Specializing in trauma and relationships</p>
      </header>

      <BookingForm />

      <div className="mt-6 text-center">
        <div className="mb-4">
          <a
            href="/availability"
            className="block text-[#457B9D] underline hover:text-[#1D3557]"
          >
            View Available Appointment Times
          </a>
        </div>

        <div>
          <a
            href="/instructions"
            className="block text-[#457B9D] underline hover:text-[#1D3557]"
          >
            For Automated Booking Systems
          </a>
        </div>
      </div>
    </div>
  );
}
