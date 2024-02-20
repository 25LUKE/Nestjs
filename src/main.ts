import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.file';
//import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* {bufferLogs: true} */);
  //app.useLogger(app.get(MyLoggerService)) //to log globaly

const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
