import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { CopyIcon, DownloadIcon, ReloadIcon, ShuffleIcon, UpdateIcon, UploadIcon } from "@radix-ui/react-icons";
import { DollarSign, WalletIcon } from "lucide-react";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserWallet, getWalletTxns } from "@/store/Wallet/action";
import { useJWTToken } from "@/hooks/jwtToken";
import { useNavigate } from "react-router-dom";

const dialogs = [
    { label: "Add Money", labelIcon: <UploadIcon />, dialogTitle: "Top Up Your Wallet", dialogContent: <TopUpForm /> },
    { label: "Withdraw", labelIcon: <DownloadIcon />, dialogTitle: "Request Withdrawal", dialogContent: <WithdrawalForm /> },
    // {label: "Transfer Money", labelIcon: <ShuffleIcon />, dialogTitle: "Transfer to other wallet", dialogContent: <TransferForm />}
]
const Wallet = () => {
    const dispatch = useDispatch();
    const jwtToken = useJWTToken();
    const {wallet, txns} =  useSelector(store => store.wallet);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserWallet(jwtToken, navigate));
        dispatch(getWalletTxns(jwtToken, navigate));
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div className="pt-10 w-full lg:w-[60%]">
                <Card>
                    <CardHeader className="pb-9">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-5">
                                <WalletIcon size={30} />
                                <div>
                                    <CardTitle className="text-2xl">My Wallet</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-200 text-sm">
                                            #A475Ed
                                        </p>
                                        <CopyIcon size={12} className="cursor-pointer hover:text-slate-300" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReloadIcon className="w-6 h-6 cursor-pointer hover:text-gray-400" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <DollarSign />
                            <span className="text-2xl font-semibold"> 20000</span>
                        </div>
                        <div className="flex gap-7 mt-5">
                            {dialogs.map((item) => {
                                return (
                                    <Dialog key={item.label}>
                                        <DialogTrigger>
                                            <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
                                                flex flex-col items-center justify-center rounded-md shadow-slate-600 shadow-md
                                            ">
                                                {item.labelIcon}
                                                <span className="text-sm mt-2"> {item.label} </span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {item.dialogTitle}
                                                </DialogTitle>
                                            </DialogHeader>
                                            {item.dialogContent}
                                        </DialogContent>
                                        <DialogTitle></DialogTitle>
                                    </Dialog>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
                <div className="py-5 pt-10">
                    <div className="flex gap-2 items-center pb-5">
                        <h1 className="text-2xl font-semibold"> History </h1>
                        <UpdateIcon className="w-7 h-7 p-0 cursor-pointer hover:text-gray-400" />
                    </div>
                    <div className="space-y-5">
                        {[1, 1, 1, 1].map((item, idx) => (
                            <div key={idx}>
                                <Card className="px-5 flex justify-between items-center p-2">
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            <AvatarFallback>
                                                <ShuffleIcon />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h1> Buy Asset</h1>
                                            <p className="text-sm text-gray-500"> 2024-02-10  </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-green-500">
                                            999 USD
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Wallet;