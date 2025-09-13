import BackButtonWithText from '@/components/BackButtonWithText';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Books');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarWidth = useRef(new Animated.Value(0)).current;

  const handleSearchPress = () => {
    if (showSearch) {
      // Close search
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowSearch(false);
        setSearchQuery('');
      });
    } else {
      // Open search
      setShowSearch(true);
      Animated.timing(searchBarWidth, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const categories = [
    { id: 'Books', label: 'Books' },
    { id: 'Videos', label: 'Videos' },
    { id: 'Audios', label: 'Audios' },
    { id: 'PDFs', label: 'PDFs' },
    { id: 'Link to other contents', label: 'Link to other contents' },
    
  ];

  const books = [
    {
      id: '1',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '2',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '3',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '4',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '5',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '6',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '7',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
    {
      id: '8',
      title: '',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58.png'),
    },
  ];

  const videos = [
    {
      id: '1',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (2).png'),
    },
    {
      id: '2',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (4).png'),
    },
    {
      id: '3',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (2).png'),
    },
    {
      id: '4',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (4).png'),
    },
    {
      id: '5',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (2).png'),
    },
    {
      id: '6',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (4).png'),
    },
    {
      id: '7',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (2).png'),
    },
    {
      id: '8',
      title: '',
      author: '',
      readTime: '5 mins watch',
      cover: require('@/assets/images/Rectangle 58 (4).png'),
    },
  ];

  const audios = [
    {
      id: '1',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '2',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '3',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '4',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '5',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '6',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '7',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '8',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins listen',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
  ];

  const pdfs = [
    {
      id: '1',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '2',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '3',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '4',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '5',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '6',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '7',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '8',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
  ];

  const linkToOtherContents = [
    {
      id: '1',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '2',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '3',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '4',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '5',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '6',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
    {
      id: '7',
      title: 'Hyper focus',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (5).png'),
    },
    {
      id: '8',
      title: 'Psychology money',
      author: '',
      readTime: '5 mins read',
      cover: require('@/assets/images/Rectangle 58 (7).png'),
    },
  ];

  const renderBookItem = ({ item }: { item: any }) => (
    <View style={styles.bookCard}>
      <Image source={item.cover} style={styles.bookCover} resizeMode="stretch" />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitleText}>
          {selectedCategory === 'Videos' 
            ? 'How to make money' 
            : selectedCategory === 'Audios' 
            ? item.title 
            : selectedCategory === 'PDFs'
            ? item.title
            : selectedCategory === 'Link to other contents'
            ? item.title
            : 'Rich Dad Poor Dad'
          }
        </Text>
        <Text style={styles.readTime}>{item.readTime}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButtonWithText />
        <View style={styles.searchContainer}>
          {!showSearch ? (
            <TouchableOpacity onPress={handleSearchPress} style={styles.searchIconContainer}>
              <Image
                source={require('@/assets/images/search1.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <Animated.View
              style={[
                styles.animatedSearchBar,
                {
                  width: searchBarWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 200],
                  }),
                },
              ]}
            >
              <Image
                source={require('@/assets/images/search1.png')}
                style={styles.searchBarIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
              />
              <TouchableOpacity onPress={handleSearchPress}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Library</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.selectedCategoryTab
            ]}
            onPress={() => setSelectedCategory(category.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{selectedCategory}</Text>
        <TouchableOpacity>
          <Image
            source={require('@/assets/images/filter1.png')}
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Books Grid */}
      <FlatList
        data={
          selectedCategory === 'Videos' 
            ? videos 
            : selectedCategory === 'Audios' 
            ? audios 
            : selectedCategory === 'PDFs'
            ? pdfs
            : selectedCategory === 'Link to other contents'
            ? linkToOtherContents
            : books
        }
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.booksGrid}
        columnWrapperStyle={styles.bookRow}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
  },
  searchContainer: {
    width: 200,
    alignItems: 'flex-end',
    height: 32,
    justifyContent: 'center',
  },
  searchIconContainer: {
    width: 24,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  animatedSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 8,
    height: 32,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  searchBarIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: '#6C757D',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    paddingVertical: 0,
  },
  closeButton: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  categoryContainer: {
    marginTop:20,
    marginBottom:10
  },
  categoryContent: {
    paddingHorizontal: 22,
paddingBottom:20  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    height: 40,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryTab: {
    backgroundColor: '#FFE5E9',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#333333',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: '#D11A38',
  },
  booksGrid: {
    paddingHorizontal: 26,
    paddingBottom: 20,
  },
  bookRow: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bookCard: {
    backgroundColor: 'transparent',
    width: (width - 30) / 2,
  },
  bookCover: {
    width: '110%',
    height: 170,
    right:20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#333333',
  },
  bookDetails: {

  },
  bookTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    top:-10
  },
  readTime: {
    fontSize: 12,
    color: '#D11A38',
    fontWeight: '500',
    top:-10
  },
});