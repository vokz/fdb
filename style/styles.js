import { Dimensions, StyleSheet } from 'react-native';
const inputWidth =  Dimensions.get('window').width * 0.90;
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

  export default styles;