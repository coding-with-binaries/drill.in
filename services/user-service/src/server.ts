import { Application } from '../deps.ts';
import UserController from './controller/user.controller.ts';

const PORT = 7000;

const app = new Application();

app.use(UserController.routes());
app.use(UserController.allowedMethods());

await app.listen({ port: PORT });
