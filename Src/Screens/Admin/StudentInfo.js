/** @format */

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../../assets/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PrimaryButton from "../../Components/PrimaryButton";
import { ListItem } from "react-native-elements";
import Classes from "./ClassesArray";
const StudentInfo = ({ navigation }) => {
 
  const Data=[
    {
        id: 0,
        name:'Kg',
        value:'classkg',
        mode: '',
    },
    {
        id: 1,
        name:'Class One',
        value:'classOne',
        mode: 'outline',
    },
    {
        id: 2,
        name:'Class Two',
        value:'classTwo',
        mode: 'outline',
    },
    {
        id: 3,
        name:'Class Three',
        value:'classThree',
        mode: '',
    },
    {
        id: 4,
        name:'Class Four',
        value:'classFour',
        mode: '',
    },
    {
        id: 5,
        name:'Class Five',
        value:'classFive',
        mode: 'outline',
    },
    {
        id: 6,
        name:'Class Six',
        value:'classSix',
        mode: 'outline',
    },
    {
        id: 7,
        name:'Class Seven',
        value:'classSeven',
        mode: '',
    },
    {
        id: 8,
        name:'Class Eight',
        value:'classEight',
        mode: '',
    },
    {
        id: 9,
        name:'Class Nine',
        value:'classNinth',
        mode: 'outline',
    },
    {
        id: 10,
        name:'Class Tenth',
        value:'classTenth',
        mode: 'outline',
    },
    {
        id: 11,
        name:'Class First Year',
        value:'classFirstYear',
        mode: '',
    },
    {
        id: 12,
        name:'Class Second Year',
        value:'classSecondYear',
        mode: '',

    },
]
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle,{textAlign:'center',fontSize:25}]}>Select A Class To View Students</Text>
      <View style={{height:hp('50%'),justifyContent:'center'}}>
      <FlatList
      style={{alignSelf:'center'}}
      contentContainerStyle={{paddingBottom:30}}
      data={Classes}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        return(
          <View style={styles.subView}>
          <PrimaryButton
          
            title={item.name}
            height={hp("20%")}
            width={wp("40%")}
            button={item.mode}
            fontSize={22}
            iconColor={Colors.background}
            onPress={() => navigation.navigate("StudentDetailsForm",{item})}
          />
        </View>
        )
      }}
      keyExtractor={(item)=>{return item.id}}
      numColumns={2}
      />
      </View>

        
    
    </View>
  );
};

export default StudentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  subView: {
    margin:5,
    top: hp("3%"),
    height:hp('20%'),
    justifyContent: "center",
    width: wp("40%"),
  },
});
