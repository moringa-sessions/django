import React, { useContext, useState } from "react";
import { FaCalendarAlt, FaListUl, FaTasks } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const AddTask = () => {
   
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
    category: "",
  });

  // Dummy categories (replace with API data later)
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Urgent" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data ', formData);

  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaTasks className="text-blue-600" /> Add New Task {xxxx}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaCalendarAlt /> Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaListUl /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
