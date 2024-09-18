import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const TopUpForm = () => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
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