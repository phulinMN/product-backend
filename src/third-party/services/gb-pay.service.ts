import { HttpService, Injectable } from '@nestjs/common';
import { IGenerateQrCode } from 'src/common/interfaces/third-party.interface';
import { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';

@Injectable()
export default class GbPayService {
  private config: AxiosRequestConfig;
  private domain = 'https://api.gbprimepay.com';

  constructor(private httpService: HttpService) {
    this.config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }

  async generateQrCode(payload: IGenerateQrCode) {
    // TODO: ENV
    const token =
      'lQvQlOWXJbeRdAK/70bV/0Aejj1rdBbgNeqJlbACRtaVU1O47jJ/6mMKLb3ieUPYzKFYtXMPGbDwtadV/s5ux2kmiPZIEd68A/VyPBsi4Spv3kwAtFiChLFfdcQFEd33CdZ2SlDDH5p9SS9IRCrU09pJfEw=';
    const data = stringify({ ...payload, token });
    const json = JSON.stringify({ ...payload, token });
    console.log({ data, json });
    try {
      const res = await this.httpService
        .post(`${this.domain}/gbp/gateway/qrcode`, data, this.config)
        .toPromise();
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
}
