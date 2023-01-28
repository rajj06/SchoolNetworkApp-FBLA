/** @format */

import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    Pressable,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ToastAndroid,
  } from "react-native";
  import * as ImagePicker from "expo-image-picker";
  import React, { useEffect, useState } from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  import { Entypo } from "@expo/vector-icons";
  import { Colors } from "../../../assets/theme";
  import PrimaryButton from "../../Components/PrimaryButton";
  import * as Sharing from "expo-sharing";
  import { Button } from "react-native-elements";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { auth, db, storage } from "../../../firebase.config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { sendSignInLinkToEmail } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAnalyticsCollectionEnabled } from "firebase/analytics";
  const SendPhotosScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState("");
    const data=[]
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
  const[studentName,setStudentName]=useState('')
  const[studentClass,setStudentClass]=useState('')
  const[loading,setLoading]=useState(false)
 const[a,setA]=useState([])
   
//     const setItems=(value)=>{
//    const newData=     data.filter((item)=>{item.label==value})
//    console.log(newData)
//     }
    const getTeachers=()=>{
        AsyncStorage.getItem('studentName').then((val)=>{
           setStudentName(val)
        }).then(()=>{
            AsyncStorage.getItem('studentclass').then((val)=>{
             
                setStudentClass(val)
            }).then(()=>{
                const dbref= collection(db,"SchoolFaculty")
       
                getDocs(dbref).then((docsnap)=>{
                    docsnap.docs.map((doc)=>{
                        data.push({value:doc.data().uid,
                            label:doc.data().fullName,
                        })
                    })
                })
              
            })
        })

       
    }
    const b=[]
  useEffect(()=>{
    
    getTeachers()})
    const imageUpload = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", pickedImage, true);
        xhr.send(null);
        const metadata = {
          contentType: "image/jpeg",
        };
      });
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
  
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "schoolFacultyData/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
  
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            case "success":
              console.log("Your Image Uploaded Successfully");
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
  
            // ...
  
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //  Alert.alert("Your Image Uploaded Successfully");
          //  setModalVisible(!modalVisible);
  
            console.log("File available at", downloadURL);
            sendImage(downloadURL)
          });
        }
      );
    };
    const showImagePicker = async () => {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        setLoading(false)
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        setModalVisible(!modalVisible);
        console.log(result.assets[0].uri);
      }
    };
    const openCamera = async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        setLoading(false)
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync();
  
      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        setModalVisible(!modalVisible);
        console.log(pickedImage);
      }
    };
  const sendImage=(img)=>{
    console.log(value)
    console.log('img'+ img)
    const dbRef= collection(db,"StudentImages")
    const s= "SentTo"
    const date= new Date().toDateString()
    addDoc(dbRef,{
        studentName,
        studentClass,
        [s]: value,
        sentImage: img,
        date
    }).then(()=>{
        ToastAndroid.show('Image Sent',ToastAndroid.SHORT)
        setLoading(false)
        setModalVisible(!modalVisible)
    })
  }
//   const checkValues=()=>{
    
