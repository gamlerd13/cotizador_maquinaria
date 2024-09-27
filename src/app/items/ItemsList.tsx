import React, { useMemo } from "react";
import ItemTable from "./ItemTable";
import { useItems } from "./hooks/useItems";

function ItemsList() {
  const { items, isLoading, updateItem, createItem, deleteItem } = useItems();

  return (
    <div>
      <ItemTable
        useItems={{ items, updateItem, createItem, isLoading, deleteItem }}
      />
    </div>
  );
}

export default ItemsList;
