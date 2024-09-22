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
  
const StockDetails = () => {
    return (
        <div className="p-5 mt-5">
            <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                    <div>
                        <Avatar>
                            <AvatarImage src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                        </Avatar>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p> BTC </p>
                            <DotIcon className="text-gray-400" />
                            <p className="text-gray-400"> Bitcoin </p>
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-xl font-bold"> $65743</p>
                            <p>
                                <span className="text-red-600">
                                    <span> -13190423344</span>
                                    <span> (-1.04%)</span>
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
                <StockChart />
            </div>
        </div>
    )
};

export default StockDetails;