import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const competitionsModule = {
    namespaced: true,
    state: {
        competitions: [],
        createCompetition: false,
        currentCompetition: {
            players: []
        }
    },
    getters,
    mutations,
    actions
}

export default competitionsModule