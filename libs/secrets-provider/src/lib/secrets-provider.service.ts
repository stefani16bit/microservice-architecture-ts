import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretsProviderService {
  public readonly client: SecretsManagerClient;

  constructor(readonly configService: ConfigService) {
    const configuration =
      configService.get<string>('NODE_ENV') === 'development'
        ? { endpoint: 'http://localhost:4566/', region: 'us-east-1' }
        : {};
    this.client = new SecretsManagerClient(configuration);
  }

  public async getSecretValue(secretId: string): Promise<string> {
    const command = new GetSecretValueCommand({ SecretId: secretId });
    const result = await this.client.send(command);

    if (result.SecretBinary) {
      return JSON.parse(Buffer.from(result.SecretBinary).toString('utf-8'));
    }

    if (result.SecretString) {
      return JSON.parse(result.SecretString);
    }

    throw new Error('SecretValueNotFound');
  }
}
