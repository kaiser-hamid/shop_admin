import { Badge } from "./badge"

export default function PaymentStatusBadge({ status }) {
    const statusMap = {
        paid: "success",
        unpaid: "destructive",
    }
    return (
        <Badge variant={statusMap[status]}>
            <span className="text-xs capitalize">{status}</span>
        </Badge>
    )
}