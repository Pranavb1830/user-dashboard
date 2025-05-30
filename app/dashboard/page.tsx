'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(apiUsers => {
        const saved = localStorage.getItem('localUsers');
        const parsedLocal = saved ? JSON.parse(saved) : [];
        const formattedLocal = parsedLocal.map((u: any, index: number) => ({
          id: 1000 + index,
          name: u.name,
          email: u.email,
          phone: u.phone,
          address: { city: u.city }
        }));
        setUsers([...apiUsers, ...formattedLocal]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm">
              Home
            </button>
          </Link>
          <Link href="/dashboard/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm">
              Add User
            </button>
          </Link>
        </div>
      </div>

      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Search by name or city..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <ul>
          {filtered.map(user => (
            <li key={user.id} className="border-b py-2 text-white">
              <p><strong>{user.name}</strong></p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>City: {user.address.city}</p>
            </li>
          ))}
          {filtered.length === 0 && <p className="text-gray-500">No users found.</p>}
        </ul>
      )}
    </div>
  );
}
