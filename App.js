import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, FlatList, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { TabView, SceneMap } from 'react-native-tab-view';
// import Gallery from 'react-native-awesome-gallery';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';

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
      <View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', alignItems:'flex-start', paddingHorizontal: 20, marginBottom: 250}}>
        <Image source={require('./assets/logo.png')} style={styles.hederImage} />
      </View>
        {/* <Text style={styles.homeText}>Design and Specifications</Text> */}

        <TouchableOpacity style={styles.applyBtn} onPress={() => navigate('Application Form')}>
          <Text style={styles.whiteButton}>Apply Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn} onPress={() => navigate('Check Status')}>
          <Text style={styles.whiteButton}>Check Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkStatusBtn} onPress={() => navigate('Gallery')}>
          <Text style={styles.whiteButton}>Learn More</Text>
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
  }, [selectedId]);

  const handleInputChange = (key, value) => {
    setApplicationData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Single/Unmarried', value: 'Single/Unmarried'},
    {label: 'Married', value: 'Married'},
    {label: 'Widow/er', value: 'Widow/er'},

    {label: 'Legally Separated', value: 'Legally Separated'},
    {label: 'Annulled', value: 'Annulled'}
  ]);

  useEffect(() => {
    handleInputChange('maritalStatus', value);
  }, [value]);

  const [openEmployee, setOpenEmployee] = useState(false);
  const [valueEmployee, setValueEmployee] = useState([]);
  const [othersShow, setOthersShow] = useState(false);
  const [itemsEmployee, setItemsEmployee] = useState([
    {label: 'Permanent', value: 'Permanent'},
    {label: 'Temporary', value: 'Temporary'},
    {label: 'Casual', value: 'Casual'},

    {label: 'Others', value: 'Others'}
  ]);

  useEffect(() => {
    if(valueEmployee=='Others'){
      setOthersShow(true);
      handleInputChange('employment_Status', '');
    }else{
      setOthersShow(false);
      handleInputChange('employment_Status', valueEmployee);
    }
  }, [valueEmployee,othersShow]);

  const data = [{ id: '1', title: 'Item 1' }];

  return (
    <FlatList
    data={data}
    style={{backgroundColor: '#fff'}}
    renderItem={({ item }) => (
      <View>
        <Text style={styles.profileHeader}>Personal Information</Text>
        
        <View style={styles.formGroup}>
          <Text>Last Name (Apelyido):</Text>
          <TextInput 
            placeholder='ex. Dela Cruz' 
            style={styles.textInput}
            value={applicationData.lname || ''}
            onChangeText={text => handleInputChange('lname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>First Name (Pangalan):</Text>
          <TextInput 
          placeholder='ex. Joven' 
          style={styles.textInput} 
          value={applicationData.fname || ''}
          onChangeText={text => handleInputChange('fname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Extension Name (Jr, Sr):</Text>
          <TextInput 
            placeholder='ex. Jr' 
            style={styles.textInput}
            value={applicationData.xname || ''}
            onChangeText={text => handleInputChange('xname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Middle Name (Gitnang Pangalan):</Text>
          <TextInput 
            placeholder='ex. Matias' 
            style={styles.textInput}
            value={applicationData.mname || ''}
            onChangeText={text => handleInputChange('mname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Birthday (Kaarawan):</Text>

        <MaskInput
            placeholder="mm/dd/yyyy"
            mask={Masks.DATE_MMDDYYYY}
            style={styles.textInput}
            onChangeText={(formatted) => handleInputChange('bday',formatted)}
            value={applicationData.bday || ''}
          />
        </View>

        <View style={styles.formGroup}>
            <Text style={{marginBottom: 10, borderColor: '#ccc', height: 35}}>Marital Status:</Text>
          
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{zIndex: 100}}
            theme="LIGHT"
            multiple={false}
          />
        </View>

        <View style={[styles.rowContainer,{zIndex:-1}]}>
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

        <View style={[styles.formGroup,{zIndex:-1}]}>
          <Text>Mother's Maiden Name (Apelyido sa pagka-dalaga ng Ina):</Text>
          <TextInput 
            placeholder='ex. Santos' 
            style={styles.textInput}
            value={applicationData.mother_MaidenName || ''}
            onChangeText={text => handleInputChange('mother_MaidenName', text)}/>
        </View>

        <View style={[styles.formGroup,{zIndex:1}]}>
            <Text style={{marginBottom: 10 , borderColor: '#ccc', height: 35}}>Employment Status (Katayuan sa trabaho):</Text>

          <DropDownPicker
            open={openEmployee}
            value={valueEmployee}
            items={itemsEmployee}
            setOpen={setOpenEmployee}
            setValue={setValueEmployee}
            setItems={setItemsEmployee}
            style={{zIndex: 1}}
            theme="LIGHT"
            multiple={false}
          />

          {othersShow && (
            <TextInput 
            placeholder='Please specify' 
            style={[styles.textInput,{zIndex:-1}]}
            value={applicationData.employment_Status || ''}
            
            onChangeText={text => handleInputChange('employment_Status', text)}/>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Cellphone No. (Numero ng Selpon):</Text>
          <TextInput placeholder='0908-------' style={styles.textInput} value={applicationData.cellPhoneContact || ''}
          onChangeText={text => handleInputChange('cellPhoneContact', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Landline No. (Numero ng Telepono):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.homeContact || ''}
          onChangeText={text => handleInputChange('homeContact', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Business Contact (Telepono ng negosyo):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.businessContact || ''}
          onChangeText={text => handleInputChange('businessContact', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Personal Email Address:</Text>
          <TextInput placeholder='JuanDelaCruz@gmail.com' style={styles.textInput} value={applicationData.email || ''}
          onChangeText={text => handleInputChange('email', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Present Address (Unit/Room No., Floor Building Name., Lot No., Block No., Phase No., House No., Street Name):</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='' 
            style={styles.textArea} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.presentHomeAddress1 || ''}
            onChangeText={text => handleInputChange('presentHomeAddress1', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Subdivision:</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='' 
            style={styles.textInput} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.presentHomeAddressSubdivision || ''}
            onChangeText={text => handleInputChange('presentHomeAddressSubdivision', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Barangay:</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='' 
            style={styles.textInput} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.presentHomeAddressBrgy || ''}
            onChangeText={text => handleInputChange('presentHomeAddressBrgy', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Municipality/City Province/State/Country (if abroad):</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='San Rafael Bulacan' 
            style={styles.textInput} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.presentHomeAddressCity || ''}
            onChangeText={text => handleInputChange('presentHomeAddressCity', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Company/Employer/Business Name:</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.employerName || ''}
          onChangeText={text => handleInputChange('employerName', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Company/Employer/Business Address:</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='' 
            style={styles.textArea} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.employerAddress || ''}
            onChangeText={text => handleInputChange('employerAddress', text)}/>
        </View>

{/*
        <View style={styles.formGroup}>
          <Text>Business Contact (Telepono ng negosyo):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.businessContact || ''}
          onChangeText={text => handleInputChange('businessContact', text)}/>
        </View>
    */}

        <View style={styles.formGroup}>
          <Text>Spouse's Last Name (Apleyido ng Asawa):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.spouse_lastname || ''}
          onChangeText={text => handleInputChange('spouse_lastname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Spouse's First Name (Pangalan ng Asawa):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.spouse_firstname || ''}
          onChangeText={text => handleInputChange('spouse_firstname', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Spouse's Middle Name (Gitnang Pangalan ng Asawa):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.spouse_middlename || ''}
          onChangeText={text => handleInputChange('spouse_middlename', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Spouse's Company/Employer/Business Name (Trabaho/Negosyo ng asawa):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.spouse_EmployerName || ''}
          onChangeText={text => handleInputChange('spouse_EmployerName', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Spouse's Company/Employer/Business Address (Lokasyon ng Trabaho/Negosyo ng asawa):</Text>
          {/* <Text style={{fontSize: 11}}>Unit/Room No., Floor Building Name Lot No., Block No., Phase No., House No. Street Name</Text> */}
          <TextInput 
            placeholder='' 
            style={styles.textArea} 
            multiline = {true}
            numberOfLines = {4} value={applicationData.spouse_EmployerAddress || ''}
            onChangeText={text => handleInputChange('spouse_EmployerAddress', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Monthly Salary: Basic + Allowance (Buwanang Sweldo):</Text>
          <TextInput placeholder='15000' style={styles.textInput} value={applicationData.monthlySalary || ''}
          onChangeText={text => handleInputChange('monthlySalary', text)}/>
        </View>

        <View style={styles.formGroup}>
          <Text>Spouse's Monthly Salary: Basic + Allowance (Buwanang Sweldo ng Asawa):</Text>
          <TextInput placeholder='' style={styles.textInput} value={applicationData.spouse_monthlySalary || ''}
          onChangeText={text => handleInputChange('spouse_monthlySalary', text)}/>
         <Text> </Text>
         <Text> </Text>
        </View>
        
        <TouchableOpacity style={styles.formBtn} onPress={() => navigate('Particulars Information', {applicationData})}>
          <Text style={styles.whiteButton}>Next</Text>
        </TouchableOpacity>
      </View>
    )}

    keyExtractor={(item) => item.id}
    />
  );
}


function Particulars({route}) {
  const profileData = route.params.applicationData;
  const [applicationData, setApplicationData] = useState(profileData);
  const data = [{ id: '1', title: 'Item 1' }];


  useEffect(() => {
    const option = selectedId < 2 ? true : false
    const member = pagIbigMember < 2 ? true : false
    const avail = availedHousingLoan < 2 ? true : false
    const borrower = coborrowerHousingLoan < 2 ? true : false
    const pursue = pursueHousingLoan < 2 ? true : false
    const tnc = informedTNC <2 ? true : false
    setApplicationData(prevData => ({
      ...prevData,
      ['otherSourceOfIncome']: option
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['pagibig_member']: member
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['availedHousingLoan']: avail
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['coborrowerHousingLoan']: borrower
    }));
    
    setApplicationData(prevData => ({
      ...prevData,
      ['pursueHousingLoan']: pursue
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['informedTNC']: tnc
    }));

    setApplicationData(prevData => ({
      ...prevData,
      ['status']: 1
    }));
  }, [selectedId,pagIbigMember,availedHousingLoan,coborrowerHousingLoan,pursueHousingLoan,informedTNC]);

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
  const [pagIbigMember, setpagIbigMember] = useState();
  const [availedHousingLoan, setavailedHousingLoan] = useState();
  const [coborrowerHousingLoan, setcoborrowerHousingLoan] = useState();
  const [pursueHousingLoan, setpursueHousingLoan] = useState();
  const [informedTNC, setinformedTNC] = useState();

  
  async function submit(){
    // console.log(applicationData);
    const tracking_number = await submitApplication(applicationData);
    // console.log(tracking_number)
    navigate('Application Submitted',{tracking_number:tracking_number});
  }

  return (
    <FlatList
    data={data}
    style={{backgroundColor:'#fff',paddingTop: 20}}
    renderItem={({ item }) => (
    <View>
       <Text style={styles.profileHeader}>Particulars</Text>
       
      <View style={styles.formGroup}>
        <Text>Do you have other sources of income aside from salary? (Mayroong ibang pinagkakakitaan?)</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Source of Additional Income:</Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.sourceOfAdtlIncome || ''}
        onChangeText={text => handleInputChange('sourceOfAdtlIncome', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Average Monthly Additional Income (Buwanang karagdagang kita):</Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.averageAdtlIncome || ''}
        onChangeText={text => handleInputChange('averageAdtlIncome', text)}/>
      </View>

    {/*
      <View style={styles.formGroup}>
        <Text>If you will be granted a Pag-IBIG Housing Loan, how much can you afford to pay as your monthly amortization?</Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.affordMonthlyAmortization || ''}
        onChangeText={text => handleInputChange('affordMonthlyAmortization', text)}/>
      </View>
    */}

      <View style={styles.formGroup}>
        <Text>Pag-IBIG Member?</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setpagIbigMember}
          selectedId={pagIbigMember}
          layout="row"
          
        />
      </View>

      {pagIbigMember < 2 && (
        <View>
          <View style={styles.formGroup}>
            <Text>If yes, indicate pag-IBIG MID No.</Text>
            <TextInput placeholder='' style={styles.textInput} value={applicationData.pagibigMIDNo || ''}
          onChangeText={text => handleInputChange('pagibigMIDNo', text)}/>
          </View>
          <View style={styles.formGroup}>
            <Text>Years Member (Ilang taon nang miyembro)?</Text>
            <TextInput placeholder='' style={styles.textInput} value={applicationData.years_member || ''}
            onChangeText={text => handleInputChange('years_member', text)}/>
          </View>

        </View>
      )}

      <View style={styles.formGroup}>
        <Text>Have you availed of a Pag-IBIG Housing Loan? (Mayroon bang kasalukuyang binabayarang housing loan sa Pag-IBIG?)</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setavailedHousingLoan}
          selectedId={availedHousingLoan}
          layout="row"
          
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Have you been a co-borrower of a Pag-IBIG Housing Loan? (Naging co-borrower na ba noon ng pag-IBIG Housing Loan)?</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setcoborrowerHousingLoan}
          selectedId={coborrowerHousingLoan}
          layout="row"
          
        />
      </View>

{/*
      <View style={styles.formGroup}>
        <Text>Pursue housing loan with Project Proponent?</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setpursueHousingLoan}
          selectedId={pursueHousingLoan}
          layout="row"
          
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Have you been informed on the terms and conditions of your loan?</Text>
        <RadioGroup 
          radioButtons={radioButtons} 
          onPress={setinformedTNC}
          selectedId={informedTNC}
          layout="row"
          
        />
      </View>

      <View style={styles.formGroup}>
        <Text>House/Unit Model:</Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.houseUnitModel || ''}
        onChangeText={text => handleInputChange('houseUnitModel', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Selling Price:</Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.sellingPrice || ''}
        onChangeText={text => handleInputChange('sellingPrice', text)}/>
      </View>

      <View style={styles.formGroup}>
        <Text>Monthly Amortization: </Text>
        <TextInput placeholder='' style={styles.textInput} value={applicationData.monthlyAmortization || ''}
        onChangeText={text => handleInputChange('monthlyAmortization', text)}/>
      </View>
*/}

      <TouchableOpacity style={styles.formBtn} onPress={() => submit()}>
        <Text style={styles.whiteButton}>Submit</Text>
      </TouchableOpacity>
    </View>

    )}
    keyExtractor={(item) => item.id}
    />
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
        <Text style={styles.statusSubText}>Contact: {params.data[0].cellPhoneContact}</Text>
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

  // console.log(params)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
      <Text style={[styles.statusHeader,{textAlign: 'center'}]}>Congratulations! You have successfully registered to this housing project.</Text>

      <View style={[styles.MemberInfo,{alignItems:'center'}]}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Tracking Number: {params.tracking_number}</Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Please keep your tracking number.</Text>
      </View>
      
      <TouchableOpacity style={styles.backToHome} onPress={() => navigate('Home')}>
        <Text style={styles.whiteButton}>Done</Text>
      </TouchableOpacity>

    </View>
  );
}

// const images = ['https://th.bing.com/th/id/OIF.CDhJLk61WaFby6iFOkhg1A?pid=ImgDet&rs=1'];

const FirstRoute = () => (
  // <Gallery
  //   style={{ flex: 1, backgroundColor: '#ff4081' }}
  //   data={images}
  //   onIndexChange={(newIndex) => {
  //     console.log(newIndex);
  //   }}
  // />
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

function GalleryView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Model House' },
    { key: 'second', title: 'Ameneties' },
    { key: 'third', title: 'Video Walk Through' }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen name="Application Form" component={Profile} options={{ title: 'Application Form (1/2)' }}/>
        <Stack.Screen name="Particulars Information" component={Particulars} options={{ title: 'Application Form (2/2)' }} />
        <Stack.Screen name="Check Status" component={RequestStatus} options={{ title: 'Application Status' }} />
        <Stack.Screen name="Application Status" component={ResultStatus} options={{ title: 'Application Status',headerShown: false }} />
        <Stack.Screen name="Application Submitted" component={Submitted} options={{ title: 'Application Submitted',headerShown: false }} />
        <Stack.Screen name="Gallery" component={GalleryView} options={{ title: 'Gallery',headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hederImage :{
    width: 200,
    height: 80,
    // marginBottom: 20,
    // marginTop: 100,
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
    borderColor: '#ccc',
    height: 35,
    fontSize: 15,
    width: inputWidth,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 70,
    fontSize: 15,
    width: inputWidth,
    paddingHorizontal: 8,
    borderRadius: 10,
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
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20
  },
  formGroup: {
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
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
    height: 35,
    fontSize: 18,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 5
  },
});
