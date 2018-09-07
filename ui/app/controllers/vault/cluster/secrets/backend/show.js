import Controller from '@ember/controller';
import BackendCrumbMixin from 'vault/mixins/backend-crumb';

export default Controller.extend(BackendCrumbMixin, {
  queryParams: ['tab'],
  tab: '',
  reset() {
    this.set('tab', '');
  },
  actions: {
    refresh: function() {
      // closure actions don't bubble to routes,
      // so we have to manually bubble here
      this.send('refreshModel');
    },

    hasChanges(hasChanges) {
      this.send('hasDataChanges', hasChanges);
    },
  },
});
