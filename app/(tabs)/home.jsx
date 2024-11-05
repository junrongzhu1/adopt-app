import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { Link, useNavigation } from 'expo-router'

export default function Home() {
  const navigation=useNavigation();

  useEffect(()=>{
      navigation.setOptions({
        headerTitle:'Add New Pet'
      })
  },[])
  return (
    <View style={{
      
      padding: 20,
      marginTop: 20,
    }}>

      { /* Header */}
      <Header />
      { /* Slider */}
      <Slider />
      { /* Category + List of Pets*/}
      <PetListByCategory />
      { /* Add New Pet Option */}
      <Link href={'/add-new-pet'}
      
      style={styles?.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={{
          fontFamily: 'outfit-medium',
          color:Colors.PRIMARY,
          fontSize: 18
        }}>Registrar Pet</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    borderStyle: 'dashed',
    justifyContent: 'center'
  }
})