'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import React, { useState, useEffect} from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GetCustomers } from '@/lib/actions';
import { Customer } from '@/lib/type';

export function CustomerTable({
  offset
}: {
  offset: number | null;
}) {

  const [customers, setCustomers] = useState<Customer[]>([]);

  async function fetchCustomers() {
    try {
      const data = await GetCustomers(offset || 0, 15);
      console.log(data)
      setCustomers(data as any);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  }

  useEffect(() => {

    fetchCustomers();
  }, []);

  const router = useRouter();

  function onClick() {
    router.replace(`/customers?offset=${offset || 0 + 1}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px] text-center">Datos personales</TableHead>
              <TableHead className="hidden md:table-cell"></TableHead>
              <TableHead className="hidden md:table-cell text-center">Referencias</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <CustomerRow key={customer.customer_id} customer={customer} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Siguiente
        </Button>
      )}
    </>
  );
}


function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}


function CustomerRow({ customer }: { customer: Customer }) {
  const userId = customer.customer_id;

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className='grid'>
          <p>{customer.name + " " + customer.last_name}</p>
          <p>{formatPhoneNumber(customer.phone_number)}</p>
          <p>{customer.neighborhoods.cities.name + ", " + customer.neighborhoods.name + ", " +customer.address}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
      <div className='grid'>
          <p>{customer.payrolls.name}</p>
          <p>{customer.affiliates.name}</p>
          <p>{customer.banks.name}</p>
      </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
      <div className='grid grid-cols-2'>
          {customer.reference_contacts.map((ref) => (
            <>
            <p>{ref.name}</p>
            <p>{formatPhoneNumber(ref.phone_number)}</p>
            </>
          ))}
      </div></TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          // formAction={deleteUserWithId}
          disabled
        >
          Ver más
        </Button>
      </TableCell>
    </TableRow>
  );
}