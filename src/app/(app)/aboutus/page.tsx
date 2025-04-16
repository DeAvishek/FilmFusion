"use client";
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About FilmFusion</h1>

      <p className="mb-4 text-lg">
        FilmFusion is your one-stop destination for booking movie tickets, discovering events, and exploring live shows, plays, and sports—all in one place. We aim to bring entertainment closer to you with just a few clicks.
      </p>

      <p className="mb-4 text-lg">
        Whether you're a movie buff, a sports enthusiast, or just looking for your next weekend plan, FilmFusion makes it easy to explore what's happening around you.
      </p>

      <p className="mb-4 text-lg">
        Built with modern technology and a love for cinema, our mission is to create a seamless and enjoyable ticket-booking experience for everyone.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p className="text-lg mb-4">
        To become the most user-friendly and feature-rich platform for discovering and booking live entertainment experiences.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="text-lg">
        Have questions or feedback? Reach out to us at: <a href="mailto:support@filmfusion.com" className="text-blue-600 underline">support@filmfusion.com</a>
      </p>
    </div>
  );
};

export default AboutUs;
