import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { baseUrl } from "@/constants";
import { useJWTToken } from "@/hooks/jwtToken";
import { loadScript } from "@/lib/utils";
import { DotFilledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TopUpForm = () => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const token = useJWTToken();
    const user = useSelector(store => store?.auth?.user);
    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            toast.error("Something went wrong, please try again after refresh");
            console.log("Razorpay SDK failed to load");
            return;
        }
        const result = await axios.put(`${baseUrl}/wallet/deposit/init?amount=${amount}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); 
        const razorpayKey = import.meta.env.VITE_RZ_KEY;
        const options = {
            "key": razorpayKey, // Enter the Key ID generated from the Dashboard
            "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Trade Crypto", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": result?.data?.id,
            "handler": function (response){
                console.log("response ", response);
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": user?.username, //your customer's name
                "email": user?.email
                //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="pt-10 space-y-5">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    onChange={(e) => setAmount(e.target.value)}
                    className="py-7 text-lg"
                    value={amount}
                    placeholder="$9999"
                />
            </div>
            <div>
                <h1 className="pb-1"> Select payment method </h1>
                <RadioGroup 
                    className="flex" 
                    defaultValue="RAZORPAY" 
                    onValueChange={(value) => handlePaymentMethodChange(value)}
                >
                    <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
                        <RadioGroupItem 
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="RAZORPAY"
                            id="r1"
                        />
                        <Label htmlFor="r1">
                            Razorpay
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
                        <RadioGroupItem 
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="STRIPE"
                            id="r2"
                        />
                        <Label htmlFor="r2">
                            Stripe
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <Button onClick={handleSubmit} className="w-full py-7">
                Submit
            </Button>
        </div>
    )
};

export default TopUpForm;