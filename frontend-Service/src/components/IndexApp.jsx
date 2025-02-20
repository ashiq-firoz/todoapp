"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002/details";

const IndexPage = () => {
  const [details, setDetails] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(API_URL);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">User Profile</h1>
        {details ? (
          <div className="mt-6 text-black">
            <p className="text-lg"><strong>Name:</strong> {details.name}</p>
            <p className="text-lg"><strong>Roll Number:</strong> {details.rollNumber}</p>
            <p className="text-lg"><strong>Bio:</strong> {details.bio}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">No details found.</p>
          
        )}
        <a href="/todo">Explore the Todo App @/todo</a>
      </div>
    </div>
  );
};

export default IndexPage;
