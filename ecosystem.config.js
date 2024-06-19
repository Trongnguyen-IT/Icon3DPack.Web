module.exports = {
	apps: [
		{
			name: 'gui-icon3dpack',
			script: 'yarn',
			args: 'start:prod -p 9001',
			interpreter: '/bin/bash',
			instances: 1,
			watch: false,
			ignore_watch: ['node_modules'],
			env: {
				NODE_ENV: 'production',
				NEXT_NODE_ENV: 'production',
			},
		},
	],
}
