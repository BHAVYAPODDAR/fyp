import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordModal from "./PasswordModal";
import WillCard from "./WillCard";

const Dashboard = () => {
  const [wills, setWills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // "delete" or "finalize"
  const [targetWill, setTargetWill] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCid = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/questionnaire",
          {
            headers: { Authorization: token },
          }
        );
        setWills(res.data.questionnaire || []);
      } catch {
        setWills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCid();
  }, [token]);

  const verifyAndProceed = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/verify-password",
        {
          password: passwordInput,
        },
        { headers: { Authorization: token } }
      );

      if (modalType === "delete") {
        await handleDelete(targetWill.submissionTimestamp);
      } else if (modalType === "finalize") {
        handleFinalize(targetWill.cid);
      }

      closeModal();
    } catch (err) {
      if (err.response?.status === 401) setErrorMsg("❌ Invalid password.");
      else setErrorMsg("⚠️ Something went wrong. Try again.");
    }
  };

  const handleDelete = async (submissionTimestamp) => {
    await axios.delete(
      `http://localhost:5000/api/users/questionnaire/${submissionTimestamp}`,
      {
        headers: { Authorization: token },
      }
    );
    setWills((prev) =>
      prev.filter((w) => w.submissionTimestamp !== submissionTimestamp)
    );
  };

  const handleFinalize = (cid) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5001/retrieve/bafkreigumarbibbmaqz5ftvgv2nt73xbch3iuy3s2gyv76ej3skmvqs72e`;
    // link.download = `${cid}.pdf`; // optional, browser may override this
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setModalType(null);
    setTargetWill(null);
    setPasswordInput("");
    setErrorMsg("");
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard label="Total Wills" value={wills.length} />
        <StatCard
          label="Finalized"
          value={wills.filter((w) => w.status === "Finalized").length}
        />
        <StatCard
          label="Drafts"
          value={wills.filter((w) => w.status !== "Finalized").length}
        />
      </div>

      {/* Will Cards */}
      <h2 className="text-xl font-semibold mb-4">Your Wills</h2>
      {loading ? (
        <p>Loading...</p>
      ) : wills.length === 0 ? (
        <p className="text-gray-500">You haven’t created any wills yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wills.map((will) => (
            <WillCard
              key={will.sr}
              will={will}
              onView={() =>
                navigate("/questions", { state: { formData: will } })
              }
              onDelete={() => {
                setModalType("delete");
                setTargetWill(will);
              }}
              onFinalize={() => {
                setModalType("finalize");
                setTargetWill(will);
              }}
            />
          ))}
        </div>
      )}

      {/* Notification */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Notifications</h2>
      <div className="bg-white p-4 rounded-xl shadow-md">
        {wills.length === 0 ? (
          <p className="text-gray-500">You haven’t created any wills yet.</p>
        ) : wills.some((w) => w.status !== "Finalized") ? (
          <p className="text-gray-700">
            You have{" "}
            <span className="font-semibold text-yellow-600">
              {wills.filter((w) => w.status !== "Finalized").length}
            </span>{" "}
            will(s) in draft.
          </p>
        ) : (
          <p className="text-green-700">
            All your wills are finalized. Great job! 🎉
          </p>
        )}
      </div>

      <PasswordModal
        open={!!modalType}
        password={passwordInput}
        setPassword={setPasswordInput}
        onClose={closeModal}
        onConfirm={verifyAndProceed}
        error={errorMsg}
        actionType={modalType}
      />
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="text-gray-500">{label}</p>
  </div>
);

export default Dashboard;
