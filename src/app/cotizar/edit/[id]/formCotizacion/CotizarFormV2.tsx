"use client";
// React hooks
import React, { useRef, useState } from "react";

// ui componets
import { Input, Textarea } from "@nextui-org/input";
import {
  Button,
  Checkbox,
  DatePicker,
  DateValue,
  Select,
  SelectItem,
} from "@nextui-org/react";

//components
import ProductItem from "./ProductItem";
import ItemSelectV2 from "./ItemSelectV2";
import ClientSelectV2 from "./ClientSelectV2";
import ButtonSubmit from "@/components/Button";

// Hooks
import { useGetClientList } from "@/app/hooks/clients/useClient";
import { useCodeCotizacion } from "@/app/hooks/cotizacion/useCodeCotizacion";
import { useInputSearchItem } from "@/app/hooks/items/useInputSearchItem";
import { useDateTime } from "@/app/hooks/common/useDateTime";

// Libs third party
import { I18nProvider } from "@react-aria/i18n";
import {
  usePostCotizacion,
  usePutCotizacion,
} from "@/app/hooks/cotizacion/useCotizacion";
import {
  now,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";

//constant
import { IGV } from "@/constant/finance";

//types
import { Client } from "@/models/client";
import { ItemGet } from "@/models/items";
import {
  CotizacionClientItemsGet,
  CotizacionFormDataPut,
  CurrencySymbol,
  UnregisteredClientForm,
} from "@/models/cotizacion";
import { toast } from "sonner";
import useDinamicItems from "../hooks/useDinamicItems";
import { useLastCodeCotizacion } from "@/app/hooks/cotizacion/useLastCodeCotizacion";
import { Currency } from "prisma/prisma-client";
import { useRouter } from "next/navigation";

interface CotizacionValue {
  clientId: number | null;
  date: DateValue;
  code: string;
  parentCode: string;
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

function CotizarFormV2({
  cotizacion,
}: {
  cotizacion: CotizacionClientItemsGet;
}) {
  const { dinamicItems, addItem, setDinamicItems, updateItem, removeItem } =
    useDinamicItems(cotizacion.cotizacionItem);
  const { updateCotizacion } = usePutCotizacion();

  const [clientValues, setClientValues] = useState<UnregisteredClientForm>({
    unregisteredClientName:
      (cotizacion.clientId && cotizacion.client?.name) ||
      cotizacion.unregisteredClientName,
    unregisteredClientContact:
      (cotizacion.clientId && cotizacion.client?.contact) ||
      cotizacion.unregisteredClientContact,
    unregisteredClientReference:
      (cotizacion.clientId && cotizacion.client?.reference) ||
      cotizacion.unregisteredClientReference,
    unregisteredClientRuc:
      (cotizacion.clientId && cotizacion.client?.ruc) ||
      cotizacion.unregisteredClientRuc,
  });

  const [cotizacionValues, setCotizacionValues] = useState<CotizacionValue>({
    clientId: cotizacion.clientId || null,
    code: cotizacion.code,
    currency: cotizacion.currency,
    parentCode: cotizacion.parentCode,
    date: parseAbsoluteToLocal(cotizacion.date),
    deliverTime: cotizacion.deliverTime,
    paymentCondition: cotizacion.paymentCondition,
    deliverPlace: cotizacion.deliverPlace,
    offerValidity: cotizacion.offerValidity,
    generalCondicion: cotizacion.generalCondicion,
    comments: cotizacion.comments,
    totalPrice: cotizacion.totalPrice,
    isEdit: true,
    includeIgv: cotizacion.includeIgv,
  });

  const {
    items: productsSearch,
    getItems: getProductsSearch,
    isLoading: isLoadingProductsSearch,
  } = useInputSearchItem();

  const debounceInputSearchRef = useRef<NodeJS.Timeout>();

  const { clientList, isLoading: isLoadingClient } = useGetClientList();
  const { currentDateTime } = useDateTime();
  const { lastCodeCotizacion } = useLastCodeCotizacion(cotizacion.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dinamicItems.length === 0)
      return toast.error("Agregar al menos un producto");
    const cotizacionFormData: CotizacionFormDataPut = {
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
      unregisteredClientName: "Sin cliente", //TODO: Porque hize esto
    };
    if (cotizacion.id)
      await updateCotizacion(cotizacion.id, cotizacionFormData);
  };

  const handleClientSelect = (client: Client | null) => {
    if (!client) {
      setCotizacionValues((prev) => ({ ...prev, clientId: null }));
      setClientValues(clientInitialValues);
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
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-medium text-slate-600">Cliente</h1>
        <div className="flex gap-x-2">
          {clientList && !isLoadingClient && (
            <ClientSelectV2
              clientList={clientList}
              handleSelect={handleClientSelect}
              clientInitialValue={cotizacion.client}
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
            value={`${cotizacion.parentCode}-${lastCodeCotizacion}`}
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
                value={clientValues.unregisteredClientContact}
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
                value={clientValues.unregisteredClientReference}
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
                value={clientValues.unregisteredClientRuc}
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
        <div className="flex justify-between items-center gap-x-2">
          <div className="flex items-center justify-center h-full">
            <div className="font-medium text-slate-600">
              <h1>Productos</h1>
              <span className="text-[12px]">
                Cantidad: {dinamicItems.length}
              </span>
            </div>
          </div>

          <div className="gap-2 sm:flex-row flex flex-col">
            <select
              className="text-sm block px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
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
            <ItemSelectV2
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
              // defaultChecked={cotizacionValues.includeIgv}
              defaultSelected={cotizacionValues.includeIgv}
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
              startContent={
                <span>{CurrencySymbol[cotizacionValues.currency]} </span>
              }
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
            className="z-0"
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
            className="z-0"
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
            className="z-0"
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
            className="z-0"
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
            className="z-0"
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
            className="z-0"
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
      <div className="flex justify-end pt-4 gap-x-2">
        <Button onPress={() => router.push("/cotizaciones")} color="default">
          Cancelar
        </Button>
        <ButtonSubmit text="Actualizar cotización" />
      </div>
    </form>
  );
}

export default CotizarFormV2;
