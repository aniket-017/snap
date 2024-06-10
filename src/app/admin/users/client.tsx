'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { User } from '@/constants/userdata';



interface ProductsClientProps {
  data: User[];
}

export const UsersClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey='user' columns={columns} data={data} />
    </>
  );
};
