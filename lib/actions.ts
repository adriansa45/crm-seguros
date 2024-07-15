'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';

export async function CreateCustomer(customer: FormData) {
  const bank = await prisma.banks.findFirst({
    where: {
      name: customer.get('bank_id')?.toString() || ""
    }
  });
  if (!bank) {
    throw new Error('Bank not found');
  }
  const affiliate = await prisma.affiliates.findFirst({
    where: {
      name: customer.get('affiliate_id')?.toString() || ""
    }
  });
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  const payroll = await prisma.payrolls.findFirst({
    where: {
      name: customer.get('payroll_id')?.toString() || ""
    }
  });
  if (!payroll) {
    throw new Error('Payroll not found');
  }
  const neighborhood = await prisma.neighborhoods.findFirst({
    where: {
      name: customer.get('neighborhood_id')?.toString() || ""
    }
  });
  if (!neighborhood) {
    throw new Error('Neighborhood not found');
  }
  await prisma.customers.create({
    data: {
      name: customer.get('name')?.toString() ?? '',
      last_name: customer.get('last_name')?.toString() ?? '',
      phone_number: customer.get('phone')?.toString() ?? '',
      neighborhood_id: neighborhood?.neighborhood_id,
      address: customer.get('address')?.toString() ?? '',
      payroll_id: payroll.payroll_id,
      affiliate_id: affiliate.affiliate_id,
      bank_id: bank.bank_id,
      user_id: 1,
      credits:{
        create:{
          rate: Number(customer.get('rate')) ?? 0,
          amount: Number(customer.get('amount'))?? 0,
          lapse: Number(customer.get('lapse')) ?? 0,
        }
      },
      reference_contacts: {
        createMany: {
          data: [
            {
              name: customer.get('reference1_name')?.toString() ?? '',
              last_name: customer.get('reference1_name')?.toString() ?? '',
              phone_number: customer.get('reference1_phone')?.toString() ?? ''
            },
            {
              name: customer.get('reference2_name')?.toString() ?? '',
              last_name: customer.get('reference2_name')?.toString() ?? '',
              phone_number: customer.get('reference2_phone')?.toString() ?? ''
            }
          ]
        }
      }
    }
  });
}

export async function EditCustomer(customer: FormData) {
  const bank = await prisma.banks.findFirst({
    where: {
      name: customer.get('bank_id')?.toString() || ""
    }
  });
  if (!bank) {
    throw new Error('Bank not found');
  }
  const affiliate = await prisma.affiliates.findFirst({
    where: {
      name: customer.get('affiliate_id')?.toString() || ""
    }
  });
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  const payroll = await prisma.payrolls.findFirst({
    where: {
      name: customer.get('payroll_id')?.toString() || ""
    }
  });
  if (!payroll) {
    throw new Error('Payroll not found');
  }
  const neighborhood = await prisma.neighborhoods.findFirst({
    where: {
      name: customer.get('neighborhood_id')?.toString() || ""
    }
  });
  if (!neighborhood) {
    throw new Error('Neighborhood not found');
  }

  const customerId = Number(customer.get('customer_id')) ?? 0;
  console.log(customer.get('customer_id'))

  // Verificar si el registro existe antes de intentar la actualización
  const existingCustomer = await prisma.customers.findUnique({
    where: { customer_id: customerId }
  });
  
  if (!existingCustomer) {
    throw new Error(`Customer with ID ${customerId} does not exist.`);
  }

  await prisma.customers.update({
    where: {
      customer_id: customerId
    },
    data: {
      name: customer.get('name')?.toString() ?? '',
      last_name: customer.get('last_name')?.toString() ?? '',
      phone_number: customer.get('phone')?.toString() ?? '',
      neighborhood_id: neighborhood?.neighborhood_id,
      address: customer.get('address')?.toString() ?? '',
      payroll_id: payroll.payroll_id,
      affiliate_id: affiliate.affiliate_id,
      bank_id: bank.bank_id,
      user_id: 1,
      credits: {
        deleteMany: {
          customer_id: customerId
        },
        create:{
          rate: Number(customer.get('rate')) ?? 0,
          amount: Number(customer.get('amount'))?? 0,
          lapse: Number(customer.get('lapse')) ?? 0,
        }
      },
      reference_contacts: {
        deleteMany: {
          customer_id: customerId
        },
        create: [
          {
            name: customer.get('reference1_name')?.toString() ?? '',
            last_name: '',
            phone_number: customer.get('reference1_phone')?.toString() ?? ''
          },
          {
            name: customer.get('reference2_name')?.toString() ?? '',
            last_name: '',
            phone_number: customer.get('reference2_phone')?.toString() ?? ''
          }
        ]
      }
    }
  });
}


export async function GetCustomers(offset:number,pageCount:number){
  return await prisma.customers.findMany({
    include: {
      reference_contacts: true,
      banks: true,
      affiliates: true,
      payrolls: true,
      neighborhoods: {
        include: {
          cities: {
            include: {
              states: true
            }
          }
        }
      },
      credits: true
    },
    take: pageCount,
    skip: offset * pageCount,
    orderBy: {
      created: "desc"
    }
  });
}