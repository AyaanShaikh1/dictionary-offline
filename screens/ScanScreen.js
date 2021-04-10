import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import { CAMERA } from 'expo-permissions';


export default class ScanScreen extends React.Component{
constructor(){
    super();
    this.state = {
        hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
    }
}    

getCameraPermission = async() =>{
    const {status} = await Permissions.askAsync(Permissions,CAMERA)
    this.setState({
        hasCameraPermission:status === 'granted',
        buttonState:'clicked'
    }) 
}

handleBarCodeScanned = async({type,data}) =>{
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}

    render(){ 

        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
  
        if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
        
            <View style={styles.container}>
                <Text style={styles.displayText}>{
                    hasCameraPermissions===true?this.state.scannedData:'requestCameraPermission'
                }</Text>
                <TouchableOpacity 
                onPress={this.getCameraPermission} 
                style={styles.scanButton}
                >
                   <Text>Bar Code Scanner</Text>
                </TouchableOpacity>
            </View>
        )
            }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        textAlign:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    scanButton:{
        backgroundColor:'yellow',
        padding:10,
        margin:10,
    },
})