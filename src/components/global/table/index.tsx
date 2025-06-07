import {
  Table as CustomTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
// import { Dispatch, SetStateAction, type ReactNode } from "react";
// import Pagination from "../pagination";

// Generic type for table items
export interface TableColumn<T> {
  header: React.ReactNode;
  key: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  items: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  total?: number;
}

export function Table<T>({
  items,
  columns,
  loading,
}: // page,
// setPage,
// total,
TableProps<T>) {
  // Skeleton rows to match the number of columns
  const skeletonRows = Array.from({ length: 5 }).map((_, rowIndex) => (
    <TableRow key={`skeleton-row-${rowIndex}`}>
      {columns.map((col, colIndex) => (
        <TableCell key={`skeleton-cell-${col.key}-${colIndex}`}>
          <div className="h-4 bg-border rounded animate-pulse"></div>
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <>
      <CustomTable>
        <TableHeader>
          <TableRow>
            {columns.map((item) => (
              <TableHead className={item?.className} key={item.key}>
                {item.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Render skeleton loading state */}
          {loading
            ? skeletonRows
            : items.length > 0
            ? items.map((item, index) => (
                <TableRow
                  key={(() => {
                    if (typeof item === "object" && item !== null) {
                      if (
                        "id" in item &&
                        typeof (item as Record<string, unknown>).id === "string"
                      ) {
                        return (item as Record<string, unknown>).id as string;
                      }
                    }
                    return index;
                  })()}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>{col.cell(item)}</TableCell>
                  ))}
                </TableRow>
              ))
            : // Render empty state when no items and not loading
              !loading && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <p className="text-center text-titr text-[20px] py-[56px]">
                      اطلاعاتی یافت نشد
                    </p>
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </CustomTable>
      {/* <Pagination page={page} setPage={setPage} total={total} /> */}
    </>
  );
}
