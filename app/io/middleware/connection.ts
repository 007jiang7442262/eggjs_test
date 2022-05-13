module.exports = (app:any) => { // 在每一个客户端连接或者退出时发生作用
  return async (ctx, next) => {
    // socket前端传过来的参数
    const { userId } = ctx.request.query;
    // const userId = ctx.session.userId;
    console.log('userId =', userId);
    console.log(`正在连接-${userId}`);
    await app.redis.set(userId, ctx.socket.id);
    ctx.socket.emit('connection', `连接成功 - ${userId}`);
    await next();
    // 如果取消连接就设置为null
    await app.redis.set(userId, null);
    // execute when disconnect.
    console.log(`取消连接 - ${userId}`);
  };
};
