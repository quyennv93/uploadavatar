import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join('public'),
      serveRoot: '/public',
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
