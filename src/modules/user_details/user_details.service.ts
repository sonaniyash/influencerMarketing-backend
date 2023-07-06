/* eslint-disable prettier/prettier */
import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs';
import { baseUrl } from 'src/common/constants/utils';

@Injectable()
export class UserDetailsService {
  constructor(private httpService: HttpService) { }

  async userDetails(search: string) {
    const data: any = this.httpService
      .get(
        `${baseUrl}/dict/users/?q=${search}&type=lookalike&platform=instagram`,
        {
          headers: {
            'Content-Type': 'application/json',
            authkey: process.env.AUTH_KEY,
          },
        },
      )
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    return data;
  }

  async postDetails(search: string) {
    const data: any = this.httpService
      .get(`${baseUrl}/raw/ig/user/feed/?url=${search}`, {
        headers: {
          'Content-Type': 'application/json',
          authkey: process.env.AUTH_KEY,
        },
      })
      .pipe(
        map(async (response) => {
          const { items } = response.data;
          // response.data.items.map((item) => {

          // })

          for (let i = 0; i < items.length; i++) {
            items[i].display_url = await this.getImageBase64(items[i].display_url);
          }

          return items;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    return data;
  }

  async contactDetails(search: string) {
    const data: any = this.httpService
      .get(`${baseUrl}/exports/contacts/?url=${search}&platform=instagram`, {
        headers: {
          'Content-Type': 'application/json',
          authkey: process.env.AUTH_KEY,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    return data;
  }

  async getImageBase64(url: string) {
    // let image = await this.httpService.get('http://aaa.bbb/image.png', { responseType: 'arraybuffer' });
    // let returnedB64 = Buffer.from(image.data).toString('base64');
    console.log('display_url', url);
    try {
      const response: AxiosResponse<any> = await this.httpService.get(url, { responseType: 'arraybuffer' }).toPromise();
      // console.log('response', response);
      let returnedB64 = 'data:image/png;base64,' + Buffer.from(response.data).toString('base64');
      return returnedB64;
    } catch (error) {
      throw new Error('Error making the request: ' + error.message);
    }
  }
}
