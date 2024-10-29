import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'

export default function Home() {
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
      <TouchableOpacity style={styles?.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={{
          fontFamily: 'outfit-medium',
          color:Colors.PRIMARY,
          fontSize: 18
        }}>Registrar Pet</Text>
      </TouchableOpacity>
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
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    borderStyle: 'dashed',
    justifyContent: 'center'
  }
})