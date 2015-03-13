import Ember from 'ember';

var props = [
	'animate', 'disabled', 'max',
	'min', 'orientation', 'range', 'step',
	'value', 'values'
];

export default Ember.Component.extend({
	classNames:   ['silder'],
	changeAction: null,
	actionTarget: null,

	didInsertElement: function() {
		this._super.apply(this, arguments);

		var self   = this;
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
				if (target.sendAction) {
					target.sendAction('changeAction', ui.value);
				} else {
					target.send(self.get('changeAction'), ui.value);
				}
			}
		});

		this.registerListeners();
	},

	willDestroyElement: function() {
		this.unregisterListeners();

		this.$().slider('destroy');
	},

	proxySlider: function (target, key) {
		this.$().slider('option', key, this.get(key));
	},

	registerListeners: function () {
		for (var i = 0, len = props.length; i < len; i++) {
			this.addObserver(props[i], this, this.proxySlider);
		}
	},
	
	unregisterListeners: function () {
		for (var i = 0, len = props.length; i < len; i++) {
			this.removeObserver(props[i], this, this.proxySlider);
		}
	}
});
