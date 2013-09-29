/*jshint node:true*/

'use strict';

var fs = require('fs');
var csv = require('dsv').csv;

var csvPath = process.argv[2], jsonPath = process.argv[3];

fs.writeFileSync(jsonPath, JSON.stringify(csv.parse(fs.readFileSync(csvPath, {
	encoding: 'utf8'
})).reduce(function(p, c, i) {
	var d, t, url;

	t = function(s) {
		return s && s.trim();
	};

	d = {
		'número': parseInt(c['Número de Iniciativa'], 10),
		proponente: c.Proponente.trim(),
		tipo: c['Tipo de Iniciativa'].trim(),
		asunto: c.Asunto.trim(),
		tema: c.Tema.trim(),
		subtema: c.Subtema.trim(),
		'año': parseInt(c['Año de recibido'], 10),
		'trámite': c['Trámite efectuado'].trim()
	};

	url = t(c['URL ley de república']);
	if (url) {
		d.url = url;
	}

	p.push(d);

	return p;
}, []), null, '\t'));
