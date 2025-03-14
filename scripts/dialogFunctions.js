
//// --- RENDER FUNCTIONS FOR BIG CARD --- ////


async function openBigCard(cardIndex){
    const pokemonData = await getPokemonData(amount);
    const specificPokemonData = await getSpecificPokemonData(pokemonData);
    const abilityData = await getAbilityData(specificPokemonData);
    const bigCardRef = document.getElementById("bigCard");
    bigCardRef.innerHTML = "";
    renderBigCard(specificPokemonData, cardIndex);
    addAbilityEventlistener(cardIndex, abilityData);
    addEvoEventlistener(cardIndex, specificPokemonData);
    addStatEventlistener(cardIndex, specificPokemonData);
    bigCardRef.showModal(); 
}

function renderBigCard(specificPokemonData, cardIndex, abilitys){
    const bigCardRef = document.getElementById("bigCard");
    bigCardRef.innerHTML += bigCardTemp(specificPokemonData, cardIndex, abilitys);
    addTypesToBig(specificPokemonData, cardIndex);
}

// --- Add types --- //

function addTypesToBig(specificPokemonData, cardIndex){
    const typeDivRef = document.getElementById("bigCardTypeDiv");
    typeDivRef.innerHTML = "";
    for(let i = 0; i < specificPokemonData[cardIndex].types.length; i++){
        const typeName = specificPokemonData[cardIndex].types[i].type.name;
        typeDivRef.innerHTML += `<div id="type${i}"><p>${typeName}</p></div>`;
        addTypeIcons(i, typeName);
        
    }
}

function addTypeIcons(i, typeName){
    const specificTypeDivRef = document.getElementById(`type${i}`);
    const imgSrc = getTypeImg(typeName);
    specificTypeDivRef.innerHTML += `<img class="bigTypeImg" src="${imgSrc}" alt="${typeName}">`;
}

// --- END add types --- //

// --- Add abilitys button--- //

function showAbilities(cardIndex, abilitys){
    const bigContentRef = document.getElementById("bigContentDiv");
    bigContentRef.innerHTML = "";
    for(let i = 0; i < Object.keys(abilitys[cardIndex]).length; i++){
        const abilityName = abilitys[cardIndex][i].name;
        const abilityText = getAbilityText(abilitys, cardIndex, i);
        bigContentRef.innerHTML += abilityTemp(abilityName, abilityText);
    }
}

function getAbilityText(abilitys, cardIndex, abilityIndex){
    const englishEntry = getEnglishAbilityText(abilitys, cardIndex, abilityIndex)
    const engAbilityText = abilitys[cardIndex][abilityIndex].effect_entries[englishEntry].short_effect;
    return engAbilityText;
}

// --- END add abilitys button--- ///

// --- Stats Button --- //

function showStats(cardIndex, specificPokemonData){
    const bigContentRef = document.getElementById("bigContentDiv");
    bigContentRef.innerHTML = "";
    const hpStat = specificPokemonData[cardIndex].stats[0].base_stat;
    const attackStat = specificPokemonData[cardIndex].stats[1].base_stat;
    const defenseStat = specificPokemonData[cardIndex].stats[2].base_stat;  
    const specialAttackStat =  specificPokemonData[cardIndex].stats[3].base_stat;
    const specialDefenseStat = specificPokemonData[cardIndex].stats[4].base_stat;
    const speedStat = specificPokemonData[cardIndex].stats[5].base_stat;
    bigContentRef.innerHTML = statsTemp(hpStat, attackStat, defenseStat, specialAttackStat, specialDefenseStat, speedStat);
}

// --- End Stats Button --- //

// --- Evo button --- //

async function showEvoChain(cardIndex, specificPokemonData){
    const pokeName = specificPokemonData[cardIndex].name;
    const speciesData = await getSpeciesData(pokeName);
    const evoUrl = speciesData.evolution_chain.url;
    const evoData = await getEvolutionChain(evoUrl);
    const bigContentRef = document.getElementById("bigContentDiv");
    bigContentRef.innerHTML = "<div id='evoContentDiv'></div>";
    firstEvo(evoData);
    secondEvo(evoData);
    thirdEvo(evoData);
}

async function firstEvo(evoData){
    const evoContentRef = document.getElementById("evoContentDiv");
    const firstEvoName = evoData.chain.species.name; 
    const evoPokeData = await getSinglePokemon(firstEvoName);
    const imgUrl = evoPokeData.sprites.front_default;
     evoContentRef.innerHTML += evoTemp(firstEvoName, imgUrl);
}

async function secondEvo(evoData){
    const evoContentRef = document.getElementById("evoContentDiv");
    const secondEvoName = evoData.chain.evolves_to[0]?.species?.name;
    if(secondEvoName){
        const evoPokeData = await getSinglePokemon(secondEvoName);
        const imgUrl = evoPokeData.sprites.front_default;
        evoContentRef.innerHTML += evoTemp(secondEvoName, imgUrl);
    }
}

async function thirdEvo(evoData){
    const evoContentRef = document.getElementById("evoContentDiv");
    const thirdEvoName = evoData.chain.evolves_to[0]?.evolves_to[0]?.species?.name;
    if(thirdEvoName){
        const evoPokeData = await getSinglePokemon(thirdEvoName);
        const imgUrl = evoPokeData.sprites.front_default;
        evoContentRef.innerHTML += evoTemp(thirdEvoName, imgUrl);
    }
}
// --- END evo button --- //

// --- END RENDER FUNCTIONS --- //

// ---------- Eventlisteners -------- //

// i had to do it, because i cant pass objects into inline html :/ //

function addAbilityEventlistener(cardIndex, abilityData){
    const abilityBtnRef = document.getElementById("showAbilitiesBtn");
    abilityBtnRef.removeEventListener("click", () => {
        showAbilities(cardIndex, abilityData)
    });

    abilityBtnRef.addEventListener("click", () => {
        showAbilities(cardIndex, abilityData)
    });
}

function addStatEventlistener(cardIndex, specificPokemonData){
    const statsBtn = document.getElementById("showStatsBtn");
    statsBtn.removeEventListener("click", () => {
        showStats(cardIndex, specificPokemonData);

    });
    statsBtn.addEventListener("click", () => {
        showStats(cardIndex, specificPokemonData);

    });
}

function addEvoEventlistener(cardIndex, specificPokemonData){
    const evoBtn = document.getElementById("showEvoBtn");
    evoBtn.removeEventListener("click", () => {
        showEvoChain(cardIndex, specificPokemonData);
    });
    evoBtn.addEventListener("click", () => {
        showEvoChain(cardIndex, specificPokemonData);
    });
}

// --------- END Eventlisteners ------------ //