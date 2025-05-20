import mysql from 'mysql2/promise';
import { DynamicModule, Module } from '@nestjs/common';
import { SecretsProviderService } from '@microservice-architecture-ts/secrets-provider';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [],
      providers: [
        {
          provide: 'DatabaseConnection',
          useFactory: async (secretsProvider: SecretsProviderService) => {
            let dbHost: string;
            let dbUser: string;
            let dbPassword: string;
            let dbName: string;
            
            try {
              dbHost = await secretsProvider.getSecretValue('DB_HOST');
              dbUser = await secretsProvider.getSecretValue('DB_USER');
              dbPassword = await secretsProvider.getSecretValue('DB_PASSWORD');
              dbName = await secretsProvider.getSecretValue('DB_NAME');
            } catch (error) {
              console.error('Error fetching secrets:', error);
              throw new Error('Failed to fetch database connection details');
            }

            const connection = await mysql.createConnection({
              host: dbHost,
              user: dbUser,
              password: dbPassword,
              database: dbName,
            });

            return connection;
          },
          inject: [SecretsProviderService],
        },
      ],
    };
  }
}
