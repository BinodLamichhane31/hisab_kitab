import { useState } from 'react';

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <form className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              id="fname"
              type="text"
              name="fname"
              placeholder="First Name"
              autoComplete="given-name"
              className="p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              id="lname"
              type="text"
              name="lname"
              placeholder="Last Name"
              autoComplete="family-name"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            autoComplete="tel"
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

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="new-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}
