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
import {CreateCustomer} from '@/lib/actions';
import { toast } from 'sonner'

export default function CustomerModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const submitCustomer = async (customer: FormData) => {
    try{
      await CreateCustomer(customer);
      toast.success('Cliente creado con éxito.')
      onClose();
    }catch{
      toast.error('Ocurrió un error mientras se generaba el cliente.')
    }
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Crear cliente
      </Button>
      <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear un cliente
              </ModalHeader>
              <form action={submitCustomer} >
              <ModalBody className="grid gap-2 grid-cols-2">
                  <h3 className="col-span-2">Datos personales</h3>
                  <Input label="Nombre" name='name' isRequired/>
                  <Input label="Apellido" name='last_name' isRequired/>
                  <Input label="Teléfono" name='phone' isRequired/>
                  <AffiliateInput />
                  <BankInput />
                  <PayrollInput />
                  <Divider className="col-span-2" />
                  <h3 className="col-span-2">Dirección</h3>
                  <AddressInput />
                  <Input label="Dirección" name='address' isRequired/>
                  <Divider className="col-span-2" />
                  <h3 className="col-span-2">Contactos de referencia</h3>
                  <Input label="Nombre contacto 1" name='reference1_name' isRequired/>
                  <Input label="Teléfono contacto 1" name='reference1_phone' isRequired/>
                  <Input label="Nombre contacto 2" name='reference2_name' isRequired/>
                  <Input label="Teléfono contacto 2" name='reference2_phone' isRequired/>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type='submit'>
                  Crear
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
