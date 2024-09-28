import React, { useState } from "react";
import { Client } from "@/models/client";
import SelectReactSelect from "react-select";

interface ClientSelectProps {
  clientList: Client[];
  handleSelect: (client: Client | null) => void;
}
interface OptionsProps {
  value: Client;
  label: string;
}

export function ClientSelectV2({
  clientList,
  handleSelect,
}: ClientSelectProps) {
  const options = clientList.map((client) => ({
    value: client, // El objeto cliente completo
    label: client.name, // El nombre del cliente que se muestra en el select
  }));
  const [clientSelected, setClientSelected] = useState<OptionsProps | null>(
    null
  );

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
