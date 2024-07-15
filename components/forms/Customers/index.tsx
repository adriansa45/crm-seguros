'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
  useDisclosure
} from '@nextui-org/react';
import AffiliateInput from '../Inputs/affiliates';
import BankInput from '../Inputs/bankInput';
import PayrollInput from '../Inputs/payrollInput';
import AddressInput from '../AddressInputs';
import {CreateCustomer, EditCustomer} from '@/lib/actions';
import { toast } from 'sonner'
import { Customer } from '@/lib/type';
import { useRouter } from 'next/navigation';

export default function CustomerModal({customerData} : {customerData?: Customer}) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  const submitCustomer = async (customer: FormData) => {
    
    try{
      if (customerData?.customer_id){
        await EditCustomer(customer);
        toast.success('Cliente editado con éxito.')
      }else{
        await CreateCustomer(customer);
        toast.success('Cliente creado con éxito.')
      }
      
      
    }catch{
      toast.error('Ocurrió un error mientras se generaba el cliente.')
    }
    router.push("/customers");
    onClose();
  }

  return (
    <>
      {
      customerData ? 
      <Button className="w-full min-w-32 mb-1" size="sm" variant='ghost' onPress={onOpen}>
        Ver cliente
       </Button>
      :
      <Button color="primary" onPress={onOpen}>
        Crear cliente
      </Button>
      }

      <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear un cliente
              </ModalHeader>
              <form action={submitCustomer} >
              <input type='hidden' name="customer_id" value={customerData?.customer_id}/>
              <ModalBody className="grid gap-2 grid-cols-2">
                  <h3 className="col-span-2">Datos personales</h3>
                  <Input label="Nombre" name='name' isRequired defaultValue={customerData?.name}/>
                  <Input label="Apellido" name='last_name' isRequired defaultValue={customerData?.last_name}/>
                  <Input label="Teléfono" name='phone' isRequired defaultValue={customerData?.phone_number}/>
                  <AffiliateInput AffiliateId={customerData?.affiliate_id}/>
                  <BankInput BankId={customerData?.bank_id}/>
                  <PayrollInput PayrollId={customerData?.payroll_id}/>
                  <Divider className="col-span-2" />
                  <h3 className="col-span-2">Dirección</h3>
                  <AddressInput neighborhoodId={customerData?.neighborhood_id} 
                    zipCode={customerData?.neighborhoods.zipcode}
                    cityId={customerData?.neighborhoods.city_id}
                    stateId={customerData?.neighborhoods.cities.state_id}
                    />
                  <Input label="Dirección" name='address' isRequired defaultValue={customerData?.address}/>
                  <Divider className="col-span-2" />
                  <h3 className="col-span-2">Contactos de referencia</h3>
                  <Input label="Nombre contacto 1" name='reference1_name' isRequired defaultValue={customerData?.reference_contacts[0]?.name}/>
                  <Input label="Teléfono contacto 1" name='reference1_phone' isRequired defaultValue={customerData?.reference_contacts[0]?.phone_number}/>
                  <Input label="Nombre contacto 2" name='reference2_name' isRequired defaultValue={customerData?.reference_contacts[1]?.name}/>
                  <Input label="Teléfono contacto 2" name='reference2_phone' isRequired defaultValue={customerData?.reference_contacts[1]?.phone_number}/>
                  <Divider className="col-span-2" />
                  <h3 className="col-span-2">Crédito</h3>
                  <Input label="Plazo (Meses)" name='lapse' isRequired type='number' defaultValue={customerData?.credits[0]?.lapse.toString()}/>
                  <Input label="Monto" name='amount' isRequired type='number' defaultValue={customerData?.credits[0]?.amount.toString()}/>
                  <Input label="Interés" name='rate' isRequired type='number' defaultValue={customerData?.credits[0]?.rate.toString()}/>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                {
                customerData ? 
                <Button color="primary" type='submit'>Editar</Button>
                :
                <Button color="primary" type='submit'>Crear</Button>
                }
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
