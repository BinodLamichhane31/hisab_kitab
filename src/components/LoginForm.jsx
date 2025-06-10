import { useState } from 'react';

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <form className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>


          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
