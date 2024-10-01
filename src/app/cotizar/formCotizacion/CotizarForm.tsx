"use client";
// React hooks
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

// ui componets
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox, DatePicker, DateValue } from "@nextui-org/react";

//components
import ProductItem from "./ProductItem";
import ItemSelect from "./ItemSelect";
import { ClientSelectV2 } from "./ClientSelect";
import ButtonSubmit from "@/components/Button";

// Hooks
import useDinamicItems from "../hooks/useDinamicItems";
import { useGetClientList } from "@/app/hooks/clients/useClient";
import { useCodeCotizacion } from "@/app/hooks/cotizacion/useCodeCotizacion";
import { useInputSearchItem } from "@/app/hooks/items/useInputSearchItem";
import { useDateTime } from "@/app/hooks/common/useDateTime";

// Libs third party
import { I18nProvider } from "@react-aria/i18n";
import { usePostCotizacion } from "@/app/hooks/cotizacion/useCotizacion";
import { now, getLocalTimeZone } from "@internationalized/date";

//constant
import { IGV } from "@/constant/finance";

//types
import { Client } from "@/models/client";
import { ItemGet } from "@/models/items";
import {
  CotizacionFormDataPost,
  CotizacionFormDataPut,
  UnregisteredClientForm,
} from "@/models/cotizacion";
import { toast } from "sonner";
import { Currency } from "prisma/prisma-client";

interface CotizacionValue {
  clientId: number | null;
  date: DateValue;
  deliverTime: string;
  paymentCondition: string;
  deliverPlace: string;
  offerValidity: string;
  generalCondicion: string;
  comments: string;
  currency: Currency;
  totalPrice: number;
  isEdit: boolean;
  includeIgv: boolean;
}

const clientInitialValues = {
  unregisteredClientName: "",
  unregisteredClientContact: "",
  unregisteredClientReference: "",
  unregisteredClientRuc: "",
};

