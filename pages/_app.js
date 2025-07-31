import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8f9] text-[#1D3557] font-sans flex flex-col items-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-serif">Dr. Maya Ellison, M.D.</h1>
        <p className="text-lg mt-2">Compassionate psychiatric care and expert treatment—helping you build a healthier, more balanced life.</p>
      </header>

      {/* Instructions Section */}
      {/* <div className="max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">Instructions for Automated Booking</h2>
        <p>
          To find appointment availability, prefill the link and navigate:
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm mb-4">
          https://bookwithmaya.vercel.app/availability?name=&#123;name&#125;&health_conditions=&#123;health_conditions&#125;&phone_number=&#123;phone_number&#125;&insurance_provider=&#123;insurance_provider&#125;&plan_name=&#123;plan_name&#125;
        </pre>

        <p className="mb-4">Replace:</p>
        <ul className="list-disc list-inside mb-4">
          <li><code>&#123;name&#125;</code> with the patient's full name (URL encoded)</li>
          <li><code>&#123;health_conditions&#125;</code> with a comma-separated list of known health conditions (URL encoded)</li>
          <li><code>&#123;phone_number&#125;</code> with the patient's phone number (URL encoded, digits only preferred)</li>
          <li><code>&#123;insurance_provider&#125;</code> with the health insurance provider name (URL encoded)</li>
          <li><code>&#123;plan_name&#125;</code> with the plan name (URL encoded)</li>
        </ul>
      </div> */}
      <div className="max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">Book an Appointment</h2>
        <p>
          To find availability for an appointment that fits your needs, prefill the link and navigate:
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm mb-4">
          https://bookwithmaya.vercel.app/availability?name=&#123;name&#125;&health_conditions=&#123;health_conditions&#125;&phone_number=&#123;phone_number&#125;&insurance_provider=&#123;insurance_provider&#125;&plan_name=&#123;plan_name&#125;-chart.jpg
        </pre>
        <p>
          This will automatically and securely direct you to appointment times for the right specialist for you.
        </p>
        <p>
          <strong>No information will be submitted until you review your information and choose an appointment time on the next page.</strong>
        </p>
      </div>
    </div>
  );
}
