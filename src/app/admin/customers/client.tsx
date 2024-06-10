'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { User } from './data';

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey='name' columns={columns} data={data} />
    </>
  );
};
