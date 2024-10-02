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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoinDetails } from "@/store/Coin/action";
  
const StockDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { jwt  = ""} = useSelector((store) => store.auth);
    const coinDetail = useSelector(store => store.coin.coinDetail);
    useEffect(() => {
        jwt && dispatch(getCoinDetails(id, jwt));
    }, [id, jwt]);
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
                                <span className="text-red-600">
                                    <span> {coinDetail?.market_data?.price_change_24h.toFixed(2)}</span>
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
                                <DialogTitle>How much do you want to spend?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <TrendingForm />
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