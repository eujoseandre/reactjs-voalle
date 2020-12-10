import React, { Component } from 'react'

import './styles/css/App.css'
import 'antd/dist/antd.css'

import ListPerson from './components/ListPerson'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

import { last } from 'lodash'
import { Form, Input, Row, Col, Button, Typography, List, message } from 'antd'

export default class App extends Component {

  constructor(props) {

    super(props)

    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChanceName = this.handleChanceName.bind(this)
    this.handleChanceEmail = this.handleChanceEmail.bind(this)
    this.handleChanceCity = this.handleChanceCity.bind(this)
    this.handleChanceState = this.handleChanceState.bind(this)
    this.notValue = this.notValue.bind(this)
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)

    this.state = {

      size: 'large',
      name: '',
      email: '',
      city: '',
      state: '',
      pessoas: []
    }
  }

  handleAdd() {

    const { pessoas, name, email, city, state } = this.state

    const lastItem = last(pessoas)
    var lastId = 0

    try {

      lastId = lastItem.id + 1
    }
    catch
    {

      lastId = 1;
    }

    const newItem = {

      id: lastId,
      name: name,
      email: email,
      address: {
        city: city,
        state: state
      }
    }

    if (name === '' || email === '' || city === '' || state === '') {

      this.notValue()
    }

    else {

      this.setState(prevState => ({
        ...prevState,
        pessoas: [...pessoas, newItem],
        name: '',
        email: '',
        city: '',
        state: '',
      }))
      this.success();
    }
  }


  handleDelete(id) {

    const { pessoas } = this.state
    const newItems = pessoas.filter(item => item.id !== id)

    this.setState(prevState => ({ ...prevState, pessoas: newItems }))
    this.error();
  }


  handleChanceName(e) {
    this.setState(prevState => ({ ...prevState, name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) }))
  }

  handleChanceEmail(e) {
    this.setState(prevState => ({ ...prevState, email: e.target.value.toLowerCase() }))
  }

  handleChanceCity(e) {
    this.setState(prevState => ({ ...prevState, city: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) }))
  }

  handleChanceState(e) {
    this.setState(prevState => ({ ...prevState, state: e.target.value.toUpperCase() }))

  }

  success() {
    message.success('Um novo <Dev/> foi adicionado!');
  }

  error() {
    message.error('<Dev/> deletado!');
  }

  notValue() {
    message.error('Preencha todos os campos!');
  }

  render() {

    const { pessoas, name, email, city, state, size } = this.state
    const { Title, Paragraph } = Typography;

    return (
      <>
        <Box className="Box">
          <Container className="App" maxWidth="md">
            <Card className="Card">
              <CardContent className="Content">
                <Typography>

                  <Title className="Title"><span>&lt;</span>Faça seu cadastro<span>/&gt;</span></Title>
                  <Paragraph className="SubTitle">Cadastre-se na maior plataforma de <span>empregabilidade dev</span> do Brasil.</Paragraph>

                  <Form >
                    <Input.Group size="large">
                      <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item>
                            <Input className="Input" maxlength="20" placeholder="Nome" value={name} onChange={this.handleChanceName} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item>
                            <Input className="Input" placeholder="E-mail" value={email} onChange={this.handleChanceEmail} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item>
                            <Input className="Input" maxlength="20" placeholder="Cidade" value={city} onChange={this.handleChanceCity} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item>
                            <Input className="Input" maxlength="2" placeholder="UF" value={state} onChange={this.handleChanceState} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <br />

                      <Row justify="center">
                        <Col>
                          <Button className="button" shape="round" size={size} onClick={this.handleAdd}><span>ADICIONAR</span></Button>
                        </Col>
                      </Row>
                    </Input.Group>
                  </Form>

                  <br /><br />

                  <hr className="Bar" align="left" />
                  <Title className="Title"><span>&lt;</span>Devs cadastrados<span>/&gt;</span></Title>

                </Typography>
              </CardContent>

              <List size="large">
                {
                  pessoas.map((item) => {
                    return (
                      <ListPerson item={item} handleDelete={this.handleDelete} />
                    )
                  })
                }
              </List>

            </Card>
          </Container >
        </Box>
      </>
    );
  }
}

