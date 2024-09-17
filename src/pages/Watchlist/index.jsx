import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const WatchList = () => {
    const handleRemoveFromWatchlist = (item) => {

    }
    return (
        <div className="p-5 lg:px-20">
            <h1 className="pb-5 font-bold text-3xl">
                Watchlist
            </h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead>PRICE</TableHead>
                        <TableHead className="text-right text-red-600">REMOVE</TableHead>
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
                            <TableCell>$250 .00</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => handleRemoveFromWatchlist(item)}> 
                                    <BookmarkFilledIcon className="w-6 h-6" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default WatchList;