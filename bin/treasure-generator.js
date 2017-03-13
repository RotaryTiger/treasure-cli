#! /usr/bin/env node

var roll = require('../lib/roll');
var program = require('commander');
var package = require('../package');

program
	.version(package.version)
	.usage('[options] <keywords>')
	.option('-c, --challenge <challenge>', 'Challenge rating', parseInt)
	.option('-t, --type <type>', 'Type of treasure')
	.parse(process.argv);

if (!program.challenge || !program.type) {
	console.log('--challenge and --type are required');
} else {
	if (program.type === 'individual' || program.type === 'hoard') {
		console.log(roll.generateTreasure(program.challenge, program.type));
	} else {
		console.log('"' + program.type + '" is not a recognized type');
	}
}
