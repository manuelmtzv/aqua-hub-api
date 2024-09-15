import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Language } from '@/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Language])],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
