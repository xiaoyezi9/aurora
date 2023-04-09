const state = {
    joinRoom: {},
    leaveRoom: {},
    avatar: ''
}
const getters = {

}
const mutations = {
 SET_JOINROOM(state,payload){
    state.joinRoom.username = payload.username
},
    SET_LEAVEROOM(state,payload){
        state.leaveRoom.username = payload.username
    },
    SET_AVATAR(state,payload){
        state.avatar = payload

    },
}
const actions = {

    setJoinRoom({commit}, data) {
      commit('SET_JOINROOM',data)
    },
    setLeaveRoom({commit}, data) {
commit('SET_LEAVEROOM',data)
    },
    setAvatar({commit}, data) {
commit('SET_AVATAR',data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}