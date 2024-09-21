import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerifiedIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Enable2StepVerif from "./Enable2StepVerif";
  

const Profile = () => {
    const acitvate2StepVeri = () => {};
    return (
        <div className="flex flex-col items-center mb-5">
            <div className="pt-10 w-full lg:w-[60%]">
                <Card>
                    <CardHeader className="pb-9">
                        <CardTitle>
                            Your Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="lg:flex gap-32">
                            <div className="space-y-7">
                                <div className="flex">
                                    <p className="w-[9rem]"> Email : </p>
                                    <p className="text-gray-500"> example@mail.com </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> FullName : </p>
                                    <p className="text-gray-500">Example Yadav </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> DOB : </p>
                                    <p className="text-gray-500"> 18 March 1344 </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> Nationality : </p>
                                    <p className="text-gray-500"> XYZ </p>
                                </div>
                            </div>
                            <div className="space-y-7 lg:mt-0 mt-7">
                                <div className="flex">
                                    <p className="w-[9rem]"> Email : </p>
                                    <p className="text-gray-500"> example@mail.com </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> FullName : </p>
                                    <p className="text-gray-500">Example Yadav </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> DOB : </p>
                                    <p className="text-gray-500"> 18 March 1344 </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> Nationality : </p>
                                    <p className="text-gray-500"> XYZ </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6">
                    <Card className="w-full ">
                        <CardHeader className="pb-7">
                            <div className="flex items-center gap-3">
                                <CardTitle> 2 Step Verification</CardTitle>
                                {false ? (
                                    <Badge className="bg-orange-500 text-white"> Disabled  </Badge>
                                ) : (
                                    <Badge className="bg-green-500 space-x-2 text-white">
                                        <VerifiedIcon />
                                        <span>
                                            Enabled
                                        </span>
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button> Enable Two Step Verification</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Verify your account</DialogTitle>
                                        </DialogHeader>
                                        <Enable2StepVerif handleSubmit={acitvate2StepVeri} />
                                    </DialogContent>
                                </Dialog>


                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Profile;