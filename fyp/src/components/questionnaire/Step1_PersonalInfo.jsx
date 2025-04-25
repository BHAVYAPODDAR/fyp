import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Grid,
  Divider,
  InputAdornment,
  Fade,
} from "@mui/material";
import { Email, Phone, Home, Work, Public, Wc } from "@mui/icons-material";

const Step1_PersonalInfo = ({
  formData,
  updateFormData,
  errors,
  setErrors,
}) => {
  const [localData, setLocalData] = useState({
    name: formData.name || "",
    gender: formData.gender || "",
    age: formData.age || "",
    email: formData.email || "",
    phone: formData.phone || "",
    address: formData.address || "",
    occupation: formData.occupation || "",
    religion: formData.religion || "",
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

  Step1_PersonalInfo.validate = async () => {
    const newErrors = {};
    if (!localData.name.trim()) newErrors.name = "Full name is required.";
    if (!localData.gender) newErrors.gender = "Please select your gender.";
    if (!localData.age || isNaN(localData.age))
      newErrors.age = "Valid age is required.";
    if (!localData.email.trim()) newErrors.email = "Email is required.";
    if (!localData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!localData.address.trim()) newErrors.address = "Address is required.";
    if (!localData.occupation.trim())
      newErrors.occupation = "Occupation is required.";
    if (!localData.religion.trim())
      newErrors.religion = "Religion is required.";
    if (!localData.nationality.trim())
      newErrors.nationality = "Nationality is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Fade in={true} timeout={500}>
      <div className="space-y-6">
        <Typography variant="h6" className="text-xl font-semibold">
          🧑 Personal Information
        </Typography>

        <Grid container spacing={2} columns={12}>
          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="name"
              label="👤 Full Name"
              value={localData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
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
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="age"
              label="🎂 Age"
              type="number"
              value={localData.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="email"
              label="📧 Email"
              value={localData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="phone"
              label="📱 Phone"
              value={localData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Divider className="my-4" />

        <Typography variant="subtitle1" className="font-medium">
          🌐 Additional Info
        </Typography>

        <Grid container spacing={2} columns={12}>
          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="address"
              label="🏠 Address"
              value={localData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="occupation"
              label="💼 Occupation"
              value={localData.occupation}
              onChange={handleChange}
              error={!!errors.occupation}
              helperText={errors.occupation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="religion"
              label="🛐 Religion"
              value={localData.religion}
              onChange={handleChange}
              error={!!errors.religion}
              helperText={errors.religion}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Wc />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}>
            <TextField
              fullWidth
              name="nationality"
              label="🌍 Nationality"
              value={localData.nationality}
              onChange={handleChange}
              error={!!errors.nationality}
              helperText={errors.nationality}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Public />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default Step1_PersonalInfo;
