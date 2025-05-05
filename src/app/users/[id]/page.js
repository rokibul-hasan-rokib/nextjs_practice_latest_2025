'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/users/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.error("Fetch user error:", err));
    }
  }, [id]);

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="container py-5">
      <h1>User Details</h1>
      <div className="card p-4 mt-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
