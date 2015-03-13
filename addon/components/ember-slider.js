import Ember from 'ember';

var props = Object.keys($.ui.slider._proto.options);

export default Ember.Component.extend({
	classNames:   ['silder'],
	changeAction: null,
	actionTarget: null,

	didInsertElement: function() {
		this._super.apply(this, arguments);

		var self    = this;
		var target  = this.get('actionTarget') || this;

		var options = Ember.merge(this.getProperties(props), {
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

		this.$().slider(options);

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
