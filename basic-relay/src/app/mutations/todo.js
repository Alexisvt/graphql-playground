import Relay from 'react-relay';

export class CreateTodoMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {createTodo}
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
      isComplete: this.props.isComplete
    };
  }

  getFatQuery() {
    return Relay.QL`
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

  // getOptimisticResponse() {
  //   return {
  //     linkEdge: {
  //       node: {
  //         title: this.props.title,
  //         url: this.props.url
  //       }
  //     }
  //   };
  // }
}