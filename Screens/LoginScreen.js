import React, { Component } from "react";
import { ActivityIndicator, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Title, Right, FooterTab, Text,
          Picker, Icon, Left, Footer, Button, Body, CheckBox, ListItem, H1, Textarea, Toast,
         } from 'native-base';
import * as Font from 'expo-font'
import { showMessage, hideMessage } from "react-native-flash-message";



import PouchDB from '../pouchdb/custombuild';

const db = new PouchDB('db', { adapter: 'react-native-sqlite' });
//base de datos remota
global.remoteDB = 'http://admin:DesarrolloWeb123@23.96.28.160:5984/prod'
const remoteDB = new PouchDB('http://admin:DesarrolloWeb123@23.96.28.160:5984/prod');
var gThis = null;

const optionsAddGlobal = {
  "Jamon": {
      name: "Jamon",
      selected: false
  },
  "Peperoni": {
      name: "Peperoni",
      selected: false
  },
  "Salami": {
      name: "Salami",
      selected: false
  },
  "Tocino": {
      name: "Tocino",
      selected: false
  },
  "Queso extra": {
      name: "Queso extra",
      selected: false
  }
}
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    navigation_var = this.props;
    gThis = this;
   
    this.state = {
      loading: true
    };
   

    /*

    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      console.log(doc.rows);
    });
    */
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      
    });
    this.setState({ 
        loading: false,
        comment: "",
        pizza: '',
        pizzaOptions : ["Pizza Clásica",
                        "Pizza 2 opciones",
                        "Pizza 3 opciones",
                        "Pizza 4 opciones",],
        drink: '',
        meats: [],
        optionsAdd : optionsAddGlobal,
        drinkOptions : [
          "Pepsi",
          "Mirinda",
          "7 up",
          "Jugo de Naranja Natural"
        ],
        table : '',
        tableOptions : ["Mesa 1",
                        "Mesa 2",
                        "Mesa 3",
                        "Mesa 4",
                        "Mesa 5",
                        "Mesa 6",
                        "Mesa 7",
                        "Mesa 8"
                      ]
      });
  }

  validateElements = () => {
    if (this.state.pizza !== '' &&
        this.state.table !== '' &&
        this.state.drink !== '') {
      this.insertElements()
    }
    else{
      showMessage({
        message: "ERROR",
        description: "Completa los campos",
        type: "danger",
        icon: "auto",
        //batch_size: 1000,
        animationDuration: 1000,
      });
    }

  }

  insertElements = () => {
    
    remoteDB.put({
      _id: new Date().toISOString(),
      pizza: this.state.pizza,
      table: this.state.table,
      drink: this.state.drink,
      optionsAdd : gThis.getSelected(this.state.optionsAdd),
      comment : this.state.comment !== '' ? this.state.comment : null,
      finalized: false,
    }).then(function (response) {
      gThis.resetElements()
    }).catch(function (err) {
      console.log(err);
    });
  }

  getSelected = (obj) => {
    let options = []
    Object.keys(obj).forEach(key => {
      if (obj[key].selected) {
        options.push(obj[key].name)
      }
        
    });
    return options
  }

  

  setPizza(value: string) {
    this.setState({
      pizza: value
    });
  }


  setDrink(value: string) {
    this.setState({
      drink: value
    });
  }

  setTable(value: string) {
    this.setState({
      table: value
    });
  }

  setComment(value: string) {
    this.setState({
      comment: value,
    });
  }

  newAdd = (keyOption, selected) => {
    let optionsAdd = this.state.optionsAdd
    optionsAdd[keyOption].selected = !optionsAdd[keyOption].selected
    
    this.setState({
      optionsAdd: optionsAdd
    });
  }

  resetElements(){
    
    this.setState({
      optionsAdd: {
        "Jamon": {
            name: "Jamon",
            selected: false
        },
        "Peperoni": {
            name: "Peperoni",
            selected: false
        },
        "Salami": {
            name: "Salami",
            selected: false
        },
        "Tocino": {
            name: "Tocino",
            selected: false
        },
        "Queso extra": {
            name: "Queso extra",
            selected: false
        }
      },
      pizza: '',
      drink: '',
      table: '',
      comment: ''
    });
    showMessage({
      message: "EXITO",
      description: "Orden completada",
      type: "info",
      icon: "auto",
      //batch_size: 1000,
      animationDuration: 1000,
    });
  }

  render() {

    let { optionsAdd, loading, drinkOptions, pizzaOptions, comment, tableOptions } = this.state

    if (loading) {
      return  <ActivityIndicator />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Grupo 02 - Desarrollo Web</Title>
          </Body>
          <Right />
        </Header>
        <Content>

        
        <Image source={require('../Resources/pizza.jpg')} style={{width: "100%", height: 100, margin:0,padding:0}}/>
        
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.pizza}
                onValueChange={this.setPizza.bind(this)}>
                  <Picker.Item  label={'Selecciona una pizza'} value={''} />
                   {pizzaOptions.map((element, index) => {
                  return (   
                          <Picker.Item label={element} value={element} key={element} />
                            )
                  })}
                
              </Picker>
            </Item>
          </Form>

          {Object.keys(optionsAdd).map((key, index) => {
            return (   
                    <ListItem key={index + "drink"} 
                              onPress={() => { this.newAdd(optionsAdd[key].name, optionsAdd[key].selected) }} >
                      <CheckBox checked={optionsAdd[key].selected}   />
                      <Body>
                        <Text>{optionsAdd[key].name}</Text>
                      </Body>
                    </ListItem>)
          })}

          

          <Image source={require('../Resources/bebida.jpg')} style={{width: "100%", height: 100, margin:0,padding:0}}/>

          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.drink}
                onValueChange={this.setDrink.bind(this)}>
                  <Picker.Item  label={'Selecciona una bebida'} value={''} />
                  {drinkOptions.map((element, index) => {
                  return (   
                          <Picker.Item label={element} value={element} key={element} />
                            )
                  })}
              </Picker>
            </Item>
            <Image source={require('../Resources/comentarios.jpg')} style={{width: "100%", height: 100, margin:0,padding:0}}/>
            <Textarea rowSpan={5} bordered placeholder="Comentarios"
                  onChangeText={this.setComment.bind(this)}  value={comment}/>
          </Form>


          <Image source={require('../Resources/mesa.jpg')} style={{width: "100%", height: 100, margin:0,padding:0}}/>

          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.table}
                onValueChange={this.setTable.bind(this)}>
                  <Picker.Item  label={'Selecciona una mesa'} value={''} />
                  {tableOptions.map((element, index) => {
                  return (   
                          <Picker.Item label={element} value={element} key={element} />
                            )
                  })}
              </Picker>
            </Item>
          </Form>


          
         
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={()=>{this.validateElements()}}>
              <Text>Guardar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


