import React, { useState, useCallback, useRef } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLocation } from "react-router-dom";

import Step1_PersonalInfo from "./Step1_PersonalInfo";
import Step2_FamilyInfo from "./Step2_FamilyInfo";
import Step3_AssetsInfo from "./Step3_Assets";
import Step4_Distribution from "./Step4/Step4_Distribution";
import Step5_SpecialRequests from "./Step5_Special";
import Step6_ExecutorsAndWitnesses from "./Step6_ExecutorsAndWitnesses";
import FinalReview from "./FinalReview";

const steps = [
  "Personal Info",
  "Family",
  "Assets",
  "Distribution",
  "Special",
  "Executor & Witnesses",
  "Review",
];

const stepComponents = [
  Step1_PersonalInfo,
  Step2_FamilyInfo,
  Step3_AssetsInfo,
  Step4_Distribution,
  Step5_SpecialRequests,
  Step6_ExecutorsAndWitnesses,
  FinalReview,
];

const StepWrapper = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(
    location.state?.formData
      ? { ...location.state.formData, submissionTimestamp: undefined }
      : {}
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const stepRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const updateFormData = useCallback((newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  const handleNext = async () => {
    if (stepRef.current?.validate) {
      const isValid = await stepRef.current.validate();
      if (!isValid) return;
    }

    setLoading(true);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setLoading(false);
    }, 400);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Cancel button handler: Redirect to Dashboard
  const handleCancel = () => {
    // Clear form data if needed
    setFormData({});
    navigate("/dashboard"); // Redirect to dashboard
  };

  // Used to go to specific step when clicking "Edit"
  const goBackToStep = (stepName) => {
    const index = steps.findIndex(
      (step) => step.toLowerCase() === stepName.toLowerCase()
    );
    if (index !== -1) {
      setActiveStep(index);
    }
  };

  const CurrentStepComponent = stepComponents[activeStep];

  return (
    <div className="w-full min-h-screen overflow-y-auto px-4 py-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <CurrentStepComponent
                ref={stepRef}
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                setErrors={setErrors}
                goBackToStep={goBackToStep} // ✅ Pass this prop
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <div className="flex space-x-4">
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            {activeStep < stepComponents.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Next"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepWrapper;
