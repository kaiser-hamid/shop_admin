import { DataTable } from "./data-table";
import { columns } from "./column";

export default function CategoriesPage() {

    const data = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "92a856ef",
            amount: 250,
            status: "completed",
            email: "john@example.com",
        },
        {
            id: "63c491bd",
            amount: 75,
            status: "pending",
            email: "sara@example.com",
        },
        {
            id: "45d782ac",
            amount: 500,
            status: "completed",
            email: "mike@example.com",
        },
        {
            id: "19f634de",
            amount: 150,
            status: "failed",
            email: "lisa@example.com",
        },
        {
            id: "37b295cf",
            amount: 325,
            status: "pending",
            email: "david@example.com",
        },
        {
            id: "84e167ab",
            amount: 200,
            status: "completed",
            email: "emma@example.com",
        },
        {
            id: "51d923fg",
            amount: 175,
            status: "failed",
            email: "james@example.com",
        },
        {
            id: "26h478kl",
            amount: 450,
            status: "pending",
            email: "anna@example.com",
        },
        {
            id: "93m561np",
            amount: 275,
            status: "completed",
            email: "peter@example.com",
        }

    ]

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
