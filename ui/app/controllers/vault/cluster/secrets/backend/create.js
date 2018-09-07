import Controller from '@ember/controller';
import BackendCrumbMixin from 'vault/mixins/backend-crumb';

export default Controller.extend(BackendCrumbMixin, {
  queryParams: ['initialKey'],

  initialKey: '',

  actions: {
    refresh: function() {
      this.send('refreshModel');
    },
    hasChanges(hasChanges) {
      this.send('hasDataChanges', hasChanges);
    },
  },
});
