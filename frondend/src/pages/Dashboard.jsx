import React, { useState } from 'react';

const Dashboard = () => {
  const [auth, setAuth] = useState(true); // Untuk simulasi autentikasi
  const [reports, setReports] = useState([]); // Menyimpan data laporan
  const [formData, setFormData] = useState({ location: '', description: '' });
  const [isEditing, setIsEditing] = useState(false); // Status edit
  const [editId, setEditId] = useState(null); // ID data yang sedang diedit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update data jika dalam mode edit
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === editId ? { ...report, ...formData } : report
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      // Tambahkan data baru
      const newReport = {
        id: Date.now(), // Menggunakan timestamp sebagai ID unik
        ...formData,
      };
      setReports((prevReports) => [...prevReports, newReport]);
    }

    // Reset form
    setFormData({ location: '', description: '' });
  };

  const handleEdit = (report) => {
    setIsEditing(true);
    setEditId(report.id);
    setFormData({ location: report.location, description: report.description });
  };

  const handleDelete = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  };

  const handleLogout = () => {
    setAuth(false); // Simulasi logout
    alert('Anda telah logout');
  };

  if (!auth) {
    return <p>Anda harus login untuk mengakses halaman ini.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Cuaca</h2>

      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Lokasi</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`${
            isEditing ? 'bg-blue-500' : 'bg-green-500'
          } text-white px-4 py-2 rounded hover:bg-opacity-80`}
        >
          {isEditing ? 'Update Report' : 'Add Report'}
        </button>
      </form>

      {/* Reports List */}
      <h3 className="text-xl font-bold mb-4">Reports</h3>
      <ul className="space-y-4">
        {reports.map((report) => (
          <li key={report.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">Location: {report.location}</p>
              <p>Description: {report.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(report)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(report.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
