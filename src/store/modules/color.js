


export default {
    namespaced: true,
    state: {
        mode: 'day',//default
        bgc: 'bgc-day'
    },
    mutations: {
        updateMode(state, payload) {
            // state.mode = payload.mode
            if (payload.mode === 'day') {
                state.bgc = 'bgc-day'
            } else if (payload.mode === 'night') {
                state.bgc = 'bgc-night'
            }
        }
    }
}