import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [wills, setWills] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCid = async () => {
      console.log(token);
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/questionnaire",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setWills(res.data || []);
      } catch (err) {
        console.error("Error fetching cid:", err);
        setWills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCid();
  }, []);

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

        <Link to="/questions">
          <Button
            variant="contained"
            style={{ backgroundColor: "#4CAF50", textTransform: "none" }}
          >
            + Create New Will
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">{wills.length}</h3>
          <p className="text-gray-500">Total Wills</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">
            {wills.filter((w) => w.status === "Finalized").length}
          </h3>
          <p className="text-gray-500">Finalized</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">
            {wills.filter((w) => w.status !== "Finalized").length}
          </h3>
          <p className="text-gray-500">Drafts</p>
        </div>
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

                {/* CID Display */}
                {will.cid && (
                  <p className="text-gray-400 text-xs truncate mt-2">
                    CID: {will.cid}
                  </p>
                )}

                {/* Progress Bar (static 70% for now) */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
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

      {/* Notifications */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Notifications</h2>
      <div className="bg-white p-4 rounded-xl shadow-md">
        {wills.length === 0 ? (
          <p className="text-gray-500">You haven’t created any wills yet.</p>
        ) : wills.filter((w) => w.status !== "Finalized").length > 0 ? (
          <p className="text-gray-700">
            You have{" "}
            <span className="font-semibold text-yellow-600">
              {wills.filter((w) => w.status !== "Finalized").length}
            </span>{" "}
            will(s) still in draft. Complete them to finalize your legacy.
          </p>
        ) : (
          <p className="text-green-700">
            All your wills are finalized. Great job! 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
