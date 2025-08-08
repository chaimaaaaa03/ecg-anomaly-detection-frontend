"use client";

import { useEffect, useState } from "react";

export interface CurrentUser {
  id: number;
  email: string;
  is_admin: boolean;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("https://ecg-anomaly-detection-backend-3.onrender.com/me", {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("User not authenticated");
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading };
};
