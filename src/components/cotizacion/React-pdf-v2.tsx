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
} from "@/models/cotizacion";
import { getDateHour } from "@/lib/main";
import { table } from "console";

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
    totalPrice,
    cotizacionItem,
  } = cotizacion;

  const formattedDate = getDateHour(date);
  const formattedTotalPrice = totalPrice.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
          <View>
            <Image src="/logo1.jpg" style={{ width: 165, height: 22 }} />
            <View style={[{ paddingHorizontal: 8 }]}>
              <Text>VORAZ DEL PERU SAC</Text>
              <Text>AV.MARISCAL NIETO N°326, URB.</Text>
              <Text>R.U.C. 20498189394</Text>
            </View>
            <View style={[{ paddingHorizontal: 8 }]}>
              <Text>Señor (a) (es):</Text>
              <Text>ITALTRAC SELVA SAC</Text>
              <Text>
                AV. UNION NRO. 1199 UCAYALI Coronel Portillo Coronel Portillo
              </Text>
              <Text>RUC: 20285093245</Text>
              <Text>Teléfono/Fax:</Text>
            </View>
          </View>
          <View>
            <Image src="/logo1.jpg" style={{ width: 165, height: 22 }} />
          </View>
          <View style={[{ paddingHorizontal: "8px", width: "100%" }]}>
            <Image src="/logo1.jpg" style={{ width: 165, height: 22 }} />

            <View style={[{ paddingHorizontal: "8px", width: "100%" }]}>
              <Text style={[{ fontSize: 14, fontWeight: 700 }]}>
                COTIZACION Nº 0007 - 0000003259
              </Text>

              {/* table header */}
              <View style={[{ paddingHorizontal: "8px", width: "100%" }]}>
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableColHeader}>
                    <Text style={stylestable.tableCell}>Item</Text>
                  </View>
                </View>

                {/* Table items */}
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableCol}>
                    <Text style={stylestable.tableCell}>
                      {unregisteredClientContact}
                    </Text>
                  </View>
                </View>
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableCol}>
                    <Text style={stylestable.tableCell}>
                      {unregisteredClientContact}
                    </Text>
                  </View>
                </View>
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableCol}>
                    <Text style={stylestable.tableCell}>
                      {unregisteredClientContact}
                    </Text>
                  </View>
                </View>
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableCol}>
                    <Text style={stylestable.tableCell}>
                      {unregisteredClientContact}
                    </Text>
                  </View>
                </View>
                <View style={stylestable.tableRow}>
                  <View style={stylestable.tableCol}>
                    <Text style={stylestable.tableCell}>
                      {unregisteredClientContact}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.startLogo} fixed>
          <Image src="/logo1.jpg" style={{ width: 165, height: 22 }} />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{formattedDate[0]}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, styles.boldText]}>
              COTIZACIÓN No {code}
            </Text>
          </View>
        </View>

        <View style={styles.companyInfoContainer}>
          <View style={styles.cellCompanyInfo}>
            <Text style={styles.companyInfo}>Razón social: MOVENTO S.A.C.</Text>
            <Text style={styles.companyInfo}>RUC: 20611599308</Text>
            <Text style={styles.companyInfo}>
              Calle Parque San Martin 376 - Pueblo Libre
            </Text>
          </View>
          <View style={styles.cellCompanyInfo}>
            <Text style={styles.companyInfo}>Telefono: 902196904</Text>
            <Text style={styles.companyInfo}>
              Correo:{" "}
              <Text style={{ color: "#00109e" }}>ventas@moventodrives.com</Text>
            </Text>
          </View>
        </View>

        <View style={styles.clientInfoContainer}>
          <Text style={styles.clientInfoHeader}>CLIENTE:</Text>
          <View style={styles.clientInfo}>
            <View style={styles.cellClientInfo}>
              <Text>Razón social: {client?.name}</Text>
              <Text>Contacto: {client?.contact}</Text>
              <Text>Referencia: {client?.reference}</Text>
            </View>
            <View style={styles.cellClientInfo}>
              <Text>Ruc: {client?.ruc}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Item
            </Text>
            <Text style={[styles.tableCell, { flex: 10 }]}>Descripción</Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              Cant.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              P.U.
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
              Precio total S/.
            </Text>
          </View>
          {itemsFormatted.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.id}
              </Text>
              <View
                style={[
                  styles.tableCell,
                  { flexDirection: "column", flex: 10 },
                ]}
              >
                <Text style={styles.itemDescription}>
                  Name: {item.item.name}
                </Text>
                <Text>Code: {item.item.code}</Text>
              </View>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.amount}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {item.unitPrice}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {item.totalPrice}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalPrice}>
          <Text style={styles.cellTotalPrice}>
            PRECIO DE VENTA TOTAL (NO INCLUYE I.G.V.){" "}
          </Text>
          <Text style={styles.cellTotalPrice}> S/. {formattedTotalPrice}</Text>
        </View>

        <View style={styles.tableFooter}>
          <Text>TIEMPO DE ENTREGA: </Text>
          <Text>{deliverTime}</Text>
        </View>

        <View style={styles.termsInfoContainer}>
          <Text style={styles.termsInfoHeader}>CONDICIONES COMERCIALES:</Text>
          <View style={styles.termsInfo}>
            <Text style={styles.boldText}>CONDICIÓN DE PAGO: </Text>
            <Text style={styles.paymentCondition}>
              {paymentCondition || "A tratar"}.
            </Text>
          </View>
          <View style={styles.termsInfo}>
            <Text style={styles.boldText}>VALIDEZ DE LA OFERTA: </Text>
            <Text>30 días.</Text>
          </View>
          <View style={styles.termsInfo}>
            <Text style={styles.boldText}>GARANTIA: </Text>
            <Text>
              La garantía es por 6 meses luego de la puesta en servicio.
            </Text>
          </View>
          <Text style={[styles.termsInfo, styles.boldText]}>
            No CUENTA BANCARIA DE MOVENTO S.A.C.
          </Text>
          <Text style={styles.termsInfo}>
            {[
              "BANCO INTERBANK",
              "SOLES: 200-3005630612",
              "CCI SOLES: 003-200-003005630612-36",
              "DOLARES: 200-003005630620",
              "CCI DOLARES: 003-200-003005630620-39",
              "Cuenta detracción del banco de la nación - Cuenta Corriente: 00-002-212722",
            ].join("\n")}
          </Text>
        </View>
        <View style={styles.endLogo}>
          <Image
            src="/logo_movento_drives.png"
            style={{ width: 140, height: 160 }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default ReactPdfComponentV2;

const stylestable = StyleSheet.create({
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 4,
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 4,
    textAlign: "center",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
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
  },
  tableHeader: {
    backgroundColor: "#002060",
    color: "#fff",
    padding: 5,
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
    textAlign: "center",
  },
});
