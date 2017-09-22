import axios from 'axios';

export interface ICompany {
  id: string;
  name: string;
  description: string;
}

export interface IUser {
  id: string;
  firstName: string;
  age: number;
  companyId: number;
}

export const resolvers = {
  CompanyType: {
    async users(obj: ICompany) {
      const { data } = await axios.get(
        `http://localhost:3000/companies/${obj.id}/users`,
      );
      return data;
    },
  },
  Mutation: {
    async addUser(
      parentValue: object,
      {
        firstName,
        age,
        companyId,
      }: { firstName: string; age: number; companyId: string },
    ) {
      const { data } = await axios.post('http://localhost:3000/users', {
        age,
        firstName,
      });

      return data;
    },
    async deleteUser(parentValue: object, { id: userId }: { id: string }) {
      let response = '';
      const { data, status } = await axios.delete(
        `http://localhost:3000/users/${userId}`,
      );

      if (status === 200) {
        response = 'The user was deleted successfully';
      } else {
        response = 'something bad happened!';
      }

      return response;
    },
  },
  Query: {
    async user(_: any, { id }: { id: string }) {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      return data;
    },
    async company(_: any, { id }: { id: string }) {
      const { data } = await axios.get(`http://localhost:3000/companies/${id}`);
      return data;
    },
  },
  UserType: {
    company: async (obj: IUser) => {
      const { data: companyData } = await axios.get(
        `http://localhost:3000/companies/${obj.companyId}`,
      );

      return companyData;
    },
  },
};
