
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';



const App = ({ navigation }) => {
  const [genre, setGenre] = useState('');

  const handleSuggestMovie = () => {
    axios.get('http://10.136.63.212:3000/movies')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar filmes:', error);
    });
    

    async function suggestMovieByGenre(genre) {
        try {
            const movies = await getMoviesByGenre(genre);
            if (movies.length > 0) {
                
                const randomIndex = Math.floor(Math.random() * movies.length);
                return movies[randomIndex];
            } else {
                return "Nenhum filme encontrado para o gênero fornecido.";
            }
        } catch (error) {
            console.error('Erro ao sugerir filme:', error);
            return "Ocorreu um erro ao sugerir um filme.";
        }
    }
    
   
    suggestMovieByGenre('Action').then(movie => {
        console.log('Filme sugerido:', movie);
    }).catch(err => {
        console.error('Erro:', err);
    });
    
    alert(`Sugestão de filme do gênero ${genre}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gênero do Filme:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setGenre(text)}
        value={genre}
        placeholder="Digite o gênero do filme"
      />
      <Button title="Sugerir Filme" onPress={handleSuggestMovie} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default App;
