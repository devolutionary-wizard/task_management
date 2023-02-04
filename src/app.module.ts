import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './api/tasks/tasks.module';
import { dataSourceOptions } from './db/dataSource/data-source';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(dataSourceOptions),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
