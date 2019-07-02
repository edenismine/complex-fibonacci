import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Container, Menu, MenuItemProps } from 'semantic-ui-react'
import Fib from './Fib'
import OtherPage from './OtherPage'
interface AppState {
  activeItem?: string
}
class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  public handleItemClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => this.setState({ activeItem: data.name })

  public render() {
    const { activeItem } = this.state
    return (
      <BrowserRouter>
        <Container text>
          <Menu color='olive' inverted>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
              as={Link}
              to='/'
            >
              Home
            </Menu.Item>
            <Menu.Item
              name='other'
              active={activeItem === 'other'}
              onClick={this.handleItemClick}
              as={Link}
              to='/other'
            >
              Other
            </Menu.Item>
          </Menu>
          <Container text>
            <Route path='/' exact component={Fib} />
            <Route path='/other' component={OtherPage} />
          </Container>
        </Container>
      </BrowserRouter>
    )
  }
}

export default App
