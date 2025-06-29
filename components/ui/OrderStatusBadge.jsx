import { Badge } from "./badge"

export default function OrderStatusBadge({ status }) {
    const statusMap = {
        draft: "secondary",
        pending: "secondary",
        confirmed: "default",
        processing: "secondary",
        shipped: "success",
        delivered: "success",
        cancelled: "destructive",
        refunded: "destructive",
        completed: "success",
    }
    return (
        <Badge variant={statusMap[status]}>
            <span className="text-xs capitalize">{status}</span>
        </Badge>
    )
}