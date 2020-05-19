import { Router, RouterMiddleware } from '../../deps.ts';
import { users } from '../helpers/db-helper.ts';
import { UserRoute } from '../constants/user.routes.ts';

const router = new Router();

interface User {
  _id?: {
    $oid: string;
  };
  email: string;
  firstName: string;
  lastName: string;
}

/* Get all Users in the database */
const getAllUsers: RouterMiddleware = async (context) => {
  console.log('Fetching all users');
  try {
    const response: User[] = await users.find();
    if (response) {
      context.response.body = response;
      context.response.status = 200;
    } else {
      context.response.body = [];
      context.response.status = 204;
    }
  } catch (e) {
    context.response.status = 500;
    context.response = e;
  }
};

/* Get User By Email */
const getUserByEmail: RouterMiddleware = async (context) => {
  try {
    const { email } = context.params;
    console.log('Fetching user by email:', email);
    const response = await users.findOne({ email });
    if (response) {
      context.response.body = response;
      context.response.status = 200;
    } else {
      context.response.status = 204;
    }
  } catch (e) {
    context.response.status = 500;
    context.response = e;
  }
};

/* Add a user in the database */
const addUser: RouterMiddleware = async (context) => {
  try {
    const body = await context.request.body();
    const { value } = body;
    console.log('Adding user with payload:', value);
    if (Object.keys(value).length > 0) {
      const _id = await users.insertOne(value);
      context.response.body = { ...value, _id };
      context.response.status = 201;
    } else {
      context.response.status = 400;
      context.response.body = {
        message: 'Bad Request'
      };
    }
  } catch (e) {
    context.response.status = 500;
    context.response.body = {
      message: e
    };
  }
};

/* Delete User By Email */
const deleteUserByEmail: RouterMiddleware = async (context) => {
  try {
    const { email } = context.params;
    console.log('Deleting user by email:', email);
    const response = await users.deleteOne({ email });
    context.response.body = response;
    context.response.status = 200;
  } catch (e) {
    context.response.status = 500;
    context.response = e;
  }
};

router
  .get(UserRoute.USERS, getAllUsers)
  .get(UserRoute.USER_BY_EMAIL, getUserByEmail)
  .post(UserRoute.USERS, addUser)
  .delete(UserRoute.USER_BY_EMAIL, deleteUserByEmail);

export default router;
