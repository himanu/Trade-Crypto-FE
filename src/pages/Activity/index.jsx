import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { baseUrl } from "@/constants";
import { loaderContext } from "@/context";
import { useJWTToken } from "@/hooks/jwtToken";
import { logout } from "@/lib/utils";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noResultPng from "../../assets/noResult.png";


const Activity = () => {
    const { setLoading } = useContext(loaderContext);
    const [activities, setActivities] = useState([]);
    const jwt = useJWTToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchActivity = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/activity`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }) 
            setActivities(response.data);
        } catch(err) {
            toast.error("Error occured during loading your activities");
            if (err.status === 401) {
                logout(navigate, dispatch);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivity()
    }, []);
    return (
        <div className="p-5 lg:px-20">
            <h1 className="pb-5 font-bold text-3xl">
                Activity
            </h1>
            {activities.length ? (
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-5">Date & Time</TableHead>
                            <TableHead>Coin</TableHead>
                            <TableHead>ORDER TYPE</TableHead>
                            <TableHead>TXN QTY</TableHead>
                            <TableHead className="text-right">TXN VALUE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((item) => {
                            const dateObject = new Date(item?.timeStamp);

                            // Extract the date and time
                            const date = dateObject.toISOString().split('T')[0]; // "2024-10-26"
                            const time = dateObject.toTimeString().split(' ')[0]; 
                            return (
                                <TableRow>
                                    <TableCell className="text-left w-[200px">
                                        <p> {date} </p>
                                        <p className="text-gray-400"> {time} </p>
                                    </TableCell>
                                    <TableCell onClick={() => navigate(`/market/${item.coinId}`)} className="hover:text-white font-medium cursor-pointer flex items-center gap-3 text-slate-400 hover:underline">
                                        <Avatar>
                                            <AvatarImage src={JSON.parse(item.coinImg)} alt={`${item.coinId} logo`} />
                                        </Avatar>
                                        <span className=""> {(item.coinId ?? "").toUpperCase()} </span>
                                    </TableCell>

                                    <TableCell className="text-left">
                                        <span className={`${item.orderType === "buy" ? "bg-green-600" : "bg-sky-600"} px-3 py-1 rounded-lg`}>
                                            {item.orderType.toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-left"> {item.quantity}</TableCell>
                                    <TableCell className="text-right"> {item.txnValue} $</TableCell>
                                </TableRow>
                        )})}
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

export default Activity;