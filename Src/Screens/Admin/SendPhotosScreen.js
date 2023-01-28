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
  ToastAndroid,
  ActivityIndicator,
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
import { addDoc, collection } from "firebase/firestore";
const SendPhotosScreen = ({ navigation,route }) => {
  const{data}=route.params
  console.log(data)
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState("");
const[loading,setLoading]=useState(false)
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
    console.log('Image Uploaded calling upload to firestore now')
          uploadImageToStore(downloadURL)
        

          console.log("File available at", downloadURL);
        });
      }
    );
  };
  const uploadImageToStore=(downloadURL)=>{
    const date= new Date().toDateString()
    const dbref=collection(db,"SchoolPhotos")
    addDoc(dbref,{
      uploader: data.fullName,
      designation:data.designation,
      image:downloadURL,
      uploaderId:data.uid,
      date
    }).then(()=>{
      ToastAndroid.show('Image Uploaded Successfully',ToastAndroid.SHORT)
      setLoading(false)
      setModalVisible(!modalVisible)
    })
  }
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
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
               loading && 
              <ActivityIndicator
              size='small'
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
                      imageUpload()}}
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
      <View style={{top:hp('5%')}}>

      <Image
        style={styles.Image}
        source={require("../../../assets/images/logo.png")}
      />
      </View>

      <View style={styles.textInputMainView}>
        <View style={{ top: hp("0%") }}>
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
       <View style={{ top: hp("0%") }}>
          <PrimaryButton
            title={"Recieved Images"}
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
  textInputMainView: {
    width: wp("88%"),
    height: hp("30%"),
    justifyContent: "center",
    alignItems: "center",
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
    bottom: hp("20%"),
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
    height: hp("70%"),
    backgroundColor: Colors.background,

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
