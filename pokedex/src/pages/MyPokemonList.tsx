import React from "react";
import Layout from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { pokemonsSelector, getPokemons } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import { cachedPokemonsSelector } from "../features/cachedPokemonsSlice";
import PokemonSkeleton from "../components/PokemonSkeleton";
import { useHistory } from "react-router-dom";

const MyPokemonsList = () => {
    const pokemons = useSelector(pokemonsSelector);
    const cachedPokemons = useSelector(cachedPokemonsSelector);
    const history = useHistory();

    return (
        <Layout title="Home">
            <div className="flex items-center justify-center lg:justify-start">
                <h1 className="text-3xl lg:text-5xl font-semibold sm:text-left inline-block">
                    My Pokédex
                </h1>
            </div>

            <InfiniteScroll
                data={pokemons.data}
                paginationHandler={(page: number) =>
                    getPokemons({
                        page,
                        cachedPokemons: cachedPokemons.data,
                        pokemons: pokemons.data,
                    })
                }
                isLoading={pokemons.status.state === SliceStatus.LOADING}
            >
                {({ mutatePage }) => (
                    <>
                        <br />
                        <button
                            className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
                            onClick={() => history.push("/")}
                        >
                            <span className="text-primary font-semibold">Go Back</span>
                        </button>
                        <br />
                        <div className="mx-auto w-full text-center">
                            {!(
                                cachedPokemons.status.state === SliceStatus.LOADING ||
                                cachedPokemons.status.state === SliceStatus.IDLE
                            ) && (
                                    <>
                                        <InfiniteScroll.Container>
                                            {pokemons.data.map((pokemon, index) =>
                                                pokemon === null ? (
                                                    <PokemonSkeleton key={`loading-${index}`} />
                                                ) : (
                                                    <PokemonCard key={pokemon.id} {...pokemon} />
                                                )
                                            )}
                                        </InfiniteScroll.Container>
                                        <InfiniteScroll.Waypoint />
                                    </>
                                )}
                        </div>
                    </>
                )}
            </InfiniteScroll>
        </Layout>
    );
};
export default MyPokemonsList;
