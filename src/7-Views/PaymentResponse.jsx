import React from 'react'
import Buttons from "../2-Components/2Button/Button.tsx";
import LogoImg from "../1-Assets/logo/logo.svg";
import SuccessImg from "../1-Assets/payment_success.svg"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
const PaymentResponse = () => {
  const [responseData, setResponseData] = React.useState(null)
  let [searchParams] = useSearchParams();

  let getOrderId = searchParams.get("OrderTrackingId");
  let GetTransaction = async (Id) => {
    console.log("id", Id)
    let getStatus = await axios.get(`http://localhost:8000/nyatipay/tansact_statuses?OrderTrackingId=${Id}`, { headers: { "content-type": "application/json" } });
    console.log("getStatus", getStatus.data)
    if (getStatus.data) {
      setResponseData(() => getStatus.data)
    }
  }
  React.useEffect(() => {
    if (getOrderId) {
      GetTransaction(getOrderId)
    }



  }, [getOrderId])
  return (
    <div className="bg-[#D7D5D5] min-h-[100vh] w-full flex flex-col items-center justify-center gap-[20px] relative">
      <div className="w-screen h-[85px] absolute z-[10] top-0 flex items-center justify-between px-2 lg:px-12  xl:px-16 !overflow-hidden">
        <div className="w-[70px] h-[70px] lg:w-[70px] lg:h-[70px] relative flex">
          <img src={LogoImg} alt="" className="object-cover w-full h-full" />
        </div>
      </div>

      <div className="bg-[#FFFFFF] flex flex-col gap-[16px] max-w-[400px] py-8 px-5 sm:px-14">
        <div className="flex w-full flex-col gap-[10px] sm:gap-[16px] items-center">
          <div className="w-[57px] h-[57px] lg:w-[57px] lg:h-[57px] relative flex rounded-full bg-[#21BE79] p-3">
            <img src={SuccessImg} alt="" className="object-cover w-full h-full" />
          </div>

          <div className="font-[Inter-Medium] text-base md:text-base lg:text-[30px] text-center  text-[#141118]">
            <p>Donation Payment Successful</p>

          </div>
        </div>
        {/** amount && buttons */}
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[10px]">
            <div className="py-[30px] px-4 bg-[#F5F4F5] text-[#8B8789]">
              <p className="font-[Inter-SemiBold] text-[15px]  ">
                Transaction Number : {responseData !== null && responseData.transactionId ? responseData.transactionId : ""}
              </p>
              <p className="font-[Inter-SemiBold] text-[15px] ">
                Total Amount : {responseData !== null && responseData.paidAmount ? responseData.paidAmount + " " + responseData.currency : ""}
              </p>
              <p className="font-[Inter-SemiBold] text-[15px] ">
                Payment Method : {responseData !== null && responseData.paymentType ? responseData.paymentType : ""}
              </p>
            </div>

            {/** inputs */}
            <div className="py-[0px] px-0 ">
              <p className="font-[Inter-SemiBold] text-[15px] text-[#141118] text-opacity-70 ">
                Thank you for making a donation!  We will notify you via email when we have received your
                payment.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Buttons className="w-full rounded-full font-[Roboto-Medium] text-xs sm:text-base bg-transparent hover:bg-transparent border border-primary-500 text-primary-500 text-opacity-30 border-opacity-30 hover:border-opacity-100 hover:text-primary-500">
              Close & Return
            </Buttons>
          </div>
        </div>
      </div>





    </div>
  )
}

export default PaymentResponse