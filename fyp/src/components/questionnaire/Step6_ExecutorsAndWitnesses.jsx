import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const Step6_ExecutorInfo = ({
  formData,
  updateFormData,
  familyMembers = [],
  errors,
  setErrors,
}) => {
  const [executor, setExecutor] = useState(
    formData.executor || {
      name: "",
      relation: "",
      fromFamily: false,
      idProof: null,
    }
  );
  const [alternateExecutor, setAlternateExecutor] = useState(
    formData.alternateExecutor || {
      name: "",
      relation: "",
      fromFamily: false,
      idProof: null,
    }
  );
  const [witnesses, setWitnesses] = useState(
    formData.witnesses || [
      { name: "", relation: "", fromFamily: false, idProof: null },
      { name: "", relation: "", fromFamily: false, idProof: null },
    ]
  );

  useEffect(() => {
    updateFormData({ ...formData, executor, alternateExecutor, witnesses });
  }, [executor, alternateExecutor, witnesses]);

  const handleFieldChange = (setFunc, obj, field, value) => {
    const updated = { ...obj, [field]: value };
    setFunc(updated);
    setErrors((prev) => ({ ...prev, [`${field}`]: "" }));
  };

  const handleWitnessChange = (index, field, value) => {
    const updated = [...witnesses];
    updated[index][field] = value;
    setWitnesses(updated);
    setErrors((prev) => ({ ...prev, [`witness_${index}_${field}`]: "" }));
  };

  const handleFileUpload = (target, index = null, file) => {
    if (target === "executor") setExecutor({ ...executor, idProof: file });
    else if (target === "alternate")
      setAlternateExecutor({ ...alternateExecutor, idProof: file });
    else {
      const updated = [...witnesses];
      updated[index].idProof = file;
      setWitnesses(updated);
    }
  };

  const addWitness = () => {
    setWitnesses([
      ...witnesses,
      { name: "", relation: "", fromFamily: false, idProof: null },
    ]);
  };

  const removeWitness = (index) => {
    const updated = [...witnesses];
    updated.splice(index, 1);
    setWitnesses(updated);
  };

  Step6_ExecutorInfo.validate = async () => {
    const newErrors = {};

    if (!executor.name.trim())
      newErrors.executor_name = "Executor name required.";
    if (!alternateExecutor.name.trim())
      newErrors.alternate_name = "Alternate Executor name required.";

    witnesses.forEach((w, i) => {
      if (!w.name.trim())
        newErrors[`witness_${i}_name`] = "Witness name required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderPersonBlock = (label, person, setFunc, prefix) => (
    <div className="border p-4 rounded-md bg-white shadow-sm">
      <Typography variant="subtitle1" className="font-medium mb-2">
        {label}
      </Typography>

      <TextField
        fullWidth
        select
        label="Choose from family (optional)"
        value={person.name}
        onChange={(e) => {
          const selected = familyMembers.find((f) => f.name === e.target.value);
          if (selected) {
            setFunc({
              name: selected.name,
              relation: selected.relation || "",
              fromFamily: true,
              idProof: null,
            });
          } else {
            handleFieldChange(setFunc, person, "name", e.target.value);
          }
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">-- Select or type manually --</MenuItem>
        {(familyMembers || []).map((f, i) => (
          <MenuItem key={i} value={f.name}>
            {f.name} ({f.relation})
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Name"
        value={person.name}
        onChange={(e) =>
          handleFieldChange(setFunc, person, "name", e.target.value)
        }
        error={!!errors[`${prefix}_name`]}
        helperText={errors[`${prefix}_name`]}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Relation"
        value={person.relation}
        onChange={(e) =>
          handleFieldChange(setFunc, person, "relation", e.target.value)
        }
        sx={{ mb: 2 }}
      />

      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
      >
        Upload ID Proof
        <input
          type="file"
          hidden
          accept="image/*,application/pdf"
          onChange={(e) => handleFileUpload(prefix, null, e.target.files[0])}
        />
      </Button>

      {person.idProof && (
        <Typography className="text-sm text-gray-500 mt-1 truncate">
          {person.idProof.name}
        </Typography>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <Typography variant="h6" className="text-xl font-semibold">
        👨‍⚖️ Executor & Witnesses
      </Typography>

      {renderPersonBlock("Primary Executor", executor, setExecutor, "executor")}
      {renderPersonBlock(
        "Alternate Executor (Backup)",
        alternateExecutor,
        setAlternateExecutor,
        "alternate"
      )}

      <div className="space-y-4">
        <Typography variant="subtitle1" className="font-medium">
          👁️ Witnesses (2 required)
        </Typography>
        {witnesses.map((w, i) => (
          <div
            key={i}
            className="border p-4 rounded-md bg-white shadow-sm relative"
          >
            {i >= 2 && (
              <IconButton
                size="small"
                className="absolute top-2 right-2"
                onClick={() => removeWitness(i)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}

            <TextField
              fullWidth
              select
              label="Choose from family (optional)"
              value={w.name}
              onChange={(e) => {
                const selected = familyMembers.find(
                  (f) => f.name === e.target.value
                );
                if (selected) {
                  handleWitnessChange(i, "name", selected.name);
                  handleWitnessChange(i, "relation", selected.relation || "");
                  handleWitnessChange(i, "fromFamily", true);
                } else {
                  handleWitnessChange(i, "name", e.target.value);
                  handleWitnessChange(i, "fromFamily", false);
                }
              }}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">-- Select or type manually --</MenuItem>
              {familyMembers.map((f, idx) => (
                <MenuItem key={idx} value={f.name}>
                  {f.name} ({f.relation})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Name"
              value={w.name}
              onChange={(e) => handleWitnessChange(i, "name", e.target.value)}
              error={!!errors[`witness_${i}_name`]}
              helperText={errors[`witness_${i}_name`]}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Relation"
              value={w.relation}
              onChange={(e) =>
                handleWitnessChange(i, "relation", e.target.value)
              }
              sx={{ mb: 2 }}
            />

            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
            >
              Upload ID Proof
              <input
                type="file"
                hidden
                accept="image/*,application/pdf"
                onChange={(e) =>
                  handleFileUpload("witness", i, e.target.files[0])
                }
              />
            </Button>

            {w.idProof && (
              <Typography className="text-sm text-gray-500 mt-1 truncate">
                {w.idProof.name}
              </Typography>
            )}
          </div>
        ))}

        <Button
          variant="contained"
          onClick={addWitness}
          sx={{ textTransform: "none", mt: 2 }}
        >
          + Add Additional Witness
        </Button>
      </div>
    </div>
  );
};

export default Step6_ExecutorInfo;
