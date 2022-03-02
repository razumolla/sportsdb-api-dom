const allPlayers = () => {
    document.getElementById('player-container').innerHTML = ''; // new player search korar por ,ager player er sob info empty hoye jabe
    document.getElementById('spinner').style.display = 'block'; // spinner show when processing

    const searchValue = document.getElementById('search-box').value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue} `;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.player)
            if (data.player == null) {
                document.getElementById('spinner').style.display = 'block';
            }
            else {
                showPlayerDetails(data.player);
                document.getElementById('spinner').style.display = 'none';
            }
        });
    document.getElementById('search-box').value = ''; //input field clean kore dilam

}
const showPlayerDetails = (players) => {
    if (players.length > 0) {
        console.log(players.length)
        document.getElementById('spinner').style.display = 'none'; //spinner none ,when data processed
    }
    else {
        document.getElementById('spinner').style.display = 'block';//spinner colbe karon data nai
    }

    const parent = document.getElementById('player-container');
    console.log(players);
    for (const player of players) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5">
            <div class="pro-pic">
                <img src="${player.strThumb}" class='w-50' alt="">
            </div>
            <h2>Name: ${player.strPlayer} </h2>
            <h5>Country: ${player.strNationality}</h5>
            <p> </p>
            <div class="allbutton">
                <button class="btn btn-danger"> Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success"> Details</button> 
            </div>
        </div>
        `;
        parent.appendChild(div)
    }
}

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]))
}

const setDetails = (info) => {
    console.log(info.strGender)

    if (info.strGender == 'Male') {
        document.getElementById('male').style.display = 'block'
        document.getElementById('female').style.display = 'none'
    }
    else {
        document.getElementById('male').style.display = 'none'
        document.getElementById('female').style.display = 'block'
    }

    document.getElementById('details-container').innerHTML = `
        <div class="card border p-5">
            <div class="pro-pic">
                <img src="${info.strThumb}" class='w-50' alt="">
            </div>
            <h2>Name: ${info.strPlayer} </h2>
            <h4>Pisition: ${info.strPosition} </h4>
            <h4>Team: ${info.strTeam} </h4>
            <h5>Country: ${info.strNationality}</h5>
            <h5>Weight: ${info.strWeight}</h5>
            <h5>Birth: ${info.strBirthLocation}  </h5>
            <p>Birth: ${info.strDescriptionEN.slice(0, 400)}  </p>
            
        </div>
    `;
}