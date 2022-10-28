import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { createBootstrap } from "@soundcore/bootstrap";

const logger = new Logger("Bootstrap");
createBootstrap("Soundcore @NEXT", AppModule)
  .useOptions({ cors: true, abortOnError: false })
  .enableCors()
  .enableVersioning({ type: VersioningType.URI, defaultVersion: "1" })
  .useHost(process.env.BIND_ADDRESS || "0.0.0.0")
  .usePort(Number(process.env.PORT) || 3002)
  .withBuildInfo()
  .bootstrap().then((app) => {
    app.getUrl().then((url) => {
      logger.log(`Soundcore Service now listening for requests on url '${url}'.`);      
    });
  });

