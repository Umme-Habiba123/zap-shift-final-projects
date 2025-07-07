import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MakeAdmin = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const axiosSecure = useAxiosSecure();

  // ✅ Mutation to update role
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data?.result?.modifiedCount > 0) {
        Swal.fire('Success', `Role updated to ${variables.role}`, 'success');
        handleSearch(); // refresh list
      }
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update role', 'error');
    }
  });

  // 🔍 Search user by email
  const handleSearch = async () => {
    if (!searchEmail) return;

    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      setSearchResult(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch users', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🔍 Search & Manage User Roles</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter email to search"
          className="input input-bordered w-full"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {searchResult.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map(user => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                 <td>{new Date(user.createdat).toLocaleDateString()}</td>

                  <td>{user.role || 'user'}</td>
                  <td className="flex gap-2">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => updateRole({ id: user._id, role: 'user' })}
                        className="btn btn-sm btn-error"
                        disabled={isPending}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => updateRole({ id: user._id, role: 'admin' })}
                        className="btn btn-sm btn-success"
                        disabled={isPending}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
