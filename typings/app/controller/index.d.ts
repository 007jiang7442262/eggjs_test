// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportSocket from '../../../app/controller/socket';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    socket: ExportSocket;
  }
}
