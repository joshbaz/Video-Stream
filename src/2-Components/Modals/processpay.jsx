import React from "react";
import Processing from "../components/ProcessPay";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_API_ } from "../utils/base-url.config";

class ProcessPay extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            timeset: 0,
            timedOut: false,
            paymentError: "",
        };
    }
    componentDidMount() {
        this.checkOrder();
    }
    submitSuccess = () => {
        this.props.history.push("/success");
    };

    checkOrder = () => {
        this.timer = setTimeout(() => {
            this.checkResult();
        }, 10000);
    };

    checkResult = async () => {
        let id = Cookies.get("oc");

        if (id) {

            if (this.state.timeset <= 5) {
                let numberOfTimes = this.state.timeset + 1;

                axios
                    .get(`${BASE_API_}/user/v1/check/${id}`)
                    .then((success) => {

                        const getToken = Cookies.get("_tk");
                        if (success.data.paymentStatus === "Paid") {
                            clearTimeout(this.timer);
                            if (getToken) {
                                Cookies.remove("shipping");
                                Cookies.remove("contacts");
                                Cookies.remove("oc");
                                Cookies.remove("operation");
                            } else {
                                Cookies.remove("shipping");
                                Cookies.remove("contacts");
                                Cookies.remove("oc");
                                Cookies.remove("operation");
                                Cookies.remove("user");
                            }
                            this.submitSuccess();
                        } else if (success.data.paymentStatus === "notPaid") {
                            clearTimeout(this.timer);
                            Cookies.set("ep", success.data.paymentError, { expires: 1 });
                            if (getToken) {
                                Cookies.remove("shipping");
                                Cookies.remove("contacts");
                                Cookies.remove("operation");
                            } else {
                                Cookies.remove("shipping");
                                Cookies.remove("contacts");
                                Cookies.remove("operation");
                                Cookies.remove("user");
                            }
                            this.props.history.push("/processerror");
                        } else {
                            this.checkOrder();
                        }
                    })
                    .catch((error) => {
                        clearTimeout(this.timer);
                        let errorArray = [];
                        errorArray.push(error);
                        let messageError;

                        if (errorArray.length !== 0 && errorArray[0].response) {
                            messageError = errorArray[0].response.data;
                        } else if (errorArray.length !== 0 && !errorArray[0].response) {
                            messageError = errorArray[0].message;
                        }
                        Cookies.set("ep", messageError, { expires: 1 });
                        this.props.history.push("/processerror");
                    });
                this.setState({ timeset: numberOfTimes });
            } else {

                clearTimeout(this.timer);
                this.setState({ timedOut: true });
            }
        } else {
            clearTimeout(this.timer);

            this.props.history.push("/checkpay");
        }
    };

    resetTimer = () => {
        this.setState({ timeset: 0, timedOut: false });
        this.checkOrder();
    };



    render() {
        return (
            <>
                <Processing
                    timingOut={this.state.timedOut}
                    reset={this.resetTimer}

                />
            </>
        );
    }
}

export default ProcessPay;