import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const WithDrawal = () => {
    return (
        <div className="p-5 lg:px-20">
            <h1 className="pb-5 font-bold text-3xl">
                Withdrawal
            </h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map(() => (
                        <TableRow>
                            <TableCell className="text-left">
                                <p> June 2, 2024 at 11:43</p>
                            </TableCell>
                            <TableCell className="text-left">Bank</TableCell>
                            <TableCell className="text-left">$250 .00</TableCell>
                            <TableCell>Success</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default WithDrawal;