import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }
    //componente q é chamado logo qnd inicia - chamada do proprio React
    //mas se a gt for criar uma função tem q ser arrow function e n essa
    //pq se n, o react n vai enchergar nosso this e variaveis da nossa classe
    //promisses, async await
    componentDidMount(){
        this.loadProducts();

    }
    //tem q ser esse modelo abaixo
    loadProducts = async (page = 1) =>{ //page comeca em 1
        const response = await api.get('/products?page=${page}');
        //os dados estão no data.docs
        //console.log(response.data.docs);
        //tou pegando os dados do docs e guardando o resto
        //no productInfo usando RestOperator
        const {docs, ...productInfo} = response.data;

        //a gt n cria simplesmente variaveis da classe, p armazenar colocamos a variaveis state q é um objeto
        //ai nos guardamos as variaveis q nos quisermos la
        //p atualizar fazemos
        //this.setState({products: response.data.docs});
        this.setState({products: docs, productInfo , page});
    };
    prevPage = () =>{
        const { page, productInfo} = this.state;

        //verificando se is a prim pag
        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
        
    }

    nextPage = () => {
        const { page, productInfo} = this.state;

        //verificando se is a ultima pag
        if(page === productInfo.pages) return;

        const pageNumber = page +1;

        this.loadProducts(pageNumber);
    }

    render(){
        // o react pede p q toda vez q utilizemos o map colocamos na frente uma key
        ///p diminuir no render coloquei no const - desestruturei
        const { products, page, productInfo } = this.state;

        return (
        <div className="product-list">
            <h1>Contagem de produtos: {products.length}</h1>
            {products.map(product =>(
                <article key={product._id}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>

                <Link to={"/products/${product._id"}>Acessar</Link>
              </article>
            ))}
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
            </div>
        </div>
        );
    }
}