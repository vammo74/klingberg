import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import ButtonPicture from './ButtonPicture';

const PopUp = props => {
  useEffect(() => {
    console.log('mount popup');
    return () => {
      console.log('unmount popup');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={props.closePopup} style={styles.underlay} />
      <View style={styles.window}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.h1}>Multiplikation Övningar</Text>
          <Text style={styles.h2}>
            Lär dig att kommer ihåg multiplikationstabellen.
          </Text>
          <Text style={styles.h3}>Premiss</Text>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>UI</Text>
          <Text style={styles.p}>ToDo....</Text>
          <View style={styles.appImageContainer}>
            <Image
              source={require('../graphics/apppicture.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.h3}>Skärm</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../graphics/screenpicture.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Number Pad</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../graphics/numberpadpicture.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Interaktiva tabellen</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../graphics/tablepicture.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Nivå och Timer inställning</Text>
          <Text style={styles.p}>
            Med programmet stoppat kan man ändra nivån och timerhastighet.
          </Text>
          <Text style={styles.p}>
            <Text style={styles.bold}>Nivån</Text> ändras genom att skiva in 13
            och den önskade nivå (1 till 9). Till exempel, för att välja nivå 4,
            tryck:
          </Text>
          <ButtonPicture combo="134" />
          <Text style={styles.p}>
            <Text style={styles.bold}>Timerhastighet</Text> ändras genom att
            skriva in 77 och önskade nivån (1 till 9), 1 är långsam och 9
            snabbt. Till exempel, för att välja nivå 4, tryck:
          </Text>
          <ButtonPicture combo="774" />
        </ScrollView>
        <View style={styles.panel}>
          <Button onPress={props.closePopup} title="Close" />
          <Button onPress={props.onClear} title="Clear" />
          <Button onPress={props.onSave} title="Save" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  window: {
    backgroundColor: '#ccc',
    width: '85%',
    height: '85%',
    alignSelf: 'center',
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 5,
  },
  scrollView: {
    backgroundColor: '#fff',
    margin: '5%',
  },
  panel: {
    flexDirection: 'row',
  },
  underlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.5,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    height: 300,
  },
  appImageContainer: {
    flex: 1,
    height: 400,
  },
  h1: {
    color: '#19386b',
    fontSize: 25,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    color: '#19386b',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  h3: {
    color: '#19386b',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: 'bold',
  },
  p: {
    flexDirection: 'row',
    color: '#224c91',
    fontSize: 15,
    marginBottom: 4,
    marginTop: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PopUp;
