QUnit.module('fabric.Observable');

QUnit.test('fabric.Observable exists', function (assert) {
  assert.ok(fabric.Observable);
  var o = new fabric.Observable();
  assert.ok(typeof o.fire === 'function');
  assert.ok(typeof o.on === 'function');
  assert.ok(typeof o.once === 'function');
  assert.ok(typeof o.off === 'function');
});

QUnit.test('fire + on', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false;
  foo.on('bar:baz', function () {
    eventFired = true;
  });

  foo.fire('bar:baz');
  assert.equal(eventFired, true);
});

QUnit.test('fire event/object', function (assert) {
  let foo = new fabric.Observable();
  let received;
  foo.on('bar:baz', ev => {
    received = ev;
  });

  let fired = foo.fire('bar:baz');
  assert.ok(received instanceof fabric.Event, 'should be an event');
  assert.equal(received, fired, 'should be the same ref');
  received = null;

  fired = foo.fire('bar:baz', { foo: 'bar' });
  assert.ok(received instanceof fabric.Event, 'should be an event');
  assert.equal(received, fired, 'should be the same ref');
  assert.equal(received.foo, 'bar', 'object should be set');
  received = null;

  const ev = fabric.Event.init({ foo: 'bar' });
  fired = foo.fire('bar:baz', ev);
  assert.ok(received instanceof fabric.Event, 'should be an event');
  assert.equal(received, fired, 'should be the same ref');
  assert.equal(ev, fired, 'should be the same ref');
  assert.equal(received.foo, 'bar', 'object should be set');
  assert.equal(ev.defaultPrevented, false, 'default not prevented');
  assert.equal(ev.propagate, true, 'propagation not prevented');

  foo.on('bar:baz', ev => {
    ev.preventDefault();
  });
  fired = foo.fire('bar:baz');
  assert.equal(fired.defaultPrevented, true, 'default prevented');
  assert.equal(fired.propagate, true, 'propagation not prevented');
  foo.on('bar:baz', ev => {
    ev.stopPropagation();
  });
  fired = foo.fire('bar:baz');
  assert.equal(fired.defaultPrevented, true, 'default prevented');
  assert.equal(fired.propagate, false, 'propagation prevented');
});

QUnit.module('event path', (hooks) => {
  const a = new fabric.Observable(), b = new fabric.Observable();
  hooks.afterEach(() => {
    a.off();
    b.off();
  });
  function fire(targets, control, subscribe, message) {
    QUnit.test(message, assert => {
      const ev = fabric.Event.init({ foo: 'bar' });
      subscribe && subscribe();
      targets.forEach(target => target.fire('foo', ev));
      assert.equal(ev.path.length, control.length, 'event path should match');
      ev.path.forEach((o, i) => assert.equal(o, control[i], `path[${i}] should match`));
      assert.equal(ev.composedPath(), ev.path, 'just an alias method');
    });
  }
  fire([a, b], [], null, 'no registered event handlers');
  const subscribe = () => {
    a.on('foo', () => { });
    b.on('foo', () => { });
  }
  fire([a], [a], subscribe, 'a only');
  fire([a, b], [a, b], subscribe, 'a & b');
  fire([a, b, b, a], [a, b, b, a], subscribe, 'multiple firing');
  const multipleSubscriber = () => {
    a.on('foo', () => { });
    a.on('foo', () => { });
    a.on('foo', () => { });
    b.on('foo', () => { });
  }
  fire([b, a], [b, a], multipleSubscriber, 'multiple subscriptions');
  const subscribeWithDisposing = () => {
    a.on('foo', () => { });
    a.on('foo', () => { })();
    b.on('foo', () => { });
  }
  fire([b, a], [b, a], subscribeWithDisposing, 'respect disposing');
});

