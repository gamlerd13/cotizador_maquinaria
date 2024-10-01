import React from "react";

import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import {
  CotizacionClientGet,
  CotizacionClientItemsGet,
  CotizacionGet,
  CurrencySymbol,
} from "@/models/cotizacion";
import { getDateHour } from "@/lib/main";
import { table } from "console";
import { bankAccounts, companyData } from "@/constant/companyData";
import { IGV } from "@/constant/finance";
import { UnitOfMeasureES } from "@/models/items";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const ReactPdfComponentV2 = ({
  cotizacion,
}: {
  cotizacion: CotizacionClientItemsGet;
}) => {
  const {
    client,
    unregisteredClientName,
    unregisteredClientContact,
    unregisteredClientReference,
    unregisteredClientRuc,
    code,
    date,
    deliverTime,
    paymentCondition,
    deliverPlace,
    offerValidity,
    generalCondicion,
    comments,
    totalPrice,
    currency,
    includeIgv,
    cotizacionItem,
  } = cotizacion;

  const clientData = {
    name: client ? client.name : unregisteredClientName,
    contact: client ? client.contact : unregisteredClientContact,
    reference: client ? client.reference : unregisteredClientReference,
    ruc: client ? client.ruc : unregisteredClientRuc,
  };

  const formattedDate = getDateHour(date);
  const formattedTotalPrice = totalPrice.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedTotalPriceNoIncludedIgv = includeIgv
    ? (totalPrice * (100 / (100 + IGV))).toFixed(2)
    : formattedTotalPrice;

  const formattedTotalPriceIgv = includeIgv
    ? (totalPrice - totalPrice * (100 / (100 + IGV))).toFixed(2)
    : (totalPrice * (IGV / 100)).toFixed(2);
  const formattedTotalPriceIncludeIgv = includeIgv
    ? formattedTotalPrice
    : (totalPrice + totalPrice * (IGV / 100)).toFixed(2);

  const itemsFormatted = cotizacionItem.map((item) => ({
    ...item,
    unitPrice: item.unitPrice.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    }),
    totalPrice: item.totalPrice.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    }),
  }));

  return (
    <Document style={styles.all}>
      <Page style={styles.page} orientation="landscape">
        <View
          style={[{ flexDirection: "row", justifyContent: "space-between" }]}
        >
          <View style={{ flex: 3, paddingHorizontal: 8 }}>
            <View style={{ paddingHorizontal: 4, flexDirection: "row" }}>
              <View>
                <Image src="/logov4.jpeg" style={{ width: 120 }} />
              </View>
            </View>
            <View style={[{ paddingVertical: 16 }]}>
              <Text
                style={[
                  styles.boldText,
                  {
                    color: "#012030",
                    paddingBottom: 4,
                  },
                ]}
              >
                ADIEL S.J. PARTS SOLUTIONS S.A.C
              </Text>
              <Text style={[styles.boldText]}>{companyData.location}</Text>
              <Text>R.U.C. {companyData.ruc}</Text>
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <Text>Señor (a) (es):</Text>
              <Text style={[styles.boldText]}>{clientData.name}</Text>
              <Text>{clientData.reference}</Text>
              <Text>RUC: {clientData.ruc}</Text>
              <Text>Teléfono/Fax: {clientData.contact}</Text>
            </View>
          </View>
          <View
            style={{ flex: 2, paddingHorizontal: 8, flexDirection: "column" }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image src="/logos-company.jpeg" style={{ width: 150 }} />
            </View>
            <Text
              style={[
                styles.boldText,
                {
                  color: "#012030",
                  textAlign: "center",
                  paddingHorizontal: 6,
                  paddingVertical: 8,
                },
              ]}
            >
              DISTRIBUIDOR DE REPUESTOS PARA JHON DEERE - KOMATSU - CAT - CASE -
              DOOSAN
            </Text>
          </View>
          <View style={[{ flex: 2, paddingHorizontal: 8, width: "100%" }]}>
            <View style={[{ paddingHorizontal: "8px", width: "100%" }]}>
              <Text style={[{ fontSize: 14, fontWeight: 700 }]}>
                COTIZACION Nº {code}
              </Text>

              {/* table header */}
              <View style={[{ paddingHorizontal: "8px", width: "100%" }]}>
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableColHeader}>
                    <Text style={stylesTable.tableCell}>
                      Fecha Emisión: {formattedDate[0]} a las {formattedDate[1]}
                    </Text>
                  </View>
                </View>

                {/* Table items */}
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCol}>
                    <Text style={stylesTable.tableCell}>
                      Condición de venta: {paymentCondition}
                    </Text>
                  </View>
                </View>
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCol}>
                    <Text style={stylesTable.tableCell}>
                      Validez de Oferta: {offerValidity}
                    </Text>
                  </View>
                </View>
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCol}>
                    <Text style={stylesTable.tableCell}>
                      Plazo de Entrega: {deliverTime}
                    </Text>
                  </View>
                </View>
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCol}>
                    <Text style={stylesTable.tableCell}>
                      Luega de Entrega: {deliverPlace}
                    </Text>
                  </View>
                </View>
                <View style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCol}>
                    <Text style={stylesTable.tableCell}>
                      Generar orden de compra a:{"\n"}
                      <Text>{companyData.companyNameLong}</Text>
                      {"\n"}
                      <Text>R.U.C {companyData.ruc}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Table */}

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              N° Item
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Código Art.</Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Numero de Parte.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Cantidad
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Und.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 6 }]}>
              Nombre
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
              Marca
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Peso Kg.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
              Precio unitario {CurrencySymbol[currency]}
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
              Precio venta {CurrencySymbol[currency]}
            </Text>
          </View>
          {itemsFormatted.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.item.code}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.item.partNumber}
              </Text>

              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.amount}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {UnitOfMeasureES[item.item.unitMeasure]}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 6 }]}>
                {item.item.name}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {item.item.brand}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.item.weight}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {item.unitPrice}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {item.totalPrice}
              </Text>
            </View>
          ))}
        </View>

        {/* Other */}

        <View style={styles.totalPrice}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontWeight: "normal",
                },
              ]}
            >
              <Text style={[styles.cellTotalPrice]}>Modeda</Text>
              <Text style={[styles.cellTotalPrice]}>
                {currency} {CurrencySymbol[currency]}
              </Text>
            </View>
            <View
              style={[
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={[styles.cellTotalPrice]}>VALOR DE VENTA</Text>
              <Text style={[styles.cellTotalPrice]}>
                {formattedTotalPriceNoIncludedIgv}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.cellTotalPrice]}>
                IGV ({IGV.toString()}) %
              </Text>
              <Text style={[styles.cellTotalPrice]}>
                {formattedTotalPriceIgv}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.cellTotalPrice]}>TOTAL VENTA</Text>
              <Text style={[styles.cellTotalPrice]}>
                {formattedTotalPriceIncludeIgv}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, fontSize: 8 }}>
            <Text>
              Sin otro particular de momento, nos despedimos de ustedes.
              Atentamente,
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Observaciones:</Text>

            <Text style={{ fontSize: 8 }}>{comments}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <Text>Condiciones generales:</Text>
            <Text style={{ fontSize: 8 }}>{generalCondicion}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Cuentas Bancarias: </Text>

            <View style={{ fontSize: 8, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {bankAccounts.map((bankAccount, index) => (
                  <View key={bankAccount.id}>
                    {index % 2 === 0 &&
                      bankAccount.accounts.map((account) => (
                        <View key={account.name}>
                          <Text>
                            {account.name} - {account.currencySymbol}{" "}
                            {account.creditCardnumber}
                          </Text>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
              <View style={{ flex: 1 }}>
                {bankAccounts.map((bankAccount, index) => (
                  <View key={bankAccount.id}>
                    {index % 2 !== 0 &&
                      bankAccount.accounts.map((account) => (
                        <View key={account.name}>
                          <View key={account.name}>
                            <Text>
                              {account.name} - {account.currencySymbol}{" "}
                              {account.creditCardnumber}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReactPdfComponentV2;

const stylesTable = StyleSheet.create({
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "column",
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 4,
    textAlign: "left",
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 4,
    textAlign: "left",
  },
  tableCell: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 8,
  },
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: "Roboto",
  },
  boldText: {
    fontWeight: "bold",
  },
  headerContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  startLogo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  endLogo: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  date: {
    fontSize: 12,
    marginBottom: 2,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  companyInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  cellCompanyInfo: {
    flex: 1,
    paddingLeft: 5,
  },
  companyInfo: {
    fontSize: 10,
  },
  clientInfoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 10,
    marginBottom: 8,
    paddingBottom: 5,
  },
  clientInfoHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
    marginBottom: 5,
  },
  clientInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cellClientInfo: {
    flex: 1,
    paddingLeft: 5,
  },
  termsInfoContainer: {
    fontSize: 10,
    marginBottom: 8,
    paddingBottom: 5,
  },
  termsInfoHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
    marginBottom: 10,
  },
  termsInfo: {
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paymentCondition: {
    flex: 1,
  },
  totalPrice: {
    flexDirection: "row",
    paddingRight: 15,
    marginBottom: 5,
    justifyContent: "flex-end",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    fontSize: 9,
  },
  cellTotalPrice: {
    paddingLeft: 15,
  },
  tableFooter: {
    flexDirection: "row",
    marginBottom: 9,
    marginRight: 15,
    justifyContent: "flex-end",
    fontSize: 8,
  },
  all: {
    fontSize: 10,
  },
  table: {
    paddingBottom: 5,
    fontSize: 8,
  },
  tableHeader: {
    backgroundColor: "#c42f29",
    color: "#fff",
    padding: 2,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  itemDescription: {
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  cellFlex: {
    textAlign: "left",
  },
});
