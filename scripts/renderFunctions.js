// ----------- RENDER FUNCTIONS --------- //

async function renderPokeCard(amount){
   startSpinner();
   try{
    const pokemonData = await getPokemonData(amount);
    const specificPokemonData = await getSpecificPokemonData(pokemonData);
    const abilityDataAObj = await getAbilityData(specificPokemonData);
    const contentRef = document.getElementById("content");
    createPokeCard(contentRef, specificPokemonData, abilityDataAObj);
    addInputEventListener(specificPokemonData);
   }
   catch(error){
       console.error(error);
   }
   finally{
     endSpinner();  
   }
    
}

function createPokeCard(contentRef, specificPokemonData, abilityDataObj){
   contentRef.innerHTML = "";                                                                 // For-loop for every Pokemon (based on amount) and contains all the additonal add functions //
    for(let cardIndex = 0; cardIndex < Object.keys(specificPokemonData).length; cardIndex++){
        contentRef.innerHTML += cardTemp(specificPokemonData, cardIndex);
        addAbilitys(cardIndex, abilityDataObj);
        addTypes(cardIndex, specificPokemonData);
        addBackgroundColor(cardIndex, specificPokemonData);
    }
}

async function loadMorePokemon(){
      amount += 20;
      const contentRef = document.getElementById("content");
      contentRef.innerHTML = "";
      await renderPokeCard(amount);
}

async function renderSearchedPokemon(searchedPokemon){
   const abilityData = await getAbilityData(searchedPokemon);
   const contentRef = document.getElementById("content");
   createSearchedPokeCard(contentRef, searchedPokemon, abilityData);
}

function createSearchedPokeCard(contentRef, searchedPokemon, abilityDataObj){
    contentRef.innerHTML = "";                                                       
    for(let cardIndex = 0; cardIndex < searchedPokemon.length; cardIndex++){
      console.log(cardIndex);
        contentRef.innerHTML += cardTemp(searchedPokemon, cardIndex);
        addAbilitys(cardIndex, abilityDataObj);
        addTypes(cardIndex, searchedPokemon);
        addBackgroundColor(cardIndex, searchedPokemon);
    }
}
// ---------- END RENDER FUNCTIONS -------- //




// --------- ABILITY FUNCTIONS ------------//


function addAbilitys(cardIndex, abilityDataObj){
    
    const abilityDiv = document.getElementById(`abilityDiv${cardIndex}`);
    
    for(let i = 0; i < Object.keys(abilityDataObj[cardIndex]).length && i < 1; i++){
        let ability = abilityDataObj[cardIndex][i].name;
        abilityDiv.insertAdjacentHTML("beforeend", `<div class="specificAbilityDiv" id="specificAbilityDiv${cardIndex}-${i}">
                                                       <p>${ability}</p>
                                                    </div>`);
        addAbilityText(cardIndex, abilityDataObj, i);
}
}


function addAbilityText(cardIndex, abilityDataObj, abilityIndex){
    const specificAbilityDiv = document.getElementById(`specificAbilityDiv${cardIndex}-${abilityIndex}`);
    const englishEntry = getEnglishAbilityText(abilityDataObj, cardIndex, abilityIndex);
    specificAbilityDiv.insertAdjacentHTML("beforeend", `<p>${abilityDataObj[cardIndex][abilityIndex].effect_entries[englishEntry].short_effect}</p>`);
    
}

function getEnglishAbilityText(abilityDataObj, cardIndex, abilityIndex){
    const englishAbilities = Object.keys(abilityDataObj[cardIndex][abilityIndex].effect_entries).filter((entry) => 
        abilityDataObj[cardIndex][abilityIndex].effect_entries[entry].language.name === "en");
    return englishAbilities;
}

// --------- END ABILITY FUNCTIONS ------------ //

// --------- TYPE FUNCTIONS ------------ //

function addTypes(cardIndex, specificPokemonData){
    const typeDiv = document.getElementById(`typeDiv${cardIndex}`);
    for(let i = 0; i < specificPokemonData[cardIndex].types.length; i++){
        let typeText = specificPokemonData[cardIndex].types[i].type.name;
        let typeImgSrc = getTypeImg(typeText);
        typeDiv.insertAdjacentHTML("beforeend", `<img class="typeImg" src="${typeImgSrc}" alt="${typeText}" draggable="false">`);
    }
}

