import React, { useContext } from "react";
import LogoImg from "../../1-Assets/logos/Logo.svg";
import Buttons from "../2Button/Button.tsx";
import CustomLoader from "./CustomLoader";
import * as yup from "yup";
import { DonateStepperContext } from "../../5-State/contexts/DonateCheckout";
import { Form, Formik } from "formik";


const priceArray = [
  {
    key: "0",
    amount: 5000,
  },
  {
    key: "1",
    amount: 10000,
  },
  {
    key: "2",
    amount: 20000,
  },
  {
    key: "3",
    amount: 40000,
  },
  {
    key: "4",
    amount: 100000,
  },
  {
    key: "5",
    amount: 200000,
  },
  {
    key: "6",
    amount: 300000,
  },
];

const DonatePrices = ({ innerref, handleStepNext, stepperData, currentStep, isGSubmitting, setIsSubmitting, handleFormSubmit, close }) => {

  const { paymentData, setPaymentData } = useContext(DonateStepperContext);
  const validationSchema = yup.object().shape({
    amount: yup.number().required("amount is required"),
    paymentType: yup.string().required("select payment method to continue")
  });

  //const [selectedAmount, setSelectedAmount] = React.useState(10000);
  const [customAmount, setCustomAmount] = React.useState(false);
  //const [isPSubmitting, setIsPSubmitting] = React.useState(false)

  const handleCustomChange = (setFieldValue) => {
    setCustomAmount(() => true);
    setFieldValue("amount", null);
  };
  const handleCustomAmount = (amount) => {
    // setSelectedAmount(() => amount);
  };
  const handleChangeAmount = (amount, setFieldValue) => {
    setCustomAmount(() => false);
    // setSelectedAmount(() => amount);
    setFieldValue("amount", amount)
  };


  const handleSubmitted = (value, setFieldValue, errors) => {
    console.log(errors, 'errors')
    setFieldValue("paymentType", value)
   setTimeout(() => {
     handleFormSubmit()
   }, 500);
   
   
    //setIsPSubmitting(true);
  }

  React.useEffect(() => {
    setIsSubmitting(() => false)
   
  }, [])


  return (
    <Formik innerRef={innerref} initialValues={paymentData} validationSchema={validationSchema} onSubmit={(values, helpers) => {
      setPaymentData({ ...paymentData, ...values });
      setIsSubmitting(() => true)
      setTimeout(() => {
        handleStepNext()
      }, 1000);
      
    }}>
      {({ values, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <div className="bg-white min-h-[60vh] w-full flex flex-col py-8 sm:py-16 max-w-[90%] px-5 sm:max-w-[540px] sm:px-16 gap-[20px] relative mx-auto">
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

            {/** Amounts to select */}
            <div className="flex flex-col gap-[10px] sm:items-start">
              <p className="font-[Inter-SemiBold] text-secondary-800 text-center sm:text-left text-sm lg:text-sm">
                Select Amount To Donate:
              </p>
              <div className="flex flex-row flex-wrap gap-[5px] sm:gap-[10px]  items-center justify-evenly sm:justify-around">
                {priceArray.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`border-[#E5E7EB] border-[1px] rounded-[20px] flex items-center justify-center font-[Inter-Bold] text-xs  sm:text-[13.13px] lg:text-sm py-[7.5px] px-[13px] w-max cursor-pointer select-none  ${data.amount === values.amount
                        ? "text-[#F2F2F2] bg-primary-500"
                        : "text-[#3C3A3B] bg-[#FBFBFB] hover:bg-primary-500 hover:text-[#F2F2F2]"
                        }`}
                      onClick={() => handleChangeAmount(data.amount, setFieldValue)}
                    >
                      <p>
                        {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </div>
                  );
                })}

                <div
                  className={`border-[#E5E7EB] border-[1px] rounded-[20px] flex items-center justify-center font-[Inter-Bold] text-xs sm:text-[13.13px] py-[7.5px] px-[13px] w-max cursor-pointer select-none  ${customAmount
                    ? "text-[#F2F2F2] bg-primary-500"
                    : "text-[#3C3A3B] bg-[#FBFBFB] hover:bg-primary-500 hover:text-[#F2F2F2]"
                    }`}
                  onClick={() => handleCustomChange(setFieldValue)}
                >
                  <p>others</p>
                </div>
              </div>
            </div>

            {/** amount && buttons */}
            <div className="flex flex-col gap-[10px]">
              {customAmount && (
                <div className="w-full gap-2">
                  <label className="text-[#3C3A3B] font-[Roboto-Medium] text-sm">
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    className="border border-secondary-700 border-opacity-30 h-[30px]  sm:h-[40px] w-full rounded-lg focus:outline-none px-3 font-[Roboto-Regular] text-sm "
                  />
                </div>
              )}
              {errors && errors.amount ? <p className="font-[Inter-SemiBold] text-red-400 text-xs">{errors.amount}</p> : null}

              {errors && errors.paymentType ? <p className="font-[Inter-SemiBold] text-red-400 text-xs">{errors.paymentType}</p> : null}

              <div className="flex flex-col gap-[10px]">
                <Buttons
                  className=" w-full  rounded-full font-[Roboto-Medium] text-sm sm:text-base"
                  type="button"
                  onClick={() => handleSubmitted("MTN", setFieldValue, errors)}
                >
                  Continue with MTN Momo
                </Buttons>
                <Buttons
                  className=" w-full  rounded-full font-[Roboto-Medium] text-sm sm:text-base"
                  type="button"
                  onClick={() => handleSubmitted("Airtel", setFieldValue, errors)}
                >
                  Continue with Airtel Money
                </Buttons>
                <Buttons
                  className=" w-full  rounded-full font-[Roboto-Medium] text-sm sm:text-base"
                  type="button"
                  onClick={() => handleSubmitted("Visa", setFieldValue, errors)}
                >
                  Continue with Visa/Mastercard
                </Buttons>

                <Buttons onClick={close} type="button" className="w-full rounded-full font-[Roboto-Medium] text-xs sm:text-base bg-transparent hover:bg-transparent border border-primary-500 text-primary-500 text-opacity-30 border-opacity-30 hover:border-opacity-100 hover:text-primary-500">
                  Cancel
                </Buttons>
              </div>
            </div>

            {/** loader */}
            {isGSubmitting && Object.keys(errors).length === 0 ? <CustomLoader /> : null}
          </div>
        </Form>
      )}
    </Formik>

  );
};

export default DonatePrices;
