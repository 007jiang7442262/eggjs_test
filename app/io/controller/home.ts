// {app_root}/app/io/controller/default.js

import { Controller } from 'egg';

export default class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    // const { ctx } = this;
    console.log('webapck 请求');
    const message = ctx.args[0] || {};
    console.log('message请求的数据 =', message);
    const namespace:any = app.io.of('/');
    // 这个广播全部 (全部都发事件)
    namespace.emit('allEvnet', `${message}数据1`);

    // const message = ctx.args[0];
    // 这个谁发给我我就发给谁(这个事件返回当前这个人)
    await ctx.socket.emit('myEvent', `${message}数据2`);
  }


  async acceptMessage() {
    const { ctx, app } = this;
    // const app.redis.set(userId, ctx.socket.id);

    const message = ctx.args[0] || {};
    const dataMessage = JSON.parse(message);
    console.log('dataMessage =', dataMessage.user);
    const socketId:any = await app.redis.get(dataMessage.user);
    console.log('userId =', socketId);
    if (socketId) {
      const namespace:any = app.io.of('/');
      namespace.sockets[socketId].emit('userMessage', dataMessage.message);
    }
    // userMessage
    // await ctx.socket[userId].emit('userMessage', dataMessage.message);

  }
}