function getTypeImg(typeText){
    let typeImg = "";

    switch(typeText){
        case "bug":
            typeImg = "../assets/types/bug.png";
            typeColor = "rgba(172, 216, 52, 0.781)";
            break;
        case "dark":
            typeImg = "../assets/types/dark.png";
            typeColor = "rgb(138, 87, 39)";
            break;
        case "dragon":
            typeImg = "../assets/types/dragon.png";
            typeColor = "rgb(85, 69, 158)";
            break;
        case "electric":
            typeImg = "../assets/types/electric.png";
            typeColor = "rgb(235, 231, 39)";
            break;
         case "fairy":
            typeImg = "../assets/types/fairy.png";
            typeColor = "rgb(221, 125, 208)";
            break;
         case "fighting":
            typeImg = "../assets/types/fighting.png";
            typeColor = "rgb(223, 161, 26)";
            break;
         case "fire":
            typeImg = "../assets/types/fire.png";
            typeColor = "rgba(192, 11, 11, 0.918)";
            break;
         case "flying":
            typeImg = "../assets/types/flying.png";
            typeColor = "";
            break;
         case "ghost":
            typeImg = "../assets/types/ghost.png";
            typeColor = "rgb(111, 26, 223)";
            break;
         case "grass":
            typeImg = "../assets/types/grass.png";
            typeColor = "rgb(39, 95, 17)";
            break;
         case "ground":
            typeImg = "../assets/types/ground.png";
            typeColor = "";
            break;
         case "ice":
            typeImg = "../assets/types/ice.png";
            typeColor = "rgb(31, 184, 204)";
            break;
         case "normal":
            typeImg = "../assets/types/normal.png";
            typeColor = "rgb(120, 124, 120)";
            break;
         case "poison":
            typeImg = "../assets/types/poison.png";
            typeColor = "rgb(223, 102, 192)";
            break;
         case "psychic":
            typeImg = "../assets/types/psychic.png";
            typeColor = "rgb(231, 20, 231)";
            break;
         case "rock":
            typeImg = "../assets/types/rock.png";
            typeColor = "rgba(168, 107, 50, 0.753)";
            break;
         case "steel":
            typeImg = "../assets/types/steel.png";
            typeColor = "rgb(71, 69, 69)";
            break;
         case "stellar":
            typeImg = "../assets/types/stellar.png";
            typeColor = "background: linear-gradient(90deg, red, blue, yellow, green);";
            break;
         case "water":
            typeImg = "../assets/types/water.png";
            typeColor = "rgb(11, 88, 189)";
            break;
            
                }
                
    return typeImg;
}

// --------- END TYPE FUNCTIONS ------------ //

// ---------- COLOR FUNCTIONS ------------ //
function addBackgroundColor(cardIndex, specificPokemonData){
    const cardRef = document.getElementById(`card${cardIndex}`);
    const imgDivRef = document.getElementById(`pokeImgDiv${cardIndex}`);
    const singleType = specificPokemonData[cardIndex].types[0].type.name;
    const backgroundStyles = getBackgroundColors(singleType);
    cardRef.style.backgroundColor = backgroundStyles[1];
    imgDivRef.style.backgroundImage = `url(${backgroundStyles[0]})`;
    imgDivRef.style.backgroundSize = "contain";
    imgDivRef.style.backgroundRepeat = "no-repeat";
}

function getBackgroundColors(singleType){
    let bgImg = "";
    let bgColor = "";

    switch(singleType){
        case "bug":
            bgImg = "../assets/types/bug.png";
            bgColor = "rgba(172, 216, 52, 0.781)";
            break;
        case "dark":
            bgImg = "../assets/types/dark.png";
            bgColor = "rgb(138, 87, 39)";
            break;
        case "dragon":
            bgImg = "../assets/types/dragon.png";
            bgColor = "rgb(85, 69, 158)";
            break;
        case "electric":
            bgImg = "../assets/types/electric.png";
            bgColor = "rgb(235, 231, 39)";
            break;
         case "fairy":
            bgImg = "../assets/types/fairy.png";
            bgColor = "rgb(221, 125, 208)";
            break;
         case "fighting":
            bgImg = "../assets/types/fighting.png";
            bgColor = "rgb(223, 161, 26)";
            break;
         case "fire":
            bgImg = "../assets/types/fire.png";
            bgColor = "rgba(192, 11, 11, 0.918)";
            break;
         case "flying":
            bgImg = "../assets/types/flying.png";
            bgColor = "";
            break;
         case "ghost":
            bgImg = "../assets/types/ghost.png";
            bgColor = "rgb(111, 26, 223)";
            break;
         case "grass":
            bgImg = "../assets/types/grass.png";
            bgColor = "rgb(57, 173, 10)";
            break;
         case "ground":
            bgImg = "../assets/types/ground.png";
            bgColor = "rgb(160, 113, 13)";
            break;
         case "ice":
            bgImg = "../assets/types/ice.png";
            bgColor = "rgb(31, 184, 204)";
            break;
         case "normal":
            bgImg = "../assets/types/normal.png";
            bgColor = "rgb(120, 124, 120)";
            break;
         case "poison":
            bgImg = "../assets/types/poison.png";
            bgColor = "rgb(223, 102, 192)";
            break;
         case "psychic":
            bgImg = "../assets/types/psychic.png";
            bgColor = "rgb(231, 20, 231)";
            break;
         case "rock":
            bgImg = "../assets/types/rock.png";
            bgColor = "rgba(168, 107, 50, 0.753)";
            break;
         case "steel":
            bgImg = "../assets/types/steel.png";
            bgColor = "rgb(71, 69, 69)";
            break;
         case "stellar":
            bgImg = "../assets/types/stellar.png";
            bgColor = "background: linear-gradient(90deg, red, blue, yellow, green);";
            break;
         case "water":
            bgImg = "../assets/types/water.png";
            bgColor = "rgb(11, 88, 189)";
            break;
         default: console.log("No matching type found")
    }

    let backgroundStyle = [bgImg, bgColor]

    return backgroundStyle;


}

// ---------- END COLOR FUNCTIONS ------------ //

// --------- START FUNCTION CALLS --------- //

renderPokeCard(amount);