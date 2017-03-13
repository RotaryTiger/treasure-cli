#! /usr/bin/env node

var roll = require('../lib/roll');
var program = require('commander');
var package = require('../package');

program
	.version(package.version)
	.usage('[options] <keywords>')
	.option('-c, --challenge <challenge>', 'Challenge rating - integer between 0 and 20', parseInt)
	.option('-t, --type <type>', 'Type of treasure - either "individual" or "hoard"')
	.parse(process.argv);

if (!program.challenge || !program.type) {
	console.log('--challenge and --type are required');
	console.log('type --help if you need assistance');
	process.exit(1);
} else {
	if (program.challenge < 0 || program.challenge > 20) {
		console.log('challenge must be between 0 and 20');
		process.exit(1);
	}
	if (program.type === 'individual' || program.type === 'hoard') {
		console.log(roll.generateTreasure(program.challenge, program.type));
	} else {
		console.log('"' + program.type + '" is not a recognized type');
	}
	process.exit(0);
}
