import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json } from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    { bodyParser: false });
    app.use(json({ limit: '15mb' }));
  const config = new DocumentBuilder()
  .setTitle('upload')
  .setDescription('upload')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.enableCors({ credentials: true });

  await app.listen(7000);
}
bootstrap();
