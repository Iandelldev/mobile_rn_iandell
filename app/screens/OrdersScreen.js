import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getId } from '../utils/OpId';
import { deleteF, get } from '../utils/ReqApi';

export default function OrdersScreen({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function checkLogin() {
      const id = await getId();
      if (id) {
        setUserId(id)
      }
      else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }
    checkLogin();
  }, [])

  useEffect(() => {
    const fetchCarrinho = async () => {
      if (!userId) return;
      const response = await get('/carrinho/' + userId);
      if (response && response.carrinho) {
        setCarrinho(response.carrinho);
      }
    };

    fetchCarrinho();
  }, [userId]);

  const updateQuantity = (id, change) => {
    setCarrinho(items =>
      items.map(item =>
        item.id === id && ((change < 0 && item.quantidade > 1) || (change > 0))
          ? { ...item, quantidade: Math.max(1, parseInt(item.quantidade) + change) }
          : item
      )
    );
  };

  const removeItem = async (id) => {
    const response = await deleteF('/carrinho/' + userId, {id_carrinho: id});
    if (response && response.success) {
      setCarrinho(items => items.filter(item => item.id !== id));
    }
  };

  const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Seus pedidos</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Itens</Text>
          <Text style={styles.headerText}>Qnt</Text>
          <Text style={styles.headerText}>Preço</Text>
        </View>

        {carrinho.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Image source={{ uri: item.imagem_url }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash-outline" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantidade}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.itemPrice}>R${(item.preco * item.quantidade).toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>R${subtotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  addDetails: {
    paddingVertical: 20,
  },
  addDetailsText: {
    color: '#666',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtotalValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});