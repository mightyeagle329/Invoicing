"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import Status from "@/components/Status";
import { InvoiceData, StatusValue } from "@/lib/types/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/functions/formatDate";
import { OrderType } from "@/lib/types/orders";

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "units",
    header: "Units",
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 bg-transparent hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "billed",
    header: () => <div>Billed</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("billed"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "dateInvoiced",
    header: "Date Invoiced",
    cell: ({ row }) => <div>{formatDate(row.getValue("dateInvoiced"))}</div>,
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => <div>{formatDate(row.getValue("paymentDate"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (cell: CellContext<OrderType, unknown>) => {
      const status = cell.row.original.status as StatusValue;
      return <Status status={status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const suppliers = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hover:bg-transparent" variant="ghost">
              <span className="sr-only">Open Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(suppliers._id.toString())
              }
            >
              Copy Invoice ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Edit Invoice
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Delete Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
