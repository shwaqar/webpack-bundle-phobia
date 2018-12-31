#! /usr/bin/env node

import { fetchData } from '../api';
import startServer from './server';

fetchData().then(startServer);
