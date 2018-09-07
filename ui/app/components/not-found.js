import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  // public
  model: null,

  tagName: '',
  routing: service('-routing'),
  path: alias('routing.router.currentURL'),
});
