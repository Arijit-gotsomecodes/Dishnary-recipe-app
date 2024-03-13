import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Recipes({categories,meals}) {
  return (
    <View className="mx-4 space-y-3">
      <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">Recipes</Text>
      <View>
        {
            categories.length==0 || meals.length==0? null: (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}    
                    showsVerticalScrollIndicator={false}            
                    renderItem={({item, i}) => <RecipeCard item={item} index={i}/>}
                    onEndReachedThreshold={0.1}
                />
            )
        }
            
      </View>
    </View>
  )
}


const RecipeCard = ({item, index}) => {
    let isEven = index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0}}
                className="flex justify-center mb-4 space-y-1"
            />
             <Image 
                source={{uri: item.strMealThumb}}
                style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35, padding: 1}}
                className="bg-black/5"
             />
             <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                {
                    item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.name
                }
             </Text>
        </Animated.View>
    )
}