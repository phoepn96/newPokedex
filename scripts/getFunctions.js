let amount = 20;
let offset = 0;

async function getPokemonData(amount){
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offset}`);
    if(!response.ok){
        throw new Error(`failed to fetch pokemonData : ${response.status}`)
    }
    const pokemonData = await response.json();
    return pokemonData;
    }
    catch(error){
        console.error(error);
    }
}

async function getSpecificPokemonData(pokemonData){
    const specificPokemonDataArr = [];
    for(i = 0; i<pokemonData.results.length; i++){
        try{
        const specificPokemonResponse = await fetch(`${pokemonData.results[i].url}`);
        if(!specificPokemonResponse.ok){
            throw new Error(`failed to fetch specificPokemonData : ${specificPokemonResponse.status}`)
        }
        const specificPokemonData = await specificPokemonResponse.json();
        
        specificPokemonDataArr.push(specificPokemonData);
        }
        catch(error){
            console.error(error);
        }
    }
    return specificPokemonDataArr;
}

async function getAbilityData(specificPokemonDataArr){
    let abilityDataObj = {};
    for(let i = 0; i < specificPokemonDataArr.length; i++){
        abilityDataObj[i] =  {};
        try{
            for(let j = 0; j < specificPokemonDataArr[`${i}`].abilities.length; j++){
                try{
                    const abilityResponse = await fetch(`${specificPokemonDataArr[i].abilities[j].ability.url}`);
                    if(!abilityResponse.ok){
                        throw new Error(`failed to fetch abilityData : ${abilityResponse.status}`)
                    }
                    const abilityData = await abilityResponse.json();
                    abilityDataObj[i][j] = abilityData;
                }
                catch(error){
                    console.error(error);
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }
    return abilityDataObj;
}

async function getEvolutionChain(url){
    try{
        const evoResponse = await fetch(`${url}`);
        if(!evoResponse.ok){
            throw new Error(`failed to fetch evolutionChain : ${evoResponse.status}`)
        }
        const evolutionChainData = await evoResponse.json();
        return evolutionChainData;
        
    }
    catch(error){
        console.error(error);
    }
}

async function getSpeciesData(name){
    try{
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        if(!speciesResponse.ok){
            throw new Error(`failed to fetch species Data : ${speciesResponse.status}`)
        }
        const speciesData = await speciesResponse.json();
        return speciesData;
    }
    catch(error){
        console.error(error);
    }

}

async function getSinglePokemon(name){
    try{
        const sinlgePokResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(!sinlgePokResponse.ok){
            throw new Error(`failed to fetch single Pokemon Data : ${sinlgePokResponse.status}`)
        }
        const sinlgePokeData = await sinlgePokResponse.json();
        return sinlgePokeData;
    }
    catch(error){
        console.error(error);
    }
}

async function logData(amount){
    const pokemonData = await getPokemonData(amount);
    const specificPokemonData = await getSpecificPokemonData(pokemonData);
    const abilityData = await getAbilityData(specificPokemonData);
    const speciesData = await getSpeciesData("charmeleon");
    const evoUrl = speciesData.evolution_chain.url;
    const evolutionChainData = await getEvolutionChain(evoUrl);
    console.log(pokemonData);
    console.log(specificPokemonData);
    console.log(abilityData);
    console.log(speciesData);
    console.log(evolutionChainData);
}

//logData(amount);    