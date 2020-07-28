import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testes do FavoritePokemons', () => {
	const newPokemons = pokemons.filter((pokemon, index) => {
		if(index > 0) return pokemon;
	});

	test('Certeza que não ha nenhum outro pokemon favorito?', () => {
		const { getByText } = render(<FavoritePokemons />);
		const favoritesInStore = localStorage.FavoritePokemonIds;
		const noFav = getByText('No favorite pokemon found');
		if (favoritesInStore === undefined) {
			expect(noFav).toBeInTheDocument();
		};
	});

	test('Existe um ou mais pokemons nos favoritos?', () => {
		const historico = createMemoryHistory();
		const { queryByText } = render(
			<Router history={historico}>
				{<FavoritePokemons pokemons={newPokemons} />}
			</Router>);
			expect(queryByText(
				'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'),
			).toBeInTheDocument();
		});
			
	test('Se não tiver no favoritos não pode rendenizar pokemons', () => {
		const historico = createMemoryHistory();
		const { queryByText } = render(
			<Router history={historico}>
				{<FavoritePokemons pokemons={newPokemons} />}
			</Router>);
		expect(queryByText('Pikachu')).not.toBeInTheDocument();
	});
});
