/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import {AppRegistry} from 'react-native';

// import RNTesterApp from './RNTesterAppShared';

import {DummyFlatList} from './DummyFlatList';

AppRegistry.registerComponent('RNTesterApp', () => DummyFlatList);

module.exports = DummyFlatList;
