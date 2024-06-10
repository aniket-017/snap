'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Requested } from '@/constants/planrequest';
import { CellActionRequest } from './call-action-request';


export const columns: ColumnDef<Requested>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'users',
    header: 'USERNAME'
    
  },
  {
    accessorKey: 'requestedPlan',
    header: 'PLAN REQUESTED'
    
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActionRequest data={row.original} />
  }
];
