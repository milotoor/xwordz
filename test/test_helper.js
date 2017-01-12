
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';

// Augments the prototypes of base types to include ES6 methods, and more
if (!window._babelPolyfill) {
    require('babel-polyfill');
}

chai.use(dirtyChai);
chai.use(chaiImmutable);
