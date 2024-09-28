import React from "react";
import SelectReactSelect from "react-select";
import { ItemGet } from "@/models/items";

interface ItemSelectProps {
  itemList: ItemGet[];
  handleInputChange: (e: string) => void;
  handleSelect: (e: ItemGet) => void;
  isLoading: boolean;
}
interface OptionsProps {
  value: ItemGet;
  label: string;
}

export default function ItemSelect({
  itemList,
  handleInputChange,
  handleSelect,
  isLoading,
}: ItemSelectProps) {
  const options = itemList.map((item) => ({
    value: item,
    label: `${item.code} - ${item.name}`,
  }));

  const handleOnchange = (e: OptionsProps) => {
    handleSelect(e.value);
  };

  return (
    <>
      <SelectReactSelect
        options={options}
        onChange={(e) => handleOnchange(e as unknown as OptionsProps)}
        value={null}
        onInputChange={(e) => {
          handleInputChange(e);
        }}
        className="min-w-[64px] w-64 text-sm z-10"
        isLoading={isLoading}
      />
    </>
  );
}
