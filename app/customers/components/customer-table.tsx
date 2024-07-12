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
import { useRouter } from 'next/navigation';
import { GetCustomers } from '@/lib/actions';
import { Customer } from '@/lib/type';
import { Button, Chip } from '@nextui-org/react';
import { IconMapPin, IconMapPinFilled, IconPhone, IconPhoneFilled, IconUserFilled } from '@tabler/icons-react';
import CustomerModal from '@/components/forms/Customers';

export function CustomerTable({
  offset
}: {
  offset: number | null;
}) {

  const [customers, setCustomers] = useState<Customer[]>([]);

  async function fetchCustomers() {
    try {
      const data = await GetCustomers(offset || 0, 15);
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
              <CustomerRow customer={customer} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
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

  return (
    <TableRow key={customer.customer_id}>
      <TableCell className="font-medium">
        <div className='grid'>
          <p className='flex items-center'><IconUserFilled size={16} />{customer.name + " " + customer.last_name}</p>
          <p className='flex items-center'><IconPhoneFilled size={16} /> {formatPhoneNumber(customer.phone_number)}</p>
          <p className='flex items-center'><IconMapPinFilled size={16}/> {customer.neighborhoods.cities.name + ", " + customer.neighborhoods.name + ", " +customer.address}</p>
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
      <div className='grid gap-1'>
          {customer.reference_contacts.map((ref) => (
            <Chip color="primary">
              <div className='flex gap-4 justify-between'>
              <span>{ref.name}</span>
              <span>{formatPhoneNumber(ref.phone_number)} </span>
              </div>
              </Chip>
          ))}
      </div></TableCell>
      <TableCell>
        <CustomerModal customerData={customer}/>
        <Button color="primary" className="w-full min-w-32" size="sm" variant='ghost'>
        Ver créditos
       </Button>
      </TableCell>
    </TableRow>
  );
}