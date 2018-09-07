import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import { create } from 'ember-cli-page-object';
import itemDetails from 'vault/tests/pages/components/identity/item-details';

const component = create(itemDetails);

moduleForComponent('identity/item-details', 'Integration | Component | identity/item details', {
  integration: true,
  beforeEach() {
    component.setContext(this);
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
  },
  afterEach() {
    component.removeContext();
  },
});

test('it renders the disabled warning', function(assert) {
  let model = EmberObject.create({
    save() {
      return resolve();
    },
    disabled: true,
    canEdit: true,
  });
  sinon.spy(model, 'save');
  this.set('model', model);
  this.render(hbs`{{identity/item-details model=model}}`);
  assert.dom('[data-test-disabled-warning]').exists();
  component.enable();

  assert.ok(model.save.calledOnce, 'clicking enable calls model save');
});

test('it does not render the button if canEdit is false', function(assert) {
  let model = EmberObject.create({
    disabled: true,
  });

  this.set('model', model);
  this.render(hbs`{{identity/item-details model=model}}`);
  assert.dom('[data-test-disabled-warning]').exists('shows the warning banner');
  assert.dom('[data-test-enable]').doesNotExist('does not show the enable button');
});

test('it does not render the banner when item is enabled', function(assert) {
  let model = EmberObject.create();
  this.set('model', model);

  this.render(hbs`{{identity/item-details model=model}}`);
  assert.dom('[data-test-disabled-warning]').doesNotExist('does not show the warning banner');
});
