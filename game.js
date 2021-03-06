var Game = /** @class */ (function () {
    function Game(id) {
        this.teams = [];
        for (var i = 0; i < 2; i++) {
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
    return Game;
}());
var Team = /** @class */ (function () {
    function Team(id) {
        this.team_score = 0;
        this.players = [];
        this.wickets = 0;
        this.id = id;
        for (var i = 0; i < 10; i++) {
            this.players.push(new Player(i));
        }
        this.currPlayer = this.players[0];
    }
    Team.prototype.getnext = function () {
        this.nxtPlayers = this.players[this.currPlayer.id + 1];
        this.currPlayer = this.nxtPlayers;
    };
    return Team;
}());
var Player = /** @class */ (function () {
    function Player(id) {
        this.score = 0;
        this.net_score = 0;
        this.balls_faced = 0;
        this.ballsperover = [null, null, null, null, null, null];
        this.id = id;
    }
    Player.prototype.hit = function () {
        var team = game.currTeam;
        var l = 0;
        var ranRun = Math.floor(Math.random() * 7);
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
    };
    return Player;
}());
var Timer = /** @class */ (function () {
    function Timer(counter) {
        var _this = this;
        if (counter === void 0) { counter = 60; }
        this.counter = counter;
        var intervalId = setInterval(function () {
            _this.counter = _this.counter - 1;
            if (_this.counter === 0)
                clearInterval(intervalId);
        }, 1000);
    }
    return Timer;
}());
var game;
var button = document.getElementById('Create');
var hit1 = document.getElementById('hit1');
var hit2 = document.getElementById('hit2');
hit1.style.display = "none";
hit2.style.display = "none";
var cardTitle1 = document.getElementById("card-title1");
var cardText1 = document.getElementById("card-text1");
var cardTitle2 = document.getElementById("card-title2");
var cardText2 = document.getElementById("card-text2");
var container = document.getElementById("container");
container.style.display = "none";
button.addEventListener("click", res);
function res() {
    var id = Math.floor(Math.random() * 2) + 1;
    button.style.display = "none";
    game = new Game(id);
    container.style.display = "block";
    func(id, game);
}
;
var func = function (id, game) {
    hit1.style.display = "none";
    hit2.style.display = "none";
    if (id === 1) {
        hit1.style.display = "block";
        hit2.style.display = "none";
        cardTitle1.innerText = "Team1";
        var team1score_1 = 0;
        hit1.onclick = function myfunct() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            (_b = (_a = game === null || game === void 0 ? void 0 : game.currTeam) === null || _a === void 0 ? void 0 : _a.currPlayer) === null || _b === void 0 ? void 0 : _b.hit();
            if (((_d = (_c = game === null || game === void 0 ? void 0 : game.currTeam) === null || _c === void 0 ? void 0 : _c.currPlayer) === null || _d === void 0 ? void 0 : _d.net_score) != undefined) {
                team1score_1 += (_f = (_e = game === null || game === void 0 ? void 0 : game.currTeam) === null || _e === void 0 ? void 0 : _e.currPlayer) === null || _f === void 0 ? void 0 : _f.net_score;
                cardText1.innerText = "Team1 scores " + team1score_1 + " Runs / " + ((_g = game === null || game === void 0 ? void 0 : game.currTeam) === null || _g === void 0 ? void 0 : _g.wickets);
            }
            else if (((_j = (_h = game === null || game === void 0 ? void 0 : game.currTeam) === null || _h === void 0 ? void 0 : _h.currPlayer) === null || _j === void 0 ? void 0 : _j.net_score) === undefined || ((_k = game === null || game === void 0 ? void 0 : game.currTeam) === null || _k === void 0 ? void 0 : _k.wickets) === 10) {
                hit1.style.display = "none";
                hit2.style.display = "none";
                game.currTeam.team_score = team1score_1;
                var temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam, temp);
                if (game.currTeam.team_score === 0) {
                    func(temp.id + 2, game);
                }
                else {
                    if (game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert("Team" + (game.currTeam.id + 1) + " is the winner");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                    else if (game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert("Team" + (game.oppTeam.id + 1) + " is the winner");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                    else {
                        alert("match is Draw");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                }
            }
        };
    }
    else if (id === 2) {
        hit2.style.display = "block";
        hit1.style.display = "none";
        cardTitle2.innerText = "Team2";
        var team2score_1 = 0;
        hit2.onclick = function myfunct() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            (_b = (_a = game === null || game === void 0 ? void 0 : game.currTeam) === null || _a === void 0 ? void 0 : _a.currPlayer) === null || _b === void 0 ? void 0 : _b.hit();
            if (((_d = (_c = game === null || game === void 0 ? void 0 : game.currTeam) === null || _c === void 0 ? void 0 : _c.currPlayer) === null || _d === void 0 ? void 0 : _d.net_score) != undefined) {
                team2score_1 += (_f = (_e = game === null || game === void 0 ? void 0 : game.currTeam) === null || _e === void 0 ? void 0 : _e.currPlayer) === null || _f === void 0 ? void 0 : _f.net_score;
                cardText2.innerText = "Team2 scores " + team2score_1 + " Runs / " + ((_g = game === null || game === void 0 ? void 0 : game.currTeam) === null || _g === void 0 ? void 0 : _g.wickets);
            }
            else if (((_j = (_h = game === null || game === void 0 ? void 0 : game.currTeam) === null || _h === void 0 ? void 0 : _h.currPlayer) === null || _j === void 0 ? void 0 : _j.net_score) === undefined || ((_k = game === null || game === void 0 ? void 0 : game.currTeam) === null || _k === void 0 ? void 0 : _k.wickets) === 10) {
                hit1.style.display = "none";
                hit2.style.display = "none";
                game.currTeam.team_score = team2score_1;
                var temp = game.currTeam;
                game.currTeam = game.oppTeam;
                game.oppTeam = temp;
                console.log(game.currTeam, temp);
                if (game.currTeam.team_score === 0) {
                    func(temp.id, game);
                }
                else {
                    if (game.currTeam.team_score > game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert("Team" + (game.currTeam.id + 1) + " is the winner");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                    else if (game.currTeam.team_score < game.oppTeam.team_score && game.oppTeam.team_score != 0) {
                        alert("Team" + (game.oppTeam.id + 1) + " is the winner");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                    else {
                        alert("match is Draw");
                        if (confirm('Reset your game')) {
                            window.location.href = "index.html";
                        }
                    }
                }
            }
        };
    }
};
