// @flow
import { camelizeKeys } from 'humps';

export default (pgPool: Object) => {
  return {
    async getUserById(userId: number) {
      const res = await pgPool.query(`
        select * from users
        where id = $1
      `, [userId]);
      
      return camelizeKeys(res.rows[0]); 
    },
    async getUserByApiKey(apiKey: number) {
      const res = await pgPool.query(`
        select * from users
        where api_key = $1
      `, [apiKey]);

      return camelizeKeys(res.rows[0]);
    },
    async getContests(user: Object) {
      const res = await pgPool.query(`
        select * from contests
        where created_by  = $1
      `, [user.id]);

      return camelizeKeys(res.rows);
    },

    async getNames(contest: Object) {
      const res = await pgPool.query(`
        select * from names
        where contest_id = $1
      `, [contest.id]);

      return camelizeKeys(res.rows);
    }

  };
};