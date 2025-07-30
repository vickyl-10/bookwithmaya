import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment request submitted!");
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
      <h2 className="text-2xl font-semibold text-[#1D3557]">Request an Appointment</h2>

      <input name="name" placeholder="Full Name" required value={formData.name}
        onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />

      <input type="email" name="email" placeholder="Email" required value={formData.email}
        onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />

      <input type="date" name="date" required value={formData.date}
        onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />

      <input type="time" name="time" required value={formData.time}
        onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />

      <button type="submit" className="bg-[#A8DADC] text-[#1D3557] font-semibold px-4 py-2 rounded-md hover:bg-[#90C3C8] transition">
        Submit
      </button>
    </form>
  );
}
