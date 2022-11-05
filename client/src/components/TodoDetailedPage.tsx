import * as React from 'react'
import Auth from '../auth/Auth'
import { getTodo } from '../api/todos-api'
import { Todo } from '../types/Todo'
import {
  Grid,
  Loader
} from 'semantic-ui-react'

interface TodoDetailedPageProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
}

interface TodoDetailedPageState {
  todo: Todo,
  loading: boolean
}

export class TodoDetailedPage extends React.PureComponent<
  TodoDetailedPageProps,
  TodoDetailedPageState
> {
  state: TodoDetailedPageState = {
    todo: {
      createdAt: '',
      todoId: '',
      name: '',
      dueDate: '',
      done: false
    },
    loading: true
  }
  async componentDidMount() {
    console.log('this.props.match.params.todoId');
    console.log(this.props.match.params.todoId);
    try {
      const todo = await getTodo(this.props.match.params.todoId, this.props.auth.getIdToken())
      this.setState({
        todo,
        loading: false
      })
    } catch (e) {
      alert(`Failed to fetch todo: ${(e as Error).message}`)
    }
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    )
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading()
    } else {
      const { name, dueDate } = this.state.todo;
      return (
        <Grid.Row>
          <Grid.Column width={1} verticalAlign="middle">
            {name}
          </Grid.Column>
          <Grid.Column width={3} floated="right">
            {dueDate}
          </Grid.Column>
        </Grid.Row>
      )
    }
  }
}
