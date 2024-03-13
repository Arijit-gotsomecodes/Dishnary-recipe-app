import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Chicken');
  const [categories, setCategories] = useState([]);
  const[meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);

  const getCategories = async () => {
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('response: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipies = async (category="Chicken") => {
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got response: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  return (

    <View className="flex-1 bg-white">
      <StatusBar style='dark'/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      className="space-y-6 pt-14"
      >
        {/*avatar and bell icon*/}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../images/avatar.png')} style={{width: hp(5), height: hp(5.5)}}/>
          <BellIcon color="grey" size={hp(4)}/>
        </View>
          {/*greeting*/}
          <View className="mx-4 space-y-2 mb-2">
            <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">
              hello, Arijit!
            </Text>
            <View>
              <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                Make your own food,
              </Text>
              <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                stay at <Text className="text-amber-400">Home</Text>
              </Text>
            </View>
          </View>
        {/*search bar*/}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe..."
            placeholderTextColor={'grey'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wide" />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}/>
            </View>

            
          </View>
          {/*categories*/}
          <View>
              { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/> }
          </View>
          {/*recipes*/}
          <View>
            <Recipes meals={meals} categories={categories}/>
          </View>
      </ScrollView>
    </View>
  )
}