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
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoinDetails } from "@/store/Coin/action";
import { useJWTToken } from "@/hooks/jwtToken";
import { getUserWallet } from "@/store/Wallet/action";
import { toast } from "react-toastify";
  
const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series",
        label: "1 Year",
        value: 365
    }
]
const StockDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {coinDetail} = useSelector(store => store.coin);
    const [open, setOpen] = useState(false);

    const [activeLabel, setActiveLabel] = useState(timeSeries[0].label);

    const {wallet} =  useSelector(store => store.wallet);
    const jwt =  useJWTToken();
    useEffect(() => {
        dispatch(getCoinDetails(id, jwt, navigate));
    }, [id]);

    const fetchWallet = () => dispatch(getUserWallet(jwt, navigate));

    useEffect(() => {
        Object.keys(wallet).length === 0 && fetchWallet();
        return () => toast.dismiss();
    }, [])

    const {change = 0, percentageChange = 0} = useMemo(() => {
        if (!coinDetail)
            return {};
        let rate = coinDetail?.market_data?.price_change_percentage_24h;
        switch (activeLabel) {
            case (timeSeries[0].label): {
                rate = coinDetail?.market_data?.price_change_percentage_24h;
                break;
            }

            case (timeSeries[1].label): {
                rate = coinDetail?.market_data?.price_change_percentage_7d;
                break;
            }
            case timeSeries[2].label: {
                rate = coinDetail?.market_data?.price_change_percentage_30d;
                break;
            }
            case timeSeries[3].label: {
                rate = coinDetail?.market_data?.price_change_percentage_1y;
                break;
            }
            default: {
                rate = coinDetail?.market_data?.price_change_percentage_24h;
                break;
            }
        }
        return {
            change: (coinDetail?.market_data?.current_price?.usd * rate)/(rate + 100),
            percentageChange: rate
        }
    }, [activeLabel, coinDetail])
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
                                <span className={percentageChange < 0 ? "text-red-600" : "text-green-600"}>
                                    <span> {(percentageChange >= 0 ? "+" : "") + change.toFixed(2)} </span>
                                    <span> ({percentageChange.toFixed(2)}%)</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button>
                        {true ? <BookmarkFilledIcon className="h-6 w-6" /> : <BookmarkIcon className="h-6 w-6" />}
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <Button size="lg" onClick={() => setOpen(!open)}> Trade</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Trade {coinDetail?.name}</DialogTitle>
                            </DialogHeader>
                            <TrendingForm open={open} setOpen={setOpen} coinDetail={coinDetail} wallet={wallet} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-14">
                <StockChart coinId={id} activeLabel={activeLabel} setActiveLabel={setActiveLabel} timeSeries={timeSeries} />
            </div>
        </div>
    )
};

export default StockDetails;