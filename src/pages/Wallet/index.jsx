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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserWallet, getWalletTxns, markDepositTxnSuccessful } from "@/store/Wallet/action";
import { useJWTToken } from "@/hooks/jwtToken";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { baseUrl } from "@/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { loadScript, logout } from "@/lib/utils";

const walletTxns = {
    add_funds: "Add Funds",
    withdraw_funds: "Withdraw Funds",
    transfer_funds: "Transfer Funds",
    bought_asset: "Bought Coins",
    sold_asset: "Sold Coins"
}
const Wallet = () => {
    const dispatch = useDispatch();
    const jwtToken = useJWTToken();
    const {wallet, txns} =  useSelector(store => store.wallet);
    const token = useJWTToken();
    const navigate = useNavigate();
    const user = useSelector(store => store?.auth?.user);
    const [loading, setLoading] = useState(false);

    const fetchWallet = () => dispatch(getUserWallet(jwtToken, navigate));
    const fetchWalletTxn = () => dispatch(getWalletTxns(jwtToken, navigate));

    useEffect(() => {
        fetchWallet();
        fetchWalletTxn();
    }, [])

    const handleSubmit = async (amount) => {
        try {
        setLoading(true);
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
        setLoading(false);
        const razorpayKey = import.meta.env.VITE_RZ_KEY;
        const options = {
            "key": razorpayKey, // Enter the Key ID generated from the Dashboard
            "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "USD",
            "name": "Trade Crypto", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": result?.data?.id,
            "handler": function (response){
                dispatch(markDepositTxnSuccessful({
                    orderId: result?.data?.id,
                    razorpayOrderId: response?.razorpay_order_id,
                    razorpayPaymentId: response?.razorpay_payment_id,
                    razorpaySignature: response?.razorpay_signature
                }, token, navigate));
            },
            "prefill": { 
                "name": user?.username,
                "email": user?.email
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
        } catch (err) {
            setLoading(false);
            if (err?.status === 401)
                logout(navigate, dispatch);
            toast.error("Something went wrong!")
        }
    }

    const dialogs = [
        { label: "Add Money", labelIcon: <UploadIcon />, dialogTitle: "Top Up Your Wallet", dialogContent: <TopUpForm handleSubmit={handleSubmit} /> },
        { label: "Withdraw", labelIcon: <DownloadIcon />, dialogTitle: "Request Withdrawal", dialogContent: <WithdrawalForm balance={wallet?.balance} /> },
        // {label: "Transfer Money", labelIcon: <ShuffleIcon />, dialogTitle: "Transfer to other wallet", dialogContent: <TransferForm />}
    ]

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
                                <ReloadIcon onClick={fetchWallet} className="w-6 h-6 cursor-pointer hover:text-gray-400" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <DollarSign />
                            <span className="text-2xl font-semibold"> {wallet?.balance}</span>
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
                        <UpdateIcon onClick={fetchWalletTxn} className="w-7 h-7 p-0 cursor-pointer hover:text-gray-400" />
                    </div>
                    <div className="space-y-5">
                        {txns.map((item, idx) => (
                            <div key={idx}>
                                <Card className="px-5 flex justify-between items-center p-2">
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            <AvatarFallback>
                                                <ShuffleIcon />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h1> {walletTxns[item.walletTxnType]} </h1>
                                            <p className="text-sm text-gray-500"> {item?.localDateTime}  </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className={item?.amount >= 0 ? `text-green-500` : 'text-red-600'}>
                                            {item?.amount} USD
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
};

export default Wallet;