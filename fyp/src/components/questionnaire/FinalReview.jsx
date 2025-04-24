import React from "react";
import {
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, CheckCircle, Warning } from "@mui/icons-material";
import axios from "axios";

const FinalReview = ({ formData, updateFormData, goBackToStep }) => {
  const {
    fullName,
    dob,
    gender,
    nationality,
    familyMembers,
    assets,
    distributions,
    specialRequests,
  } = formData;

  const handleFinalSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure token is stored at login

      const response = await axios.post(
        "http://localhost:5000/api/users/questionnaire",
        { questionnaire: formData }, // posting the entire formData object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Will successfully created!");
      console.log(response.data); // optional: for debugging or toast
    } catch (error) {
      console.error(
        "❌ Error submitting will:",
        error.response?.data || error.message
      );
      alert("Failed to submit the Will. Please try again.");
    }
  };

  const renderSectionSummary = (title, dataArray, editStep, formatter) => (
    <Paper elevation={3} className="p-6 shadow-lg rounded-xl bg-gray-50 mb-4">
      <Typography variant="h6" className="font-bold text-gray-700 mb-4">
        {title}
      </Typography>
      <Divider className="mb-4" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="mb-4"
      >
        <div className="flex items-center">
          <IconButton color="primary" onClick={() => goBackToStep(editStep)}>
            <Edit />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            Edit
          </Typography>
        </div>
        <div className="flex items-center">
          {dataArray && dataArray.length > 0 ? (
            <CheckCircle color="primary" />
          ) : (
            <Warning color="error" />
          )}
          <Typography variant="body2" color="textSecondary" className="ml-2">
            {dataArray && dataArray.length > 0 ? "Completed" : "Incomplete"}
          </Typography>
        </div>
      </Box>
      {dataArray && dataArray.length > 0 ? (
        <Box>
          {dataArray.map((item, index) => (
            <Typography
              key={`${editStep}-${index}`} // ✅ unique key for each item
              variant="body1"
              className="text-gray-600 mb-2"
            >
              {formatter(item)}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No information available.
        </Typography>
      )}
    </Paper>
  );

  return (
    <div className="space-y-8">
      <Typography
        variant="h4"
        className="font-semibold text-center text-gray-800 mb-8"
      >
        Final Review of Your Will
      </Typography>

      {/* Personal Details */}
      <Paper elevation={3} className="p-6 shadow-lg rounded-xl bg-gray-50 mb-4">
        <Typography variant="h6" className="font-bold text-gray-700 mb-4">
          Personal Details
        </Typography>
        <Divider className="mb-4" />
        <Typography variant="body1" className="text-gray-600 mb-2">
          <strong>Name:</strong> {fullName}
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-2">
          <strong>DOB:</strong> {dob}
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-2">
          <strong>Gender:</strong> {gender}
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-2">
          <strong>Nationality:</strong> {nationality}
        </Typography>
      </Paper>

      {/* Family Info */}
      {renderSectionSummary(
        "Family Information",
        familyMembers,
        "familyInformation",
        (member) =>
          `Name: ${member.name} | Relationship: ${member.relation} | Age: ${member.age}`
      )}

      {/* Assets */}
      <h3 className="text-lg font-semibold mb-2">Assets</h3>
      {[
        {
          label: "Bank Accounts",
          key: "bankAccounts",
          getSummary: (a) =>
            `Bank: ${a.bankName} | Type: ${a.accountType} | Value: ${a.value}`,
        },
        {
          label: "Real Estate",
          key: "realEstate",
          getSummary: (a) =>
            `Type: ${a.propertyType} | Location: ${a.location} | Value: ${a.value}`,
        },
        {
          label: "Jewelry",
          key: "jewelry",
          getSummary: (a) =>
            `Desc: ${a.description} | Karat: ${a.karat} | Weight: ${a.weight} | Value: ${a.value}`,
        },
        {
          label: "Stocks",
          key: "stocks",
          getSummary: (a) =>
            `Broker: ${a.brokerName} | Shares: ${a.numberOfShares} | Value: ${a.value}`,
        },
        {
          label: "Digital Assets",
          key: "digitalAssets",
          getSummary: (a) =>
            `Platform: ${a.platform} | Type: ${a.assetType} | Value: ${a.value}`,
        },
        {
          label: "Other Assets",
          key: "otherAssets",
          getSummary: (a) =>
            `Description: ${a.description} | Value: ${a.value}`,
        },
      ].map(({ label, key, getSummary }) =>
        renderSectionSummary(label, formData[key] || [], key, getSummary)
      )}

      {/* Distributions */}
      {renderSectionSummary(
        "Distributions",
        distributions,
        "distributions",
        (dist) =>
          `Beneficiary: ${dist.beneficiary} | Asset: ${dist.asset} | Share: ${dist.share}`
      )}

      {/* Special Requests */}
      {renderSectionSummary(
        "Special Requests",
        specialRequests,
        "specialRequests",
        (req) =>
          `Gift Name: ${req.giftName} | Type: ${req.type} | Message: ${
            req.message || "No message"
          }`
      )}

      {/* Submit */}
      <Box className="space-y-4 mt-8">
        <Typography variant="h6" className="font-semibold text-gray-800">
          Confirm All Information
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          Please review the information above carefully. If everything looks
          correct, you can submit the will.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleFinalSubmit}
          size="large"
        >
          Confirm and Submit Will
        </Button>
      </Box>

      {/* PDF */}
      <Box className="space-y-4 mt-8">
        <Typography variant="h6" className="font-semibold text-gray-800">
          Download a PDF of Your Will
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => alert("PDF download initiated")}
          size="large"
        >
          Download PDF
        </Button>
      </Box>
    </div>
  );
};

export default FinalReview;
