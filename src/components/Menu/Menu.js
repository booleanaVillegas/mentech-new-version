import React from 'react';
import './Menu.css';
import {Icon} from 'antd';

const Menu = (props) => {
    return (
        
            <section id="menu-section" className={props.toggle ? "menu-section-off" : "menu-section-on" }>
                <div>
                    <button id="menu-button" className={props.toggle ? "menu-button-off" : "menu-button-on"} onClick={props.slideMenu} >
                        <Icon type="bars" theme="outlined" />
                    </button>
                <div id="menu-user">
                <figure id="menu-user-figure" style={{backgroundImage: 'url("'+props.user.avatar+'")'}}></figure>
                   <div id="menu-user-info">
                    <h2 className="menu-id">{props.user.nombre}</h2>
                    <h4 className="menu-id">Nivel: {props.user.nivel}</h4>
                   </div>
                </div>
                <h4 className="menu-id">Opciones del perfil</h4>
                <hr/>
                <ul id="menu-ul">
                    <li style={{position:'relative',display:'flex',justifyContent:'flex-start'}}>
                        <Icon type="picture" theme="outlined"/> <span>Cambiar Imagen de perfil</span>
                        <input className='file-input' type="file" accept="image/*" onChange={(e)=>{
                            console.log(e.target.files[0])
                            props.updatePic(e.target.files[0])
                            }}/>
                    </li>
                    <li><Icon type="info-circle" theme="outlined"/> <span>Ayuda</span> </li>
                    <li onClick={props.logout}><Icon type="logout" theme="outlined"/> <span>Cerrar sesión</span></li>
                </ul>

                </div>
                <footer className="menu-id">
                    <h3 className="menu-id">Mentech</h3>
                    <h3 className="menu-id">v.01</h3>
                </footer>
            </section>
      
    );
};

export default Menu;