function CotizarForm() {
  const { dinamicItems, addItem, setDinamicItems, updateItem, removeItem } =
    useDinamicItems();
  const { addNewCotizacion } = usePostCotizacion();

  const [clientValues, setClientValues] =
    useState<UnregisteredClientForm>(clientInitialValues);

  const [cotizacionValues, setCotizacionValues] = useState<CotizacionValue>({
    clientId: null,
    date: now(getLocalTimeZone()),
    currency: Currency.SOLES,
    deliverTime: "",
    paymentCondition: "",
    deliverPlace: "",
    offerValidity: "",
    generalCondicion: "",
    comments: "",
    totalPrice: 0.0,
    isEdit: false,
    includeIgv: false,
  });

  const {
    items: productsSearch,
    getItems: getProductsSearch,
    isLoading: isLoadingProductsSearch,
  } = useInputSearchItem();

  const debounceInputSearchRef = useRef<NodeJS.Timeout>();

  const { clientList, isLoading: isLoadingClient } = useGetClientList();
  const { currentDateTime } = useDateTime();
  const { lastCodeCotizacion } = useCodeCotizacion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dinamicItems.length === 0)
      return toast.error("Agregar al menos un producto");
    const cotizacionFormData: CotizacionFormDataPost = {
      ...cotizacionValues,
      totalPrice: cotizacionValues.includeIgv
        ? parseFloat((totalPrice + totalPrice * (IGV / 100)).toFixed(2))
        : parseFloat(totalPrice.toFixed(2)),
      items: dinamicItems.map(({ item, key, ...dinamicItem }) => ({
        ...dinamicItem,
        itemId: item.id,
      })),
      ...clientValues,
      date: new Date(cotizacionValues.date.toDate("es-Es")),
      unregisteredClientName: "Sin cliente",
    };
    console.log(cotizacionFormData);
    await addNewCotizacion(cotizacionFormData);
  };

  const handleClientSelect = (client: Client | null) => {
    if (!client) {
      setClientValues(clientInitialValues);
      setCotizacionValues((prev) => ({ ...prev, clientId: null }));
    } else {
      setClientValues({
        unregisteredClientName: client.name,
        unregisteredClientContact: client.contact,
        unregisteredClientReference: client.reference,
        unregisteredClientRuc: client.ruc,
      });
      setCotizacionValues((prev) => ({ ...prev, clientId: client.id }));
    }
  };

  //debounce in lookup
  const handleInputChange = (e: string) => {
    if (debounceInputSearchRef.current) {
      clearTimeout(debounceInputSearchRef.current);
    }

    if (e !== "") {
      debounceInputSearchRef.current = setTimeout(() => {
        getProductsSearch(e);
      }, 300);
    }
  };

  const handleSelectItemSelect = (e: ItemGet) => {
    addItem(e);
  };

  const totalPrice = parseFloat(
    dinamicItems
      .reduce((accumulator, currentValue) => {
        return currentValue.totalPrice + accumulator;
      }, 0)
      .toFixed(2)
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium text-slate-600">Cliente</h1>
        <div className="flex gap-x-2">
          {clientList && !isLoadingClient && (
            <ClientSelectV2
              clientList={clientList}
              handleSelect={handleClientSelect}
            />
          )}
        </div>
      </div>
      <hr />
      <div className="w-full grid gap-y-2 mt-4">
        {lastCodeCotizacion && (
          <Input
            size="sm"
            className="md:col-span-1 font-bold"
            type="text"
            value={lastCodeCotizacion}
            label="Código"
            disabled
          />
        )}

        {cotizacionValues.clientId ? (
          <>
            <div className="grid md:grid-cols-2 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientName"
                value={clientValues.unregisteredClientName}
                label="Razón Social"
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientContact"
                value={clientValues.unregisteredClientContact}
                label="Contacto"
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientReference"
                value={clientValues.unregisteredClientReference}
                label="Referencia"
              />

              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientRuc"
                value={clientValues.unregisteredClientRuc}
                label="Ruc"
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-2">
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientName"
                label="Razón Social"
                value={clientValues.unregisteredClientName}
                onChange={(e) =>
                  setClientValues((prev) => ({
                    ...prev,
                    unregisteredClientName: e.target.value,
                  }))
                }
              />
              <Input
                size="sm"
                className="md:col-span-1"
                type="text"
                name="clientContact"
                onChange={(e) =>
                  setClientValues((prev) => ({
                    ...prev,
                    unregisteredClientContact: e.target.value,
                  }))
                }
                label="Contacto"
              />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-2 text-[20px]">
              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientReference"
                onChange={(e) =>
                  setClientValues((prev) => ({
                    ...prev,
                    unregisteredClientReference: e.target.value,
                  }))
                }
                label="Referencia"
              />

              <Input
                size="sm"
                className="md:col-span-1 "
                type="text"
                name="clientRuc"
                onChange={(e) =>
                  setClientValues((prev) => ({
                    ...prev,
                    unregisteredClientRuc: e.target.value,
                  }))
                }
                label="Ruc"
              />
            </div>
          </>
        )}
        {currentDateTime && (
          <I18nProvider locale="es-ES">
            <DatePicker
              label="Fecha"
              variant="bordered"
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={cotizacionValues.date}
              onChange={(e) =>
                setCotizacionValues((prev) => ({ ...prev, date: e }))
              }
            />
          </I18nProvider>
        )}
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center h-full">
            <div className="font-medium text-slate-600">
              <h1>Productos</h1>
              <span className="text-[12px]">
                Cantidad: {dinamicItems.length}
              </span>
            </div>
          </div>
          <div className="flex gap-x-2">
            <select
              className="text-sm block w-52 px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) =>
                setCotizacionValues((prevValues) => ({
                  ...prevValues,
                  currency: e.target.value as Currency,
                }))
              }
              value={cotizacionValues.currency}
            >
              {Object.values(Currency).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <ItemSelect
              itemList={productsSearch}
              handleSelect={handleSelectItemSelect}
              handleInputChange={handleInputChange}
              isLoading={isLoadingProductsSearch}
            />
          </div>
        </div>

        <div className="w-full pt-4">
          <div className="grid gap-2">
            {dinamicItems.length > 0 &&
              dinamicItems.map((dinamicItem, index) => (
                <ProductItem
                  setDinamicItems={setDinamicItems}
                  updateItem={updateItem}
                  dinamicItem={dinamicItem}
                  index={index + 1}
                  removeItem={removeItem}
                  key={dinamicItem.key}
                />
              ))}
          </div>
        </div>
      </div>

      {dinamicItems.length > 0 && (
        <div className="w-full pt-4">
          <div className="flex justify-end gap-x-2">
            <Checkbox
              size="sm"
              className="text-default"
              checked={cotizacionValues.includeIgv}
              onChange={(e) =>
                setCotizacionValues((prev: CotizacionValue) => ({
                  ...prev,
                  includeIgv: !prev.includeIgv,
                }))
              }
            >
              <span className="text-[12px] text-default-500">Incluye IGV</span>
            </Checkbox>
            <Input
              size="sm"
              className="max-w-[300px] z-0"
              label="Precio de Venta Total"
              type="number"
              name="totalPrice"
              startContent={<span>$. </span>}
              // value={totalPrice}
              value={
                cotizacionValues.includeIgv
                  ? (totalPrice + totalPrice * (IGV / 100)).toFixed(2)
                  : totalPrice.toFixed(2)
              }
            />
          </div>
        </div>
      )}

      <h1 className="font-medium text-slate-600">Condiciones Comerciales</h1>
      <hr />
      <div className="w-full">
        <div className="w-full pt-2 flex flex-col sm:flex-row gap-x-2 ">
          <Input
            size="sm"
            label="Plazo de Entrega"
            placeholder="4-6 semanas"
            name="deliverTime"
            value={cotizacionValues.deliverTime}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                deliverTime: e.target.value,
              }))
            }
            type="text"
          />

          <Input
            size="sm"
            label="Condición de Pago"
            name="paymentCondition"
            placeholder="50% con la OC, 50% c. entrega"
            value={cotizacionValues.paymentCondition}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                paymentCondition: e.target.value,
              }))
            }
            type="text"
          />
        </div>
        <div className="w-full pt-2 flex flex-col sm:flex-row gap-2 ">
          <Input
            size="sm"
            label="Lugar de Entrega"
            name="deliverPlace"
            placeholder="Tienda principal"
            value={cotizacionValues.deliverPlace}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                deliverPlace: e.target.value,
              }))
            }
            type="text"
          />

          <Input
            size="sm"
            label="Validez de oferta"
            name="offerValidity"
            placeholder="3 meses"
            value={cotizacionValues.offerValidity}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                offerValidity: e.target.value,
              }))
            }
            type="text"
          />
        </div>

        <div className="w-full pt-2 flex flex-col sm:flex-row gap-2 ">
          <Textarea
            size="sm"
            label="Condiciones Generales"
            name="generalCondicion"
            placeholder="Agregar condiciones extras ..."
            value={cotizacionValues.generalCondicion}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                generalCondicion: e.target.value,
              }))
            }
            type="text"
          />
        </div>
        <div className="w-full pt-2 flex flex-col sm:flex-row gap-2 ">
          <Textarea
            size="sm"
            label="Comentarios"
            name="comments"
            placeholder="Agregar comentarios"
            value={cotizacionValues.comments}
            onChange={(e) =>
              setCotizacionValues((prev) => ({
                ...prev,
                comments: e.target.value,
              }))
            }
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <ButtonSubmit text="Generar cotización" />
      </div>
    </form>
  );
}

export default CotizarForm;
