const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types');
const pokeStats = document.querySelector('[data-poke-stats]');


const typeColors ={
    electric: '#F4DB25',
    normal:'#A695A6',
    fire:'#EB5924',
    water:'#1FA8FF',
    ice: '#89E4F0',
    rock:'#808080',
    flying:'#CFE5EE',
    grass:'#A1F0A1',
    psychic: '#F25AA8',
    ghost:'#7F5EA6',
    bug:'#A3D986',
    poison:'#B083E6',
    ground:'#8C8C65',
    dragon: '#F0E9B9',
    steel:'#CFE5E2',
    fighting:'#EB0937',
    default:'#000',
}

const searchPokemon = event =>{
    event.preventDefault();
    const {value}=event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data=>data.json())
    .then(response=>renderPokemonData(response))
    .catch(err=>renderNotFound())
}


const renderPokemonData = data=>{
    const sprite=data.sprites.front_default;
    const{stats, types} = data;


    pokeName.textContent=data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent=`Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name]:typeColors.default;
    pokeImg.style.background=`radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize='1rem 1rem';
}

const renderPokemonTypes = types=>{
    pokeTypes.innerHTML='';
    types.forEach(type=>{
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color=typeColors[type.type.name];
        typeTextElement.textContent= type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats=>{
    pokeStats.innerHTML='';
    stats.forEach(stat=>{
        const statElement = document.createElement("div");
        const statElementName =document.createElement("div");
        const statElementAmount=document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound=()=>{
    pokeName.textContent='Pokémon no encontrado!';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background='#fff';
    pokeStats.innerHTML='';
    pokeTypes.innerHTML='';
    pokeId.textContent='';
}