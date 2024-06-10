'use client';
import { DataTable } from '@/components/ui/data-table';
import { Requested } from '@/constants/planrequest';
import { columns} from './columns-request';



interface ProductsClientProps {
  data: Requested[];
}

export const PlanRequestClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey='users' columns={columns} data={data} />
    </>
  );
};
