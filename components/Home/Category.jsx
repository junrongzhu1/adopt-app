import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig'
import Colors  from './../../constants/Colors'
import { TouchableOpacity } from 'react-native';

export default function Category({category}) {
  

  const [categoryList, setCategoryList]=useState([]);
  const [selectedCategory, setSelectedCategory]=useState('Dogs');

  useEffect(()=>{
    GetCategories();
  },[])

  const GetCategories = async() => {
    setCategoryList([])
    const snapshot = await getDocs(collection(db,'Category'))
    snapshot.forEach((doc)=>{
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }
  return (
    <View style={{
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
      }}>Category</Text>

      <FlatList
        data={categoryList}
        numColumns = {4}
        renderItem={({item,index})=>(
          <TouchableOpacity 
            onPress={()=> {
              setSelectedCategory(item.name);
              category(item.name);
            }}
          style={{
            flex:1
          }}>
            <View style ={[styles.container,
              selectedCategory==item.name&&styles.selectedCategoryContainer]}>
              <Image source={{uri:item?.imageUrl}}
                style={{
                  width:40,
                  height:40
                }}
              />
            </View>
            <Text style={{
              textAlign: 'center',
              fontFamily: 'outfit'
            }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    margin: 5,
    borderRadius: 15
  },
  selectedCategoryContainer:{
    backgroundColor:Colors.SECONDARY,
    borderColors: Colors.SECONDARY
  }
  
})