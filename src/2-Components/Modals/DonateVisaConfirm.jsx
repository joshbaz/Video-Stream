
import React, { useContext } from "react";
import Buttons from "../2Button/Button.tsx";
import LogoImg from "../../1-Assets/logos/Logo.svg";
import { DonateStepperContext } from '../../5-State/contexts/DonateCheckout';
import CustomLoader from "./CustomLoader.jsx";
import { useNavigate } from "react-router-dom";

const DonateVisaConfirm = () => {
    const { redirectPath, payMode, orderTrackingId } = useContext(DonateStepperContext);
    const [modalLoading, setModalLoading] = React.useState(true)
    const [timer, setTimer] = React.useState(null);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (payMode !== null || payMode !== undefined) {
            // setModalLoading(()=>false)
            if (payMode === "A-Mobile") {
                //Airtel
                navigate(`/mpay-validate?tId=${orderTrackingId}`, {state: {mt: "Airtel"}})

            } else if (payMode === "M-Mobile") {
                //MTN
                navigate(`/mpay-validate?tId=${orderTrackingId}`, { state: { mt: "Mtn" } })
            } else if (payMode === "Visa") {
                setModalLoading(()=> false)
            }
        }
    }, [payMode]);

  

   

    return (
        <div className="bg-white min-h-[100vh] w-full  flex flex-col py-8 sm:py-16 max-w-[90%] px-5   sm:px-16 gap-[20px] !overflow-y-auto">
            {/** Image && text */}
            {/** loader */}
            {modalLoading ? <CustomLoader /> : null}
            {/** MTN && Airtel */}
            {
                !modalLoading && payMode === "A-Mobile" || !modalLoading && payMode === "M-Mobile" ? (<CustomLoader />) : null
            }

            {/** Visa A-frame */}
            {
                !modalLoading && payMode === "Visa" && (
                    <div className="flex-grow h-full flex flex-col gap-[50px]">

                        <iframe className="w-full h-full flex-grow" src={redirectPath.redirectpath}></iframe>



                    </div>
                )
            }

        </div>
    )
}

export default DonateVisaConfirm