import Ember from 'ember';

export default Ember.Controller.extend({
	sliderVal: 14,
	sliderVals: [21, 85],
	sliderStep: 5,
	sliderMin: 5,
	sliderMax: 100,
	isRange: false,

	sliderValsString: function (key, val, oldVal) {
		if (arguments.length > 1) {
			return this.set('sliderVals', val.split(','));
		}
		else {
			return this.get('sliderVals').join(', ');
		}
	}.property('sliderVals')
});