import { Module } from '@nestjs/common';
import { CloudDevService } from './cloud-dev.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }),
    MulterModule.registerAsync({ inject: [ConfigService], useFactory: (configService: ConfigService) => ({ dest: configService.get<string>('MULTER_DEST') }) }),
  ],
  providers: [CloudDevService],
  exports: [CloudDevService],
})
export class CloudDevModule {}
