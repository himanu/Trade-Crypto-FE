import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Activity = () => {
    return (
        <div className="p-5 lg:px-20">
            <h1 className="pb-5 font-bold text-3xl">
                Activity
            </h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Date & Time</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>BUY PRICE</TableHead>
                        <TableHead>SELL PRICE</TableHead>
                        <TableHead>ORDER TYPE</TableHead>
                        <TableHead>PROFIT/LOSS</TableHead>
                        <TableHead className="text-right">VALUE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map(() => (
                        <TableRow>
                            <TableCell className="text-left">
                                <p> 2024/05/31 </p>
                                <p className="text-gray-400"> 12:39:32 </p>
                            </TableCell>
                            <TableCell className="font-medium flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                                </Avatar>
                                <span> Bitcoin </span>
                            </TableCell>
                            <TableCell className="text-left">BTC</TableCell>
                            <TableCell className="text-left"> 12345234</TableCell>
                            <TableCell className="text-left"> 123456788</TableCell>
                            <TableCell className="text-left"> 0.034% </TableCell>
                            <TableCell>$250 .00</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default Activity;