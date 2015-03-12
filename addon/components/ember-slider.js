import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['silder'],
	changeAction: null,
	actionTarget: null,

	didInsertElement: function() {
		this._super.apply(this, arguments);
		var self = this;
		var target = this.get('actionTarget') || this;

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
			},
			change : function(event, ui) {
				(target.sendAction) ? target.sendAction('changeAction', ui.value) :	target.send(self.get('changeAction'), ui.value);
			}
		});

		this.registerListeners();
	},

	registerListeners: function () {
		var props = ['animate', 'disabled', 'max',
			'min', 'orientation', 'range', 'step',
			'value', 'values'];
		/*jshint loopfunc:false*/
		for (var i = 0; i < props.length; i++) {
			this.addObserver(props[i], this, function (target, key) {
				this.$().slider('option', key, this.get(key));
			}.bind(this));
		}
		/*jshint loopfunc:true*/
	},

	destroyEasyPie: function() {
		this.$().slider('destroy');
	}.on('willDestroyElement')
});
