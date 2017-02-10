// @flow
import { orderedFor, slug } from '../lib/util';
import { camelizeKeys } from 'humps';

export default (pgPool: Object) => {

  return {
    async getUsersByIds(userIds: number[]) {
      const res = await pgPool.query(`
        select * from users
        where id = ANY($1)
      `, [userIds]);

      return orderedFor(res.rows, userIds, 'id', true);
    },
    async getUsersByApiKeys(apiKeys: number[]) {
      const res = await pgPool.query(`
        select * from users
        where api_key = ANY($1)
      `, [apiKeys]);

      return orderedFor(res.rows, apiKeys, 'apiKey', true);
    },
    async getContestsForUserIds(userIds: number[]) {
      const res = await pgPool.query(`
        select * from contests
        where created_by  = ANY($1)
      `, [userIds]);

      return orderedFor(res.rows, userIds, 'createdBy', false);
    },
    async getNamesForContestIds(contestIds: number[]) {
      const res = await pgPool.query(`
        select * from names
        where contest_id = ANY($1)
      `, [contestIds]);

      return orderedFor(res.rows, contestIds, 'contestId', false);
    },
    async getTotalVotesByNameIds(nameIds: number[]) {
      const res = await pgPool.query(`
        select name_id, up, down from total_votes_by_name
        where name_id = ANY($1)
      `, [nameIds]);

      return orderedFor(res.rows, nameIds, 'nameId', true);
    },
    async addNewContest({apiKey, title, description}) {
      return pgPool.query(`
        insert into contests(code, title, description, created_by)
        values ($1, $2, $3,
          (select id from users where api_key = $4))
        returning *
      `, [slug(title), title, description, apiKey]).then(res => {
        return camelizeKeys(res.rows[0]);
      });
    }

  };
};