"use client";
import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-6 text-lg">
        Got a question, feedback, or just want to say hi? We'd love to hear from you!
        Use the form below or reach out directly.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
          />
        </div>
        <div>
          <label className="block font-medium">Message</label>
          <textarea
            rows={4}
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-lg">
        <p>Email: <a href="https://mail.google.com/mail/u/0/#sent?compose=jrjtWvNPMkLkqvqtTVWBCBnMdbqtXbstJjDPVkHhTnDpdBzrNbcBZFVVqwDLkTvRvKWhrwXv" className="text-blue-600 underline">patraavishek900@gmail.com</a></p>
        <p>Phone: <span className="text-black">+91 81166 98594</span></p>
        <p>Address: <span className="text-black">90 Mission Road, Rahara, India</span></p>
      </div>
    </div>
  );
};

export default ContactUs;
