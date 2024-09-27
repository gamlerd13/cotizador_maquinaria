import { Input } from "@nextui-org/react";
import React, { ChangeEvent, useRef } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";

interface InputSearch {
  value: string;
  setValue: (value: string) => void;
}
export function InputSearch({ value, setValue }: InputSearch) {
  const debounceRef = useRef<NodeJS.Timeout>();
  const handleSearchFilterDebounce = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setValue(e.target.value);
    }, 300);
  };

  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Buscar..."
      startContent={<IoSearchCircleOutline width={32} className="text-xl" />}
      // value={value}
      // onValueChange={(e) => handleSearchFilterDebounce(e)}
      onChange={(e) => handleSearchFilterDebounce(e)}
    />
  );
}
