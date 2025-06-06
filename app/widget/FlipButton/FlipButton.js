import React, { useRef, useState } from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
import { styles } from './FlipButton.styles';

export const FlipButton = ({ 
  title, 
  onPress, 
  frontColor = '#00796b', 
  backColor = '#004d40',
  frontTextColor = 'white',
  backTextColor = 'white',
  backText,
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontInterpolate = rotateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = rotateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const flip = () => {
    if (isFlipped) {

      if (onPress) onPress();
    } else {

      Animated.spring(rotateValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start(() => {
        setIsFlipped(true);
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flip} activeOpacity={0.9}>
        <Animated.View style={[
          styles.button, 
          { backgroundColor: frontColor, transform: [{ rotateY: frontInterpolate }] },
          styles.front
        ]}>
          <Text style={[styles.buttonText, { color: frontTextColor }]}>{title}</Text>
        </Animated.View>

        <Animated.View style={[
          styles.button, 
          { backgroundColor: backColor, transform: [{ rotateY: backInterpolate }] },
          styles.back
        ]}>
          <Text style={[styles.buttonText, { color: backTextColor }]}>
           { backText
             ? backText
             : `Toca para ${title.toLowerCase()}` }
         </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};