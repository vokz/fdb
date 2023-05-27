import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import styles from '../style/styles';

class Contact extends React.Component {

  render() {
    return (
        <View>
            <Text style={styles.profileHeader}>Contact &  Address</Text>
            
            <View style={styles.formGroup}>

                <Text>Contact (Telepono):</Text>
                <TextInput placeholder='+639' style={styles.textInput}/>
            </View>

            <View style={styles.formGroup}>
                <Text>Current Address (Kasalukuyang Tirahan):</Text>
                <TextInput 
                placeholder='Current Address' 
                style={styles.textArea} 
                multiline = {true}
                numberOfLines = {4}/>

            </View>

            <View style={styles.formGroup}>
                <Text>Permanent Address (Permanenteng Tirahan):</Text>
                <TextInput 
                placeholder='Permanent Address' 
                style={styles.textArea} 
                multiline = {true}
                numberOfLines = {4}/>

            </View>

            <TouchableOpacity style={styles.formBtn} onPress={() => this.props.navigation.navigate('Work Information')}>
                <Text style={styles.whiteButton}>Next</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

export default withNavigation(Contact);
