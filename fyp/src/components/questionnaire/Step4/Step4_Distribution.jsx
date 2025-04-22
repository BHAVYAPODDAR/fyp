// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Card,
//   CardContent,
//   IconButton,
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

// const relationOptions = [
//   "Spouse",
//   "Child",
//   "Sibling",
//   "Parent",
//   "Relative",
//   "Other",
// ];

// const Step4_Distribution = ({
//   formData,
//   updateFormData,
//   errors,
//   setErrors,
// }) => {
//   const [distributions, setDistributions] = useState(
//     formData.distributions || []
//   );

//   useEffect(() => {
//     updateFormData({ distributions });
//   }, [distributions]);

//   const handleAdd = () => {
//     setDistributions((prev) => [
//       ...prev,
//       {
//         name: "",
//         relation: "",
//         asset: "",
//         amountType: "Fixed",
//         amount: "",
//         eligibility: { age: "", education: "" },
//         fallback: "",
//         lockedUntil: "",
//       },
//     ]);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...distributions];
//     updated[index][field] = value;
//     setDistributions(updated);
//   };

//   const handleEligibilityChange = (index, field, value) => {
//     const updated = [...distributions];
//     updated[index].eligibility[field] = value;
//     setDistributions(updated);
//   };

//   const handleRemove = (index) => {
//     const updated = [...distributions];
//     updated.splice(index, 1);
//     setDistributions(updated);
//   };

//   return (
//     <div className="space-y-6">
//       <Typography variant="h6" className="font-semibold text-gray-800">
//         Asset Distribution
//       </Typography>

//       {distributions.map((item, index) => (
//         <Card key={index} className="shadow-sm bg-gray-50 rounded-xl">
//           <CardContent className="space-y-4">
//             <div className="flex justify-between items-center">
//               <Typography variant="subtitle1" className="font-medium">
//                 Beneficiary {index + 1}
//               </Typography>
//               <IconButton onClick={() => handleRemove(index)} color="error">
//                 <Delete />
//               </IconButton>
//             </div>

//             <TextField
//               label="Name"
//               fullWidth
//               value={item.name}
//               onChange={(e) => handleChange(index, "name", e.target.value)}
//             />

//             <TextField
//               select
//               label="Relation"
//               fullWidth
//               value={item.relation}
//               onChange={(e) => handleChange(index, "relation", e.target.value)}
//             >
//               {relationOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               label="Asset"
//               fullWidth
//               value={item.asset}
//               onChange={(e) => handleChange(index, "asset", e.target.value)}
//             />

//             <div className="flex gap-4">
//               <TextField
//                 select
//                 label="Amount Type"
//                 fullWidth
//                 value={item.amountType}
//                 onChange={(e) =>
//                   handleChange(index, "amountType", e.target.value)
//                 }
//               >
//                 <MenuItem value="Fixed">Fixed</MenuItem>
//                 <MenuItem value="Percentage">Percentage</MenuItem>
//               </TextField>
//               <TextField
//                 label={
//                   item.amountType === "Percentage" ? "Percentage (%)" : "Amount"
//                 }
//                 type="number"
//                 fullWidth
//                 value={item.amount}
//                 onChange={(e) => handleChange(index, "amount", e.target.value)}
//               />
//             </div>

//             <Typography variant="subtitle2" className="mt-2">
//               Eligibility Criteria (optional)
//             </Typography>
//             <div className="flex gap-4">
//               <TextField
//                 label="Min Age"
//                 type="number"
//                 fullWidth
//                 value={item.eligibility.age}
//                 onChange={(e) =>
//                   handleEligibilityChange(index, "age", e.target.value)
//                 }
//               />
//               <TextField
//                 label="Required Education"
//                 fullWidth
//                 value={item.eligibility.education}
//                 onChange={(e) =>
//                   handleEligibilityChange(index, "education", e.target.value)
//                 }
//               />
//             </div>

