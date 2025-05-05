'use client';

import axios from "axios";
import { useEffect, useState } from "react";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handeDelete= async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };
    return (
        <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User CRUD</h1>



      <ul className="mt-8 space-y-2">
        {users.map(user => (
          <li key={user._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p><strong>{user.name}</strong></p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(user)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(user._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
    );
}