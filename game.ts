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
    wickets: number = 0;
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
            team.wickets++;
            team.getnext();

        }
        this.net_score = l;
        team.team_score += l;
    }
}


class Timer {
    constructor(public counter = 60) {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            if (this.counter === 0) clearInterval(intervalId)
        }, 1000)
    }
}

let game;
let button = document.getElementById('Create');
let hit1 = document.getElementById('hit1');
let hit2 = document.getElementById('hit2');

hit1.style.display = "none";
hit2.style.display = "none";

let cardTitle1 = document.getElementById("card-title1");
let cardText1 = document.getElementById("card-text1");
let cardTitle2 = document.getElementById("card-title2");
let cardText2 = document.getElementById("card-text2");
let container = document.getElementById("container")
container.style.display = "none";

button.addEventListener("click", res)
function res() {
    let id = Math.floor(Math.random() * 2) + 1;
    button.style.display = "none";
    game = new Game(id);
    container.style.display = "block";
    func(id, game);
};


let func = (id: number, game: Game) => {
    hit1.style.display = "none";
    hit2.style.display = "none";
    if (id === 1) {
        hit1.style.display = "block";
        hit2.style.display = "none";
        cardTitle1.innerText = "Team1";
        let team1score = 0;
        hit1.onclick = function myfunct() {
            game?.currTeam?.currPlayer?.hit();
            if (game?.currTeam?.currPlayer?.net_score != undefined) {
                team1score += game?.currTeam?.currPlayer?.net_score;
                cardText1.innerText = `Team1 scores ${team1score} Runs / ${game?.currTeam?.wickets}`;
            }
            else if (game?.currTeam?.currPlayer?.net_score === undefined || game?.currTeam?.wickets === 10) {
                hit1.style.display = "none";
                hit2.style.display = "none";
                game.currTeam.team_score = team1score;
                let temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam, temp);
                if (game.currTeam.team_score === 0) {
                    func(temp.id + 2, game);
                }
                else {
                    if (game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert(`Team${game.currTeam.id + 1} is the winner`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                    else if (game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert(`Team${game.oppTeam.id + 1} is the winner`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                    else {
                        alert(`match is Draw`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                }
            }
        }
    }
    else if (id === 2) {
        hit2.style.display = "block";
        hit1.style.display = "none";
        cardTitle2.innerText = "Team2";
        let team2score = 0;
        hit2.onclick = function myfunct() {
            game?.currTeam?.currPlayer?.hit();
            if (game?.currTeam?.currPlayer?.net_score != undefined) {
                team2score += game?.currTeam?.currPlayer?.net_score;
                cardText2.innerText = `Team2 scores ${team2score} Runs / ${game?.currTeam?.wickets}`;
            }
            else if (game?.currTeam?.currPlayer?.net_score === undefined || game?.currTeam?.wickets === 10) {
                hit1.style.display = "none";
                hit2.style.display = "none";
                game.currTeam.team_score = team2score;
                let temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam, temp);
                if (game.currTeam.team_score === 0) {
                    func(temp.id, game);
                }
                else {
                    if (game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert(`Team${game.currTeam.id + 1} is the winner`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                    else if (game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert(`Team${game.oppTeam.id + 1} is the winner`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                    else {
                        alert(`match is Draw`);
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html"
                        }
                    }
                }
            }
        }
    }
}


