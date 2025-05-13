import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretsProviderService } from './secrets-provider.service';

@Module({
  providers: [SecretsProviderService],
  exports: [SecretsProviderService],
  imports: [ConfigModule.forRoot()],
})
export class SecretsProviderModule {}