//             <TextField
//               label="Fallback Beneficiary"
//               fullWidth
//               value={item.fallback}
//               onChange={(e) => handleChange(index, "fallback", e.target.value)}
//             />

//             <TextField
//               label="Lock Until (e.g., Graduation, Age 25)"
//               fullWidth
//               value={item.lockedUntil}
//               onChange={(e) =>
//                 handleChange(index, "lockedUntil", e.target.value)
//               }
//             />
//           </CardContent>
//         </Card>
//       ))}

//       <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
//         Add Beneficiary
//       </Button>
//     </div>
//   );
// };

// // ✅ Validation
// Step4_Distribution.validate = async (formData) => {
//   if (!formData.distributions || formData.distributions.length === 0)
//     return false;
//   for (let item of formData.distributions) {
//     if (!item.name || !item.asset || !item.amount) return false;
//   }
//   return true;
// };

// export default Step4_Distribution;

import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const relationOptions = [
  "Spouse",
  "Child",
  "Sibling",
  "Parent",
  "Relative",
  "Other",
];

const Step4_Distribution = ({ formData, updateFormData }) => {
  // console.log(formData);
  const [distributions, setDistributions] = useState(
    formData.distributions || []
  );

  useEffect(() => {
    updateFormData({ distributions });
  }, [distributions]);

  const handleAddBeneficiary = () => {
    setDistributions((prev) => [
      ...prev,
      {
        name: "",
        relation: "",
        assetDistributions: [], // 👈 dynamic list
        eligibility: { age: "", education: "" },
        fallback: "",
      },
    ]);
  };

  const handleBeneficiaryChange = (index, field, value) => {
    const updated = [...distributions];
    updated[index][field] = value;
    setDistributions(updated);
  };

  const handleAssetChange = (beneficiaryIndex, assetIndex, field, value) => {
    const updated = [...distributions];
    updated[beneficiaryIndex].assetDistributions[assetIndex][field] = value;
    setDistributions(updated);
  };

  const handleAddAssetToBeneficiary = (beneficiaryIndex) => {
    const updated = [...distributions];
    updated[beneficiaryIndex].assetDistributions.push({
      assetId: "",
      amountType: "Fixed",
      amount: "",
    });
    setDistributions(updated);
  };

  const handleEligibilityChange = (index, field, value) => {
    const updated = [...distributions];
    updated[index].eligibility[field] = value;
    setDistributions(updated);
  };

  const handleRemoveBeneficiary = (index) => {
    const updated = [...distributions];
    updated.splice(index, 1);
    setDistributions(updated);
  };

  const handleRemoveAsset = (beneficiaryIndex, assetIndex) => {
    const updated = [...distributions];
    updated[beneficiaryIndex].assetDistributions.splice(assetIndex, 1);
    setDistributions(updated);
  };

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="font-semibold text-gray-800">
        Asset Distribution
      </Typography>

      {distributions.map((item, index) => (
        <Card key={index} className="shadow-sm bg-gray-50 rounded-xl">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1" className="font-medium">
                Beneficiary {index + 1}
              </Typography>
              <IconButton
                onClick={() => handleRemoveBeneficiary(index)}
                color="error"
              >
                <Delete />
              </IconButton>
            </div>

            <TextField
              label="Name"
              fullWidth
              value={item.name}
              onChange={(e) =>
                handleBeneficiaryChange(index, "name", e.target.value)
              }
            />

            <TextField
              select
              label="Relation"
              fullWidth
              value={item.relation}
              onChange={(e) =>
                handleBeneficiaryChange(index, "relation", e.target.value)
              }
            >
              {relationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle2" className="mt-2">
              Assign Assets
            </Typography>

            {item.assetDistributions.map((assetItem, assetIndex) => (
              <div
                key={assetIndex}
                className="space-y-2 border p-3 rounded-md bg-white"
              >
                <div className="flex justify-between items-center">
                  <TextField
                    select
                    label="Asset"
                    fullWidth
                    value={assetItem.assetId}
                    onChange={(e) =>
                      handleAssetChange(
                        index,
                        assetIndex,
                        "assetId",
                        e.target.value
                      )
                    }
                  >
                    {/* {formData.assets?.map((asset) => (
                      <MenuItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.type})
                      </MenuItem>
                    ))} */}

                    {[
                      ...(formData.realEstate || []).map((a, i) => ({
                        id: `real-${i}`,
                        name: a.location || "Unnamed Real Estate",
                        type: "Real Estate",
                      })),
                      ...(formData.bankAccounts || []).map((a, i) => ({
                        id: `bank-${i}`,
                        name: a.bankName || "Bank Account",
                        type: "Bank Account",
                      })),
                      ...(formData.stocks || []).map((a, i) => ({
                        id: `stock-${i}`,
                        name: a.brokerName || "Stock Account",
                        type: "Stock / Shares",
                      })),
                      ...(formData.jewelry || []).map((a, i) => ({
                        id: `jewelry-${i}`,
                        name: a.description || "Jewelry",
                        type: "Jewelry",
                      })),
                      ...(formData.digitalAssets || []).map((a, i) => ({
                        id: `digital-${i}`,
                        name: a.platform || "Digital Asset",
                        type: "Digital Assets",
                      })),
                      ...(formData.others || []).map((a, i) => ({
                        id: `other-${i}`,
                        name: a.description || "Other Asset",
                        type: "Other",
                      })),
                    ].map((asset) => (
                      <MenuItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.type})
                      </MenuItem>
                    ))}
                  </TextField>

                  <IconButton
                    onClick={() => handleRemoveAsset(index, assetIndex)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </div>

                <div className="flex gap-4">
                  <TextField
                    select
                    label="Amount Type"
                    fullWidth
                    value={assetItem.amountType}
                    onChange={(e) =>
                      handleAssetChange(
                        index,
                        assetIndex,
                        "amountType",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="Fixed">Fixed</MenuItem>
                    <MenuItem value="Percentage">Percentage</MenuItem>
                  </TextField>

                  <TextField
                    label={
                      assetItem.amountType === "Percentage"
                        ? "Percentage (%)"
                        : "Amount"
                    }
                    type="number"
                    fullWidth
                    value={assetItem.amount}
                    onChange={(e) =>
                      handleAssetChange(
                        index,
                        assetIndex,
                        "amount",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outlined"
              onClick={() => handleAddAssetToBeneficiary(index)}
            >
              Add Asset to This Beneficiary
            </Button>

            <Typography variant="subtitle2" className="mt-4">
              Eligibility Criteria (optional)
            </Typography>
            <div className="flex gap-4">
              <TextField
                label="Min Age"
                type="number"
                fullWidth
                value={item.eligibility.age}
                onChange={(e) =>
                  handleEligibilityChange(index, "age", e.target.value)
                }
              />
              <TextField
                label="Required Education"
                fullWidth
                value={item.eligibility.education}
                onChange={(e) =>
                  handleEligibilityChange(index, "education", e.target.value)
                }
              />
            </div>

            <TextField
              label="Fallback Beneficiary"
              fullWidth
              value={item.fallback}
              onChange={(e) =>
                handleBeneficiaryChange(index, "fallback", e.target.value)
              }
            />
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddBeneficiary}
      >
        Add Beneficiary
      </Button>
    </div>
  );
};

Step4_Distribution.validate = async (formData) => {
  if (!formData.distributions || formData.distributions.length === 0)
    return false;
  for (let item of formData.distributions) {
    if (
      !item.name ||
      !item.assetDistributions ||
      item.assetDistributions.length === 0
    )
      return false;
    for (let asset of item.assetDistributions) {
      if (!asset.assetId || !asset.amount) return false;
    }
  }
  return true;
};

export default Step4_Distribution;
