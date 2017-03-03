import { Mutation, QL } from 'react-relay';

export class CreateTodoMutation extends Mutation {
  getMutation() {
    return QL`
      mutation {createTodo}
    `;
  }

  getVariables() {
    return {
      title: this.props.title,
      url: this.props.url
    };
  }

  getFatQuery() {
    return QL`
      fragment on CreateTodoPayload {
        todoEdge
        store { todoConnection }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'todoConnection',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}