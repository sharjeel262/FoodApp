import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
};

type SplashProps = NativeStackScreenProps<RootStackParamList, "Splash">;

interface Slide {
  id: string;
  title: string;
  description: string;
  image: any;
}

const SplashScreens: React.FC<SplashProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slides: Slide[] = [
    {
      id: "1",
      title: "Find Food You Love",
      description: "Indulge in exquisite flavors and savor every bite!",
      image: require("../components/assets/images/fast.jpg"),
    },
    {
      id: "2",
      title: "Fast Delivery",
      description: "Get your food delivered hot and fresh at your doorstep!",
      image: require("../components/assets/images/fast.jpg"),
    },
    {
      id: "3",
      title: "Welcome to QuickBite",
      description: "Elevate your dining experience with QuickBite.",
      image: require("../components/assets/images/fast.jpg"),
    },
  ];

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeIn(); // Restart fade-in for the next slide
    });
  };

  useEffect(() => {
    fadeIn();
  }, [currentIndex]);

  const handleNext = async () => {
    fadeOut();
    if (currentIndex < slides.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
    } else {
      // Mark splash screens as completed in AsyncStorage
      await AsyncStorage.setItem("hasSeenSplash", "true");
      navigation.replace("PizzaBurger"); // Navigate to Home
    }
  };

  const handleSkip = async () => {
    // Mark splash screens as completed in AsyncStorage
    await AsyncStorage.setItem("hasSeenSplash", "true");
    navigation.replace("PizzaBurger"); // Navigate to Home
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[styles.image, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        {item.title}
      </Animated.Text>
      <Animated.Text style={[styles.description, { opacity: fadeAnim }]}>
        {item.description}
      </Animated.Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[slides[currentIndex]]}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  image: {
    width: 500,
    height: 600,
    resizeMode: "contain",
    marginTop: -200,
    marginLeft: -80,
    marginBottom: -100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffb300",
    textAlign: "center",
    marginLeft: -80,

    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 20,
    marginLeft: -80,

    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: "#ffffff",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#ff5722",
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#ff5722",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  nextText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SplashScreens;
