// import React, { useState, useEffect } from "react";

// import {
//   TextField,
//   Typography,
//   MenuItem,
//   Button,
//   Card,
//   CardContent,
//   IconButton,
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";

// const Step2_FamilyInfo = ({ formData, updateFormData, errors, setErrors }) => {
//   const [hasChildren, setHasChildren] = useState(formData.hasChildren || "No");
//   const [children, setChildren] = useState(formData.children || []);

//   useEffect(() => {
//     if (hasChildren === "No") {
//       setChildren([]);
//       updateFormData({ hasChildren: "No", children: [] });
//     } else {
//       updateFormData({ hasChildren: "Yes", children });
//     }
//   }, [hasChildren, children, updateFormData]);

//   const handleAddChild = () => {
//     setChildren((prev) => [...prev, { name: "", age: "", relation: "" }]);
//   };

//   const handleRemoveChild = (index) => {
//     const updated = [...children];
//     updated.splice(index, 1);
//     setChildren(updated);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...children];
//     updated[index][field] = value;
//     setChildren(updated);
//   };

//   return (
//     <div className="space-y-6">
//       <Typography variant="h6" className="text-gray-800 font-semibold">
//         Family Information
//       </Typography>

//       <TextField
//         select
//         label="Do you have children?"
//         fullWidth
//         value={hasChildren}
//         onChange={(e) => setHasChildren(e.target.value)}
//       >
//         <MenuItem value="Yes">Yes</MenuItem>
//         <MenuItem value="No">No</MenuItem>
//       </TextField>

//       {hasChildren === "Yes" && (
//         <>
//           {children.map((child, index) => (
//             <Card key={index} className="bg-gray-50 rounded-xl shadow-sm">
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <Typography variant="subtitle1" className="font-medium">
//                     Child {index + 1}
//                   </Typography>
//                   <IconButton
//                     onClick={() => handleRemoveChild(index)}
//                     color="error"
//                   >
//                     <Delete />
//                   </IconButton>
//                 </div>
//                 <TextField
//                   label="Name"
//                   fullWidth
//                   value={child.name}
//                   onChange={(e) => handleChange(index, "name", e.target.value)}
//                 />
//                 <TextField
//                   label="Age"
//                   fullWidth
//                   type="number"
//                   value={child.age}
//                   onChange={(e) => handleChange(index, "age", e.target.value)}
//                 />
//                 <TextField
//                   label="Relation (e.g., Son, Daughter)"
//                   fullWidth
//                   value={child.relation}
//                   onChange={(e) =>
//                     handleChange(index, "relation", e.target.value)
//                   }
//                 />
//               </CardContent>
//             </Card>
//           ))}

//           <Button
//             variant="outlined"
//             startIcon={<Add />}
//             onClick={handleAddChild}
//           >
//             Add Child
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// // ✅ Updated Validation
// Step2_FamilyInfo.validate = async (formData) => {
//   if (formData.hasChildren === "Yes") {
//     if (!formData.children || formData.children.length === 0) return false;
//     for (let child of formData.children) {
//       if (!child.name || !child.age || !child.relation) return false;
//     }
//   }
//   return true;
// };

// export default Step2_FamilyInfo;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const RELATIONSHIP_OPTIONS = [
  "Spouse",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Uncle",
  "Aunt",
  "Other",
];

const Step2_FamilyInfo = ({ formData, updateFormData, errors, setErrors }) => {
  const [members, setMembers] = useState(formData.familyMembers || []);

  useEffect(() => {
    updateFormData({ familyMembers: members });
  }, [members]);

  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleAddMember = () => {
    setMembers((prev) => [...prev, { name: "", age: "", relation: "" }]);
  };

  const handleRemoveMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const renderField = (label, type, value, onChange) => (
    <TextField
      label={label}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div className="space-y-6">
      <Typography variant="h6" className="text-gray-800 font-semibold">
        Family Information
      </Typography>

      {members.map((member, index) => (
        <Card key={index} className="bg-gray-50 rounded-xl shadow-sm">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1" className="font-medium">
                Member {index + 1}
              </Typography>
              <IconButton
                onClick={() => handleRemoveMember(index)}
                color="error"
              >
                <Delete />
              </IconButton>
            </div>

            {renderField("Full Name", "text", member.name, (e) =>
              handleChange(index, "name", e.target.value)
            )}

            {renderField("Age", "number", member.age, (e) =>
              handleChange(index, "age", e.target.value)
            )}

            <TextField
              select
              label="Relation"
              fullWidth
              value={member.relation}
              onChange={(e) => handleChange(index, "relation", e.target.value)}
            >
              {RELATIONSHIP_OPTIONS.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={handleAddMember}>
        Add Family Member
      </Button>
    </div>
  );
};

// ✅ Validation function
Step2_FamilyInfo.validate = async (formData) => {
  if (!formData.familyMembers || formData.familyMembers.length === 0)
    return false;
  for (let member of formData.familyMembers) {
    if (!member.name || !member.age || !member.relation) return false;
  }
  return true;
};

export default Step2_FamilyInfo;
