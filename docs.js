/**
 * @description JS file which runs the server and shows JSDoc.
 * @author Mitko Donchev
 */
import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import logger from 'koa-logger';

const app = new Koa();

app.use(logger());
app.use(mount('/', serve('./docs/jsdocs'))) // serve JSDocs

let port = process.env.PORT || 3000;

app.listen(port, () => console.log('Web Server UP!'));
