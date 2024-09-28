import React from "react";
import SelectReactSelect from "react-select";
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
  const options: Option[] = itemList.map((item) => ({
    value: item,
    label: `${item.code} - ${item.name}`,
  }));

  const handleOnchange = (e: Option) => {
    handleSelect(e.value);
  };

  return (
    <SelectReactSelect
      options={options}
      onChange={(e) => handleOnchange(e as unknown as Option)}
      value={null}
      onInputChange={(e) => {
        handleInputChange(e);
      }}
      className="min-w-[64px] w-64 text-sm z-10"
      isLoading={isLoading}
    />
  );
}
