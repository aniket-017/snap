'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Requested } from '@/constants/planrequest';
import { Check, Edit, MoreHorizontal, Trash, X } from 'lucide-react';
import React, { useState } from 'react';

interface CellActionProps {
  data: Requested;
}
export const CellActionRequest: React.FC<CellActionProps> = ({ data }) => {
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
          <DropdownMenuItem  className='bg-green-700 opacity-90'>
            <Check className="mr-2 h-4 w-4" /> Approved
          </DropdownMenuItem>
          <DropdownMenuItem  className='bg-red-700 opacity-60'>
            < X className="mr-2 h-4 w-4" /> Declined
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    
    </>
  );
};
