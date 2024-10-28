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
import numeral from 'numeral';

const AssetTable = ({coins}) => {
    const navigate = useNavigate();
    const formatNumber = (number) => {
        return numeral(number).format('0.0a').toUpperCase();
    }
    return (
        <Table>
            <ScrollArea className="h-[70vh]">
                <TableHeader style={{ backgroundColor: 'hsl(212.2, 84%, 4.9%)' }} className="sticky top-0 z-[20]">
                    <TableRow>
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24H CHANGE</TableHead>
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
                            <TableCell className="text-left"> ${formatNumber(item.total_volume)} </TableCell>
                            <TableCell className="text-left"> ${formatNumber(item.market_cap)}  </TableCell>
                            <TableCell className={`${item?.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"} text-left`}> {item?.price_change_percentage_24h.toFixed(2)}% </TableCell>
                            <TableCell className="text-right">${item?.current_price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ScrollArea>
        </Table>
    )
};

export default AssetTable;