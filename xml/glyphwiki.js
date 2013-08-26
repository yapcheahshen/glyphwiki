console.log(require('yase').build({
	dbid:'glyphwiki',
	extra: {
		glyphwiki: JSON.parse(require('fs').readFileSync('./glyphwiki.json'),'utf8'),
		related: JSON.parse(require('fs').readFileSync('./related.json'),'utf8'),
	},
	customfunc: require('./glyphwikicustom'),
	min_yase_version:'0.0.19',
	input:'glyphwiki.xml',
	output:'../glyphwiki.ydb',
	author:'yapcheahshen@gmail.com',
	url:'http://www.ksana.tw',
	version:'0.0.2',
}));