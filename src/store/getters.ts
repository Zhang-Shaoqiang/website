import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
    user: (state) => state.user
}

export default getters