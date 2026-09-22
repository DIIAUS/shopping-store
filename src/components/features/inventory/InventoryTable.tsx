import { DataTable } from '../../ui/DataTable';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  return <DataTable rows={items} getRowKey={(item) => item.id} columns={[
    { key: 'name', header: 'Product', render: (item) => item.name },
    { key: 'sku', header: 'SKU', render: (item) => item.sku },
    { key: 'stock', header: 'Stock', render: (item) => item.stock },
  ]} />;
}
