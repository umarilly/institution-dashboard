"use client";

import * as React from "react";

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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick: (row: any) => void;
  searchFilterText?: string;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  searchFilterText = "name",
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const pathname = usePathname();

  console.log("pathname", pathname);

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

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
    },
  });

  const router = useRouter();

  function getVisiblePages() {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    let pages = [];

    if (pageCount < 4) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (pageIndex > 1) {
        pages.push("...");
        pages.push(pageIndex - 1);
      }
      if (pageIndex > 0 && pageIndex < pageCount - 1) {
        pages.push(pageIndex);
      }
      if (pageIndex < pageCount - 2) {
        pages.push(pageIndex + 1);
        pages.push("...");
      }
      pages.push(pageCount - 1);
    }

    return pages;
  }

  return (
    <div>
      <div className="flex items-center p-6 justify-between">
        <div className="flex items-center  justify-center space-x-4">
          <Input
            placeholder={`Filter by ${searchFilterText}...`}
            value={(table.getColumn(searchFilterText)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchFilterText)?.setFilterValue(event.target.value)
            }
            className="max-w-sm h-fit !m-0"
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
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {pathname === "/dashboard" && (
          <Button
            className="!p-5 bg-color-tertiary font-medium text-color-primary hover:bg-color-tertiaryHover hover:text-black w-fit rounded-xl"
            size="lg"
            onClick={() => router.push("/dashboard/investors")}
          >
            View investor list
          </Button>
        )}
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
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
        {/* <div className="flex items-center justify-center space-x-2 h-fit">
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
        </div> */}
        <div className="flex items-center justify-center space-x-2 h-fit">
          <p className="whitespace-nowrap text-sm font-medium ">Page</p>

          <div className="flex justify-center items-center">
            <Select
              value={`${table.getState().pagination.pageIndex + 1}`}
              onValueChange={(value) => {
                const pageIndex = Number(value) - 1;
                if (pageIndex >= 0 && pageIndex < table.getPageCount()) {
                  table.setPageIndex(pageIndex);
                }
              }}
            >
              <SelectTrigger className="!m-0 h-8 w-[4.5rem]">
                <SelectValue
                  placeholder={`${table.getState().pagination.pageIndex + 1}`}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <SelectItem key={pageNumber} value={`${pageNumber}`}>
                      {pageNumber}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <p className="whitespace-nowrap text-sm font-medium ml-1">
            of {table.getPageCount()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* <p className="whitespace-nowrap text-sm font-medium ">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toString()}</p>
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
          </div> */}
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  size={"sm"}
                  onClick={() => {
                    table.previousPage();
                  }}
                />
              </PaginationItem>
              {getVisiblePages().map((pageIndex) => (
                <>
                  {typeof pageIndex != "string" ? (
                    <PaginationItem>
                      <PaginationLink className="!rounded-lg "
                        onClick={() => {
                          table.setPageIndex(pageIndex);
                        }}
                        isActive={table.getState().pagination.pageIndex === pageIndex}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ) : (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              ))}
              <PaginationItem>
                <PaginationNext
                
                size={"sm"}
                  onClick={() => {
                    table.nextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
