import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { episodeApi } from '../constants/constants';
import { IEpisode, IInfo } from '../interfaces/episode';

const MainScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [prevButtonDisabled, setPreButtonDisabled] = useState(true);
  const [api, setApi] = useState<string | null>(episodeApi);
  const [results, setResults] = useState<IEpisode[]>([]);
  const [info, setInfo] = useState<IInfo>();

  const getMovies = async (_api: string) => {
    try {
      const response = await fetch(_api);
      const json = await response.json();
      setResults(json.results);
      setInfo(json.info);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onNext = useCallback(() => {
    setApi(info?.next as string);
    if (info?.prev) {
      setPreButtonDisabled(false);
    }
  }, [info?.next, info?.prev]);

  const onPrev = useCallback(() => {
    if (info?.prev) {
      setPreButtonDisabled(true);
    }
    setApi(info?.prev as string);
  }, [info?.prev]);

  useEffect(() => {
    if (api) {
      getMovies(api);
    }
  }, [api]);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => (
      <Text>
        {item.name}, {item.air_date}
      </Text>
    ),
    [],
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <View style={styles.bottomView}>
        <Button title="Before" disabled={prevButtonDisabled} onPress={onPrev} />
        <Button title="Next" disabled={false} onPress={onNext} />
      </View>
    </View>
  );
};

export default React.memo(MainScreen);

const styles = StyleSheet.create({
  textStyle: {
    color: 'blue',
  },
  container: {
    padding: 24,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
