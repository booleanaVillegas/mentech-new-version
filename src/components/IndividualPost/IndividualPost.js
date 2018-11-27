import React from 'react';
import './IndividualPost.css'
import { Icon } from 'antd';
const IndividualPost = (props) => {
    return (
        <div className="container-reto-indv">
                        <div className="info-mentor-reto">
                            <figure className='figure-user-pq' style={{backgroundImage: 'url("'+props.avatar+'")'}}></figure>
                            <h1>{props.nombre}</h1>
                        </div>
                        <figure className='figure-post'><img className='img-post' src={props.picture} alt="" /></figure>
                        <div className="cont-likes-dislikes">
                            <Icon className='btn-icons' type="like" />
                            <Icon className='btn-icons' type="dislike" />
                        </div>
                    </div>
    );
};

export default IndividualPost;