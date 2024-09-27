import React, { ChangeEvent, useState } from "react";
import SelectReactSelect, { PropsValue } from "react-select";
import { useInputSearchItem } from "@/app/hooks/items/useInputSearchItem";
import { ItemGet } from "@/models/items";

interface ItemSelectProps {
  itemList: ItemGet[];
  handleInputChange: (e: string) => void;
  handleSelect: (e: ItemGet) => void;
  isLoading: boolean;
}
interface Option {
  value: ItemGet;
  label: string;
}

export default function ItemSelectV2({
  itemList,
  handleInputChange,
  handleSelect,
  isLoading,
}: ItemSelectProps) {
  const [inputSearchValue, setInputSearchValue] =
    useState<PropsValue<string>>("");

  const options: Option[] = itemList.map((client) => ({
    value: client,
    label: `${client.code} - ${client.name}`,
  }));

  const handleOnchange = (item: ItemGet) => {
    handleSelect(item);
    setInputSearchValue("");
  };

  return (
    <SelectReactSelect
      options={options}
      onChange={(e) => handleOnchange(e?.value)}
      value={inputSearchValue}
      onInputChange={(e) => {
        handleInputChange(e);
      }}
      className="min-w-[64px] w-64 text-sm z-10"
      isLoading={isLoading}
    />
  );
}
