import React from 'react';
import {Text, View} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

type RepoInfo = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    forks_count: number;
    watchers_count: number;
    stargazers_count: number;
    language: string;
  };

const RepoPreview: React.FC<RepoInfo> = ({
    id,
    name,
    description,
    html_url,
    forks_count,
    watchers_count,
    stargazers_count,
    language,
  }): JSX.Element => {
    return (
            <View style={styles.list}>
                <Text>Repository ID: {id}</Text>
                <Text>Repository name: {name}</Text>
                <Text>Description: {description}</Text>
                <Text>URL: {html_url}</Text>
                <Text>Forks: {forks_count}</Text>
                <Text>Watchers: {watchers_count}</Text>
                <Text>Stars: {stargazers_count}</Text>
                <Text>Main language: {language}</Text>
            </View>
    );
  };

  const styles = ScaledSheet.create({
    list: {
        backgroundColor: 'powderblue',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: '2@vs',
        padding: '8@ms',
        borderRadius: 50 / 2,
        borderColor: 'steelblue',
        borderWidth: 2,
    },
  });

export default RepoPreview;
