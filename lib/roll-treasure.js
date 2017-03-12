var _ = require('underscore');
var roller = require('./roller');
var regex = /\[\d+d\d+\]/;

//==== Tables ====
var art = require('../tables/objects/art');
var gems = require('../tables/objects/gemstones');
var magicItemTables = {
	a: require('../tables/magic-items/a.json'),
	b: require('../tables/magic-items/b.json'),
	c: require('../tables/magic-items/c.json'),
	d: require('../tables/magic-items/d.json'),
	e: require('../tables/magic-items/e.json'),
	f: require('../tables/magic-items/f.json'),
	g: require('../tables/magic-items/g.json'),
	h: require('../tables/magic-items/h.json'),
	i: require('../tables/magic-items/i.json')
};

/**
 * 
 */
function rollMoney(table) {
	var moneyTypes = _.keys(table.money);
	var message = '\nCoins:';

	/**
	 * Iterate through cp, sp, ep, gp, and pp
	 */
	_.each(moneyTypes, function(type, index) {
		var money = table.money[type];
		var amount = 0;

		if (money.roll && money.value && money.value > 1) {
			amount += roller.rollDice(money.roll);
			amount *= money.value;
		}

		message += '\n\t' + moneyTypes[index] + ': ' + amount;
	});

	return message;
}

/**
 * 
 */
function getType(type, value) {
	if (type === 'gemstones') {
		return gems[value].descriptions[roller.rollDice(gems[value].roll) - 1];
	} else if (type === 'art objects') {
		return art[value].descriptions[roller.rollDice(art[value].roll) - 1];
	}
}

/**
 * 
 */
function rollObjects(table) {
	var objectTypes = _.keys(table.objects);
	var message = '\nGems or Art Objects:';

	/**
	 * Get objects
	 */
	_.each(objectTypes, function(object, index) {
		var type = objectTypes[index] === 'gems' ? 'gemstones' : 'art objects';
		
		if (table.objects[object].roll && table.objects[object].value) {
			message += '\n\t' + 
			           roller.rollDice(table.objects[object].roll) + ' ' + 
			           getType(type, table.objects[object].value) + ' worth ' + 
			           table.objects[object].value + ' gold pieces';
		}
	});

	return message === '\nGems or Art Objects:' ? message += '\n\tNone' : message;
}

/**
 * Some magic item entries have sub-tables to roll on. This function expects a string denoting
 * the sub-table, parses it, and returns the result
 *
 * @params {string} subtable - subtable-formatted string to parse
 *
 * @return {string} treasure rolled from subtable
 */
function rollSubtable(subtable) {
	var roll = subtable.match(regex)[0].replace('[', '').replace(']', '');
	var table = JSON.parse(subtable.split(']')[1]);

	return table.name + ': ' + table[roller.rollDice(roll)];
}

/**
 * 
 */
function rollMagicItems(table) {
	var magic = table.magic;
	var message = '\nMagic items:';

	/**
	 * Get magic items
	 */
	if (magic.roll && magic.table) {
		var random = roller.rollDice(magic.roll);
		var table = magicItemTables[magic.table];

		for (var i = 0, j = random; i < j; i++) {
			var item = table[require('./roll').getTreasureTier(roller.rollDice('1d100'), table)];

			if (item.match(regex)) {
				message += '\n\t' + rollSubtable(item);
			} else {
				message += '\n\t' + item;
			}
		}
	} else {
		message += '\n\tNone';
	}

	return message;
}

/**
 * Roll for treasure based on the provided table's parameters. Each table has three different
 * kinds of treasure(s) to roll for:
 *    - Money (broken down into CP, SP, EP, GP, and PP)
 *    - Objects (broken down into Gems and Art)
 *    - Magic (consisting of a roll to make on a table)
 *
 * @params {object} table - treasure table found in /tables directory
 *
 * @returns {string} string of the entire log output
 */
function rollTreasure(table) {
	var output = '';
	var money = rollMoney(table);
	var objects = rollObjects(table);
	var magicItems = rollMagicItems(table);

	return output + money + '\n' + objects + '\n' + magicItems;
}

module.exports = {
	rollTreasure: rollTreasure
};
