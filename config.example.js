/**
 * Created by Sam on 2015/10/5 0005.
 */

module.exports = {
    system: {
        port: 24372
    },
    apps: [
        {
            name: 'app_name',
            key: 'post_key',
            vc_type: 'git',
            vc_server: 'github',
            vc_url: 'git repo url',
            watch: '/git/byweb',
            path: '/path/to/project',
            commands: [
                'other command after pull'
            ]
        }
    ]
};