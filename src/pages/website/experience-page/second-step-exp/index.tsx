import { AiOutlineClose, AiOutlineDown, AiOutlineMenu, AiOutlineUp } from "react-icons/ai";
import React, { useState } from "react";

import AboutYou from "./AboutYou";
import AddLocation from "./AddLocation";
import Basic from "./Basics";
import BookingSettings from "./BookingSettings";
import BringItems from "./BringItems";
import CancellationPolicyPage from "./CancellationPolicyPage";
import Discounts from "./Discounts";
import ExperienceForm from "./ExperienceForm";
import ExperienceName from "./ExperienceName";
import GeneralAvailability from "./GeneralAvailability";
import GroupSizeSelector from "./GroupSizeSelector";
import GuestPricing from "./GuestPricing";
import JustPage from "./JustPage";
import { Link } from "react-router-dom";
import PhotoUpload from "./PhotoUpload";
import ProvideDetails from "./ProvideDetails";
import Themes from "./Themes";
import VerifyPage from "./VerifyPage";
import WhatWereLookingFor from "./WhatWereLookingFor";
import WhatweDo from "./WhatweDo";

const SubmitExperiencePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const steps = [
    {
      id: "step1",
      title: "Your Idea",
      substeps: ["Basics", "Your theme"],
    },
    {
      id: "step2",
      title: "What we're looking for",
      substeps: ["Overview"],
    },
    {
      id: "step3",
      title: "Experience page",
      substeps: [
        "What We'll do",
        "About you",
        "Location",
        "What I'll provide",
        "What guests should bring",
        "Guest requirements",
        "Title",
        "Photos",
      ],
    },
    {
      id: "step4",
      title: "Setting",
      substeps: [
        "Group size",
        "General availability",
        "Pricing",
        "Discounts",
        "Booking settings",
        "Cancellation policy",
      ],
    },
    {
      id: "step5",
      title: "Your submission",
      substeps: ["Your Information", "Review & Submit"],
    },
  ];

  const allSubsteps = steps.flatMap((step) => step.substeps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [openSteps, setOpenSteps] = useState<string[]>([]);

  const currentStep = allSubsteps[currentStepIndex];

  const toggleStep = (stepId: string) => {
    setOpenSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleNext = () => {
    if (currentStepIndex < allSubsteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Icon for Small Screens */}
      <button
        className="fixed top-4 left-1 z-50 md:hidden p-2 bg-gray-200 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 bg-gray-100 w-64 min-h-screen p-3  scrollbar-thin scrollbar-thumb-gray-400 h-full scrollbar-track-gray-200 transform transition-transform duration-300 ease-in-out overflow-y-scroll ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="pb-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link className="w-24" to="/">
              <img src="/images/logo.svg" alt="Header Logo" />
            </Link>

            {/* Save & Exit Button */}
            <Link to="/">
              <button className="font-semibold underline">Save & Exit</button>
            </Link>
          </div>
        </nav>
        <h2 className="font-semibold text-xl mb-2">Submit your experience</h2>

        {steps.map((step, index) => (
          <div key={step.id}>
            {/* Step Title with Arrow Toggle */}
            <div
              className="p-2 font-semibold flex justify-between items-center cursor-pointer hover:bg-gray-200 rounded "
              onClick={() => toggleStep(step.id)}
            >
              {step.title}
              {openSteps.includes(step.id) ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>

            {/* Substeps (Only visible if step is open) */}
            {openSteps.includes(step.id) && (
              <div className="pl-4 scroll-smooth">
                {step.substeps.map((substep, subIndex) => {
                  const stepIndex = steps
                    .slice(0, index)
                    .reduce((acc, step) => acc + step.substeps.length, 0) + subIndex;

                  return (
                    <div
                      key={substep}
                      className={`p-2 cursor-pointer rounded ${
                        currentStepIndex === stepIndex ? "bg-[#ffc500] text-white" : "hover:bg-gray-200"
                      }`}
                      onClick={() => setCurrentStepIndex(stepIndex)}
                    >
                      {substep}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-semibold px-14 pt-6">{currentStep}</h1>
        <div className="flex-grow overflow-y-auto p-6">
          {/* Step Content */}
          {currentStep === "Basics" && <Basic />}
          {currentStep === "Your theme" && <Themes />}
          {currentStep === "Overview" && <WhatWereLookingFor />}
          {currentStep === "What We'll do" && <WhatweDo />}
          {currentStep === "About you" && <AboutYou />}
          {currentStep === "Location" && <AddLocation/>}
          {currentStep === "What I'll provide" && <ProvideDetails />}
          {currentStep === "What guests should bring" && <BringItems />}
          {currentStep === "Guest requirements" && <ExperienceForm/>}
          {currentStep === "Title" && <ExperienceName />}
          {currentStep === "Photos" && <PhotoUpload />}
          {currentStep === "Group size" && <GroupSizeSelector />}
          {currentStep === "General availability" && <GeneralAvailability />}
          {currentStep === "Pricing" && <GuestPricing />}
          {currentStep === "Discounts" && <Discounts />}
          {currentStep === "Booking settings" && <BookingSettings />}
          {currentStep === "Cancellation policy" && <CancellationPolicyPage />}
          {currentStep === "Your Information" && <VerifyPage />}
          {currentStep === "Review & Submit" && <JustPage />}
        </div>

        {/* Progress Bar & Buttons */}
        <div className="border-t py-2 sticky bottom-0 w-full px-6">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-[#ffc500] transition-all"
              style={{ width: `${((currentStepIndex + 1) / allSubsteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-2 flex justify-between">
            {currentStepIndex > 0 && (
              <button className="px-4 py-1 rounded text-white bg-gray-500" onClick={handleBack}>
                Back
              </button>
            )}

            <button className="px-4 py-1 rounded text-white bg-[#ffc500]" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitExperiencePage;
