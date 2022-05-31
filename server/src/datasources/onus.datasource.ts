import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config();

const config = {
  name: 'Onus',
  connector: 'mongodb',
  url: process.env.MONGODB_URL,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'Onus_db',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OnusDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Onus';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Onus', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
