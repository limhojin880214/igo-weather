import { Dimensions, StyleSheet } from "react-native";

const {width:SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'gray',
    },
    city:{
      flex:1.2,
      justifyContent:'center',
      alignItems:'center',
    },
    cityName:{
      fontSize:58,
      fontWeight:'500',
      color: "white",
    },
    districtName:{
      fontSize:48,
      fontWeight:'400',
      color: "white",
    },
    day:{
      width:SCREEN_WIDTH,
      alignItems: "flex-start",
      paddingHorizontal: 20,
    },
    date:{
        color:"white", 
        fontSize:20,
    },

    midContainer:{
   
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
    
    },
    temp:{
      fontWeight:'600',
      fontSize: 77,
      color: "white",
    },
    celsius:{
        fontWeight:'500',
        fontSize: 55,
        color: "white",
        
      },
    description:{
      marginTop: -10,
      fontSize: 30,
      color: "white",
      fontWeight: "500",
    },
    tinyText:{
      marginTop: -5,
      fontSize: 25,
      color: "white",
      fontWeight: "500",
    }
  })

  export default function getStyleSheet() {
    return styles;
}