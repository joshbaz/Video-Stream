import React from 'react'
import DonateModal from '../2-Components/Modals/DonateModal';
import Buttons from "../2-Components/2Button/Button.tsx";

const Payment = () => {
  const [openAmountModal, setOpenAmountModal] = React.useState(false);

  React.useEffect(() => {
    if (openAmountModal) {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }

  }, [openAmountModal])

  const handleAmountOpen = () => {
    setOpenAmountModal(() => true);
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  }

  const handleAmountClose = () => {
    setOpenAmountModal(() => false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="flex flex-col items-center justify-center relative bg-black bg-opacity-70 h-[100vh] w-[100vw]">
      <a href="vscode://settings/editor.wordWrap">Donate</a>
      
      <Buttons className="font-bold font-sans " onClick={()=>setOpenAmountModal(true)}>Donate</Buttons>
      {openAmountModal && (

        <DonateModal visible={openAmountModal} onClose={handleAmountClose} />

      )}
    
    </div>
  )
}

export default Payment