import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Typography } from "@mui/material";

const Step1_PersonalInfo = ({
  formData,
  updateFormData,
  errors,
  setErrors,
}) => {
  const [localData, setLocalData] = useState({
    fullName: formData.fullName || "",
    gender: formData.gender || "",
    dob: formData.dob || "",
    nationality: formData.nationality || "",
  });

  useEffect(() => {
    updateFormData(localData);
  }, [localData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Attach this validation function to be triggered from StepWrapper
  Step1_PersonalInfo.validate = async () => {
    const newErrors = {};
    if (!localData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!localData.gender) newErrors.gender = "Please select your gender.";
    if (!localData.dob) newErrors.dob = "Date of birth is required.";
    if (!localData.nationality.trim())
      newErrors.nationality = "Nationality is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="text-xl font-semibold">
        🧑 Personal Information
      </Typography>

      <TextField
        fullWidth
        name="fullName"
        label="👤 Full Name"
        value={localData.fullName}
        onChange={handleChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
      />

      <TextField
        fullWidth
        select
        name="gender"
        label="🚻 Gender"
        value={localData.gender}
        onChange={handleChange}
        error={!!errors.gender}
        helperText={errors.gender}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        fullWidth
        name="dob"
        label="🎂 Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={localData.dob}
        onChange={handleChange}
        error={!!errors.dob}
        helperText={errors.dob}
      />

      <TextField
        fullWidth
        name="nationality"
        label="🌍 Nationality"
        value={localData.nationality}
        onChange={handleChange}
        error={!!errors.nationality}
        helperText={errors.nationality}
      />
    </div>
  );
};

export default Step1_PersonalInfo;
