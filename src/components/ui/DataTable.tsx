import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, rows, getRowKey, emptyMessage = 'No records found.' }: DataTableProps<T>) {
  return <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr>{columns.map((column) => <th key={column.key} scope="col" className="border-b p-3">{column.header}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row) => <tr key={getRowKey(row)}>{columns.map((column) => <td key={column.key} className="border-b p-3">{column.render(row)}</td>)}</tr>) : <tr><td colSpan={columns.length} className="p-3 text-center">{emptyMessage}</td></tr>}</tbody></table></div>;
}
