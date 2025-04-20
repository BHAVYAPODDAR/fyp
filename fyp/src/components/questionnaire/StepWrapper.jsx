import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import Step1_PersonalInfo from "./Step1_PersonalInfo";
import Step2_FamilyInfo from "./Step2_FamilyInfo";
// ... other steps later

const steps = [
  "Personal Info",
  "Family",
  "Assets",
  "Distribution",
  "Special",
  "Review",
];

const stepComponents = [
  Step1_PersonalInfo,
  Step2_FamilyInfo,
  // ...rest later
];

const StepWrapper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const CurrentStepComponent = stepComponents[activeStep];

  const handleNext = async () => {
    const isValid = await CurrentStepComponent.validate?.();
    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setLoading(false);
    }, 400);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 bg-white rounded-2xl shadow-xl">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-8 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              setErrors={setErrors}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default StepWrapper;
