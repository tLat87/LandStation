import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Share,
  Image,
} from 'react-native';
import { Card } from '../landStationComponents/Card';
import { colors } from '../landStationConstants/colors';
import { BACKGROUND_IMAGE } from '../landStationConstants/images';

interface AboutAppScreenProps {
  navigation: any;
}

export const AboutAppScreen: React.FC<AboutAppScreenProps> = ({
  navigation,
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Land Bro Case UK Station - your personal discovery station for the UK! Discover hidden places, track your mood, and create memories with friends.',
        title: 'Land Bro Case UK Station',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      blurRadius={10}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>ABOUT THE APP</Text>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About the app</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoLine1}>Land Bro Case</Text>
            <Text style={styles.logoLine2}>UK Station</Text>
          </View>

          <Text style={styles.description}>
            Land Bro Case UK Station is your{'\n'}
            personal discovery station for the UK.{'\n'}
            Chloe's guide will help you set the mood,{'\n'}
            find places to walk, make memories and{'\n'}
            see how your day changes.{'\n'}
            There are no ads, noise or fuss here –{'\n'}
            just light, stories and a British{'\n'}
            atmosphere of calm.
          </Text>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Image source={require('../img/icons/share.png')} style={styles.shareIcon} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 20,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: colors.dark.text,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark.text,
  },
  card: {
    padding: 24,
    position: 'relative',
  },
  logoContainer: {
    backgroundColor: colors.dark.button,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  logoLine1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.text,
    marginBottom: 4,
  },
  logoLine2: {
    fontSize: 14,
    color: colors.dark.text,
  },
  description: {
    fontSize: 16,
    color: colors.dark.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.dark.button,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: colors.dark.text,
  },
});