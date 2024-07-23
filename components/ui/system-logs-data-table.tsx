"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation"
import DatePicker from "./DatePicker"
import { Calendar } from "./calendar"
import { DateRange } from "react-day-picker"
import { add, addDays } from "date-fns"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick: (row: any) => void
  searchFilterText?: string
  pageSizeOptions?: number[]
}

export function SystemLogsDataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  searchFilterText = "name",
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const pathname = usePathname();

  console.log("pathname", pathname);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    }
  })

  const router = useRouter();

  const Ages = [
    5, 10, 15, 20, 25, 30
  ]

  const Activity = [
    "All", "ZKP Requested", "ZKP Verified", "Requested Report"
  ]

  const [selectedAge, setSelectedAge] = React.useState(Ages[0])
  const [activity, setActivity] = React.useState(Activity[0])

  const initialRange: DateRange = {
    from: addDays(new Date(), -1),
    to: new Date()
  };

  const [range, setRange] = React.useState<DateRange | undefined>(initialRange);

  return (
    <div>
      <div className="flex items-center p-6 justify-between border-b " style={{
        background: "rgba(228, 237, 255, 0.20)"
      }}>
        <div className="flex items-center  justify-between space-x-4 w-full">
          <div className="flex  items-center w-fit 2xl:w-[40%] gap-2">
            <Input
              placeholder={`Filter by ${searchFilterText}...`}
              value={(table.getColumn(searchFilterText)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchFilterText)?.setFilterValue(event.target.value)
              }
              className=" h-fit !m-0 !w-full text-sm"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto rounded-xl">
                  Columns Visibility
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* todo replace with start and end date functioanlity */}
          <div className="flex w-fit items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto rounded-xl">
                  Activity: {activity}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Activity.map((act) => (
                  <DropdownMenuItem
                    key={act}
                    onClick={() => setActivity(act)}
                  >
                    {act}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline" className="ml-auto rounded-xl"
                >
                  Filter By Date
                </Button>
              </DialogTrigger>

              <DialogContent className="w-fit">
                <DialogHeader className="">
                  <DialogTitle className="text-[24px] font-bold text-black mb-2">
                    Select Date Range
                  </DialogTitle>
                </DialogHeader>

                <div className="flex">
                  <Calendar mode="range" selected={range} onSelect={setRange} />
                </div>

                <DialogFooter>
                  <Button> Apply Filter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


          </div>
        </div>

        {
          pathname === "/dashboard" && <Button className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-fit rounded-xl" size="lg" onClick={() => router.push("/dashboard/investors")}>View investor list</Button>
        }

      </div>

      <div className="rounded-lg ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-6">

        <div className="flex items-center justify-center space-x-2 h-fit">
          <p className="whitespace-nowrap text-sm font-medium ">Rows per page</p>

          <div className="flex justify-center items-center">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="!m-0 h-8 w-[4.5rem]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <p className="whitespace-nowrap text-sm font-medium ">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toString()}</p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-xl"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-xl"
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
