import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, 'Sliders'));
    const slidersData = snapshot.docs.map(doc => doc.data());
    setSliderList(slidersData);
  };

  return (
    <View style={{
      marginTop: 15
    }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.sliderItem}>
            <Image source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sliderImage: {
    width: Dimensions.get('screen').width*0.9,
    height: 170,
    borderRadius: 10,
    borderRadius: 15,
    marginRight: 15
  },
});
