import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const assetTabs = [
  { label: "Bank Accounts", key: "bankAccounts" },
  { label: "Real Estate", key: "realEstate" },
  { label: "Stocks / Shares", key: "stocks" },
  { label: "Jewelry", key: "jewelry" },
  { label: "Digital Assets", key: "digitalAssets" },
  { label: "Other", key: "otherAssets" },
];

const Step3_AssetsInfo = ({ formData, updateFormData }) => {
  console.log(formData);
  const [activeTab, setActiveTab] = useState(0);
  const currentKey = assetTabs[activeTab].key;

  const [assets, setAssets] = useState(formData[currentKey] || []);

  useEffect(() => {
    setAssets(formData[currentKey] || []);
  }, [activeTab, formData]);

  const handleAddAsset = () => {
    setAssets((prev) => [...prev, {}]);
  };

  const handleRemoveAsset = (index) => {
    const updated = [...assets];
    updated.splice(index, 1);
    setAssets(updated);
    updateFormData({ [currentKey]: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = value;
    setAssets(updated);
    updateFormData({ [currentKey]: updated });
  };

  const renderFields = (asset, index) => {
    switch (currentKey) {
      case "bankAccounts":
        return (
          <>
            <TextField
              label="Bank Name"
              fullWidth
              value={asset.bankName || ""}
              onChange={(e) => handleChange(index, "bankName", e.target.value)}
            />
            <TextField
              label="Account Number"
              fullWidth
              value={asset.accountNumber || ""}
              onChange={(e) =>
                handleChange(index, "accountNumber", e.target.value)
              }
            />
            <TextField
              label="Account Type"
              fullWidth
              value={asset.accountType || ""}
              onChange={(e) =>
                handleChange(index, "accountType", e.target.value)
              }
            />
            <TextField
              label="IFSC Code"
              fullWidth
              value={asset.ifscCode || ""}
              onChange={(e) => handleChange(index, "ifscCode", e.target.value)}
            />
            <TextField
              label="Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      case "realEstate":
        return (
          <>
            <TextField
              label="Property Type"
              fullWidth
              value={asset.propertyType || ""}
              onChange={(e) =>
                handleChange(index, "propertyType", e.target.value)
              }
            />
            <TextField
              label="Location"
              fullWidth
              value={asset.location || ""}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
            <TextField
              label="Ownership"
              fullWidth
              value={asset.ownership || ""}
              onChange={(e) => handleChange(index, "ownership", e.target.value)}
            />
            <TextField
              label="Estimated Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      case "stocks":
        return (
          <>
            <TextField
              label="Broker Name"
              fullWidth
              value={asset.brokerName || ""}
              onChange={(e) =>
                handleChange(index, "brokerName", e.target.value)
              }
            />
            <TextField
              label="Demat ID"
              fullWidth
              value={asset.dematID || ""}
              onChange={(e) => handleChange(index, "dematID", e.target.value)}
            />
            <TextField
              label="Number of Shares"
              fullWidth
              type="number"
              value={asset.numberOfShares || ""}
              onChange={(e) =>
                handleChange(index, "numberOfShares", e.target.value)
              }
            />
            <TextField
              label="Estimated Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      case "jewelry":
        return (
          <>
            <TextField
              label="Description"
              fullWidth
              value={asset.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
            <TextField
              label="Karat"
              fullWidth
              value={asset.karat || ""}
              onChange={(e) => handleChange(index, "karat", e.target.value)}
            />
            <TextField
              label="Weight (grams)"
              fullWidth
              type="number"
              value={asset.weight || ""}
              onChange={(e) => handleChange(index, "weight", e.target.value)}
            />
            <TextField
              label="Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      case "digitalAssets":
        return (
          <>
            <TextField
              label="Platform"
              fullWidth
              value={asset.platform || ""}
              onChange={(e) => handleChange(index, "platform", e.target.value)}
            />
            <TextField
              label="Asset Type (e.g. crypto, domain)"
              fullWidth
              value={asset.assetType || ""}
              onChange={(e) => handleChange(index, "assetType", e.target.value)}
            />
            <TextField
              label="Credentials / Notes"
              fullWidth
              multiline
              value={asset.credentialsNote || ""}
              onChange={(e) =>
                handleChange(index, "credentialsNote", e.target.value)
              }
            />
            <TextField
              label="Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      case "otherAssets":
        return (
          <>
            <TextField
              label="Description"
              fullWidth
              value={asset.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
            <TextField
              label="Estimated Value (INR)"
              fullWidth
              type="number"
              value={asset.value || ""}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="font-semibold text-gray-800">
        Step 3: Asset Information
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {assetTabs.map((tab) => (
          <Tab key={tab.key} label={tab.label} />
        ))}
      </Tabs>

      {assets.map((asset, index) => (
        <Card key={index} className="bg-gray-50 shadow-sm rounded-xl">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1">Asset {index + 1}</Typography>
              <IconButton
                color="error"
                onClick={() => handleRemoveAsset(index)}
              >
                <Delete />
              </IconButton>
            </div>
            {renderFields(asset, index)}
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={handleAddAsset}>
        Add {assetTabs[activeTab].label.slice(0, -1)}
      </Button>
    </div>
  );
};

Step3_AssetsInfo.validate = async (formData) => {
  // Optional: implement per-asset-type validation
  return true;
};

export default Step3_AssetsInfo;
