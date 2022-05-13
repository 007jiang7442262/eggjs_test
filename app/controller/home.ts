import { Controller } from 'egg';
import * as toArray from 'stream-to-array';
import * as path from 'path';
import * as fs from 'fs';
import pump = require('mz-modules/pump');


export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    // console.log('ctx.session.userId123 =', ctx.session.userId);

    // const namespace:any = app.io.of('/');
    // namespace.emit('event', '飞机');
    ctx.logger.info('ctx.session.userId =', ctx.session.userId);

    // console.log('value =', value);
    // await ctx.socket.emit('event', '不知道搞什么飞机');
    // ctx.body = await ctx.service.test.sayHi('egg');
    ctx.body = '123' + ctx.session.userId;

  }

  public async getData() {
    const { ctx } = this;
    /* const data = */ await new Promise((resolve, reject) => {
      fs.readFile(`${this.config.baseDir}/app/public/1.txt`, (ero, result) => {
        // console.log('111111');
        if (ero) {
          console.log('ero =', ero);
          reject(ero);
        } else {
          // console.log('2222222');
          resolve(result);
        }
      });
    });
    /* console.log('getData =', data); */
    ctx.body = { ad: '高级前端设计师' };
  }


  public async base64Img() {
    const { ctx } = this;
    console.log('base64');
    const { base64_URL, filename } = ctx.request.body;
    const base64 = base64_URL.replace(/^data:image\/\w+;base64,/, '');
    // const path = `${imagePath}${Date.now()}${index}.png`;
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    const result :any = await new Promise((resolve, reject) => {
      fs.writeFile(target, base64, 'base64', function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('ok');
        }
      });
    });

    if (result === 'ok') {
      ctx.body = 'ok';
    } else {
      ctx.body = -1;

    }

  }

  public async testImt() {
    const { ctx } = this;
    const file123 = ctx.request;
    console.log('file123 =', file123);
    const parts = ctx.multipart(/* { autoFields: true } */);
    const urls:any[] = [];
    let stream;
    while ((stream = await parts()) != null) {
      console.log('field: ' + stream.fieldname);
      console.log('filename: ' + stream.filename);
      console.log('encoding: ' + stream.encoding);
      console.log('mime: ' + stream.mime);
      // 文件类型
      // const fileType = stream.mime;
      // 给文件命名
      const filename = Date.now() + '.' + stream.filename || stream.filename.toLowerCase();
      // 这是要上传的文件路径
      const target = path.join(this.config.baseDir, 'app/public/imgs', filename);
      urls.push(`/public/imgs/${filename}`);
      // 创建写流
      const writeStream = fs.createWriteStream(target);
      // 上传到本地
      await pump(stream, writeStream);
    }
    console.log(urls);
    console.log('stream =', stream);

    ctx.body = {
      filename: '123',
    };
  }

  async uploadTest() {
    const { ctx } = this;
    const parts = ctx.multipart();
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // user click `upload` before choose a file,
          // `part` will be file stream, but `part.filename` is empty
          // must handler this, such as log error.
          continue;
        }
        // otherwise, it's a stream
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // const result = await ctx.oss.put('egg-multipart-test/' + part.filename, part); 上次阿里云
        // console.log(result);
      }
    }
    ctx.body = {
      filename: '123',
    };
  }

  public async uploadFile() {
    const { ctx } = this;
    // const file = ctx.request.files;
    console.log('ctx.request =', ctx.request);

    // const { headers: { currentName } } = ctx;
    console.log('11111111');
    const stream = await ctx.getFileStream();
    console.log('stream =', stream);
    let buf;
    try {
      const parts: any = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (e) {
      // await sendToWormhole(stream);
      console.log('报错 =', e);
      throw e;
    }

    const filename: any = `${stream.filename}`;

    const target = path.join(this.config.baseDir, 'app/public/img', filename); // this.config.baseDir Node.js 中，__dirname
    await fs.writeFile(target, buf, e => {
      if (e) throw e;
    });
    ctx.body = {
      filename,
    };
  }
}
