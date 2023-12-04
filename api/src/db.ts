import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export const connectDb = async (): Promise<Database> => {
  return open({
    filename: 'priceboard.db',
    driver: sqlite3.Database,
  });
};
