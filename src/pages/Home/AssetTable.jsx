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

const AssetTable = () => {
    return (
        <Table className="w-[50%]">
            <TableHeader>
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
                {[...Array(5)].map(() => (
                    <TableRow>
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
                        <TableCell className="text-right">$250 .00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
};

export default AssetTable;