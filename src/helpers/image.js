
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import Animated from 'react-native-reanimated';

export const CachedImage = (props) => {
    const [cachedImage, setCachedImage] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedImage({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedImage({ uri: base64Data });
                }
            } catch (error) {
                console.log('error caching error: ', error);
                setCachedImage({ uri });
            }
        };

        getCachedImage();
    }, []);

    return (
        <Animated.Image {...props} source={cachedImage} />
    );
};
