import React from 'react';
import './FormLogin.css';
import { Form, Icon, Input, Button, Alert} from 'antd';


const FormItem = Form.Item;

const FormLogin = (props) => {


    return (
        <section className='form-login-component'>
        <Form onSubmit={props.submit} className="login-form actual-login-form">
        <FormItem className='input-form-login'>       
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} id='email' placeholder="Correo Electrónico" onChange={props.change}/>
        </FormItem>
        <FormItem className='input-form-login'>       
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} id='password' placeholder="Contraseña" onChange={props.change}/>
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-button">
            Iniciar sesión
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
    );
};


export default (FormLogin);