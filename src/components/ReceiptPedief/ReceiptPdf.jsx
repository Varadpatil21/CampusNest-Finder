
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ReceiptPdf = ({ bookedRoom }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Receipt for Booking</Text>
        <Text>Room Name: {bookedRoom.name}</Text>
        <Text>Description: {bookedRoom.description}</Text>
        <Text>Type: {bookedRoom.type}</Text>
        <Text>Rent: ₹{bookedRoom.rent}</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPdf;
