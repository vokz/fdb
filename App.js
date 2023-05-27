import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, Button, Image, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RadioGroup from 'react-native-radio-buttons-group';

import CarouselCards from './CarouselCards';
import ApplicationStatus from './ApplicationStatus';

import { checkStatus, submitApplication} from './class/supabase';


const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

const inputWidth =  Dimensions.get('window').width * 0.90;

function navigate(name, params) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

function Home() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CarouselCards/>
      <Image source={require('./assets/logo.png')} style={styles.hederImage} />
      <Text style={styles.homeText}>Design and Specifications</Text>

      <TouchableOpacity style={styles.applyBtn} onPress={() => navigate('Application Form')}>
        <Text style={styles.whiteButton}>Apply Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkStatusBtn} onPress={() => navigate('Check Status')}>
        <Text style={styles.whiteButton}>Check Status</Text>
      </TouchableOpacity>
    </View>
  );
}

function Profile() {

  const radioButtons = useMemo(() => ([
      {
          id: '1', 
          label: 'Male',
          value: 'Male'
      },
      {
          id: '2',
          label: 'Female',
          value: 'Female'
      }
  ]), []);

  const [selectedId, setSelectedId] = useState();
  const [applicationData, setApplicationData] = useState({});


  useEffect(() => {
    const option = selectedId < 2 ? "Male" : "Female"
    setApplicationData(prevData => ({
      ...prevData,
      ['gender']: option
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['tracking_number']: '000000000'
    }));
  }, [selectedId]);

  const handleInputChange = (key, value) => {
    setApplicationData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <View>
      <Text style={styles.profileHeader}>Personal Information</Text>
      
      <View style={styles.formGroup}>
        <Text>Lastname (Apelyido):</Text>
        <TextInput 
          placeholder='ex. Juan Dela Cruz' 
          style={styles.textInput}
          value={applicationData.lname || ''}
          onChangeText={text => handleInputChange('lname', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Firstname (Pangalan):</Text>
        <TextInput 
        placeholder='ex. Jose' 
        style={styles.textInput} 
        value={applicationData.fname || ''}
        onChangeText={text => handleInputChange('fname', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Middlename (Gitnang Pangalan):</Text>
        <TextInput 
          placeholder='ex. Santos' 
          style={styles.textInput}
          value={applicationData.mname || ''}
          onChangeText={text => handleInputChange('mname', text)}/>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text>Age (Edad):</Text>
          <TextInput 
          placeholder='ex. 18' 
          style={styles.age}
          value={applicationData.age || ''}
          onChangeText={text => handleInputChange('age', text)}/>
        </View>
      
        <View style={styles.column}>
          <Text style={{marginBottom: 10}}>Gender (Kasarian):</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            layout="row"
            
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text>Birthday (Kaarawan):</Text>
        <TextInput placeholder='ex. mm/dd/yyyy' style={styles.textInput}
        value={applicationData.bday || ''}
        onChangeText={text => handleInputChange('bday', text)}/>
      </View>

      
      <TouchableOpacity style={styles.formBtn} onPress={() => navigate('Contact Information', {applicationData})}>
        <Text style={styles.whiteButton}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function Contact({route}) {
  const profileData = route.params.applicationData;
  const [applicationData, setApplicationData] = useState(profileData);


  const handleInputChange = (key, value) => {
    setApplicationData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <View>
      <Text style={styles.profileHeader}>Contact &  Address</Text>
      
      <View style={styles.formGroup}>

        <Text>Contact (Telepono):</Text>
        <TextInput placeholder='+639' style={styles.textInput} value={applicationData.contact || ''}
        onChangeText={text => handleInputChange('contact', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Current Address (Kasalukuyang Tirahan):</Text>
        <TextInput 
          placeholder='Current Address' 
          style={styles.textArea} 
          multiline = {true}
          numberOfLines = {4} value={applicationData.current_address || ''}
          onChangeText={text => handleInputChange('current_address', text)}/>

      </View>

      <View style={styles.formGroup}>
        <Text>Permanent Address (Permanenteng Tirahan):</Text>
        <TextInput 
          placeholder='Permanent Address' 
          style={styles.textArea} 
          multiline = {true}
          numberOfLines = {4} value={applicationData.permanent_address || ''}
          onChangeText={text => handleInputChange('permanent_address', text)}/>

      </View>

      <TouchableOpacity style={styles.formBtn} onPress={() => navigate('Work Information', { applicationData})}>
        <Text style={styles.whiteButton}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function Work({route}) {
  const profileData = route.params.applicationData;
  const [applicationData, setApplicationData] = useState(profileData);


  useEffect(() => {
    const option = selectedId < 2 ? true : false
    setApplicationData(prevData => ({
      ...prevData,
      ['pagibig_member']: option
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['status']: 1
    }));
  }, [selectedId]);

  const handleInputChange = (key, value) => {
    setApplicationData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const radioButtons = useMemo(() => ([
      {
          id: '1', 
          label: 'Yes',
          value: true
      },
      {
          id: '2',
          label: 'No',
          value: false
      }
  ]), []);

  const [selectedId, setSelectedId] = useState();

  
  async function submit(){
    console.log(applicationData);
    submitApplication(applicationData);
    navigate('Application Submitted');
  }

  return (
    <View>
      <Text style={styles.profileHeader}>Work Information</Text>
      
      <View style={styles.formGroup}>
        <Text>Monthly Salary (Buwanang Sweldo):</Text>
        <TextInput placeholder='ex. 15,000' style={styles.textInput} value={applicationData.monthly_salary || ''}
        onChangeText={text => handleInputChange('monthly_salary', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>PAG-IBIG Memeber?</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
          
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Years Member (Ilang taon ng miyembro):</Text>
        <TextInput placeholder='ex. 2' style={styles.textInput} value={applicationData.years_member || ''}
        onChangeText={text => handleInputChange('years_member', text)}/>
      </View>

      <TouchableOpacity style={styles.formBtn} onPress={() => submit()}>
        <Text style={styles.whiteButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}


function RequestStatus(){
  const [contact, setContact] = useState();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (data.length > 0) {
      setStatus(data[0].status);
    }
  }, [data]);

  useEffect(() => {
    if (status) {
      navigate('Application Status', { status, data });
    }
  }, [status]);

  async function validateAccount(){
      try {
        if(contact){
          const result = await checkStatus(contact);
          if(result.length > 0){
            setData(result);
          }else{
            Alert.alert('Un registered', 'Your Mobile number is not yet registered.', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }else{
          Alert.alert('Mobile Number Required', 'Please input your mobile no.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        
      } catch (error) {
        // Handle error
        //console.error('Error fetching data:', error);
        console.error('Error failed successfully! :', error);
      }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
      <Text style={styles.profileHeader}>Check Application Status</Text>
      
      <Text>Mobile No. (Number ng Telepono):</Text>
      <TextInput 
      value={contact}
      onChangeText={setContact}
      placeholder='+639' 
      style={styles.textInput}/>


      <TouchableOpacity style={styles.formBtn} onPress={() => validateAccount()}>
        <Text style={styles.whiteButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultStatus({route}){
  const params  = route.params;
  const dateString = params.data[0].created_at;

  // Extract the date and time components
  const datePart = dateString.substring(0, 10);
  const timePart = dateString.substring(11, 19);

  // Split the date and time parts into an array
  const dateArray = datePart.split("-");
  // const timeArray = timePart.split(":");

  // Create a new Date object with the extracted components
  const date = new Date(
    parseInt(dateArray[0]),  // Year
    parseInt(dateArray[1]) - 1,  // Month (zero-based)
    parseInt(dateArray[2]),  // Day
    // parseInt(timeArray[0]),  // Hour
    // parseInt(timeArray[1]),  // Minute
    // parseInt(timeArray[2])  // Second
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
      <Text style={styles.statusHeader}>Application Status</Text>

      <View style={styles.MemberInfo}>
        <Text style={styles.status}>{params.data[0].lname}, {params.data[0].fname} {params.data[0].mname}</Text>
        <Text style={styles.statusSubText}>Contact: {params.data[0].contact}</Text>
        <Text style={styles.statusSubText}>Date registered: {date.toDateString()}</Text>
      </View>
      
      <View style={styles.MemberStatus}>
        <ApplicationStatus status={params.status}/>
      </View>

      <TouchableOpacity style={styles.backToHome} onPress={() => navigate('Home')}>
        <Text style={styles.whiteButton}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

function Submitted({route}){
  const params  = route.params;


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
      <Text style={styles.statusHeader}>Application Status</Text>

      <View style={styles.MemberInfo}>
       
      </View>
      
      <TouchableOpacity style={styles.backToHome} onPress={() => navigate('Home')}>
        <Text style={styles.whiteButton}>Done</Text>
      </TouchableOpacity>

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen name="Application Form" component={Profile} />
        <Stack.Screen name="Contact Information" component={Contact} options={{ title: 'Application Form' }} />
        <Stack.Screen name="Work Information" component={Work} options={{ title: 'Application Form' }} />
        <Stack.Screen name="Check Status" component={RequestStatus} options={{ title: 'Application Status' }} />
        <Stack.Screen name="Application Status" component={ResultStatus} options={{ title: 'Application Status',headerShown: false }} />
        <Stack.Screen name="Application Submitted" component={Submitted} options={{ title: 'Application Submitted',headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hederImage :{
    width: 200,
    height: 80,
    marginBottom: 20,
    marginTop: 100,
    zIndex:1,
  },
  homeText: {
    fontSize: 20,
    color: '#fff',
    width: 200,
    textAlign: 'center',
    marginBottom: 20,
    zIndex:1
  },
  applyBtn: {
    height: 60,
    width:160,
    borderRadius:10,
    backgroundColor : "maroon",
    marginLeft :50,
    marginRight:50,
    marginBottom :10,
    alignItems: 'center',
    justifyContent:'center'
  },
  checkStatusBtn: {
    height: 60,
    width:160,
    borderRadius:10,
    backgroundColor : "maroon",
    marginLeft :50,
    marginRight:50,
    marginBottom :50,
    alignItems: 'center',
    justifyContent:'center'
  },
  formBtn: {
    height: 60,
    width:160,
    borderRadius:10,
    backgroundColor : "maroon",
    marginLeft :50,
    marginRight:50,
    marginBottom :100,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center'
  },
  backToHome: {
    height: 60,
    width:160,
    borderRadius:10,
    backgroundColor : "maroon",
    marginLeft :50,
    marginRight:50,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center'
  },
  MemberInfo:{
    marginBottom: 30,
    width: 350,
  },
  MemberStatus:{
    width: 350,
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  statusHeader:{
    fontSize: 24,
    marginBottom: 50,
    marginTop: 10,
    alignSelf: 'center'
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 350,
    textAlign: 'left',
    marginBottom: 10
  },
  statusSubText: {
    fontSize: 14,
    width: 350,
    textAlign: 'left',
    marginBottom: 0
  },
  textInput: {
    borderWidth: 1,
    height: 50,
    fontSize: 18,
    width: inputWidth,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5
  },
  textArea: {
    borderWidth: 1,
    height: 70,
    fontSize: 18,
    width: inputWidth,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 10
  },
  whiteButton: {
    color: 'white',
    backgroundColor: 'transparent', // Set the background color to transparent
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileHeader: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20
  },
  formGroup: {
    marginBottom: 10,
    paddingHorizontal: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20,
    width: inputWidth,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  age: {
    borderWidth: 1,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 5
  },
});
