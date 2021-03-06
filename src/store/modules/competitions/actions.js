import api from '@/api/competitions'
import * as mutationTypes from './mutation-types'
import * as rootMutationTypes from '../../mutation-types'
import store from '@/store';

export default {
    async getCompetitions({ state, commit, rootState }) {       
        let { data } = await api.getCompetitions();

        if(!data.ok) console.log('competitions error');
        else {            
            commit(mutationTypes.SET_COMPETITIONS, data.competitions);
            commit('setContentLoading', false, { root: true });
        }
    },

    async getCompetitionGames({ state, commit }) {
        let competition = store.getters['competitions/getCompetition'];
        let { data } = await api.getCompetitionGames(competition._id);

        if(!data.ok) console.log('competitions error');
        else {
            commit(mutationTypes.SET_COMPETITION_GAMES, data.games);
        }
    },

    async addPlayers({ state, commit, rootState }, players) {
        let competition = store.getters['competitions/getCompetition'];
        let { data } = await api.addPlayers(competition._id, players);

        if(!data.ok) console.log('competitions error');
        else {
            commit(mutationTypes.SET_COMPETITION_PLAYERS, data.players);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    async deletePlayers({ state, commit }, playerId) {
        let competition = store.getters['competitions/getCompetition'];
        let { data } = await api.deletePlayers(competition._id, playerId);

        if(!data.ok) console.log('competitions error');
        else {
            commit(mutationTypes.DELETE_COMPETITION_PLAYER, playerId);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    async createCompetition({ state, commit, rootState }, competitionData) {
        let { data } = await api.createCompetition(competitionData);

        if(!data.ok) console.log(data);
        else {
            commit(mutationTypes.CREATE_COMPETITION, data.competition);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    async getCompetitionBySlug({ state, commit }, competitionSlug) {
        commit('setContentLoading', true, { root: true });
        let { data } = await api.getCompetitionBySlug(competitionSlug);

        if(!data.ok) console.log('...')
        else {
            commit(mutationTypes.SET_COMPETITION, data.competition);
            commit('setContentLoading', false, { root: true });
        }
    },

    async deleteCompetition({ state, commit, rootState }, competitionId) {
        let { data } = await api.deleteCompetition(competitionId);

        if(!data.ok) console.log('error')
        else {
            commit(mutationTypes.DELETE_COMPETITION, competitionId);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    async startCompetition({ state, commit, dispatch }, competitionId) {
        let { data } = await api.startCompetition(competitionId);

        if(!data.ok) {
            commit(rootMutationTypes.SNACKBAR, {
                color: 'warning',
                active: true,
                text: data.message
            }, { root: true });
        }
        else {
            commit(mutationTypes.SET_COMPETITION_STARTED);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    setCreateCompetition({ state, commit, rootState }, createCompetitionState) {
        commit(mutationTypes.SET_CREATE_COMPETITION, createCompetitionState);
    },

    setNextRoundModal({ state, commit, rootState }, status) {
        commit(mutationTypes.SET_NEXT_ROUND_MODAL, status);
    },

    async nextRoundGames({ state, commit }, options) {
        let { competitionId, gameType } = options;
        let { data } = await api.nextRound(competitionId, gameType);

        if(!data) console.log('error');
        else {
            commit(mutationTypes.SET_NEXT_ROUND_MODAL, false);
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    },

    async finish({ state, commit }, competitionId) {
        let { data } = await api.finish(competitionId);

        if(!data) return console.log('error');
        else {
            commit(mutationTypes.SET_CHAMPION, {
                competitionId,
                champion: data.competitionChampion
            });
            commit(rootMutationTypes.SNACKBAR, {
                color: 'success',
                active: true,
                text: data.message
            }, { root: true });
        }
    }
}