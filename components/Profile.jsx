import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import RadioGroup from 'react-native-radio-buttons-group';
import styles from '../style/styles';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null,
    };
  }

  radioButtons = [
    {
      id: '1',
      label: 'Male',
      value: 'Male',
    },
    {
      id: '2',
      label: 'Female',
      value: 'Female',
    },
  ];

  submit = () => {
    // Get the input values
    const newData = {
      lastname: '...',
      firstname: '...',
      middlename: '...',
      // ... other input values
    };

    // Dispatch an action or call a function to update the data in the Redux store
    // updateData(newData);
    this.props.navigation.navigate('Contact Information');
  };

  render() {
    return (
      <View>
        <Text style={styles.profileHeader}>Personal Information</Text>

        <View style={styles.formGroup}>
          <Text>Lastname (Apelyido):</Text>
          <TextInput placeholder="ex. Juan Dela Cruz" style={styles.textInput} />
        </View>

        <View style={styles.formGroup}>
          <Text>Firstname (Pangalan):</Text>
          <TextInput placeholder="ex. Jose" style={styles.textInput} />
        </View>

        <View style={styles.formGroup}>
          <Text>Middlename (Gitnang Pangalan):</Text>
          <TextInput placeholder="ex. Santos" style={styles.textInput} />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <Text>Age (Edad):</Text>
            <TextInput placeholder="ex. 18" style={styles.age} />
          </View>

          <View style={styles.column}>
            <Text style={{ marginBottom: 10 }}>Gender (Kasarian):</Text>
            <RadioGroup
              radioButtons={this.radioButtons}
              onPress={(radioButtons) => this.setState({ selectedId: radioButtons.find((button) => button.selected).id })}
              layout="row"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text>Birthday (Kaarawan):</Text>
          <TextInput placeholder="ex. mm/dd/yyyy" style={styles.textInput} />
        </View>

        <TouchableOpacity style={styles.formBtn} onPress={this.submit}>
          <Text style={styles.whiteButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Profile);
