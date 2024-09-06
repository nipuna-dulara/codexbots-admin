import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Request {
    userId: string;
    status: string;
    name: string;
    country: string;
    duration: string;
}

interface TableCompProps {
    requests: Request[];
}
const TableComp = ({ requests }: TableCompProps) => {
    return <div><Table>
        <TableCaption>A list of recent visa requests.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Proceed</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {requests.map((request: any) => (
                <TableRow key={request.userId}>
                    <TableCell className="font-medium">{request.userId}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.country}</TableCell>
                    <TableCell>{request.duration}</TableCell>
                    <TableCell className="text-right">
                        <Button>Proceed</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table></div>
}

export default TableComp