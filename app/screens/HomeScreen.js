import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { get } from '../utils/ReqApi';
import { deletarId, getId } from '../utils/OpId';

export default function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [userId, setUserId] = useState([]);

  const logout = async () => {
    deletarId();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

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
    const fetchProdutos = async () => {
      const response = await get('/produto');
      if (response && response.produtos) {
        setProdutos(response.produtos);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <View style={styles.topIcons}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(produtos).map(([categoriaNome, produtosDaCategoria]) => (
          <View key={categoriaNome} style={styles.section}>
            <Text style={styles.sectionTitle}>{categoriaNome}</Text>
            <View style={styles.popularGrid}>
              <FlatList
                horizontal
                data={produtosDaCategoria}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.popularItem}
                    onPress={() => navigation.navigate('Product', { produtoId: item.id })}
                  >
                    <Image source={{ uri: item.imagem_url }} style={styles.popularImage} />
                    <Text style={styles.popularPrice}>{item.preco}</Text>
                    <Text style={styles.popularName}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />

            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Orders')}
        >
          <Ionicons name="list" size={24} color="#666" />
          <Text style={[styles.navText, { color: '#666' }]}>Carrinho</Text>
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  topIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#8B5CF6',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerPrice: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  bannerImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  featuredSection: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  featuredItem: {
    marginRight: 15,
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  popularGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  popularPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  popularName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
});