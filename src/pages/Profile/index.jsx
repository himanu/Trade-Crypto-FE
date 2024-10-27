import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerifiedIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import Loader from "@/components/ui/loader";
import { loaderContext } from "@/context";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useJWTToken } from "@/hooks/jwtToken";
import { GET_USER_SUCCESS } from "@/store/Auth/actionTypes";
import { logout } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
  

const Profile = () => {
    const auth = useSelector((store) => store.auth);
    const {username, email} = auth?.user ?? {};
    const {setLoading} = useContext(loaderContext);
    const jwtToken = useJWTToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const acitvate2StepVeri = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`${baseUrl}/enable_2fa`, null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            dispatch({type: GET_USER_SUCCESS, payload: response?.data});
        } catch (err) {
            if (err.status === 401) {
                logout(navigate, dispatch);
            }
        } finally {
            setLoading(false);
        }
    };
    const is2FactorAuthEnabled = auth?.user?.twoFactorAuth?.enabled;

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
                                    <p className="text-gray-500"> {email} </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> FullName : </p>
                                    <p className="text-gray-500">{username} </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> DOB : </p>
                                    <p className="text-gray-500"> {"Not Available"} </p>
                                </div>
                                <div className="flex">
                                    <p className="w-[9rem]"> Nationality : </p>
                                    <p className="text-gray-500"> {"Not Available"} </p>
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
                                {!is2FactorAuthEnabled ? (
                                    <Badge className="bg-orange-500 text-white"> Not Enabled  </Badge>
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
                            {!is2FactorAuthEnabled ? ( <div>
                                <Button onClick={acitvate2StepVeri}> 
                                    Enable Two Step Verification
                                </Button>
                            </div>
                            ): <div> Your Two Step Verification is Enabled</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Profile;