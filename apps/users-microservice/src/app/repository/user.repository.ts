import mysql from 'mysql2/promise';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  @Inject('DatabaseConnection')
  private readonly databaseConnection: mysql.Connection;

  public async createUser(user: User): Promise<any> {
    try {
      const [results, fields] = await this.databaseConnection.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? )',
        [user.firstName, user.lastName, user.email, user.password]
      );
    } catch (error) {}
  }

  public async getUser(userId: number): Promise<any> {
    try {
      const [results, fields] = await this.databaseConnection.query(
        'SELECT FROM users WHERE `id` = ?',
        [userId]
      );
    } catch (error) {}
  }
}
