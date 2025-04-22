import React from "react";
import {
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { Edit, CheckCircle, Warning } from "@mui/icons-material";

const FinalReview = ({ formData, updateFormData, goBackToStep }) => {
  const {
    fullName,
    dob,
    familyMembers,
    assets,
    distributions,
    specialRequests,
  } = formData;

  const handleFinalSubmit = () => {
    alert("Will successfully created!");
  };

  const safeToString = (data, visited = new WeakSet()) => {
    if (data === null || data === undefined) {
      return "No data available";
    }

    if (typeof data !== "object") {
      return String(data);
    }

    if (visited.has(data)) {
      return "[Circular]";
    }

    visited.add(data);

    if (Array.isArray(data)) {
      return data.map((item) => safeToString(item, visited)).join(", ");
    }

    return Object.keys(data)
      .map((key) => {
        const value = data[key];
        return `${key}: ${safeToString(value, visited)}`;
      })
      .join(", ");
  };

  const renderFamilyMembers = () => {
    return familyMembers && familyMembers.length > 0 ? (
      familyMembers.map((member, index) => (
        <Typography key={index} variant="body1" className="text-gray-600 mb-2">
          <strong>Name: </strong>
          {member.name} | <strong>Relationship: </strong>
          {member.relationship}
        </Typography>
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        No family members added
      </Typography>
    );
  };

  const renderAssets = () => {
    return assets && assets.length > 0 ? (
      assets.map((asset, index) => (
        <Typography key={index} variant="body1" className="text-gray-600 mb-2">
          <strong>Name: </strong>
          {asset.name} | <strong>Type: </strong>
          {asset.type} | <strong>Value: </strong>
          {asset.value}
        </Typography>
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        No assets added
      </Typography>
    );
  };

  const renderDistributions = () => {
    return distributions && distributions.length > 0 ? (
      distributions.map((dist, index) => (
        <Typography key={index} variant="body1" className="text-gray-600 mb-2">
          <strong>Beneficiary: </strong>
          {dist.beneficiary} | <strong>Asset: </strong>
          {dist.asset} | <strong>Share: </strong>
          {dist.share}
        </Typography>
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        No distributions set
      </Typography>
    );
  };

  const renderSpecialRequests = () => {
    return specialRequests && specialRequests.length > 0 ? (
      specialRequests.map((request, index) => (
        <Typography key={index} variant="body1" className="text-gray-600 mb-2">
          <strong>Gift Name: </strong>
          {request.giftName} | <strong>Type: </strong>
          {request.type} | <strong>Message: </strong>
          {request.message || "No message"}
        </Typography>
      ))
    ) : (
      <Typography variant="body1" color="textSecondary">
        No special requests added
      </Typography>
    );
  };

  const renderSectionSummary = (title, content) => (
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
          <IconButton color="primary" onClick={() => goBackToStep(title)}>
            <Edit />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            Edit
          </Typography>
        </div>
        <div className="flex items-center">
          {content ? (
            <CheckCircle color="primary" />
          ) : (
            <Warning color="error" />
          )}
          <Typography variant="body2" color="textSecondary" className="ml-2">
            {content ? "Completed" : "Incomplete"}
          </Typography>
        </div>
      </Box>
      <Box>{content}</Box>
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

      {/* Personal Details Section */}
      {renderSectionSummary("Personal Details", `${fullName}, ${dob}`)}

      {/* Family Information Section */}
      {renderSectionSummary("Family Information", renderFamilyMembers())}

      {/* Assets Section */}
      {renderSectionSummary("Assets", renderAssets())}

      {/* Distributions Section */}
      {renderSectionSummary("Distributions", renderDistributions())}

      {/* Special Requests Section */}
      {renderSectionSummary("Special Requests", renderSpecialRequests())}

      {/* Confirmation Section */}
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

      {/* Download PDF Option */}
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
