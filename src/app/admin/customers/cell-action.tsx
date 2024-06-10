'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { UpdateCustomerSheet } from './update-customer';
import { User } from './data';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);
  const handleDeleteClick = async (cust_id: string) => {
    if (confirm('Are you sure you want to delete this Customer?')) {
      try {
        const id ={id:cust_id};
        const response = await fetch(`/api/customer/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
        });
        if (response.ok) {
          alert('Customer deleted successfully');
          router.replace('/admin/customers');
        } else {
          alert('Failed to delete Customer');
        }
      } catch (error) {
        console.error('Error deleting Customer:', error);
        alert('Failed to delete Customer');
      }
    }
  };
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={openSheet}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteClick(data._id)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCustomerSheet isOpen={isSheetOpen} onClose={closeSheet} updateData={data} />
    </>
  );
};
