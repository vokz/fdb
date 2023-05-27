import React from 'react';
import { Text, View, Button, Image, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native';
import CarouselCards from '../CarouselCards';
import styles from '../style/styles';

import { withNavigation } from '@react-navigation/compat';


class Home extends React.Component{
    render(){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CarouselCards/>
          <Image source={require('../assets/logo.png')} style={styles.hederImage} />
          <Text style={styles.homeText}>Design and Specifications</Text>
    
          <TouchableOpacity style={styles.applyBtn} onPress={() => this.props.navigation.navigate('Application Form')}>
            <Text style={styles.whiteButton}>Apply Now</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.checkStatusBtn} onPress={() => this.props.navigation.navigate('Check Status')}>
            <Text style={styles.whiteButton}>Check Status</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }


  export default withNavigation(Home);