//    const a= [...value.keys()]
//    console.log(a.length)
//    for(let i=0;i<a.length;i++){
//     b.push({[i]:value[i]})
//    }
//    //console.log()
//    setA([...b.values()])
//    console.log(a)
//   }
    const ModalScreen = () => {
      const openShareDialogue = () => {
        const shareStatus = Sharing.isAvailableAsync();
        if (shareStatus) {
          Sharing.shareAsync(pickedImage, { dialogTitle: "Image" });
        } else {
          alert("Sharing is disabled");
        }
      };
  
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
             
            <View style={styles.centeredView}>
         
              <View style={styles.modalView}>
              {
              loading && <ActivityIndicator
              size={'large'}
              color={Colors.secondary}
              />
             }
              <View
                  style={{ height: hp("5%"), width: wp("90%"), marginRight: 20 }}
                >
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Entypo name="cross" size={50} color={Colors.secondary} />
                  </TouchableOpacity>
                </View>
              
  <DropDownPicker
  style={{top: hp('2%')}}
      open={open}
      value={value}
      items={items}
      badgeColors={Colors.secondary}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      multiple={true}
      min={0}
      max={5}
      mode={"BADGE"}
      placeholder={"Select One Or More Teachers"}
    />
  
              
  
                <Text style={styles.modalText}>Photo Preview</Text>
                <View style={styles.modalImageHolderView}>
                  <Image
                    style={{ height: hp("30%"), width: wp("70%") }}
                    resizeMode={"contain"}
                    source={{ uri: pickedImage }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ top: hp("3%"), margin: 5 }}>
                    <PrimaryButton
                      title={"Post"}
                      margin={10}
                      width={wp("40%")}
                      fontSize={25}
                      button={"outline"}
                      iconColor={Colors.background}
                      onPress={() => {
                        setLoading(true)
                        imageUpload()}}//checkValues()}}//
                    />
                  </View>
                  <View style={{ top: hp("3%"), margin: 5 }}>
                    <PrimaryButton
                      title={"Share"}
                      margin={10}
                      width={wp("40%")}
                      fontSize={25}
                      button={"outline"}
                      iconColor={Colors.background}
                      onPress={() => openShareDialogue()}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Image
          style={styles.Image}
          source={require("../../../assets/images/logo.png")}
        />
 
        <View style={styles.textInputMainView}>
          <View style={{ top: hp("5%") }}>
            <PrimaryButton
              title={"Upload Photo Using Camera"}
              height={hp("12%")}
              width={wp("80%")}
              fontSize={25}
              button={"outline"}
              iconColor={Colors.background}
              onPress={() => openCamera()}
            />
          </View>
  
          <View style={{ top: hp("8%") }}>
            <PrimaryButton
              margin={10}
              height={hp("12%")}
              width={wp("80%")}
              fontSize={25}
              title={"Upload Photo From Gallery"}
              iconColor={Colors.background}
              onPress={() => {
                showImagePicker();
              }}
            />
          </View>
        </View>
        {modalVisible && (
          <View>
            <ModalScreen />
          </View>
        )}
         <View style={{ top: hp("15%"),margin:15}}>
          <PrimaryButton
            title={"View Recieved Images"}
            height={hp("7%")}
            width={wp("80%")}
            fontSize={25}
            button={"outline"}
            iconColor={Colors.background}
            onPress={() => {navigation.navigate('RecievedImages')}}
          />
        </View>
      </View>
    );
  };
  
  export default SendPhotosScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: "center",
      //justifyContent: "center",
      backgroundColor: Colors.background,
    },
    textStyle: {
      alignContent: "center",
      justifyContent: "center",
      fontSize: 22,
      color: Colors.textColor,
      fontWeight: "bold",
    },
    textInputMainView: {
      width: wp("88%"),
      height: hp("30%"),
      alignSelf:'center',
      justifyContent: "center",
      alignItems: "center",
      top: hp("10%"),
      bottom: hp("10%"),
    },
  
    inputView: {
      width: wp("100%"),
      height: hp("15%"),
      justifyContent: "center",
      alignItems: "center",
    },
    Image: {
      width: 250,
      height: 150,
     top: hp("5%"),
     alignSelf:'center'
    },
  
    //Modal Styles
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("2%"),
    },
    modalView: {
      margin: 10,
      // borderWidth:5,
      borderRadius: 20,
      //borderColor: Colors.secondary,
      width: wp("90%"),
      height: hp("80%"),
      backgroundColor: Colors.background,
   //   justifyContent:'center'
  
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalImageHolderView: {
      padding: 5,
      justifyContent: "center",
      width: wp("75%"),
      height: hp("35%"),
      borderWidth: 2,
      borderColor: Colors.secondary,
    },
  });
  