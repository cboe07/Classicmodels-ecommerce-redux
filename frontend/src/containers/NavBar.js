import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			productlines: []
		}
	}

	componentDidMount() {
		// go get all productlines from the double
		$.getJSON(window.hostAddress+'/productlines/get', (productlinesData)=>{
			// console.log(productlinesData);
			this.setState({
				productlines: productlinesData
			});
		});

	}

  render(){
  	console.log(this.props.cartInfo)
  	if(this.props.cartInfo.totalPrice != undefined){
  		var totalPrice = this.props.cartInfo.totalPrice;
  		var totalItems = this.props.cartInfo.totalItems;
  	}else{
  		var totalPrice = 0.00;
  		var totalItems = 0;
  	}

  	const shopMenu = [];
  	const collapsedMenu = [];
  	// Map through this.state.productlines. First render, will not loop because array is empty
  	this.state.productlines.map((pl,index)=>{
  		// console.log(pl)
  		shopMenu.push(
  			<Link key={index} to={`/shop/${pl.link}`}>{pl.productLine}</Link>
  		)
  		collapsedMenu.push(
			<li key={index}><Link to={`/shop/${pl.link}`}>{pl.productLine}</Link></li>
		)
  	})

	if(this.props.registerInfo.name == undefined){
		var rightBar = [
			<li key="1" className="text-right"><Link to="/login">Login</Link></li>,
			<li key="2" className="text-right"><Link to="/register">Register</Link></li>,
			// <li key="3" className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>
			<li key="3" className="text-right"><Link to="/cart">My Cart</Link></li>		
		]
	}else{
		var rightBar = [
			<li key="1" className="text-right">Welcome, {this.props.registerInfo.name}</li>,
			<li key="2" className="text-right"><Link to="/cart">({totalItems}) items in your cart | (${totalPrice})</Link></li>,
			<li key="3" className="text-right"><a href="http://localhost:3001/">Logout</a></li>		
		]		
	}

    return(
    	<div>
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header hidden-sm hidden-xs">
						<Link to="/" className="navbar-brand classic-models">ClassicModels</Link>
					</div>

					{/* NAVBAR */}
					<div className="hidden-sm hidden-xs">
						<ul className="nav navbar-nav left">
							<li><Link to="/">Home</Link></li>
							<li className="dropdown">
								<Link to="/">Shop <i className="arrow down" /></Link>
								<ul>
									<li className="dropdown-links">
										{/* Drop in the array of <Link> created above */}
										{shopMenu}
									</li>
								</ul>
							</li>
							<li><Link to="/about">About Us</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
						</ul>
						<ul className="nav navbar-nav float-right">
							{rightBar}
						</ul>
					</div>

					{/* COLLAPSED NAVBAR */}
					<div className="dropdown hidden-lg hidden-md">
						<div className="nav navbar-nav dropdown-toggle">
							<Link to="/" className="navbar-brand classic-models">ClassicModels</Link>
						</div>
						<ul className="nav navbar-nav dropdown-menu">
							<li><Link to="/">Home</Link></li>
							<li className="dropdown">
								<Link to="/">Shop</Link>
								<div className="collapsed-shop-menu">{collapsedMenu}</div>
							</li>
							<li><Link to="/about">About Us</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
							<ul>
								{rightBar}
							</ul>
						</ul>
					</div>


				{/* <div className="dropdown hidden-lg hidden-md">
						<div className="nav navbar-nav dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							<Link to="/" className="navbar-brand classic-models">ClassicModels</Link>
						</div>
						<ul className="nav navbar-nav dropdown-menu" aria-labelledby="dropdownMenu1">
							<li><Link to="/">Home</Link></li>
							<li className="dropdown">
								<Link to="/">Shop</Link>
								<div className="collapsed-shop-menu">{collapsedMenu}</div>
							</li>
							<li><Link to="/about">About Us</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
							<ul>
								{rightBar}
							</ul>
						</ul>
					</div>*/}

				</div>
			</nav>
		</div>
  
	)
  }
}

function mapStateToProps(state){
	return{
		registerInfo: state.registerReducer,
		cartInfo: state.cartReducer
	}
}

// export default NavBar
export default connect(mapStateToProps)(NavBar)
