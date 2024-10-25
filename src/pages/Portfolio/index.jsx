import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useJWTToken } from "@/hooks/jwtToken";
import { fetchPortfolio } from "@/store/Portfolio/action";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noResultPng from "../../assets/noResult.png";


const Portfolio = () => {
    const dispatch = useDispatch();
    const jwt = useJWTToken();
    const portfolio = useSelector((store) => store.portfolio.portfolio);
    useEffect(() => {
        dispatch(fetchPortfolio(jwt));

    }, [])
    return (
        <div className="p-5 lg:px-20">
            <h1 className="pb-5 font-bold text-3xl">
                Portfolio
            </h1>
            {portfolio.length ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">ASSET</TableHead>
                            <TableHead>INVESTED UNIT</TableHead>
                            <TableHead>INVESTED VALUE</TableHead>
                            <TableHead>CURRENT VALUE</TableHead>
                            <TableHead className="text-right">RETURN</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {portfolio.map((item) => (
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={item?.coinUrl}></AvatarImage>
                                    </Avatar>
                                    <span> {item?.coinName} </span>
                                </TableCell>
                                <TableCell className="text-left"> {item?.holding?.qty} </TableCell>
                                <TableCell className="text-left"> {(item?.holding?.qty * item?.holding?.avgPrice).toFixed(2)}</TableCell>
                                <TableCell className="text-left"> {(item?.currentValue).toFixed(2)}</TableCell>
                                {item?.returnValue < 0 ? (
                                    <TableCell className="flex justify-end gap-1 text-red-600"> <ArrowDownIcon color="red" /> {(item?.returnValue).toFixed(2)} ({(item?.returnValuePercentage).toFixed(2)}%) </TableCell>
                                ) : (
                                    <TableCell className="flex justify-end gap-1 text-green-600"> <ArrowUpIcon color="green" /> {(item?.returnValue).toFixed(2)} ({(item?.returnValuePercentage).toFixed(2)}%) </TableCell>
                                )}
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex justify-center items-center mt-20 flex-col">
                    <img className="w-[15%]" src={noResultPng}/>
                    <div className="text-lg mt-1">
                        Please invest and come back then!
                    </div>
                </div>
            )}
        </div>
    )
};

export default Portfolio;