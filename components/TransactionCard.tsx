// SAPP/components/TransactionCard.tsx
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
      {/* 1. The Icon (Fixed Size) */}
      <Image source={{ uri: icon }} style={styles.cardIcon} />
      
      {/* 2. The Text (Flexible - Takes remaining space) */}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.cardDate}>{date}</Text>
      </View>
      
      {/* 3. The Amount (Fixed - Never shrinks) */}
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
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Center vertically
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2, // Shadow
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1, // ✨ MAGIC: This tells text to fill gap but stop before price
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#8e8e93',
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 70,
    textAlign: 'right',
  },
});