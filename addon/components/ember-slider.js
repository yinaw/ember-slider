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
	}.on('didInsertElement'),

	_valueChanged : function() {
		this.$().slider('option', 'value', this.get('value'));
	}.observes('value'),

	destroyEasyPie: function() {
		this.$().destroy();
	}.on('willDestroyElement')
});
