import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TopUpForm = ({ handleSubmit }) => {
    const [amount, setAmount] = useState("");
    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    }

    return (
        <div className="pt-5 space-y-5">
            <div>
                <h1 className="pb-1 mb-2">
                    Enter Amount
                    {/* <sup> */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img className="inline ml-1 mb-2 w-[15px]" src="https://img.icons8.com/?size=100&id=77&format=png&color=ffffff" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Actual money won't be deducted and we don't store card info. Request directly go to Razorpay</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    {/* </sup> */}
                </h1>

                <Input
                    onChange={(e) => {
                        const value = e?.target?.value;
                        console.log("value ", value, "  ", !value);
                        if (!value) {
                            setAmount("");
                            return;
                        }
                        if (isNaN(value) || value >= 5000)
                            return;
                        setAmount(Number(value));
                    }}
                    
                    className="py-5 text-lg"
                    value={amount}
                    placeholder="Enter Amount less than 5000$"
                />
            </div>
            <div>
                <h1 className="my-1 pb-1"> Select payment method </h1>
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
                </RadioGroup>
            </div>
            <DialogClose className="w-full">
                <Button disabled={!(!Number.isNaN(amount) && amount >= 1)} onClick={() => handleSubmit(amount)} className="w-full py-7">
                    Submit
                </Button>
            </DialogClose>
        </div>
    )
};

export default TopUpForm;