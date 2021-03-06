
'use strict';

(function (window) {

    function Card(rank, suit, value) {
        this.getValue = function () {
            return this.value;
        };
        this.value = value;
        this.rank = rank;
        this.suit = suit;
        this.toString = function () {
            return this.rank + " of " + this.suit;
        };
    }

    function Deck() {
        this.cards = [];
        this.count = function () {
            return this.cards.length;
        };
        this.shuffle = function () {
            var suitNumber, rankNumber, rankNames, suitNames, value;
            for (suitNumber = 1; suitNumber <= 4; suitNumber++) {
                for (rankNumber = 1; rankNumber <= 13; rankNumber++) {
                    rankNames = ['', 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
                    suitNames = ['', 'Spades', 'Clubs', 'Hearts', 'Diamonds'];
                    value = rankNumber;

                    if (rankNumber === 1 || rankNumber > 10) {
                        value = 10;
                    }

                    this.cards.push(new Card(rankNames[rankNumber], suitNames[suitNumber], value));
                }
            }
            console.log(this.cards);
        };
    }

    function Hand(name) {
        this.name = name;
        this.cards = [];
        // added for data structure assignment
        this.moves = [];
        this.totalValue = function () {
            var total = 0, i;
            for (i = 0; i < this.cards.length; i++) {
                total = total + this.cards[i].getValue();
            }
            console.log(total);
            return total;
        };
        this.drawCard = function (deck) {
            var card, randomNumber, message;
            randomNumber = Math.floor(Math.random() * deck.cards.length);
            card = deck.cards[randomNumber];
            console.log(card);
            this.cards.push(card);
            message = this.name + " drew a " + card.toString() + ". It has a value of " + card.value;
            alert(message);
            this.moves.push(message);
            console.log(this.moves)
            deck.cards.splice(randomNumber, 1);

        };

    }

    function Game() {
        var self, deck, dealer, player, turns = 5, standButton, hitButton;

        self = this;

        deck = new Deck();
        player = new Hand('Player');
        dealer = new Hand('Dealer');

        deck.shuffle();

        alert('please press hit to start.');

        standButton = document.getElementById('stand');
        hitButton = document.getElementById('hit');

        self.stand = function () {
            var message = 'You stand on this round.';
            player.moves.push(message);
            alert(message);
            self.dealerStandOrHit();
        };

        self.hit = function (user, deck) {
            user.drawCard(deck);
            var score;

            score = user.totalValue();
            updateDOM(user.name, score);
            if (score > 21 || turns === 0) {
                self.endGame(user, score);
            }
        };

        self.endGame = function (user, score) {
            alert(user.name + ' busts!');
            window.location.reload();
        };

        self.dealerStandOrHit = function () {
            var message, totalValue = dealer.totalValue();
            if (totalValue <= 17) {
                self.hit(dealer, deck);
            } else {
                message = 'Dealer Stands. Please select Stand or Hit.';
                alert(message);
                dealer.moves.push(message);
            }
            turns--;
            updateDOM('turns', turns);
        };

        self.playerHit = function () {
            self.hit(player, deck);
            self.dealerStandOrHit();
        };


        standButton.addEventListener('click', self.stand, false);
        hitButton.addEventListener('click', self.playerHit, false);

    }

    function updateDOM(selector, text) {
        document.getElementById(selector).innerHTML = text;
    }

    var game = new Game();

}(window));
