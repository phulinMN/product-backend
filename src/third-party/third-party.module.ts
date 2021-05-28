import { HttpModule, Module } from '@nestjs/common';
import GbPayService from './services/gb-pay.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }),
  ],
  providers: [GbPayService],
  exports: [GbPayService],
})
export class ThirdPartyModule {}
