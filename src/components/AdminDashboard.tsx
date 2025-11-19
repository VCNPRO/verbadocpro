import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.mock';

// The main admin dashboard component
export function AdminDashboard() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ADMIN_API_KEY}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuota = async (userId: string) => {
    const newQuota = prompt('Enter new quota:');
    if (newQuota) {
      try {
        await fetch('/api/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_ADMIN_API_KEY}`,
          },
          body: JSON.stringify({ userId, quota: newQuota }),
        });
        fetchUsers(); // Refresh users after update
      } catch (error) {
        console.error('Failed to update quota:', error);
      }
    }
  };

  if (currentUser?.role !== 'admin') {
    return <div>You are not authorized to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Quota</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            Object.entries(users).map(([userId, userData]: any) => (
              <tr key={userId}>
                <td className="border p-2">{userId}</td>
                <td className="border p-2">{userData.quota}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleUpdateQuota(userId)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Edit Quota
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}