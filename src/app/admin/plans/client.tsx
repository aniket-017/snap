'use client';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Plan } from '@/constants/plandata';


interface ProductsClientProps {
  data: Plan[];
}

export const PlanClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey='planName' columns={columns} data={data} />
    </>
  );
};
