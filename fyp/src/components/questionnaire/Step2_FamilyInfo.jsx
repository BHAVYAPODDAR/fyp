import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const Step2_FamilyInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const [localData, setLocalData] = useState({
    maritalStatus: formData.maritalStatus || "",
    spouseName: formData.spouseName || "",
    children: formData.children || [{ name: "", age: "" }],
  });

  useEffect(() => {
    updateFormData(localData);
  }, [localData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChildChange = (index, field, value) => {
    const updated = [...localData.children];
    updated[index][field] = value;
    setLocalData((prev) => ({ ...prev, children: updated }));
  };

  const addChild = () => {
    setLocalData((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "" }],
    }));
  };

  const removeChild = (index) => {
    const updated = [...localData.children];
    updated.splice(index, 1);
    setLocalData((prev) => ({ ...prev, children: updated }));
  };

  // Attach this validation to be triggered from StepWrapper
  Step2_FamilyInfo.validate = async () => {
    const newErrors = {};
    if (!localData.maritalStatus)
      newErrors.maritalStatus = "Please select your marital status.";
    if (localData.maritalStatus === "Married" && !localData.spouseName.trim()) {
      newErrors.spouseName = "Please enter your spouse's name.";
    }

    const childErrors = localData.children.map((child) => {
      const err = {};
      if (!child.name.trim()) err.name = "Child's name required.";
      if (!child.age.trim()) err.age = "Age required.";
      return err;
    });

    const hasChildErrors = childErrors.some(
      (child) => Object.keys(child).length > 0
    );
    if (hasChildErrors) newErrors.children = childErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="text-xl font-semibold">
        👨‍👩‍👧‍👦 Family Information
      </Typography>

      <TextField
        select
        fullWidth
        name="maritalStatus"
        label="💍 Marital Status"
        value={localData.maritalStatus}
        onChange={handleChange}
        error={!!errors.maritalStatus}
        helperText={errors.maritalStatus}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married">Married</MenuItem>
        <MenuItem value="Widowed">Widowed</MenuItem>
        <MenuItem value="Divorced">Divorced</MenuItem>
      </TextField>

      {localData.maritalStatus === "Married" && (
        <TextField
          fullWidth
          name="spouseName"
          label="🤝 Spouse's Full Name"
          value={localData.spouseName}
          onChange={handleChange}
          error={!!errors.spouseName}
          helperText={errors.spouseName}
        />
      )}

      <div className="space-y-2">
        <Typography className="text-lg font-medium">
          👶 Children Information
        </Typography>

        {localData.children.map((child, index) => (
          <div key={index} className="flex gap-4 items-center w-full">
            <TextField
              label="👦 Name"
              value={child.name}
              onChange={(e) => handleChildChange(index, "name", e.target.value)}
              error={!!(errors.children && errors.children[index]?.name)}
              helperText={errors.children && errors.children[index]?.name}
              fullWidth
            />
            <TextField
              label="🎂 Age"
              value={child.age}
              onChange={(e) => handleChildChange(index, "age", e.target.value)}
              error={!!(errors.children && errors.children[index]?.age)}
              helperText={errors.children && errors.children[index]?.age}
              fullWidth
            />
            {localData.children.length > 1 && (
              <Tooltip title="Remove child">
                <IconButton onClick={() => removeChild(index)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </div>
        ))}

        <Button variant="outlined" startIcon={<Add />} onClick={addChild}>
          Add Child
        </Button>
      </div>
    </div>
  );
};

export default Step2_FamilyInfo;
