import CustomerModal from "@/components/forms/Customers";
import {CustomerTable} from "./components/customer-table";

export const revalidate = 3600;

export default async function CustomersPage() {
  
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold text-lg md:text-2xl">Clientes</h1>
        <CustomerModal/>
        <CustomerTable offset={0}/>
    </main>
  );
}
