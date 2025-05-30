'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
}

export default function AddUser() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: '',
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('User Submitted:', formData);
    alert('User added (check console)');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add User - Step {step}</h2>

      {step === 1 && (
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} className="block mb-2 border p-2" required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} className="block mb-4 border p-2" required />
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2">Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input name="street" placeholder="Street" onChange={handleChange} className="block mb-2 border p-2" required />
          <input name="city" placeholder="City" onChange={handleChange} className="block mb-2 border p-2" required />
          <input name="zip" placeholder="ZIP Code" onChange={handleChange} className="block mb-4 border p-2" required />
          <button onClick={prevStep} className="mr-2 px-4 py-2 bg-gray-500 text-white">Back</button>
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2">Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <pre className="mb-4">{JSON.stringify(formData, null, 2)}</pre>
          <button onClick={prevStep} className="mr-2 px-4 py-2 bg-gray-500 text-white">Back</button>
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">Submit</button>
        </div>
      )}

      <div className="mt-4">
        <a href="/dashboard" className="text-blue-600 underline">Back to Dashboard</a>
      </div>
    </div>
  );
}
