import { Loader2 } from "lucide-react"

export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <Loader2 className="h-16 w-16 animate-spin text-slate-600" />
        </div>
    )
}
