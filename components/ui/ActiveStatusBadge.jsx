import { Badge } from "./badge"

export default function ActiveStatusBadge({ isActive }) {
    return (
        <Badge variant={isActive ? "success" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    )
}