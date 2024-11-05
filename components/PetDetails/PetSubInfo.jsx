import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import PetSubInfoCard from './PetSubInfoCard'

export default function PetSubInfo({ pet }) {
  return (
    <View style={{
      paddingHorizontal: 20
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <PetSubInfoCard 
        icon={require('./../../assets/images/calendar.png')}
        title={'Age'}
        value={pet?.age+" Anos"}
        />
        <PetSubInfoCard 
        icon={require('./../../assets/images/bone.png')}
        title={'Raça'}
        value={pet?.breed}
        />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <PetSubInfoCard 
        icon={require('./../../assets/images/sex.png')}
        title={'Sexo'}
        value={pet?.sex}
        />
        <PetSubInfoCard 
        icon={require('./../../assets/images/weight.png')}
        title={'Peso'}
        value={pet?.weight+" kg"}
        />
      </View>
    </View>
  )
}