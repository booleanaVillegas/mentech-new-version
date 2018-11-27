import React from 'react';
import { AutoComplete, Button } from 'antd';
import './CrearPartida.css'

const CrearPartida = (props) => {
    return (
        <section className='crear-partida'>
            <div className="container-autocomplete">
                    <h1 className="title">Elige aqui a los jugadores</h1>
                    <AutoComplete
                        id='autocomplete'
                        style={{ width: '90%' }}
                        onSearch={props.search}
                        placeholder="Agrega a los mentores a la partida"
                        onSelect={props.select}
                        allowClear={true}
                    >
                        {props.children}
                    </AutoComplete>


                </div>
                <div className="container-users-puntos">
                    <h1 className="title">Jugadores elegidos</h1>
                    <ul>

                        {props.chosen}

                    </ul>
                    <Button type="primary" onClick={props.agregar} className="login-button">
                        Crear partida
          </Button>
                </div>
        </section>
    );
};

export default CrearPartida;