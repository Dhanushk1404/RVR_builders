import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        <div className="flex flex-col gap-4 mb-6">
          <Link
            to="/admin/materials"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Manage Materials
          </Link>
          <Link
            to="/admin/projects"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Manage Projects
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.href = '/';
          }}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
