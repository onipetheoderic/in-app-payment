/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  initConnection,
  getSubscriptions,
  getProducts,
  getAvailablePurchases,
  Subscription,
  Purchase,
  Product,
  requestSubscription,
  requestPurchase,
} from 'react-native-iap';

function App(): JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const subscriptionSkus = Platform.select({
    default: ['yearly_subscription', 'monthly_subscription', 'weekly_subscription', 'two_month_subscription'],
  }) as string[];

  const productSkus = Platform.select({
    default: ['gold_level', 'silver_level', 'bronze_level', 'buy_100_coins', 'buy_1000_coins'],
  }) as string[];

  const handleGetSubscriptions = async () => {
    try {
      const subs = await getSubscriptions({ skus: subscriptionSkus });
      console.log(subs, '==subs');
      setSubscriptions(subs);
    } catch (error) {
      console.log({ message: 'handleGetSubscriptions', error });
    }
  };

  const handleGetProducts = async () => {
    try {
      const products = await getProducts({ skus: productSkus });
      // products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)).reverse();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAvailablePurchases = async () => {
    try {
      const purchases = await getAvailablePurchases();
      setPurchases(purchases);
      console.group('purchase', purchases);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestItem = async (sku, type) => {
    if (type === 'subs') {
      try {
        requestSubscription({ sku });
      } catch (error) {
        console.log(error);
      }

    }
    if (type === 'iap') {
      try {
        requestPurchase({ sku });
      }
      catch (error) {
        console.log(error);
      }

    }
  };


  useEffect(() => {
    try {
      initConnection();
      handleGetSubscriptions();
      handleGetProducts();
      handleGetAvailablePurchases();
    } catch (err) {
      console.log('error in initialization', err);
    }
  }, []);

  const renderItem = ({ item }: { item: Subscription | Product | Purchase }) => {
    return (
      <View style={styles.subscription}>
        <Text>{item.productId}</Text>
        <Text style={styles.price}>{item.localizedPrice} <Text style={styles.currency}>{item.currency}</Text></Text>
        <TouchableOpacity onPress={() => handleRequestItem(item.productId, item.type)} ><Text>Request</Text></TouchableOpacity>
      </View>
    );
  };

  const renderSeparator = (): JSX.Element => (
    <View style={styles.itemSeparator} />
  );

  const renderListHeader = (): JSX.Element => (
    <View style={styles.listHeader}>
      <Text style={styles.header}>Subscription Listing</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscriptions</Text>
      <View>
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          data={subscriptions}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          horizontal
        />
      </View>

      <View style={styles.separator} />

      <Text style={styles.title}>Products</Text>
      <View>
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          data={products}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          horizontal
        />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    marginTop: 50,
    marginHorizontal: 15,
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
  },
  currency: {
    fontSize: 22,
  },
  listHeader: {
    backgroundColor: 'green',
    marginVertical: 50,
  },
  header: {
    color: 'black',
    fontSize: 20,
  },

  subscription: {
    width: 200,
    height: 150,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeparator: {
    width: 20,
  },
});

export default App;
