#! /usr/bin/env node

import Api from '../api';
import startServer from './server';

const api = new Api();

api.fetchData().then(startServer);
