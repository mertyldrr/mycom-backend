import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'Signup successfull' };
  }

  login() {
    return { msg: 'Login successfull' };
  }
}
