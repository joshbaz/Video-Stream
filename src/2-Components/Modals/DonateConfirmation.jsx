import React from "react";
import Buttons from "../2Button/Button.tsx";
import LogoImg from "../../1-Assets/logos/Logo.svg";

const DonateConfirmation = ({close}) => {
  return (
    <div className="bg-white min-h-[60vh] w-full  flex flex-col py-8 sm:py-16 max-w-[90%] px-5 sm:max-w-[540px] sm:px-16 gap-[20px] !overflow-y-auto">
      {/** Image && text */}
      <div className="flex w-full flex-col gap-[10px] sm:gap-[16px] items-center">
        <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] relative flex">
          <img src={LogoImg} alt="" className="object-cover w-full h-full" />
        </div>

        <div className="font-[Inter-Medium] text-base md:text-base lg:text-base text-center text-[#8A888C]">
          <p>From Script to Screen</p>
          <p>Join Our Journey</p>
        </div>
      </div>

      {/** amount && buttons */}
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-[Inter-SemiBold] text-[18px]">
            Donate Confirmation
          </h1>
          {/** inputs */}
          <div className="py-[30px] px-4 bg-[#DDEFD7]">
            <p className="font-[Inter-SemiBold] text-[15px] text-[#1F5F00] ">
              Thank you for making a donation!  We will notify you via email when we have received your
              payment.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Buttons onClick={close} className="w-full rounded-full font-[Roboto-Medium] text-xs sm:text-base bg-transparent hover:bg-transparent border border-primary-500 text-primary-500 text-opacity-30 border-opacity-30 hover:border-opacity-100 hover:text-primary-500">
            Close & Return
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default DonateConfirmation;
