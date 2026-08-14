'use strict';
const cds = require('@sap/cds');
const path = require('path');

// MUST be called at module level (Jest collection phase), not inside beforeAll.
// cds.test() synchronously registers before/after Jest hooks in its constructor.
// Calling it from inside beforeAll (execution phase) throws "Cannot add a hook after tests have started running".
module.exports = cds.test(path.resolve(__dirname, '../..'));
