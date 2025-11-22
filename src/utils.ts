// devices screen size

import {Dimensions, PixelRatio, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {MMKVLoader} from 'react-native-mmkv-storage';
import { imageUrl } from './redux/baseApi';
import { ReactNode } from 'react';


export const lStorage = new MMKVLoader().initialize();

export const PrimaryColor = '#4964C6';

export const Android = Platform.OS === 'android';

export const Ios = Platform.OS === 'ios';

export const makeImage = (url: string) => {
  return url.startsWith('https') ? url : imageUrl + url;
};
export const makeImageUrl = (url: string) => {
  return imageUrl + url;
};

export const {width, height} = Dimensions.get('screen');
//  three size like sm md or tablet
const fontScale = PixelRatio.getFontScale();
export const FontSize = (size: number) => size / fontScale;

export const isSmall = () => {
  return width < 375;
};
export const isTablet = () => {
  return width >= 768;
};

export const isMobile = () => {
  return width < 768;
};

export const setStorageToken = (token: string) => {
  lStorage.setString('token', token);
};

export const getStorageToken = () => {
  return lStorage.getString('token');
};

export const removeStorageToken = () => {
  lStorage.removeItem('token');
};

export const setStorageRole = (role: string) => {
  lStorage.setString('role', role);
};

export const getStorageRole = () => {
  return lStorage.getString('role');
};

export const removeStorageRole = () => {
  lStorage.removeItem('role');
};

// Store and retrieve service object
export const setServiceData = (service: any) => {
  lStorage.setMap('services', service);
};

export const getServiceData = () => lStorage.getMap('services');

// for pormInput 

// Save form value object
export const setExplainMemberValue = (value: {
  title: string;
  subtitle: string;
  currency: string;
  price: string;
  description: string;
  category: string;
  icon: ReactNode;
}) => {
  try {
    lStorage.setString('explainMemberValue', JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save form value:', error);
  }
};



type ExplainMemberValue = {
  title: string;
  subtitle: string;
  currency: string;
  price: string;
  description: string;
  category: string;
  icon: ReactNode;
};

export const getExplainMemberValue = (): ExplainMemberValue => {
  try {
    const storedValue = lStorage.getString('explainMemberValue');

    if (storedValue) {
      const parsed = JSON.parse(storedValue);

      

      return {
        title: parsed.title || '',
        subtitle: parsed.subtitle || '',
        currency: parsed.currency || '',
        price: parsed.price || '',
        description: parsed.description || '',
        category: parsed.category || '',
        icon: parsed.icon || null, // Ensure icon is handled correctly
      };
    }
  } catch (error) {
    console.error('Failed to load form value:', error);
  }

  // default values
  return {
    title: '',
    subtitle: '',
    currency: '',
    price: '',
    description: '',
    category: '',
    icon: null,
  };
};


// Optional: clear it
export const clearFormValue = () => {
  try {
    lStorage.removeItem('explainMemberValue');
  } catch (error) {
    console.error('Failed to clear form value:', error);
  }
};



// selected pdf data loader


export const saveMediaPromptData = (
  selectedPdf: File,
  capturedVideo: string | null,
  promptInput: string | null,
  value: string | null,
) => {
  try {
    lStorage.setString('selectedImages', JSON.stringify(selectedPdf));
    lStorage.setString('capturedVideo', capturedVideo || '');
    lStorage.setString('promptInput', promptInput || '');
    lStorage.setString('title', JSON.stringify(value)); 
  } catch (e) {
    console.error('Storage Save Error:', e);
  }
};

export const loadMediaPromptData = () => {
  try {
    const images = lStorage.getString('selectedImages');
    const video = lStorage.getString('capturedVideo');
    const prompt = lStorage.getString('promptInput');
   const titleString = lStorage.getString('title');

    return {
      selectedImages: images ? JSON.parse(images) : [],
      capturedVideo: video || null,
      promptInput: prompt || '',
     title: titleString ? JSON.parse(titleString) : '',
    };
  } catch (e) {
    console.error('Storage Load Error:', e);
    return { selectedImages: [], capturedVideo: null, promptInput: '' };
  }
};

export const clearMediaPromptData = () => {
  try {
    lStorage.removeItem('selectedImages');
    lStorage.removeItem('capturedVideo');
    lStorage.removeItem('promptInput');
    lStorage.removeItem('title');
  } catch (e) {
    console.error('Storage Clear Error:', e);
  }
};










export const useImagePicker = async ({
  option,
  selectionLimit,
}: {
  option: 'camera' | 'library';
  selectionLimit?: number;
}) => {
  try {
    if (option === 'camera') {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
    if (option === 'library') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        selectionLimit: selectionLimit || 1, // Set to 0 for unlimited image selection
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function getRandomHashColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Usage:
// const price = formatCurrency(1234.56, 'fr-FR', 'EUR');
// console.log(price); // Output: "1 234,56 €" (French formatting for Euros)
