
import React, { useContext } from "react";
import Buttons from "../2Button/Button.tsx";
import LogoImg from "../../1-Assets/logos/Logo.svg";
import { DonateStepperContext } from '../../5-State/contexts/DonateCheckout';

const DonateVisaConfirm = () => {
    const { redirectPath } = useContext(DonateStepperContext);

    React.useEffect(() => {
        if (redirectPath.redirectpath === "") {
            
        }
    },[])
  return (
      <div className="bg-white min-h-[100vh] w-full  flex flex-col py-8 sm:py-16 max-w-[90%] px-5   sm:px-16 gap-[20px] !overflow-y-auto">
          {/** Image && text */}
        
          {/** amount && buttons */}
          <div className="flex-grow h-full flex flex-col gap-[50px]">
             
                  <iframe className="w-full h-full flex-grow" src={redirectPath.redirectpath}></iframe>
              

             
          </div>
      </div>
  )
}

export default DonateVisaConfirm