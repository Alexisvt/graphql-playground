import axios from 'axios';

export const resolvers = {
  Author: {
    posts: async ({ id: authorId }: { id: number }) => {
      const posts = await axios.get('http://localhost:3000/posts');
      return posts.data.filter(p => p.authorId === authorId);
    },
  },
  Mutation: {
    upvotePost: async (_, { postId }: { postId: number }) => {
      const { data: post } = await axios.get(
        `http://localhost:3000/posts/${postId}`,
      );

      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }

      post.votes += 1;

      const resp = await axios.post(
        `http://localhost:3000/posts/${post.id}`,
        post,
      );

      if (resp.status === 200) {
        return post;
      }

      console.error(`There was an error: ${resp.status}`);
    },
  },
  Post: {
    author: async ({ authorId }: { authorId: number }) => {
      const { data: author } = await axios.get(
        `http://localhost:3000/authors/${authorId}`,
      );
      return author;
    },
  },
  Query: {
    author: async (_, { id: authorId }: { id: number }) => {
      const { data: author } = await axios.get(
        `http://localhost:3000/authors/${authorId}`,
      );
      return author;
    },
    posts: async () => {
      const { data: posts } = await axios.get('http://localhost:3000/posts');
      return posts;
    },
  },
};
