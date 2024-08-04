import React from "react";

import DonateContent from "./DonateContent.jsx";
import CustomLoader from "./CustomLoader.jsx";
import DonateConfirmation from "./DonateConfirmation.jsx";
import DonatePrices from "./DonatePrices.jsx";
import { DonateStepperContext } from "../../5-State/contexts/DonateCheckout.js";
import DonateVisaConfirm from "./DonateVisaConfirm.jsx";
const stepperArray = [
  {
    title: "Payment",
  },
  {
    title: "Contact",
  },
  {
    title: "DonateConfirm"
  }
];
const DonateModal = ({ visible, onClose, selectedAmount }) => {
  const [currentStep, setCurrentStep] = React.useState(null);
  const [stepsAllComplete, setStepsAllComplete] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [popupType, setPopupType] = React.useState("");
  const [paymentData, setPaymentData] = React.useState({
    amount: null,
    paymentType: ""
  })
  const [redirectPath, setRedirectPath] = React.useState({
    redirectpath: ""
  })

  const [contactData, setContactData] = React.useState({
    email: "",
    phonenumber: "",
    firstname: "",
    lastname: "",
    module: "website",
    note: ""
  })

  const formRef = React.useRef();

  React.useEffect(() => {

    if (selectedAmount) {
      setPaymentData({...paymentData, amount:selectedAmount})
    } else {
      
    }
    
    setTimeout(() => {
      setCurrentStep(() => stepperArray?.[0].title);
    }, 1000);


    return () => {

    }
  }, [])

  /** close modal */
  const handleOnClose = (e) => {
    if (e.target.id === "modalwrap") onClose();
  }

  /** handle form submission */
  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  /** handle next form */
  const handleStepNext = () => {
    let getCurrentIndex = currentStep !== null ? stepperArray.findIndex((data) => data?.title === currentStep) : null;

    if (getCurrentIndex !== null && getCurrentIndex + 1 < stepperArray?.length) {
      let nextCurrentIndex = getCurrentIndex + 1;

      if (nextCurrentIndex < stepperArray?.length) {
        setCurrentStep(() => stepperArray?.[nextCurrentIndex].title);
      }
    } else if (getCurrentIndex + 1 === stepperArray?.length) {
      setStepsAllComplete(() => true);
    }
  }



  /** display forms */
  const FormDisplay = (step) => {
    switch (step) {
      case "Payment":
        return (
          <DonatePrices innerref={formRef} handleStepNext={handleStepNext} handleFormSubmit={handleFormSubmit}  stepperData={stepperArray}
            currentStep={currentStep} isGSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} close={onClose} selectedAmount={selectedAmount}  />
        );
      case "Contact":
        return (<DonateContent innerref={formRef} handleStepNext={handleStepNext} handleFormSubmit={handleFormSubmit} stepperData={stepperArray}
          currentStep={currentStep} isGSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} close={onClose} />);

      case "Confirmation":
        return (<DonateConfirmation innerref={formRef} handleStepNext={handleStepNext} stepperData={stepperArray}
          currentStep={currentStep} close={onClose} />);
      case "DonateConfirm":
        return <DonateVisaConfirm innerref={formRef} handleStepNext={handleStepNext} stepperData={stepperArray}
          currentStep={currentStep} close={onClose} />

      default:
        return null;
    }
  }


  if (!visible) return null;
  return (
    <div
      id="modalwrap"
      onClick={handleOnClose}
      className="w-full h-full fixed inset-0 bg-[#7F7075] bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center "
    >

      <DonateStepperContext.Provider value={{ paymentData, setPaymentData, contactData, setContactData, redirectPath, setRedirectPath }}>
        {FormDisplay(stepsAllComplete ? "Complete" : currentStep)}
      </DonateStepperContext.Provider>

      {
        /***
         * 
         * 
         *  {popupType === "Amount" && <DonatePrices />}

      {popupType === "content" && <DonateContent />}

      {popupType === "confirmation" && <DonateConfirmation />}
         * 
         * 
         * 
         */
      }
     

      {currentStep === null && (<div className="bg-white min-h-[60vh] w-full flex flex-col py-8 sm:py-16 max-w-[90%] px-5 sm:max-w-[540px] sm:px-16 gap-[20px] relative">
        <CustomLoader />
      </div>)
      }
    </div>
  );
};

export default DonateModal;
