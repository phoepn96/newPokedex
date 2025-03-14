function cardTemp(specificPokemonData, cardIndex){
    return `
    <div class="card" id="card${cardIndex}" onclick="openBigCard(${cardIndex})">
        <div class="headline" id="headlineDiv${cardIndex}">
            <h2>${specificPokemonData[cardIndex].name}</h2>
            <h3>${specificPokemonData[cardIndex].stats[0].base_stat}HP</h3>
            <div class="typeDiv" id="typeDiv${cardIndex}">
            </div>
        </div> 
        <div class="pokeImgDiv" id="pokeImgDiv${cardIndex}">
            <img class="pokeImg" src="${specificPokemonData[cardIndex].sprites.front_default}" alt="${specificPokemonData[cardIndex].name}">
        </div>
        <div class="abilityDiv" id="abilityDiv${cardIndex}">
            
        </div>
    </div>`

}

function bigCardTemp(specificPokemonData, cardIndex){
    return `
        <div id="bigCardContainer">
         <img src="../assets/icons/back.png" id="backBtn" class="arrowBtn" onclick="previousBigCard(${cardIndex})">
         <div class="bigCard">
            <div class="bigCardHeadline">
                <h2>${specificPokemonData[cardIndex].name}</h2>
                <h3>ID: ${specificPokemonData[cardIndex].id}</h3>   
            </div>
            <div class="imgDiv">
                <img class="bigCardImg" src="${specificPokemonData[cardIndex].sprites.front_default}" alt="${specificPokemonData[cardIndex].name}">
            </div>
            <div class="typeDiv" id="bigCardTypeDiv">
            </div>
            <div class="btnDiv">
                <button id="showStatsBtn">Show Stats</button>
                <button id="showAbilitiesBtn">Show Abilities</button>
                <button id="showEvoBtn">Show Evolution</button>
            </div>
            <div class="bigContentDiv" id="bigContentDiv">
            </div>
            <button id="closeBtn" onclick="closeBigCard()">Close</button>
        </div>
        <img src="../assets/icons/next.png" id="nextBtn" class="arrowBtn" onclick="nextBigCard(${cardIndex})">
        </div>
    `
}

function statsTemp(hpStat, attackStat, defenseStat, specialAttackStat, specialDefenseStat, speedStat){
    return`
        <div class="statDiv">
            <h2>HP: ${hpStat}</h2>
        </div>
        <div class="statDiv">
            <h2>HP: ${attackStat}</h2>
        </div>
        <div class="statDiv">
            <h2>HP: ${defenseStat}</h2>
        </div>
        <div class="statDiv">
            <h2>HP: ${specialAttackStat}</h2>
        </div>
        <div class="statDiv">
            <h2>HP: ${specialDefenseStat}</h2>
        </div>
        <div class="statDiv">
            <h2>HP: ${speedStat}</h2>
        </div>
    
    `
}

function abilityTemp(abilityName, abilityText){
    return`
        <div class="abilityDiv">
            <h2>${abilityName}</h2>
            <p>${abilityText}</p>
        </div>
    `
}
function evoTemp(name, url){
    return`
        <div class="evoDiv">
            <h2>${name}</>
            <img src="${url}" class="evoImg">
        </div>
    `
}