var expect = require('chai').expect;
var roll = require('./roll');
var roller = require('./roller');
var treasureRoller = require('./roll-treasure');

var log = function(message) {
	if (false) console.log(message);
};

//==== Tables ====
var hoard_a = require('../tables/hoard/challenge-0-4');
var hoard_b = require('../tables/hoard/challenge-5-10');
var hoard_c = require('../tables/hoard/challenge-11-16');
var hoard_d = require('../tables/hoard/challenge-17-20');
var individual_a = require('../tables/individual/challenge-0-4');
var individual_b = require('../tables/individual/challenge-5-10');
var individual_c = require('../tables/individual/challenge-11-16');
var individual_d = require('../tables/individual/challenge-17-20');

describe('Roll', function() {
	/**
	 * Get tiers
	 */
	describe('#getTiers()', function() {

		it('should return an array of the top level keys of the table', function() {
			var tiers_a = roll.getTiers(individual_a);
			var tiers_b = roll.getTiers(individual_b);
			var tiers_c = roll.getTiers(individual_c);
			var tiers_d = roll.getTiers(individual_d);

			log('a: ' + tiers_a);
			log('b: ' + tiers_b);
			log('c: ' + tiers_c);
			log('d: ' + tiers_d);

			expect(tiers_a).to.be.an('array');
			expect(tiers_b).to.be.an('array');
			expect(tiers_c).to.be.an('array');
			expect(tiers_d).to.be.an('array');
		});
	});

	/**
	 * Get treasure tier
	 */
	describe('#getTreasureTier()', function() {

		it('should return the most relevant tier to the d100 result', function() {
			var a100 = roller.random(100);
			var b100 = roller.random(100);
			var c100 = roller.random(100);
			var d100 = roller.random(100);

			var tier_a = roll.getTreasureTier(a100, individual_a);
			var tiers_a = roll.getTiers(individual_a);

			var tier_b = roll.getTreasureTier(b100, individual_b);
			var tiers_b = roll.getTiers(individual_b);

			var tier_c = roll.getTreasureTier(c100, individual_c);
			var tiers_c = roll.getTiers(individual_c);

			var tier_d = roll.getTreasureTier(d100, individual_d);
			var tiers_d = roll.getTiers(individual_d);


			log('a tiers: ' + tiers_a + ', d100 value: ' + a100 + ', tier_a value: ' + tier_a);
			log('b tiers: ' + tiers_b + ', d100 value: ' + b100 + ', tier_b value: ' + tier_b);
			log('c tiers: ' + tiers_c + ', d100 value: ' + c100 + ', tier_c value: ' + tier_c);
			log('d tiers: ' + tiers_d + ', d100 value: ' + d100 + ', tier_d value: ' + tier_d);

			expect(tiers_a.indexOf(tier_a)).to.be.above(-1);
			expect(tiers_b.indexOf(tier_b)).to.be.above(-1);
			expect(tiers_c.indexOf(tier_c)).to.be.above(-1);
			expect(tiers_d.indexOf(tier_d)).to.be.above(-1);
		});
	});

	/**
	 * Roll treasure
	 */
	describe('#rollTreasure()', function() {

		it('should parse the treasure table provided and roll all of its money, objects, and magic items', function() {
			var treasure_a = treasureRoller.rollTreasure(individual_a[roll.getTreasureTier(roller.random(100), individual_a)]);
			var treasure_b = treasureRoller.rollTreasure(individual_b[roll.getTreasureTier(roller.random(100), individual_b)]);
			var treasure_c = treasureRoller.rollTreasure(individual_c[roll.getTreasureTier(roller.random(100), individual_c)]);
			var treasure_d = treasureRoller.rollTreasure(individual_d[roll.getTreasureTier(roller.random(100), individual_d)]);

			log(treasure_a);
			log(treasure_b);
			log(treasure_c);
			log(treasure_d);
			
			expect(treasure_a).to.be.a('string');
			expect(treasure_b).to.be.a('string');
			expect(treasure_c).to.be.a('string');
			expect(treasure_d).to.be.a('string');
		});
	});

	/**
	 * Roll tables
	 */
	describe('#rollTables()', function() {

	});
});
