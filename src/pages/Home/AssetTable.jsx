import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
    const navigate = useNavigate();
    const coins = useSelector(store => store.coin.coins);
    return (
        <Table>
            <ScrollArea className="h-[70vh]">
                <TableHeader className="sticky top-0 bg-[#000] z-[20]">
                    <TableRow>
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...coins].map((item, idx) => (
                        <TableRow className="cursor-pointer" key={idx} onClick={() => navigate(`/market/${item.id}`)}>
                            <TableCell className="font-medium flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={item.image}></AvatarImage>
                                </Avatar>
                                <span> {item.name} </span>
                            </TableCell>
                            <TableCell className="text-left">{(item?.symbol ?? "").toUpperCase()}</TableCell>
                            <TableCell className="text-left"> {item.total_volume} </TableCell>
                            <TableCell className="text-left"> {item.market_cap} </TableCell>
                            <TableCell className="text-left"> {item?.price_change_percentage_24h} </TableCell>
                            <TableCell className="text-right">${item?.current_price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ScrollArea>
        </Table>
    )
};

export default AssetTable;