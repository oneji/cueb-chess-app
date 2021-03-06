export default {
    getGames(state) {
        return state.games;
    },
    
    getCurrentGame(state) {
        return state.currentGame;
    },

    getFinishGameForm(state) {
        return state.finishGameForm;
    },

    getBoardGoToIdx(state) {
        return state.boardGoToIdx;
    },

    getGamePlayerStats(state) {
        return state.gamePlayerStats;
    }
}