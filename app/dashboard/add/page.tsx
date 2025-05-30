'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddUserPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (
      (step === 1 && formData.name && formData.email) ||
      (step === 2 && formData.phone && formData.city)
    ) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
    users.push(formData);
    localStorage.setItem('localUsers', JSON.stringify(users));
    router.push('/dashboard');
  };

  const inputStyle = 'w-full border border-gray-400 bg-white text-black p-2 rounded';
  const labelStyle = 'block font-semibold mb-1 text-white';

  return (
    <div className="bg-black min-h-screen p-6 text-center">
      <div className="flex justify-between items-center mb-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white">Add User</h1>
        <div className="flex gap-2">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm">
              Home
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm">
              View All
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        {step === 1 && (
          <>
            <div>
              <label className={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className={labelStyle}>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-white text-lg font-semibold mb-4">Review and Confirm</h2>
            <div className="text-white space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>City:</strong> {formData.city}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddUserPage;

