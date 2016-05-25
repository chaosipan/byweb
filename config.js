/**
 * Created by Sam on 2015/10/5 0005.
 */

module.exports = {
    system: {
        port: 24372
    },
    apps: [
        {
            name: 'mydb',
            key: '123456',
            vc_type: 'git',
            vc_server: 'github',
            vc_url: 'https://github.com/chaosipan/mydb.git',
            watch: '/git/mydb',
            path: '/home/chaosi/webhook/mydb',
            commands: [
                'other command after pull'
            ]
        }
    ]
};
