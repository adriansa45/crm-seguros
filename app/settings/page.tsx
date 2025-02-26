import AddressInput from "@/components/forms/AddressInputs";

export const revalidate = 3600

export default async function SettingsPage() {

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
        <form action="">
          <AddressInput />
          
        </form>
      </div>
    </main>
  );
}
