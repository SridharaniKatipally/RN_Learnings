import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type TransactionCardProps = {
  title: string;
  amount: number;
  date: string;
  icon: string;
};

export default function TransactionCard({ title, amount, date, icon }: TransactionCardProps) {
  const isIncome = amount > 0;
  
  return (
    <View style={styles.card}>
      <Image source={{ uri: icon }} style={styles.cardIcon} />
      
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{date}</Text>
      </View>
      
      <Text style={[
        styles.cardAmount, 
        { color: isIncome ? '#2ecc71' : '#000' }
      ]}>
        {isIncome ? '+' : ''}₹{Math.abs(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardDate: {
    fontSize: 13,
    color: '#8e8e93',
    marginTop: 4,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});