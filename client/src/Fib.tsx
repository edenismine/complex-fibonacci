import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form, Header, Segment, Table } from 'semantic-ui-react'

interface FibState {
  seen: Value[]
  values: { [index: string]: any }
  index: string
}

interface Value {
  number: number
}

class Fib extends Component<{}, FibState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      index: '',
      seen: [],
      values: {},
    }
  }

  public componentDidMount() {
    this.fetchValues()
    this.fetchIndexes()
  }

  public async fetchValues() {
    const values = await axios.get('/api/values/current')
    this.setState({ values: values.data })
  }

  public async fetchIndexes() {
    const seen = await axios.get('/api/values/all')
    this.setState({
      seen: seen.data,
    })
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await axios.post('/api/values', {
      index: this.state.index,
    })
    await this.fetchIndexes()
    await this.fetchValues()
    this.setState({ index: '' })
  }

  public renderSeen() {
    return (
      this.state.seen
        // tslint:disable-next-line: variable-name
        .map(({ number }) => number)
        .sort((a, b) => a - b)
        .filter((value, index, array) => {
          return index === 0 || value !== array[index - 1]
        })
        .join(', ')
    )
  }

  public renderValues() {
    const entries = Array<React.ReactNode>()
    for (const key in this.state.values) {
      if (this.state.values.hasOwnProperty(key)) {
        const value = this.state.values[key]
        if (value !== 'Nothing yet!') {
          entries.push(
            <Table.Row key={key}>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>,
          )
        }
      }
    }
    return entries
  }

  public render() {
    return (
      <div>
        <Header as='h1' textAlign='center' color='olive'>
          Distributed fibonacci calculator
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Enter the index we should calculate</label>
            <input
              placeholder='index'
              value={this.state.index}
              onChange={(event) => this.setState({ index: event.target.value })}
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
        <Segment>
          <Header as='h4'>Indexes I have seen:</Header>
          {this.renderSeen()}
        </Segment>
        <Segment>
          <Header as='h4'>Calculated Values:</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderValues()}</Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}

export default Fib
