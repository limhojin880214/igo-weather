import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment/moment';
import getStyleSheet from './styles/styles';
import apiKey from './key/apiKey';

//for icon
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [district, setDistrict] = useState("");
  const [days, setDays] = useState([]);
  const [value, setValue] = useState(new Date());
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    //permission foreground
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    
    //latitude & longitude
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    
    //city name
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false})
    setCity(location[0].city);
    setDistrict(location[0].district);
    
    // weather info
    const response = await fetch(`https://api.openweathermap.org/data/2.8/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    const json = await response.json();
    setDays(json.daily) 
  }

  useEffect(()=>{
    getWeather();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      {ok ? ( 
        <>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.districtName}>{district}</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {days.length === 0 ? (
               <View style={{ ...styles.day, alignItems: "center" }}>
               <ActivityIndicator
                 color="white"
                 style={{ marginTop: 10 }}
                 size="large"
               />
                </View>
              ) : (
              days.map((day, index) => 
              
              <View style={{ ...styles.day, alignItems: "center" }}>
                  <Text style={styles.date}>{moment(value).add(index, 'days').format('YYYY년 MM월 DD일')}</Text>
                 <View style={styles.midContainer}>
                      <Text style={styles.temp}>
                        {parseFloat(day.temp.day).toFixed(1)}<Text  style={styles.celsius} >℃</Text>
                      </Text>
                      <Fontisto
                        name={icons[day.weather[0].main]}
                        size={68}
                        color="white"
                      />
                  </View>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
              ))}
            </ScrollView>
            </>
       ) : 
       (<View style={styles.city}><Text><FontAwesome5 name="sad-tear" size={99} color="black" /></Text>
       <Text style={styles.tinyText}>we need your location...</Text></View>)
       }
    </View>
  );
}

const styles = getStyleSheet();