// import { Application } from 'egg';

export default (app: any) => {
  const { controller, router, io } = app;
  // console.log('io.controller =', io.controller);
  router.get('/api', controller.home.index);
  router.get('/getData', controller.home.getData);
  router.post('/uploadFile', controller.home.uploadFile);

  router.post('/base64Img', controller.home.base64Img);
  router.post('/uploadTest', controller.home.uploadTest);
  router.post('/testImt', controller.home.testImt);


  router.get('/socket', controller.socket.index);

  io.of('/').route('server', io.controller.home.index);
  io.of('/').route('acceptMessage', io.controller.home.acceptMessage);

};
