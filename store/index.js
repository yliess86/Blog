export const state = () => ({
    posts: []
});

export const mutations = {
    set(state, list) {
        state.posts = list;
    }
};

export const actions = {
    async nuxtServerInit({ commit }) {
        const fm = require('front-matter');
        const moment = require('moment');
        var files = await require.context('~/posts/', false, /\.md$/);
        var posts = files.keys().map(key => {
            var res = files(key);
            res.slug = key.slice(2, -3);
            return res;
        }).map(post => {
            let attributes = fm(post.default).attributes;
            attributes.slug = post.slug;
            attributes.date_unformatted = attributes.date;
            attributes.date = moment(attributes.date).format('YYYY/MM/DD');
            return attributes;
        }).sort((a, b) => {
            return b.date_unformatted - a.date_unformatted;
        })
        await commit('set', posts);
    }
};