QUnit.module('event propagation', hooks => {
  QUnit.test('stopped before firing', assert => {
    const a = new fabric.Observable();
    let fired = false;
    a.on('foo', () => {
      fired = true;
    });
    const ev = fabric.Event.init({ foo: 'bar' });
    ev.stopPropagation();
    assert.equal(ev.propagate, false, 'stopPropagation should have an effect');
    a.fire('foo', ev);
    assert.equal(fired, false, 'event should be skipped');
  });
  QUnit.test('stopPropagation', assert => {
    const a = new fabric.Observable(), b = new fabric.Observable();
    let fired = false, skipped = true, bFired = false;
    a.on('foo', () => {
      fired++;
    });
    a.on('foo', () => {
      fired++;
    });
    a.on('foo', (ev) => {
      ev.stopPropagation();
      fired++;
    });
    a.on('foo', () => {
      fired++;
      skipped = false;
    });
    b.on('foo', () => {
      bFired = true;
    });
    let ev = fabric.Event.init({ foo: 'bar' });
    a.fire('foo', ev);
    b.fire('foo', ev);
    assert.equal(fired, 4, 'last event should be skipped');
    assert.ok(!skipped, 'last event should fire');
    assert.ok(!bFired, 'b should not fire');

    fired = 0;
    ev = fabric.Event.init({ foo: 'bar' });
    b.fire('foo', ev);
    a.fire('foo', ev);
    assert.equal(fired, 4, 'last event should be skipped');
    assert.ok(!skipped, 'last event should fire');
    assert.ok(bFired, 'b should fire');
  });
  QUnit.test('stopImmediatePropagation', assert => {
    const a = new fabric.Observable(), b = new fabric.Observable();
    let fired = false, skipped = true, bFired = false;
    a.on('foo', () => {
      fired++;
    });
    a.on('foo', () => {
      fired++;
    });
    a.on('foo', (ev) => {
      ev.stopImmediatePropagation();
      fired++;
    });
    a.on('foo', () => {
      fired++;
      skipped = false;
    });
    b.on('foo', () => {
      bFired = true;
    });
    let ev = fabric.Event.init({ foo: 'bar' });
    a.fire('foo', ev);
    b.fire('foo', ev);
    assert.equal(fired, 3, 'last event should be skipped');
    assert.ok(skipped, 'last event should be skipped');
    assert.ok(!bFired, 'b should not fire');

    fired = 0;
    ev = fabric.Event.init({ foo: 'bar' });
    b.fire('foo', ev);
    a.fire('foo', ev);
    assert.equal(fired, 3, 'last event should be skipped');
    assert.ok(skipped, 'last event should be skipped');
    assert.ok(bFired, 'b should fire');
  });
});

QUnit.test('fire once', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = 0;
  foo.once('bar:baz', () => {
    eventFired++;
  });

  foo.fire('bar:baz');
  assert.equal(eventFired, 1);
  foo.fire('bar:baz');
  assert.equal(eventFired, 1);
});

QUnit.test('fire once multiple handlers', function (assert) {
  var foo = new fabric.Observable();
  var eventFired = 0;
  var eventFired2 = 0;
  var eventFired3 = 0;
  foo.once({
    'bar:baz': () => {
      eventFired++;
    },
    'blah:blah': () => {
      eventFired2++;
    },
    'blah:blah:bloo': (e) => {
      eventFired3++;
    }
  });
  foo.fire('bar:baz');
  assert.equal(eventFired, 1);
  assert.equal(eventFired2, 0);
  foo.fire('blah:blah');
  assert.equal(eventFired, 1);
  assert.equal(eventFired2, 1);
  foo.fire('bar:baz');
  foo.fire('blah:blah');
  assert.equal(eventFired, 1);
  assert.equal(eventFired2, 1);
  assert.equal(eventFired3, 0);
});

QUnit.test('off', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false;
  var handler = function () {
    eventFired = true;
  };
  foo.on('bar:baz', handler);
  foo.off('bar:baz', handler);

  foo.fire('bar:baz');
  assert.equal(eventFired, false);
});

