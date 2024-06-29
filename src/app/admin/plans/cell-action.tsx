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
import { Plan } from '@/constants/plandata';
import { UpdatePlanSheet } from './update-plan';
import { useRouter } from 'next/navigation';




interface CellActionProps {
  data: Plan;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const handleDeleteClick = async (plan_id: string) => {
    if (confirm('Are you sure you want to delete this Plan?')) {
      try {
        const id ={id:plan_id};
        const response = await fetch(`/api/plan/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
        });
        if (response.ok) {
          alert('Plan deleted successfully');
          router.replace('/admin/plans');
        } else {
          alert('Failed to delete Plan');
        }
      } catch (error) {
        console.error('Error deleting Plan:', error);
        alert('Failed to delete Plan');
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
      <UpdatePlanSheet isOpen={isSheetOpen} onClose={closeSheet} updateData= {data}/>
    </>
  );
};
