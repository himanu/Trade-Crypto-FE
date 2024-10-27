import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useJWTToken } from "@/hooks/jwtToken";
import { fetchPortfolio } from "@/store/Portfolio/action";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noResultPng from "../../assets/noResult.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import TradingForm from "./TradingForm";
import { UpdateIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";


const Portfolio = () => {
    const dispatch = useDispatch();
    const jwt = useJWTToken();
    const navigate = useNavigate();
    const {portfolio, loading} = useSelector((store) => store.portfolio);
    const fetchPortfolio1 = () => dispatch(fetchPortfolio(jwt, navigate));
    const [open, setOpen] = useState(false);
    const [selectedItem, selectItem] = useState("");
    useEffect(() => {
        fetchPortfolio1();
    }, [])
    return (
        <div className="p-5 lg:px-20">
            <div className="flex gap-3 items-center	mb-7 ">
                <h1 className="font-bold text-3xl">
                    Portfolio
                </h1>
                <UpdateIcon onClick={fetchPortfolio1} className="w-5 h-5 p-0 cursor-pointer hover:text-gray-400" />
            </div>
            {portfolio.length || loading ? (
                <Table>
                    <ScrollArea className="h-[60vh]">
                        <TableHeader className="sticky top-0 bg-[#000] z-[20]">
                            <TableRow>
                                <TableHead className="w-[250px]">ASSET</TableHead>
                                <TableHead>INVESTED UNIT</TableHead>
                                <TableHead>INVESTED VALUE</TableHead>
                                <TableHead>CURRENT VALUE</TableHead>
                                <TableHead className="text-right">RETURN</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...portfolio, ...portfolio].map((item) => (
                                <>
                                    <TableRow className="cursor-pointer" onClick={() => {setOpen(!open); selectItem(item)}}>
                                        <TableCell className="font-medium flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={item?.coinUrl}></AvatarImage>
                                            </Avatar>
                                            <span> {item?.coinName} </span>
                                        </TableCell>
                                        <TableCell className="text-left"> {item?.holding?.qty} </TableCell>
                                        <TableCell className="text-left"> ${(item?.holding?.qty * item?.holding?.avgPrice).toFixed(2)}</TableCell>
                                        <TableCell className="text-left"> ${(item?.currentValue).toFixed(2)}</TableCell>
                                        {item?.returnValue < 0 ? (
                                            <TableCell className="flex justify-end gap-1 text-red-600"> <ArrowDownIcon color="red" /> {(item?.returnValue).toFixed(2)} ({(item?.returnValuePercentage)?.toFixed(2)}%) </TableCell>
                                        ) : (
                                            <TableCell className="flex justify-end gap-1 text-green-600"> <ArrowUpIcon color="green" /> {(item?.returnValue).toFixed(2)} ({(item?.returnValuePercentage)?.toFixed(2)}%) </TableCell>
                                        )}
                                    </TableRow>
                                    <div>
                                        <Dialog open={open && selectedItem} onOpenChange={setOpen}>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Trade </DialogTitle>
                                                </DialogHeader>
                                                <TradingForm holding={selectedItem} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </>
                                
                                
                            ))}
                        </TableBody>
                    </ScrollArea>
                </Table>
            ) : (
                <div className="flex justify-center items-center mt-20 flex-col">
                    <img className="w-[15%]" src={noResultPng} />
                    <div className="text-lg mt-1">
                        Please invest and come back then!
                    </div>
                </div>
            )}
        </div>
    )
};

export default Portfolio;