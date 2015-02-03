import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['silder'],
	//attributeBindings: ['dataPercent:data-percent'],

	_initSlider: function() {
		var self = this;
		this._super();

		this.$().slider({
			animate : this.get('animate'),
			disabled : this.get('disabled'),
			max : this.get('max'),
			min : this.get('min'),
			orientation : this.get('orientation'),
			range : this.get('range'),
			step : this.get('step'),
			value : this.get('value'),
			values : this.get('values'),
			slide : function(event, ui) {
				self.set('value', ui.value);
			}
		});

		this.registerListeners();
	}.on('didInsertElement'),

	registerListeners: function () {
		var props = ['animate', 'disabled', 'max',
			'min', 'orientation', 'range', 'step',
			'value', 'values'];
		/*jshint loopfunc:false*/
		for (var i = 0; i < props.length; i++) {
			this.addObserver(props[i], this, function (target, key) {
				this.$().slider('option',key, this.get(key));
			}.bind(this));
		}
		/*jshint loopfunc:true*/
	},

	destroyEasyPie: function() {
		this.$().slider('destroy');
	}.on('willDestroyElement')
});
