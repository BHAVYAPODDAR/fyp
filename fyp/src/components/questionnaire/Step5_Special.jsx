import React, { useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { UploadFile } from "@mui/icons-material";

const Step5_SpecialRequests = ({ formData, updateFormData }) => {
  const [specialRequests, setSpecialRequests] = useState(
    formData.specialRequests || []
  );

  const handleAddRequest = () => {
    setSpecialRequests((prev) => [
      ...prev,
      {
        type: "",
        giftName: "",
        description: "",
        recipient: "",
        value: "",
        conditions: { event: "", date: "" },
        messageText: "",
        videoMessage: null,
        textMessageFile: null,
      },
    ]);
  };

  const handleRequestChange = (index, field, value) => {
    const updated = [...specialRequests];
    updated[index][field] = value;
    setSpecialRequests(updated);
    updateFormData({ specialRequests: updated });
  };

  const handleConditionsChange = (index, field, value) => {
    const updated = [...specialRequests];
    updated[index].conditions[field] = value;
    setSpecialRequests(updated);
    updateFormData({ specialRequests: updated });
  };

  const handleRemoveRequest = (index) => {
    const updated = [...specialRequests];
    updated.splice(index, 1);
    setSpecialRequests(updated);
    updateFormData({ specialRequests: updated });
  };

  const handleFileUpload = (index, fileType, file) => {
    const updated = [...specialRequests];
    if (fileType === "videoMessage") {
      updated[index].videoMessage = file;
    } else {
      updated[index].textMessageFile = file;
    }
    setSpecialRequests(updated);
    updateFormData({ specialRequests: updated });
  };

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="font-semibold text-gray-800">
        Special Requests (Gifts, Messages)
      </Typography>

      {specialRequests.map((item, index) => (
        <Card key={index} className="shadow-sm bg-gray-50 rounded-xl">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1" className="font-medium">
                Special Request {index + 1}
              </Typography>
              <IconButton
                onClick={() => handleRemoveRequest(index)}
                color="error"
              >
                <Delete />
              </IconButton>
            </div>

            <TextField
              select
              label="Gift Type"
              fullWidth
              value={item.type}
              onChange={(e) =>
                handleRequestChange(index, "type", e.target.value)
              }
            >
              {["Physical Gift", "Digital Asset", "Experience", "Custom"].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </TextField>

            {item.type === "Physical Gift" && (
              <>
                <TextField
                  label="Gift Name"
                  fullWidth
                  value={item.giftName}
                  onChange={(e) =>
                    handleRequestChange(index, "giftName", e.target.value)
                  }
                />
                <TextField
                  label="Gift Description"
                  fullWidth
                  value={item.description}
                  onChange={(e) =>
                    handleRequestChange(index, "description", e.target.value)
                  }
                />
                <TextField
                  label="Recipient"
                  fullWidth
                  value={item.recipient}
                  onChange={(e) =>
                    handleRequestChange(index, "recipient", e.target.value)
                  }
                />
                <TextField
                  label="Gift Value (INR)"
                  fullWidth
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    handleRequestChange(index, "value", e.target.value)
                  }
                />
              </>
            )}

            {item.type === "Digital Asset" && (
              <>
                <TextField
                  label="Digital Asset Name"
                  fullWidth
                  value={item.giftName}
                  onChange={(e) =>
                    handleRequestChange(index, "giftName", e.target.value)
                  }
                />
                <TextField
                  label="Asset Description"
                  fullWidth
                  value={item.description}
                  onChange={(e) =>
                    handleRequestChange(index, "description", e.target.value)
                  }
                />
              </>
            )}

            {item.type === "Experience" && (
              <>
                <TextField
                  label="Experience Name"
                  fullWidth
                  value={item.giftName}
                  onChange={(e) =>
                    handleRequestChange(index, "giftName", e.target.value)
                  }
                />
                <TextField
                  label="Experience Details"
                  fullWidth
                  value={item.description}
                  onChange={(e) =>
                    handleRequestChange(index, "description", e.target.value)
                  }
                />
                <TextField
                  label="Recipient"
                  fullWidth
                  value={item.recipient}
                  onChange={(e) =>
                    handleRequestChange(index, "recipient", e.target.value)
                  }
                />
              </>
            )}

            {item.type === "Custom" && (
              <TextField
                label="Custom Gift Type"
                fullWidth
                value={item.giftName}
                onChange={(e) =>
                  handleRequestChange(index, "giftName", e.target.value)
                }
              />
            )}

            <div className="flex gap-4">
              <TextField
                label="Condition Event"
                fullWidth
                value={item.conditions.event}
                onChange={(e) =>
                  handleConditionsChange(index, "event", e.target.value)
                }
              />
              <TextField
                label="Condition Date"
                type="date"
                fullWidth
                value={item.conditions.date}
                onChange={(e) =>
                  handleConditionsChange(index, "date", e.target.value)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <Typography variant="subtitle2" className="mt-2">
              Attach a Video Message (Optional)
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<UploadFile />}
            >
              Upload Video Message
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) =>
                  handleFileUpload(index, "videoMessage", e.target.files[0])
                }
              />
            </Button>

            <Typography variant="subtitle2" className="mt-2">
              Upload a Text Message (Optional)
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<UploadFile />}
            >
              Upload Text Message File
              <input
                type="file"
                accept=".txt"
                hidden
                onChange={(e) =>
                  handleFileUpload(index, "textMessageFile", e.target.files[0])
                }
              />
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={handleAddRequest}>
        Add Special Request
      </Button>
    </div>
  );
};

Step5_SpecialRequests.validate = async (formData) => {
  if (!formData.specialRequests || formData.specialRequests.length === 0)
    return false;

  for (let item of formData.specialRequests) {
    if (!item.type || !item.giftName || !item.description) return false;
    if (item.type === "Physical Gift" && !item.value) return false;
    if (item.type === "Digital Asset" && !item.value) return false;
  }
  return true;
};

export default Step5_SpecialRequests;