QUnit.test('off without handler', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false, event2Fired = false;

  var handler = function () {
    eventFired = true;
  };
  var handler2 = function () {
    event2Fired = true;
  };
  foo.on('bar:baz', handler);
  foo.on('bar:baz', handler2);

  foo.off('bar:baz');

  foo.fire('bar:baz');
  assert.equal(eventFired, false);
  assert.equal(event2Fired, false);

  foo.on('bar:baz', handler);
  foo.on('bar:baz', handler2);

  foo.off({ 'bar:baz': null });

  foo.fire('bar:baz');
  assert.equal(eventFired, false);
  assert.equal(event2Fired, false);
});

QUnit.test('off multiple handlers', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false, event2Fired = false;

  var handler = function () {
    eventFired = true;
  };
  var handler2 = function () {
    event2Fired = true;
  };
  foo.on({ 'bar:baz': handler, 'blah:blah': handler2 });

  foo.off({ 'bar:baz': handler, 'blah:blah': handler2 });

  foo.fire('bar:baz');
  assert.equal(eventFired, false);
  foo.fire('blah:blah');
  assert.equal(event2Fired, false);
});

QUnit.test('off all events', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false, event2Fired = false;

  var handler = function () {
    eventFired = true;
  };
  var handler2 = function () {
    event2Fired = true;
  };
  foo.on({ 'bar:baz': handler, 'blah:blah': handler2 });

  foo.off();

  foo.fire('bar:baz');
  assert.equal(eventFired, false);
  foo.fire('blah:blah');
  assert.equal(event2Fired, false);
});

QUnit.test('on multiple handlers', function (assert) {
  var foo = new fabric.Observable();

  var barBazFired = false;
  var blahBlahFired = false;
  var mooFired = false;

  foo.on({
    'bar:baz': function () {
      barBazFired = true;
    },
    'blah:blah': function () {
      blahBlahFired = true;
    },
    'moo': function () {
      mooFired = true;
    }
  });

  foo.fire('bar:baz');
  foo.fire('blah:blah');
  foo.fire('moo');

  assert.equal(barBazFired, true);
  assert.equal(blahBlahFired, true);
  assert.equal(mooFired, true);
});

QUnit.test('event options', function (assert) {
  var foo = new fabric.Observable();

  var someValue;
  foo.on('foo:bar', function (e) {
    someValue = e.value;
  });

  foo.fire('foo:bar', { value: 'sekret' });

  assert.equal(someValue, 'sekret');
});

QUnit.test('fire', function (assert) {
  var foo = new fabric.Observable();

  var eventFired = false;
  var context;
  foo.on('bar:baz', function () {
    context = this;
    eventFired = true;
  });

  foo.fire('bar:baz');
  assert.equal(eventFired, true);
  assert.equal(context, foo);
});

QUnit.test('removal of past events', function (assert) {
  var foo = new fabric.Observable(),
    event1Fired = false, event2Fired = false,
    event3Fired = false, event4Fired = false,
    handler1 = function () {
      event1Fired = true;
      foo.off('bar:baz', handler1);
    },
    handler2 = function () {
      event2Fired = true;
    },
    handler3 = function () {
      event3Fired = true;
    },
    handler4 = function () {
      event4Fired = true;
    };

  foo.on('bar:baz', handler1);
  foo.on('bar:baz', handler2);
  foo.on('bar:baz', handler3);
  foo.on('bar:baz', handler4);
  assert.equal(foo.__eventListeners['bar:baz'].length, 4, 'There should be 4 events registered now');
  foo.fire('bar:baz');
  assert.equal(foo.__eventListeners['bar:baz'].length, 3, 'There should be 3 events registered now');
  assert.equal(event1Fired, true, 'Event 1 should fire');
  assert.deepEqual(foo.__eventListeners['bar:baz'], [handler2, handler3, handler4], 'There should be 3 events registered now');
  assert.equal(event2Fired, true, 'Event 2 should fire');
  assert.equal(event3Fired, true, 'Event 3 should fire');
  assert.equal(event4Fired, true, 'Event 4 should fire');
});

