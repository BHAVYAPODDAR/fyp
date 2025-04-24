// src/Dashboard/Dashboard.js

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [wills, setWills] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/wills",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWills(response.data);
      } catch (err) {
        console.error("Error fetching wills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWills();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Bhavya 👋</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your legacy is just a few clicks away.
          </p>
        </div>

        <Link to="/create-will">
          <Button
            variant="contained"
            style={{ backgroundColor: "#4CAF50", textTransform: "none" }}
          >
            + Create New Will
          </Button>
        </Link>
      </div>

      {/* My Wills */}
      <h2 className="text-xl font-semibold mb-4">Your Wills</h2>
      {loading ? (
        <p>Loading your wills...</p>
      ) : wills.length === 0 ? (
        <p className="text-gray-500">You haven’t created any wills yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wills.map((will) => (
            <div
              key={will._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {will.title || "Untitled Will"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Created: {new Date(will.createdAt).toLocaleDateString()}
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {will.status || "Draft"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => console.log("View", will._id)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => console.log("Edit", will._id)}
                  className="text-yellow-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => console.log("Finalize", will._id)}
                  className="text-green-600 text-sm hover:underline"
                >
                  Finalize
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
