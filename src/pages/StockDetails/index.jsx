import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon, BookmarkIcon, DotIcon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import TrendingForm from "./TrendingForm";
import StockChart from "../Home/StockChart";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoinDetails } from "@/store/Coin/action";
import { useJWTToken } from "@/hooks/jwtToken";
import { getUserWallet } from "@/store/Wallet/action";
  
const StockDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coinDetail = useSelector(store => store.coin.coinDetail);

    const {wallet} =  useSelector(store => store.wallet);
    const jwt =  useJWTToken();
    useEffect(() => {
        dispatch(getCoinDetails(id, jwt, navigate));
    }, [id]);

    const fetchWallet = () => dispatch(getUserWallet(jwt, navigate));

    useEffect(() => {
        Object.keys(wallet).length === 0 && fetchWallet();
    }, [])
    return (
        <div className="p-5 mt-5">
            <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                    <div>
                        <Avatar>
                            <AvatarImage src={coinDetail?.image?.small}></AvatarImage>
                        </Avatar>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p> {(coinDetail?.symbol ?? "").toUpperCase()} </p>
                            <DotIcon className="text-gray-400" />
                            <p className="text-gray-400"> {coinDetail?.name} </p>
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-xl font-bold"> ${coinDetail?.market_data?.current_price?.usd}</p>
                            <p>
                                <span className={coinDetail?.market_data?.price_change_24h < 0 ? "text-red-600" : "text-green-600"}>
                                    <span> {(coinDetail?.market_data?.price_change_24h >= 0 ? "+" : "") + coinDetail?.market_data?.price_change_24h.toFixed(2)} </span>
                                    <span> ({coinDetail?.market_data?.price_change_percentage_24h.toFixed(2)}%)</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button>
                        {true ? <BookmarkFilledIcon className="h-6 w-6" /> : <BookmarkIcon className="h-6 w-6" />}
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button size="lg"> Trade</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Trade {coinDetail?.name}</DialogTitle>
                            </DialogHeader>
                            <TrendingForm coinDetail={coinDetail} wallet={wallet} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-14">
                <StockChart coinId={id} />
            </div>
        </div>
    )
};

export default StockDetails;