QUnit.test('removal of past events inner loop', function (assert) {
  var foo = new fabric.Observable(),
    event1Fired = 0, event2Fired = 0,
    event3Fired = 0, event4Fired = 0,
    handler1 = function () {
      event1Fired++;
      foo.off('bar:baz', handler1);
      assert.equal(foo.__eventListeners['bar:baz'].length, 3, 'There should be 3 handlers registered');
      assert.deepEqual(foo.__eventListeners['bar:baz'], [handler2, handler3, handler4], 'There should be 3 handlers registered');
      assert.equal(event1Fired, 1, 'Event 1 should fire once');
      assert.equal(event2Fired, 0, 'Event 2 should not be fired yet');
      assert.equal(event3Fired, 0, 'Event 3 should not be fired yet');
      assert.equal(event4Fired, 0, 'Event 4 should not be fired yet');
      foo.fire('bar:baz');
      assert.equal(foo.__eventListeners['bar:baz'].length, 3, 'There should be 3 handlers registered now');
    },
    handler2 = function () {
      event2Fired++;
    },
    handler3 = function () {
      event3Fired++;
    },
    handler4 = function () {
      event4Fired++;
    };

  foo.on('bar:baz', handler1);
  foo.on('bar:baz', handler2);
  foo.on('bar:baz', handler3);
  foo.on('bar:baz', handler4);
  foo.fire('bar:baz');
  assert.equal(event1Fired, 1, 'Event 1 should fire once');
  assert.equal(event2Fired, 2, 'Event 2 should fire twice');
  assert.equal(event3Fired, 2, 'Event 3 should fire twice');
  assert.equal(event4Fired, 2, 'Event 4 should fire twice');
});

QUnit.test('adding events', function (assert) {
  var foo = new fabric.Observable(),
    event1Fired = false, event2Fired = false,
    event3Fired = false, event4Fired = false,
    handler1 = function () {
      event1Fired = true;
      foo.off('bar:baz', handler1);
      foo.on('bar:baz', handler3);
      foo.on('bar:baz', handler4);
    },
    handler2 = function () {
      event2Fired = true;
    },
    handler3 = function () {
      event3Fired = true;
    },
    handler4 = function () {
      event4Fired = true;
    };

  foo.on('bar:baz', handler1);
  foo.on('bar:baz', handler2);
  foo.fire('bar:baz');
  assert.equal(event1Fired, true, 'Event 1 should fire');
  assert.equal(event2Fired, true, 'Event 2 should fire');
  assert.equal(event3Fired, false, 'Event 3 should not fire');
  assert.equal(event4Fired, false, 'Event 4 should not fire');
  foo.fire('bar:baz');
  assert.equal(event3Fired, true, 'Event 3 should be fireed now');
  assert.equal(event4Fired, true, 'Event 4 should be fireed now');
});


QUnit.test('disposing', function (assert) {
  var foo = new fabric.Observable();

  var fired = new Array(7).fill(false);
  var getEventName = function (index) {
    return `event${index + 1}`;
  }
  var createHandler = function (index) {
    return function () {
      fired[index] = true;
    }
  }
  var attach = function () {
    return [
      foo.on(getEventName(0), createHandler(0)),
      foo.on(getEventName(1), createHandler(1)),
      foo.once(getEventName(2), createHandler(2)),
      foo.on({
        [getEventName(3)]: createHandler(3),
        [getEventName(4)]: createHandler(4),
      }),
      foo.once({
        [getEventName(5)]: createHandler(5),
        [getEventName(6)]: createHandler(6),
      })
    ];
  }
  var disposers = [];
  var fireAll = function () {
    fired.forEach(function (__, index) {
      foo.fire(getEventName(index));
    });
  }
  var dispose = function () {
    disposers.forEach(function (disposer) {
      disposer();
    });
  }

  //  dispose before firing
  disposers = attach();
  dispose();
  fireAll();
  assert.deepEqual(fired, new Array(fired.length).fill(false));

  //  dispose after firing
  disposers = attach();
  fireAll();
  assert.deepEqual(fired, new Array(fired.length).fill(true));
  fired = new Array(fired.length).fill(false);
  dispose();
  fireAll();
  assert.deepEqual(fired, new Array(fired.length).fill(false));

});
