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
  Query: {
    async user(_: any, { id }: { id: string }) {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
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
