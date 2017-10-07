import { ILog } from '../../interfaces/log';

export interface Log extends ILog {};

export interface LogState {
  logs: Log[];
}

export interface LogContext {
  logs: Log[];
}