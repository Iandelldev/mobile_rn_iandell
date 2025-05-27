import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { get, post } from '../utils/ReqApi';
import { getId } from '../utils/OpId';

export default function ProductScreen({ navigation, route }) {
  const { produtoId } = route.params;

  const [userId, setUserId] = useState();
  const [produto, setProduto] = useState([]);
  const [produtoQuantidade, setProdutoQuantidade] = useState(1);

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
    const fetchProduto = async () => {
      const response = await get('/produto/' + produtoId);
      if (response && response.produto) {
        setProduto(response.produto);
      }
    };

    fetchProduto();
  }, []);

  const handleAddCarrinho = () => {
    post('/carrinho/' + userId, { id_produto: produtoId, quantidade: produtoQuantidade }, (data) => {
      navigation.navigate('Orders');
    });
  };

  const updateQuantity = (change) => {
    if ((change < 0 && produtoQuantidade > 1) || (change > 0 && produtoQuantidade < produto.estoque)) {
      setProdutoQuantidade(produtoQuantidade + change)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: produto.imagem_url }} style={styles.productImage} />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.price}>R$ {produto.preco}</Text>
          <Text style={styles.installments}>{produto.estoque}</Text>

          <Text style={styles.productName}>{produto.nome}</Text>

          <Text style={styles.productDesc}>{produto.descricao}</Text>
        </View>
      </ScrollView>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(-1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{produtoQuantidade}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddCarrinho}>
          <Text style={styles.buyButtonText}>Adicionar ao carrinho</Text>
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
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  installments: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  productDesc: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  buyButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});