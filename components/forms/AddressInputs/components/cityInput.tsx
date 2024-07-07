import Autocomplete from "@/components/ui/autocomplete";
import prisma from "@/lib/db";

export default async function CityInput({StateId} : {StateId:number}) {
  const data = await prisma.cities.findMany({
    where:{
      state_id: StateId ?? 0
    }
  });
  const options = data.map(o => ({ id: o.city_id.toString(), name: o.name }));

  return (
    <Autocomplete placeholder="Seleciona un municipio" options={options}/>
  );
}
