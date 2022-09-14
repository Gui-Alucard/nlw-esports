import { View, Image, FlatList } from 'react-native';

import { Heading } from 'components/Heading';
import { GameCard } from 'components/GameCard';

import { GAMES } from 'utils/games';

import logoImg from '@assets/logo-nlw-esports.png'
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        horizontal
        data={GAMES}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        renderItem={({ item }) => (
          <GameCard
            data={item}
          />

        )}
      />
    </View>
  );
}