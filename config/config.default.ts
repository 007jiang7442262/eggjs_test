import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650686449779_9351';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      'http://localhost:9909',
      'http://127.0.0.1:9909',
      'http://192.168.100.100:9909',
      'http://0.0.0.0:9909',
    ],
  };
  config.cors = {
    credentials: true, // 支持cookie跨域
    // origin: 'http://127.0.0.1:9909', //可以不设置
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 可以访问静态文件配置
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
    maxFiles: 1000,
  };

  // 配置 上传文件
  config.multipart = {
    fileSize: '100mb',
    mode: 'stream',
    fileExtensions: [
      // images
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.less',
      '.html',
      '.htm',
      '.xml',
      // tar
      '.zip',
      '.gz',
      '.tgz',
      '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ], // 增加对 xlsx 扩展名的文件支持
  };

  // 配置 socket
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [ 'connection' ],
        packetMiddleware: [],
      },
      /* '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      }, */
    },
    /*
    generateId: req => { // 自定义 socket.id 生成函数
      console.log('req =', req);
      // console.log('data =', data);
      return '111111'; // custom id must be unique
    },
    */
    redis: {
      // 配置socket里面的redis
      host: '127.0.0.1',
      port: 6379,
      auth_pass: '',
      db: 0,
    },
  };

  // 配置redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  /*   config.session = {
    key: 'SESSION_ID', // 设置session cookie里面的key
    maxAge: 1000 * 60 * 30, // 设置过期时间
    httpOnly: true,
    encrypt: true,
    renew: true, // renew等于true 那么每次刷新页面的时候 session都会被延期
  }; */

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
