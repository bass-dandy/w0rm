module.exports = function(api) {
	api.cache.forever();

	return {
		plugins: [
			'@babel/plugin-proposal-object-rest-spread',
			['@babel/plugin-transform-runtime', {corejs: 3}]
		],
		presets: [
			['@babel/env', {
				useBuiltIns: 'entry',
				corejs: 3,
				targets: 'last 2 versions, not dead'
			}]
		]
	};
};
