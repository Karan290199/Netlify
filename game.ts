class Game {
    teams: Array<Team> = [];
    currTeam: Team;
    oppTeam: Team;
    id: number;
    constructor(id: number) {
        for (let i = 0; i < 2; i++) {
            this.teams.push(new Team(i));
        }
        if (id === 1) {
            this.currTeam = this.teams[0];
            this.oppTeam = this.teams[1];
        }
        else {
            this.currTeam = this.teams[1];
            this.oppTeam = this.teams[0];
        }
    }
}

class Team {
    id: number;
    team_score: number = 0;
    players: Array<Player> = [];
    currPlayer: Player;
    nxtPlayers: Player;
    constructor(id: number) {
        this.id = id;
        for (let i = 0; i < 10; i++) {
            this.players.push(new Player(i));
        }
        this.currPlayer = this.players[0];
    }
    getnext() {
        this.nxtPlayers = this.players[this.currPlayer.id + 1];
        this.currPlayer = this.nxtPlayers;
    }
}
class Player {
    id: number;
    score: number = 0;
    net_score: number = 0;
    balls_faced: number = 0;
    ballsperover: Array<number> = [null, null, null, null, null, null];
    constructor(id: number) {
        this.id = id;
    }
    hit() {
        let team = game.currTeam;
        let l = 0;
        let ranRun = Math.floor(Math.random() * 7)
        this.ballsperover[++this.balls_faced] = ranRun;
        if (ranRun != 0 && this.balls_faced < 6) {
            this.score += ranRun;
            l += ranRun;
        }
        else if (ranRun === 0 || this.balls_faced >= 6) {
            team.getnext();
        }
        this.net_score = l;
        team.team_score += l;
    }
}


let game;
let button = document.getElementById('Create');
let hit1 = document.getElementById('hit1');
let hit2 = document.getElementById('hit2');

hit1.style.display = "none";
hit2.style.display = "none";

button.addEventListener ("click", res) 
function res(){
    let id = Math.floor(Math.random() * 2) + 1;
    button.style.display = "none";
    game = new Game(id);
    func(id,game);
};

let func = (id: number,game: Game) => {
    if (id === 1) {
        hit1.style.display = "block";
        hit2.style.display = "none";
        let team1score = 0;
        let mydiv = document.createElement("div");
        let p = document.createElement("p");
        mydiv.setAttribute('id', 'div1');
        hit1.onclick = function myfunct() {
            game?.currTeam?.currPlayer?.hit();
            if(game?.currTeam?.currPlayer?.net_score != undefined){
                team1score += game?.currTeam?.currPlayer?.net_score;
                p.innerText = `Team0 score: ${team1score}`;
            }
            else{
                game.currTeam.team_score = team1score;
                let temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam,temp);
                if(game.currTeam.team_score === 0){
                    func(temp.id+2,game);
                }
                else{
                    if(game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score !=0){
                        alert(`Team${game.currTeam.id} is the winner`);
                        if(confirm('Ok')){
                            window.location.href = "index.html"
                        }
                    }
                    else if(game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score !=0){
                        alert(`Team${game.oppTeam.id} is the winner`);
                        if(confirm('Ok')){
                            window.location.href = "index.html"
                        }
                    }
                    else{
                        alert(`match is Draw`);
                        if(confirm('Ok')){
                            window.location.href = "index.html"
                        }
                    }
                }
            }
        }
        mydiv.append(p);
        document.body.appendChild(mydiv);

    }
    else if(id === 2){
        hit2.style.display = "block";
        hit1.style.display = "none";
        let team2score = 0;
        let mydiv = document.createElement("div");
        let p = document.createElement("p");
        mydiv.setAttribute('id', 'main');
        hit2.onclick = function myfunct() {
            game?.currTeam?.currPlayer?.hit();
            if(game?.currTeam?.currPlayer?.net_score != undefined){
                team2score += game?.currTeam?.currPlayer?.net_score;
                p.innerText = `Team1 score: ${team2score}`;
            }
            else{
                game.currTeam.team_score = team2score;
                let temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam,temp);
                if(game.currTeam.team_score === 0){
                    func(temp.id,game);
                }
                else{
                    if(game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score !=0 ){
                        alert(`Team${game.currTeam.id} is the winner`);
                        if(confirm('Reset your game')){
                            window.location.href = "index.html"
                        }
                    }
                    else if(game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score !=0){
                        alert(`Team${game.oppTeam.id} is the winner`);
                        if(confirm('Ok')){
                            window.location.href = "index.html"
                        }
                    }
                    else{
                        alert(`match is Draw`);
                        if(confirm('Ok')){
                            window.location.href = "index.html"
                        }
                    }
                }
            }
        }
        mydiv.append(p)
        document.body.appendChild(mydiv);
    }
}


