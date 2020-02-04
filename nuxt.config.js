var glob = require('glob');

async function getDynamicPaths(urlFilepathTable) {
    return [].concat(
        ...Object.keys(urlFilepathTable).map(url => {
            var filepathGlob = urlFilepathTable[url];
            return glob
                .sync(filepathGlob, { cwd: 'posts' })
                .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
        })
    );
}

export default async () => {
    return {

        mode: 'universal',
        head: {
            title: 'Yliess HATI',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        },
        loading: { color: '#000000' },
        css: ["~/assets/main.css"],
        plugins: [],
        buildModules: [],
        modules: [
            ['nuxt-fontawesome', {
                component: 'fa',
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['fas']
                    }
                ]
            }]
        ],
        build: {
            extend(config, ctx) {
                config.module.rules.push({
                    test: /\.md$/,
                    use: ['raw-loader']
                });
            }
        },
        generate: {
            routes: await getDynamicPaths({
                '/blog': 'posts/*md'
            })
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    }
}
