import React from 'react';
import './FormSignUp.css';
import { Form, Input, Button,Select , Alert} from 'antd';
import { BrowserRouter as Router} from "react-router-dom";
const FormItem = Form.Item;
const Option = Select.Option;

const FormSignUp = (props) => {
    return (
        <Router>
        <section className='form-signup-component'>
        <Form onSubmit={props.submit} className="signup-form actual-signup-form" layout="horizontal">
        <FormItem className='input-form-signup' label='Nombre'>       
            <Input placeholder="Nombre" id='nombre' onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup' label='Apellido'>       
            <Input placeholder="Apellido" id='apellido' onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'label='Correo Electrónico'>       
            <Input placeholder="Email" id='email' onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'label='Contraseña'>       
            <Input placeholder="Contraseña" id='password' type="password"  onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'label='Confirmar contraseña'>       
            <Input placeholder="Confirmar Contraseña" id='confPass' type="password"  onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'label='Edad'>      
         
        <Select style={{ color: 'rgba(0,0,0,.25)' }} id='edad' defaultValue="Edad" onChange={props.cEdad}>
            <Option id='edad' value="Edad" disabled>Edad</Option>
            <Option id='edad' value="11">11</Option>
            <Option id='edad' value="12">12</Option>
            <Option id='edad' value="13">13</Option>
            <Option id='edad' value="14">14</Option>
            <Option id='edad' value="15">15</Option>
            <Option id='edad' value="16">16</Option>
            <Option id='edad' value="17">17</Option>
        </Select>
       
        </FormItem>
        <FormItem className='input-form-signup'label='Barrio'>       
        <Select style={{ color: 'rgba(0,0,0,.25)' }} id='barrio' defaultValue="Barrio" onChange={props.cBarrio}>
            <Option value="Barrio" disabled>Barrio</Option>
            <Option value="Potrero Grande">Potrero Grande</Option>
            <Option value="Conquistadores">Conquistadores</Option>
            <Option value="Agua Blanca">Agua Blanca</Option>
            <Option value="Obrero">Obrero</Option>
            <Option value="Siloe">Siloe</Option>
            <Option value="Limonar">Limonar</Option>
            <Option value="Las Granjas">Las Granjas</Option>
        </Select>
        </FormItem>
        <Button type="primary" htmlType="submit" className="signup-button" >
        Crear Cuenta
          </Button>
        </Form>    
        { props.error ?  <Alert
      message="Error"
      description={props.error}
      type="error"
      showIcon
      closable
    /> : null}
      </section>
      </Router>
    );
};

export default FormSignUp