import React from 'react'
import Buttons from "../2-Components/2Button/Button.tsx";
import LogoImg from "../1-Assets/logo/logo.svg";
import SuccessImg from "../1-Assets/payment_success.svg"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import CustomLoader from '../2-Components/Modals/CustomLoader.jsx';
import { useLocation } from 'react-router-dom';
import { BASE_API_ } from '../4-Utils/base_url.js';
import PaymentFailed from '../2-Components/MobilePayModes/PaymentFailed.jsx';
import PaymentSuccess from '../2-Components/MobilePayModes/PaymentSuccess.jsx';
import PaymentTimedOut from '../2-Components/MobilePayModes/PaymentTimedOut.jsx';
import PaymentError from '../2-Components/MobilePayModes/PaymentError.jsx';
import PaymentProcessing from '../2-Components/MobilePayModes/PaymentProcessing.jsx';

const getSubmissionLink = (payMethod) => {
    switch (payMethod) {
        case "Airtel":
            return `${BASE_API_}/nyatiairtel`
        case "Mtn":
            return `${BASE_API_}/payment`
    }
}

const MobilePayValidation = () => {
    //  const [timer, setTimer] = React.useState(null);
    let timer;
    const [responseVals, setResponseVals] = React.useState({
        timeset: 0,
        timedOut: false,
        paymentError: "",
        paymentFailed: ''
    });
    const [responseData, setResponseData] = React.useState(null);
    const [currentStatus, setCurrentStatus] = React.useState(null);
    // const [validationComplete, setValidationComplete] = React.useState(false)
    let [searchParams] = useSearchParams();
    let location = useLocation();

    let getTransactId = searchParams.get("tId");
    let getPayMethod = location.state;

    React.useEffect(() => {
        initiateCheckTransact()
    },[])

    const initiateCheckTransact = () => {
        timer = setTimeout(() => {
            checkTransaction(getTransactId);
        }, 10000)
    }


    const checkTransaction = async (Id) => {
        if (!getPayMethod?.mt && !getTransactId) {
            setResponseVals({
                paymentError: "Sorry there is an Error with Validation. Parameter Error.",
            })
           // console.log("timer", timer)
            clearTimeout(timer);
            setCurrentStatus(() => "payError")
        } else if (getPayMethod.mt && getTransactId) {

            if (responseVals.timeset <= 5) {
                let numberOfTimes = responseVals.timeset + 1;
                setResponseVals(() => ({ ...responseVals, timeset: numberOfTimes }));

                let requestLink = getSubmissionLink(getPayMethod.mt)
                let getStatus = await axios.get(`${requestLink}/transact_statuses?OrderTrackingId=${Id}`, { headers: { "content-type": "application/json" } });

                if (getStatus.data.payStatus === "Transaction Successful" || getStatus.data.payStatus === "Completed" || getStatus.data.payStatus.includes("success")) {
                    clearTimeout(timer);
                    paySuccessful();
                } else if (getStatus.data.payStatus === "Transaction has Failed" || getStatus.data.payStatus.includes("failed")) {
                    clearTimeout(timer);
                    console.error("payment failed", getStatus.data.status_reason)
                    setResponseVals(() => ({
                        ...setResponseVals, timeset: 0,
                        timedOut: false, paymentError: "",
                        paymentFailed: getStatus.data.status_reason,
                    }))
                    setCurrentStatus(() => "failed")
                } else {
                    setCurrentStatus(() => "pending")
                    initiateCheckTransact();
                }
            } else {
               // console.log("timer", timer)
                clearTimeout(timer);
                setResponseVals({
                    timedOut: true,
                })
            }

        }


    }

    const resetTimer = () => {
        setResponseVals({ timeset: 0, timedOut: false, paymentError: "" });
        initiateCheckTransact();
    }

    const paySuccessful = async (Id) => {
        let requestLink = getSubmissionLink(getPayMethod.mt)
        let getStatus = await axios.get(`${requestLink}/checkStatus?OrderTrackingId=${Id}`, { headers: { "content-type": "application/json" } });
        console.log("getStatus", getStatus.data)
        if (getStatus.data) {
            setResponseData(() => getStatus.data)
            setCurrentStatus(()=> "success")
        }
    }

    {/** display property */}
    const displayContainer = (status) => {
        switch (status) {
            /** Processing Payment */
            case null:
                return (
                    < PaymentProcessing />
                );
            case "pending":
                return (
                    < PaymentProcessing />
                );
            /** payment failed */
            case "failed":
                return (<PaymentFailed responseVals={responseVals} tranactId={getTransactId} />);
            /** payment success */
            case "success":
                return (
                    <PaymentSuccess responseData={responseData} tranactId={getTransactId} />
                )
            /** payment timedout */
            case "timeout":
                return (
                    <PaymentTimedOut responseVals={responseVals} resettimer={resetTimer} />
                )
            /** payment Error */
            case "payError":
                return (
                    <PaymentError responseVals={responseVals} />
                )
            default:
                return null;
        }
    }


    return (
        <div className="bg-[#D7D5D5] min-h-[100vh] w-full flex flex-col items-center justify-center gap-[20px] relative">
            <div className="w-screen h-[85px] absolute z-[10] top-0 flex items-center justify-between px-2 lg:px-12  xl:px-16 !overflow-hidden">
                <div className="w-[70px] h-[70px] lg:w-[70px] lg:h-[70px] relative flex">
                    <img src={LogoImg} alt="" className="object-cover w-full h-full" />
                </div>
            </div>

            {displayContainer(currentStatus)}

        </div>
    )
}

export default MobilePayValidation