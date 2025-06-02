import { Badge } from "./badge"

export default function ProductStatusBadge({ status }) {
    const statusMap = {
        published: "success",
        draft: "secondary",
        archived: "destructive"
    }
    return (
        <Badge variant={statusMap[status]}>
            <span className="text-xs capitalize">{status}</span>
        </Badge>
    )
}