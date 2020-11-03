<template>
<v-container v-if="isLoggedIn" class="max-height">
    <div class="mb-4" v-if="isWinner">
        <Rematch :rematch="rematch">
            <v-btn @click="handleRematch">Rematch</v-btn>
        </Rematch>
    </div>
    <div v-else>
        <h4 v-if="xPlayer && oPlayer">
            <span :class="xIsNext && 'turn'">{{ xPlayer.username }}</span><strong> VS </strong><span :class="!xIsNext && 'turn'">{{ oPlayer.username }}</span>
        </h4>
    </div>
    <v-card v-if="isGameStarted">
        <v-row class="text-center">
            <v-col cols="12">
                <span class="fs-18" v-if="isWinner"><strong>{{ winnigMessage }}</strong></span>
                <span class="fs-18" v-else>Next player: <strong>{{ xIsNext ? "X" : "O" }}</strong></span>
            </v-col>
        </v-row>
        <v-row no-gutters justify="center" align="center" class="gameboard">
            <Square v-for="(square, index) in squares" :key="index" :square="square" :index="index" @clickSquare="handleClick" />
        </v-row>
        <v-row class="text-center">
            <v-col>
                <strong v-if="xPlayer && oPlayer">{{
            `${xPlayer.username}: ${score.x} ${oPlayer.username}: ${score.o} Draw: ${score.d}`
          }}</strong>
            </v-col>
        </v-row>
    </v-card>

    <p v-else>
        Waiting for another player !
    </p>
</v-container>
</template>

<script>
import {
    mapGetters
} from "vuex";
import Square from "./Square";
import Rematch from "./Rematch";
export default {
    name: "Board",
    components: {
        Square,
        Rematch,
    },
    data: () => ({
        isGameStarted: false,
        squares: Array(9).fill(null),
        xIsNext: true,
        xPlayer: null,
        oPlayer: null,
        rematch: false,
        score: {
            x: 0,
            o: 0,
            d: 0,
        },
    }),
    computed: {
        gamesPlayed() {
            return this.score.x + this.score.o + this.score.d;
        },
        winnigMessage() {
            return this.isWinner === "D" ?
                "Draw !" :
                `${
            this.isWinner === "X"
              ? this.xPlayer.username
              : this.oPlayer.username
          } won!`;
        },
        isWinner() {
            if (!this.squares.filter((cell) => !cell).length && !this.checkForWinner)
                return "D";
            return this.checkForWinner;
        },
        isMyTurn() {
            return (
                (this.xIsNext && this.parsedUser?.id === this.xPlayer?.id) ||
                (!this.xIsNext && this.parsedUser?.id === this.oPlayer?.id)
            );
        },
        checkForWinner() {
            const winningCondition = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let i = 0; i < winningCondition.length; i++) {
                const [a, b, c] = winningCondition[i];
                if (
                    this.squares[a] &&
                    this.squares[a] === this.squares[b] &&
                    this.squares[a] === this.squares[c]
                ) {
                    return this.squares[a];
                }
            }
            return "";
        },

        ...mapGetters(["isLoggedIn", "parsedUser"]),
    },
    methods: {
        handleClick(index) {
            // prevent user from changing existing value
            if (this.checkForWinner || this.squares[index] || !this.isMyTurn) {
                return;
            }
            this.$set(this.squares, index, this.xIsNext ? "X" : "O");
            this.xIsNext = !this.xIsNext;
            // notif other player
            this.$socket.emit("changeTurn", {
                index,
                xIsNext: !this.xIsNext,
            });
        },
        handleRematch() {
            this.$socket.emit("rematch");
        },
    },
    sockets: {
        gameStarted(data) {
            this.switchPlayer = null;
            this.isGameStarted = true;
            this.xPlayer = data.xPlayer;
            this.oPlayer = data.oPlayer;
        },
        changedTurn(data) {
            this.$set(this.squares, data.index, this.xIsNext ? "X" : "O");
            this.xIsNext = !data.xIsNext;
        },
        rematchRequest() {
            this.rematch = true;
        },
        rematchAccepted() {
            this.rematch = false;
            this.squares = Array(9).fill(null);
            this.xIsNext = this.gamesPlayed % 2 === 0;
        },
    },
    watch: {
        isWinner() {
            if (this.isWinner) {
                this.score = {
                    ...this.score,
                    [this.isWinner.toLowerCase()]: ++this.score[
                        this.isWinner.toLowerCase()
                    ],
                };
            }
        },
    },

    created() {
        if (this.parsedUser) {
            this.$socket.emit("joinGame", this.parsedUser);
        }
    },
    beforeDestroy() {
        this.$socket.emit("playerLeft");
    },
};
</script>

<style scoped>
.max-height {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
}

.turn {
    color: green;
}

.gameboard {
    width: 450px;
    flex-grow: 0.5;
    border: 2px solid #000;
}

@media only screen and (max-width: 600px) {
    .gameboard {
        width: 260px;
    }
}
</style>
