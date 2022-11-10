import React, { useState } from 'react';
import {FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import RepoPreview from './components/RepoPreview';

const App: React.FC = (): JSX.Element => {
  const [search, setSearch] = useState<string>('');

  //user data
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [followers, setFollowers] = useState<number>();
  const [following, setFollowing] = useState<number>();
  const [numberOfRepos, setNumberOfRepos] = useState<number>();
  const [reposUrl, setReposUrl] = useState<string>('');
  const [avatar, setAvatar] = useState<string>();
  const [error, setError] = useState(null);

//repositories data
  const [reposData, setReposData] = useState([]);


  type UserData = {
    login: string;
    name: string;
    location: string;
    followers: number;
    following: number;
    public_repos: number;
    repos_url: string;
    avatar_url: string;
  };

const setData = ({login, name, location, followers, following, public_repos, repos_url, avatar_url}: UserData) => {
  setUsername(login);
  setName(name);
  setLocation(location);
  setFollowers(followers);
  setFollowing(following);
  setNumberOfRepos(public_repos);
  setReposUrl(repos_url);
  setAvatar(avatar_url);
};


const onPress = () => {
    fetch(`https://api.github.com/users/${search}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
          console.log('data =', data);
        }
      });
  };


  const showRepos = () => {
    fetch(`https://api.github.com/users/${search}/repos`)
      .then(response => response.json())
      .then(reposData => {
        if (reposData.message) {
          console.log('You must search for a user first');
          setError(reposData.message);
        } else {
      setReposData(reposData);
      setError(null);
        console.log('reposData = ', reposData);
        console.log('reposData nazwa pierwszego repozytorium = ', reposData[0].name);
  }});
  }

  const renderItem = ({item}: any) => {
    return (
      <RepoPreview
        id={item.id}
        name={item.full_name.split('/').pop()}
        description={item.description}
        html_url={item.html_url}
        forks_count={item.forks_count}
        watchers_count={item.watchers_count}
        stargazers_count={item.stargazers_count}
        language={item.language}
      />
    )
  }

  const listHeaderComponent = () => {
  return (   
    <>
    <SafeAreaView style={{alignItems: 'center'}}>
      <Text
        style={{color: 'midnightblue'}}>
        Github user info: 
        {error}
      </Text>
      <View style={styles.userData}>
        <Image style={styles.userAvatar} source={{uri: avatar}} />
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Username: {username}</Text>
          <Text style={styles.userText}>{name}</Text>
          <Text style={styles.userText}>{location}</Text>
          <Text style={styles.userText}>Followers: {followers}, Following: {following}</Text>
          <Text style={styles.userText}>No of public repositories: {numberOfRepos}</Text> 
        </View>
      </View>
      <TouchableOpacity 
        style={styles.reposButton}
        onPress={showRepos}
        accessibilityRole="button"
        accessibilityLabel='Przycisk do pobrania listy repozytoriów wyszukanego użytkownika'
        accessibilityHint='Pobiera repozytoria wyszukanego użytkownika'
      >
        <Text style={styles.buttonText}>
          Show repositories!
        </Text>
      </TouchableOpacity>
      </SafeAreaView>
    </>
  )
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          value={search}
          onChangeText={val => setSearch(val)}
          placeholder="Napisz coś"
          placeholderTextColor={'midnightblue'}
          multiline={false}
          accessibilityLabel="Pole do wpisania nazwy użytkownika"
          accessibilityHint="Wpisz nazwę użytkownika"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel='Przycisk do wyszukania użytkownika'
          accessibilityHint='Wyszukuje użytkownika'
        >
          <Text style={styles.buttonText}>
            Search!
          </Text>
        </TouchableOpacity>
      </View>

      {error ? (

          <View style={styles.error}>
            <Text style={{fontSize: 25, color: 'black'}}>User not found...</Text>
          </View>

        ) : (

          <View style={styles.resultsContainer}>
            <View style={styles.flatlist}>
              <FlatList
                data={reposData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={listHeaderComponent}
                contentContainerStyle={{paddingBottom: 10}}
              />
            </View>
          </View>
        )
      }
    </View>
  );
};


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10@ms',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
    marginHorizontal: '15@s',
    height: '80@vs',
    borderTopLeftRadius: '25@ms',
    borderTopRightRadius: '25@ms',
  },
  searchBar: {
    backgroundColor: 'papayawhip',
    color: 'midnightblue',
    width: '70%',
    height: '45@vs',
    borderTopLeftRadius: '35@ms',
    borderBottomLeftRadius: '35@ms',
    paddingHorizontal: '15@s',
    borderColor: 'steelblue',
    borderWidth: 2,
    borderRightWidth: 1,
  },
  button: {
    width: '20%',
    height: '45@vs',
    backgroundColor: 'goldenrod',
    borderTopRightRadius: '35@ms',
    borderBottomRightRadius: '35@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'steelblue',
    borderWidth: 2,
    borderLeftWidth: 1,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'papayawhip',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: '25@ms',
    borderBottomRightRadius: '25@ms',
  },
  userData: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingVertical: '10@vs',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userAvatar: {
    width: '100@ms',
    height: '100@ms',
    borderWidth: 2,
    borderColor: 'steelblue',
    borderRadius: 60 / 2,
  },
  userText: {
    color: 'steelblue',
    fontSize: '16@ms',
  },
  reposButton: {
    height: '40@ms',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: 'goldenrod',
    borderRadius: 50 / 2,
    color: 'midnightblue',
    marginVertical: '1@vs',
    borderColor: 'steelblue',
    borderWidth: 2,
  },
  error: {
    backgroundColor: 'red',
    height: '80@vs',
    borderBottomLeftRadius: '25@ms',
    borderBottomRightRadius: '25@ms',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'midnightblue',
    fontWeight: '700',
  },
  flatlist: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
