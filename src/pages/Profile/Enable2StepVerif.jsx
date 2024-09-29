import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
  


const Enable2StepVerif = ({ handleSubmit, email }) => {
    const [otp, setOTP] = useState("");
    const handleSubmit1 = () => {
        console.log("Submitted");
    }
    return (
        <div className='flex justify-center'>
            <div className='space-y-5 mt-10 w-full'>
                <div className='flex justify-between items-center'>
                    <p>Email :</p>
                    <p>{email ?? ""}</p>
                    <Dialog>
                        <DialogTrigger>
                            Sent OTP
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className='py-5 flex gap-10 justify-center items-center'>
                                <InputOTP 
                                    value={otp}
                                    onChange={(value) => setOTP(value)}
                                    maxLength={6}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button 
                                        onClick={() => {handleSubmit1()}}
                                        className="w-[10rem]"
                                    >Submit</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default Enable2StepVerif
