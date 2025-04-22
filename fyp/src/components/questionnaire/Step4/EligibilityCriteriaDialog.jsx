import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const educationOptions = [
  "None",
  "High School",
  "Bachelor’s Degree",
  "Master’s Degree",
  "PhD",
];

const EligibilityCriteriaDialog = ({
  open,
  onClose,
  onSave,
  initialCriteria = {},
}) => {
  const [criteria, setCriteria] = useState({
    minAge: "",
    education: "",
    ...initialCriteria,
  });

  useEffect(() => {
    if (open) {
      setCriteria({
        minAge: initialCriteria.minAge || "",
        education: initialCriteria.education || "",
      });
    }
  }, [open, initialCriteria]);

  const handleSave = () => {
    onSave(criteria);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Set Eligibility Criteria</DialogTitle>
      <DialogContent className="space-y-4 mt-2">
        <TextField
          label="Minimum Age (optional)"
          type="number"
          fullWidth
          value={criteria.minAge}
          onChange={(e) => setCriteria({ ...criteria, minAge: e.target.value })}
        />

        <TextField
          label="Required Education (optional)"
          fullWidth
          select
          value={criteria.education}
          onChange={(e) =>
            setCriteria({ ...criteria, education: e.target.value })
          }
        >
          {educationOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EligibilityCriteriaDialog;
