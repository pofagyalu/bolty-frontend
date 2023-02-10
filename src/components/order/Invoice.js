import React from 'react';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const Invoice = ({ order }) => (
  <Document>
    <Page size='A4' style={styles.body}>
      <View style={styles.section}>
        <Text style={styles.header} fixed>
          {' '}
          ~ {new Date().toLocaleDateString()} ~
        </Text>
        <Text style={styles.title} fixed>
          {' '}
          Rendelés számla
        </Text>
        <Text style={styles.author}>Bolty bódorgó Kft.</Text>
        <Text style={styles.subtitle}> Rendelés összefoglaló</Text>
        Táblázat
        <Text style={styles.text}>
          <Text>
            Dátum: {'                   '}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {'\n'}
          <Text>
            Rendelési azonosító: {'            '}
            {order.paymentIntent.id}
          </Text>
          {'\n'}
          <Text>
            Rendelés állapota: {'              '}
            {order.orderStatus}
          </Text>
          {'\n'}
          <Text>
            Összes fizetés: {'                 '}
            {order.paymentIntent.amount}
          </Text>
        </Text>
        <Text style={styles.footer}> ~ Köszönjük, hogy nálunk vásárolt ~ </Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
