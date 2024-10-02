import {Controller, Get, Query, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as geoip from 'geoip-lite';

@Controller("geoip")
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getGeoInfo(@Query('ip') ip: string, @Res() res: Response) {
    const geo = geoip.lookup(ip);
    if (!geo) {
      return res.status(404).json({ message: 'нет данных по этому IP' });
    }

    return res.status(200).json({
      lat: geo.ll[0],
      lng: geo.ll[1],
      country: geo.country,
      city: geo.city,
    });
  }
}
