function startSpinner(){
    const pokeball = document.getElementById("pokeball");
    pokeball.style.display = "none";
    const spinner = document.getElementById("spinner");
    const pokeballSpinner = document.getElementById("pokeballSpinner");
    pokeballSpinner.classList.remove("hide");
    spinner.showModal();
    spinner.classList.remove("hide");
}

function endSpinner(){
    const spinner = document.getElementById("spinner");
    spinner.close();
    spinner.classList.add("hide")
    const pokeball = document.getElementById("pokeball");
    pokeball.style.display = "flex";
    const pokeballSpinner = document.getElementById("pokeballSpinner");
    pokeballSpinner.classList.add("hide");
}

function nextBigCard(cardIndex){
    cardIndex ++;
    if(cardIndex > amount-1){
        cardIndex = 0;
        openBigCard(cardIndex);
    }else{
        openBigCard(cardIndex);
    }
}

function previousBigCard(cardIndex){
    filterPokemon(cardIndex);
    if(cardIndex < 0){
        cardIndex = amount-1;
        openBigCard(cardIndex);
    }else{
        openBigCard(cardIndex);
    }
}

function closeBigCard(){
    const bigCardRef = document.getElementById("bigCard");
    bigCardRef.close();
}

function filterPokemon(specificPokemonData){
    const searchInput = document.getElementById("searchInput").value;
    let searchedPokemon = [];
    if(searchInput.length > 2){
        specificPokemonData.filter((pokemon) =>{
            let targetPokemon = pokemon.name.includes(searchInput.toLowerCase());
            if(targetPokemon === true){
                searchedPokemon.push(pokemon);
            }
        });
        renderSearchedPokemon(searchedPokemon);
    }else{
        renderPokeCard(amount);
    }
}

function addInputEventListener(specificPokemonData){
    const searchInput = document.getElementById("searchInput");

    searchInput.removeEventListener("input", ()=>{
        filterPokemon(specificPokemonData);
    });

    searchInput.addEventListener("input", ()=>{
        filterPokemon(specificPokemonData);
    });
}