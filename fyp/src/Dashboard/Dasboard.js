import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // add at top

const Dashboard = () => {
  const [wills, setWills] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
        setWills(res.data.questionnaire || []);
        console.log(res.data.questionnaire);
      } catch (err) {
        console.error("Error fetching cid:", err);
        setWills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCid();
  }, []);

  const handleDelete = async (submissionTimestamp) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/users/questionnaire/${submissionTimestamp}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Update UI
      setWills((prev) =>
        prev.filter((will) => will.submissionTimestamp !== submissionTimestamp)
      );
    } catch (error) {
      console.error("Failed to delete will:", error);
    }
  };

  const handleView = (will) => {
    navigate("/questions", { state: { formData: will } });
  };

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
          {wills.map((will, index) => (
            <div
              key={will.sr}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between relative"
            >
              {/* ❌ Delete Button - Top Right */}
              <button
                onClick={() => handleDelete(will.submissionTimestamp)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete Will"
              >
                &#x2716;
              </button>

              {/* 📝 Will Info */}
              <div>
                <h3 className="font-bold text-lg">
                  {"Will No: " + will.sr || "Untitled Will"}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Created:{" "}
                  {new Date(will.submissionTimestamp).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Time:{" "}
                  {new Date(will.submissionTimestamp).toLocaleTimeString()}
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {will.status || "Draft"}
                </span>

                {will.cid && (
                  <p className="text-gray-400 text-xs truncate mt-2">
                    CID: {will.cid}
                  </p>
                )}
              </div>

              {/* 📦 Buttons Section */}
              <div className="flex items-center justify-between mt-4">
                {/* Left: View + Edit */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(will)}
                    className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md text-sm hover:bg-blue-200"
                  >
                    View
                  </button>
                  <button
                    // onClick={() => handleEdit(will)}
                    className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-md text-sm hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                </div>

                {/* Right: Finalize */}
                <button
                  // onClick={() => handleFinalize(will)}
                  className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
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
