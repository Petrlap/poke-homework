import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home({}) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );
    const result = response.data.results;
    const promises = result.map((elem) => axios.get(elem.url));
    const responses = await Promise.all(promises);
    const pokemons = responses.map((response) => ({
      name: response.data.name,
      photo: response.data.sprites.front_shiny,
      moves: response.data.moves,
      id: response.data.id,
      height: response.data.height,
      base_experience: response.data.base_experience,
    }));
    setPokemons(pokemons);
  }, []);

  const memoizedPokemonList = useMemo(
    () => (
      <div className={styles.chips}>
        {pokemons.map((pokemon) => (
          <button
            key={pokemon.name}
            className={styles.chips_button}
            onClick={() => handleClick(pokemon)}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    ),
    [pokemons]
  );
  return (
    <>
      <Head>
        <title>PokeAPI</title>
        <meta name="description" content="My homework" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.chipsContainer}>
            {memoizedPokemonList}

            <div className={styles.description}>
              {selectedPokemon && (
                <>
                  <h2 className={styles.description_name}>
                    {selectedPokemon.name.charAt(0).toUpperCase() +
                      selectedPokemon.name.slice(1)}
                  </h2>
                  <Image
                    priority
                    src={`${selectedPokemon.photo}?format=webp`}
                    className={styles.description_img}
                    width={396}
                    height={288}
                    alt={selectedPokemon.name}
                  />
                  <p className={styles.description_moves}>
                    Снялся в {selectedPokemon.moves.length} сериях
                  </p>
                  <p className={styles.description_id}>
                    id: {selectedPokemon.id}
                  </p>
                  <p className={styles.description_height}>
                    height: {selectedPokemon.height}
                  </p>
                  <p className={styles.description_attack}>
                    attack: {selectedPokemon.base_experience}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
