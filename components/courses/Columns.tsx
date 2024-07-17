"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"
  
export const columns: ColumnDef<Course>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "isPublished",
		header: "Status",
	},
	{
		id: "actions",
		cell: ({row}) => (
			<Link 
				href={`/instructor/courses/${row.original.id}/basic`}
				className="flex gap-2 items-center hover:text-[#FDA804]"
			>
				<Pencil className="h-4 w-4" /> Edit
			</Link>
		)
	}
]
  