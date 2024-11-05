import { View, Text, Image, StyleSheet, TextInput, ScrollView, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function addNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(
    { category: 'Cachorros', sex: 'Macho' }
  );
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Registrar Pet'
    })
    GetCategories();
  }, [])


  const GetCategories = async () => {
    setCategoryList([])
    const snapshot = await getDocs(collection(db, 'Category'))
    snapshot.forEach((doc) => {
      setCategoryList(categoryList => [...categoryList, doc.data()])
    })
  }


  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show('Insira todos os campos', ToastAndroid.SHORT)
      return;
    }

    UploadImage();
  }

  const UploadImage = async () => {
    setLoader(true);

    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, `/PetAdopt/${Date.now()}.jpg`);

    uploadBytes(storageRef, blobImage).then(() => {
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        SaveFormData(downloadUrl);
      });
    });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, 'Pets', docId), {
        ...formData,
        imageUrl: imageUrl,
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docId
      });
      ToastAndroid.show('Pet registrado com sucesso!', ToastAndroid.SHORT);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      ToastAndroid.show('Erro ao salvar os dados do pet', ToastAndroid.SHORT);
    } finally {
      setLoader(false);
    }
  };
  
  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20
      }}>Registrar Pet para adoção</Text>

      <Pressable onPress={imagePicker}>
        {!image ? <Image source={require('./../../assets/images/pata.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            borderColor: Colors.GRAY
          }}
        /> :
          <Image source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderColor: Colors.GRAY
            }} />}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue)
            handleInputChange('category', itemValue)
          }}>
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Raça</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('breed', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Idade</Text>
        <TextInput style={styles.input}
          keyboardType='numeric-pad'
          onChangeText={(value) => handleInputChange('age', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue)
            handleInputChange('sex', itemValue)
          }}>
          <Picker.Item label="Macho" value="macho" />
          <Picker.Item label="Fêmea" value="femea" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso</Text>
        <TextInput style={styles.input}
          keyboardType='numeric-pad'
          onChangeText={(value) => handleInputChange('weight', value)} />


      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Endereço</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sobre</Text>
        <TextInput style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about', value)} />
      </View>

      <TouchableOpacity

        style={styles.button}
        disabled={loader}
        onPress={onSubmit}>
        {loader ? <ActivityIndicator size={'large'} /> :
          <Text style={{
            fontFamily: 'outfit-medium',
            textAlign: 'center'
          }}>Registrar</Text>}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: 'outfit'
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit'

  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50

  }
})