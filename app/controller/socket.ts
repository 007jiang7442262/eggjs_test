import { Controller } from 'egg';
export default class Socket extends Controller {
  public async index() {
    const { ctx } = this;
    const { user } = ctx.request.query;
    console.log('userId12 =', user);
    // 设置 session
    ctx.session.userId = user;

    ctx.body = '设置成功1';
  }
}
