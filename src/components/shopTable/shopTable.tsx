"use client";
import { ShopTypes } from "@/services/api/shop/shopApi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

export default function ShopTable({ shops }: { shops: ShopTypes[] }) {
  const [data] = useState(() => [...shops]);

  const columnHelper = createColumnHelper<ShopTypes>();

  const defaultColumns = [
    columnHelper.accessor("name", {
      id: "Shop Name",
      cell: (props) => <h2>{props.getValue()}</h2>,
    }),
    columnHelper.group({
      header: "Clock",
      columns: [
        columnHelper.accessor("openTime", {
          id: "Open Time",
          cell: (props) => <h2>{props.getValue()}</h2>,
        }),

        columnHelper.accessor("closeTime", {
          id: "Close Time",
          cell: (props) => <h2>{props.getValue()}</h2>,
        }),
      ],
    }),
    columnHelper.accessor("category", {
      id: "Category",
      cell: (props) => <h2>{props.getValue()}</h2>,
    }),
    columnHelper.accessor("subCategory", {
      id: "Sub-Category",
      cell: (props) => <h2>{props.getValue()}</h2>,
    }),
    columnHelper.accessor("phone", {
      id: "Phone",
      cell: (props) => <h2>{props.getValue()}</h2>,
    }),
    columnHelper.accessor("image", {
      id: "Image",
      cell: (props) => <h2>{props.getValue()[0].slice(0, 20)}</h2>,
    }),
  ];

  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead className="border-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border-2 border-red-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="py-2">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
