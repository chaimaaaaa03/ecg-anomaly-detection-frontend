"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  username: string;
};

export default function MePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecg-anomaly-detection-backend-3.onrender.com';
      try {
        const res = await fetch(`${API_URL}/api/me`, {
          credentials: "include", 
        });

        if (!res.ok) {
          throw new Error("User not authenticated");
        }

        const data = await res.json();
        setUser(data);
      } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }}
    };

    fetchCurrentUser();
  }, []);

  if (error) {
    return <div className="text-red-500">⛔ {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500">Loading user info...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">👤 User Info</h1>
      <ul className="space-y-2">
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Username:</strong>{user.username}</li>
      </ul>
    </div>
  );
}
