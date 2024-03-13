import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {categoryData} from '../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';


export default function Categories({categories,activeCategory, setActiveCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                categories.map((category, index) => {
                    let isActive = category.strCategory == activeCategory;
                    let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setActiveCategory(category.strCategory)}
                            className="flex items-center space-y-1"
                        >
                            <View className={"rounded-full p-[6px] "+activeButtonClass}>
                                <Image
                                    source={{uri: category.strCategoryThumb}}
                                    style={{width: hp(8),height: hp(8)}}
                                    className="rounded-full"
                                />
                            </View>
                            <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                                {category.strCategory}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}