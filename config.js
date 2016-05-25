/**
 * Created by Sam on 2015/10/5 0005.
 */

module.exports = {
    system: {
        port: 23456
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
               
            ]
        },
        {
            name: 'Trash',
            key: '123456',
            vc_type: 'git',
            vc_server: 'gitosc',
            vc_url: 'https://git.oschina.net/chaosi/Trash.git',
            watch: '/git/trash',
            path: '/home/chaosi/webhook/Trash',
            commands: [
               
            ]
        }
    ]
};