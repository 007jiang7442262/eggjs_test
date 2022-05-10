import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/getData', controller.home.getData);
  router.post('/uploadFile', controller.home.uploadFile);

  router.post('/base64Img', controller.home.base64Img);
  router.post('/uploadTest', controller.home.uploadTest);
  router.post('/testImt', controller.home.testImt);
};
