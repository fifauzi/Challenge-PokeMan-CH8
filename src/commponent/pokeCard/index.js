import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';

const Card = ({name, navigation}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {cardData: name})}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.imagebackground}>
          <Image
            source={require('../../assets/image/pokeball.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: '#FFE5B4',
    width: 170,
    height: 60,
    marginLeft: 3,
    marginTop: 10,
    borderColor: '#A8A4CE',
    borderWidth: 2,
  },
  imagebackground: {
    top: -30,
    // backgroundColor:'#FFE5B4',
    left: -100,
  },

  name: {
    fontSize: 20,
    top: 12,
    color: 'black',
    left: 5,
  },

  image: {
    position: 'absolute',
    width: 45,
    height: 45,
    left: 219,
    top: 10,
  },
});
