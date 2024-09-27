import React, { useState } from "react";
import { Client } from "@/models/client";
import { Select, SelectItem } from "@nextui-org/select";
import SelectReactSelect, {
  GroupBase,
  Options,
  OptionsOrGroups,
  SingleValue,
  PropsValue,
} from "react-select";

interface ClientSelectProps {
  clientList: Client[];
  handleSelect: (client: Client | null) => void;
}
interface OptionsProps {
  value: Client;
  label: string;
}
[];

// function ClientSelect({ clientList, handleSelect }: ClientSelectProps) {
//   return (
//     <Select
//       size="sm"
//       className="w-32"
//       aria-label="selectClient"
//       placeholder="Seleccione"
//       name="client"
//       onChange={(e) => handleSelect(e.target.value)}
//     >
//       {clientList.map((client, index) => (
//         <SelectItem key={client.id || index} value={client.id}>
//           {client.name}
//         </SelectItem>
//       ))}
//     </Select>
//   );
// }
// export default ClientSelect;

export function ClientSelectV2({
  clientList,
  handleSelect,
}: ClientSelectProps) {
  const options = clientList.map((client) => ({
    value: client, // El objeto cliente completo
    label: client.name, // El nombre del cliente que se muestra en el select
  }));
  const [clientSelected, setClientSelected] = useState<
    OptionsProps | undefined
  >(undefined);

  const onChange = (e: OptionsProps) => {
    console.log(e);
    if (!e) {
      setClientSelected(null);
      handleSelect(null);
    } else {
      setClientSelected(e);
      handleSelect(e.value);
    }
  };
  return (
    <>
      <SelectReactSelect
        options={options}
        isClearable={true}
        isMulti={false}
        onChange={(e) => onChange(e as OptionsProps)}
        // value={clientSelected}

        className="min-w-[64px] w-64 text-sm"
        name="client"
      />
    </>
  );
}
