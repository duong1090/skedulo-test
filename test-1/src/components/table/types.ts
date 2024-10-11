import { ReactNode } from "react";

type ItemData<T> = T;

type Column<T> = {
  label: string;
  dataIndex?: keyof T;
  render?: (item: ItemData<T>) => ReactNode;
};

export interface TableProps<T> {
  columns: Column<T>[];
  data?: ItemData<T>[];
  loading?: boolean;
}
