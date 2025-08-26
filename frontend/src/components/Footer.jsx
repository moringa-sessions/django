import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          Task Management
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-800 sm:text-center dark:text-gray-400">
          © 2025 <Link to="https://kned.com/" className="hover:underline">Task</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
