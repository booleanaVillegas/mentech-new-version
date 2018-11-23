import React from 'react';
import './FormSignUp.css';
import { Form, Input, Button , Alert, Icon} from 'antd';
import {Link} from "react-router-dom";
const FormItem = Form.Item;


const FormSignUp = (props) => {
    return (
        
        <section className='form-signup-component'>
        <Form onSubmit={props.submit} className="signup-form actual-signup-form" layout="horizontal">
        <FormItem className='input-form-signup'>       
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre Completo" id='nombre' onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'>       
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" id='email' onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'>       
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Contraseña" id='password' type="password"  onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-signup'>       
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirmar Contraseña" id='confPass' type="password"  onChange={props.change}/>
        </FormItem>
       
        <Button type="primary" htmlType="submit" className="signup-button" >
        Crear Cuenta
          </Button>
        <Link to="/login" style={{marginTop:'10px'}}> 
        <p>Ya tienes una cuenta? Inicia sesión aquí</p>
        </Link>

        </Form>    
        { props.error ?  <Alert
      message="Error"
      description={props.error}
      type="error"
      showIcon
      closable
    /> : null}
      </section>
      
    );
};

export default FormSignUp