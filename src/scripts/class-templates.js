const React = require('react')
const ReactDOM = require('react-dom')
const Backbone = require('backbone')


var cartTotal = ''


let productModel = Backbone.Model.extend({})

var myShoppingCart = []

const HomePage = React.createClass({

   getInitialState: function(){
      let startingState = {
         popUpDisplay: false,
         cartDropDisplay: false,
         searchValue: '',
         shoppingCart: myShoppingCart
      }

      return startingState
   },

   searchFunction: function(evt){

      console.log(evt)

      console.log(this.state.searchValue)
   },

   showMeMyCart: function(evt){
      console.log(this.state.shoppingCart)
      // console.log(cartTotal)
      if(this.state.cartDropDisplay === false){
         this.setState({
            cartDropDisplay: true
         })
         console.log('open')
      } else {
         this.setState({
            cartDropDisplay: false
         })
         console.log('close')
      }
   },

   searchInputChange: function(event){
      this.setState({
         searchValue: event.target.value
      })

   },

   _displayModal: function(lid){
      console.log('heyo', lid)
      console.log(this.state.popUpDisplay)

      if(this.state.popUpDisplay === false){
         this.setState({
            popUpDisplay: true
         })

      } else {
         this.setState({
            popUpDisplay: false
         })

      }

      window.location.hash = '#closerLook/' + lid


   },


   render: function(){


      let jumboTitleText = "Whoever you are, find whatever you're into"

      let etsyData = this.props.data

      let tileData = etsyData.map((someData, i)=>{
         // console.log(someData)
         // console.log(i)
         var crntPic2 = ''


         if (someData.attributes.Images[0].url_170x135 === undefined){
            crntPic2 = 'https://robohash.org/travis/?set=set2'
         } else {
            crntPic2 = someData.attributes.Images[0].url_170x135
         }

         let divStyle = {
             backgroundImage: 'url('+ crntPic2 +')'
         }
         let productName = someData.attributes.title.slice(0, 25) + '...'
         let productCreator = someData.attributes.Shop.shop_name
         let productPrice = "$"+someData.attributes.price
         // console.log('???? this ?????', this)
         return(
            <a href='#' key={someData.cid} onClick={(evt)=>{ evt.preventDefault(); this._displayModal(someData.get('listing_id'));} }>
               <div className="col-md-4 crntProduct" style={divStyle} >
                  <div className="crntProdInfo">
                     <h1>{productName}</h1>
                     <p className="crntCreator">{productCreator}</p>
                     <p className="crntPrice">{productPrice}</p>
                  </div>
               </div>
            </a>
         )

      })


      return (
         <div>
            <CloserPage serveStuff={etsyData} displayStatus={this.state.popUpDisplay} myCart={this.state.shoppingCart} someNewNew={this}/>
            <nav>
               <img src="../images/etsy-logo.png" className="navLogo"/>
               <div className="navIcons">
                  <img src="../images/Home-48.png"/>
                  <img src="../images/Appointment Reminders-48.png"/>
                  <img src="../images/Shopping Cart-48.png" onClick={this.showMeMyCart}/>
                  <span className="badge cartNumber">{cartTotal}</span>
                  <CartDropDown displayState={this.state.cartDropDisplay} theCart={this.state.shoppingCart}/>
               </div>
               <ol className="navCats">
                  <li>Clothing & Accessories</li>
                  <li>Jewelry</li>
                  <li>Craft Supplies & Tools</li>
                  <li>Weddings</li>
                  <li>Entertainment</li>
                  <li>Home & Living</li>
                  <li>Kids & Baby</li>
                  <li>Vintage</li>
               </ol>
            </nav>
            <div>
               <div className="jumbotron">
                  <h1 className="jumboTitle">{jumboTitleText}</h1>
                  <div className="input-group jumboSearch">
                     <input type="text" value={this.state.searchValue} onChange={this.searchInputChange} className="form-control jumboSearchBar"/>
                     <div className="input-group-btn">
                        <button type="button" className="btn default jumboSearchBut" onClick={this.searchFunction}>Search</button>
                     </div>
                  </div>
               </div>
               <div className="homeInfoBlocksbox">
                  <div className="col-sm-4">
                     <img src="../images/how_etsy_works_1.20160609191624.png"/>
                     <h3>Get something you love</h3>
                     <p>Our marketplace is a world of vintage and handmade goods</p>
                  </div>
                  <div className="col-sm-4">
                     <img src="../images/how_etsy_works_2.20160609191624.png"/>
                     <h3>Find your new favorite shop</h3>
                     <p>More than a million independent sellers from everywhere are right here</p>
                  </div>
                  <div className="col-sm-4">
                     <img src="../images/how_etsy_works_3.20160609191624.png"/>
                     <h3>Buy safely and securely</h3>
                     <p>Etsy protects every transaction, so shop with confidence</p>
                  </div>
               </div>
            </div>
            <div>
               <h1 className="homePageTitle">Browse our selection..</h1>
               <div className="col-sm-3 contentNavBox">
                  <h4>Show results for :</h4>
                  <div>
                     <h5>All Categories</h5>
                     <ul>
                        <a href="#"><li>Accessories</li></a>
                        <a href="#"><li>Toys & Games</li></a>
                        <a href="#"><li>Shoes</li></a>
                        <a href="#"><li>Jewelry</li></a>
                        <a href="#"><li>Clothing</li></a>
                        <a href="#"><li>Pet Supplies</li></a>
                        <a href="#"><li>Bath & Beauty</li></a>
                        <a href="#"><li>Home & Living</li></a>
                        <a href="#"><li>Bags & Purses</li></a>
                        <a href="#"><li>Books, Movies & Music</li></a>
                     </ul>
                  </div>
                  <h4>Refine your search :</h4>
                  <div>
                     <h5>Item type</h5>
                     <input type="checkbox"/>All items<br/>
                     <input type="checkbox"/>Handmade<br/>
                     <input type="checkbox"/>Vintage<br/>
                     <hr/>
                     <h5>Price ($)</h5>
                     <input type="checkbox"/>Any Price<br/>
                     <input type="checkbox"/>Under 25$<br/>
                     <input type="checkbox"/>$25 to $50<br/>
                     <input type="checkbox"/>$50 to $100<br/>
                     <input type="checkbox"/>Over $100<br/>
                  </div>

               </div>
               <div className="container contentListingBox">
                  <div id="tileHolder">
                     {tileData}
                  </div>
                  <nav className="productPagination">
                     <ul className="pagination">
                        <li>
                           <a href="#" >
                              <span>&laquo;</span>
                           </a>
                        </li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li>
                           <a href="#">
                              <span>&raquo;</span>
                           </a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
            <div className="container-fluid homePageFooter"></div>
         </div>
      )
   }
})

const CloserPage = React.createClass({

   getInitialState : function() {
    return {
      crntShoppingCart: []
    }
  },

   someFunction: function(){
      let crntPagePosition = document.body.scrollTop

      window.location.hash = ''

      document.body.scrollTop = crntPagePosition
      this.props.someNewNew.setState({
         popUpDisplay: false
      })

      // console.log(this.props.someNewNew.popUpDisplay)

   },

   addToCart: function(){
      console.log(this.props.myCart)
      // console.log(this.props.serveStuff)


      let thisData = this.props.serveStuff
      //
      var thisId = Number(window.location.hash.slice(12))
      //
      // let myCrntCart = this.props.myCart
      //
      // let newCrntCart = myCrntCart + '/' +thisId


      var thisProductIndex = thisData.findIndex(function(mdls, i){
         return mdls.get('listing_id') === thisId
      })
      let thisProduct = thisData[thisProductIndex].attributes

      let packagedProduct = new productModel()

      packagedProduct.set(thisProduct)

      let theNewCart = this.props.myCart
      theNewCart.push(packagedProduct.attributes)


      this.props.someNewNew.setState({
         shoppingCart: theNewCart
      })

      cartTotal = this.props.myCart.length



   },

   render: function(){
      // console.log(this.props)
      let crntData = this.props.serveStuff




      if(this.props.displayStatus === false){
         return (
            <div></div>
         )
      }else {
         let crntId = Number(window.location.hash.slice(12))

         var selectedProductIndex = crntData.findIndex(function(mdls, i){
            return mdls.get('listing_id') === crntId
         })
         let selectedProduct = crntData[selectedProductIndex].attributes

         let crntPic = ''

         if (selectedProduct.Images[0].url_570xN === undefined){
            crntPic = 'https://robohash.org/travis/?set=set2'
         } else {
            crntPic = selectedProduct.Images[0].url_fullxfull
         }

         let prodPicStyle = {
            backgroundImage: "url(" + crntPic + ")",
            backgroundSize: "cover",
            height: '65vh',
            width: '100%'
         }




         return (
            <div className="moreInfoBox">
               <div className="infoInnerBox">
                  <nav>
                     <span className="closerLookAdd" onClick={this.addToCart}>+</span>
                     <span className="closerLookClose" onClick={this.someFunction}>x</span>
                  </nav>
                  <div>
                     <div className="col-sm-7 closerProductPic" style={prodPicStyle}>

                     </div>
                     <div className="col-sm-5 closerProductInfo">
                        <h3>{selectedProduct.title}</h3>
                        <h3>{'$' + selectedProduct.price}</h3>
                        <p>{selectedProduct.description}</p>
                     </div>
                  </div>
               </div>
            </div>
         )
      }

   }
})

const CartDropDown = React.createClass({

   // <span className="badge">{cartTotal}</span>

   render: function(){
      // console.log(this.props.displayState)
      console.log(this.props.theCart)

      if(this.props.displayState === false){
         return(
            <div></div>
         )
      } else {
         return(
            <div className="cartBoxHolder">
               <div className="cartBoxNav">
                  <h4>Your cart..</h4>
                  <button className="btn btn-warning">Checkout</button>
               </div>
               <div className="cartBoxContent">
                  <FillYourCart crntCart={this.props.theCart}/>
               </div>
            </div>
         )
      }


   }
})

const FillYourCart = React.createClass({

   render: function(){



      console.log(this.props.crntCart)
      if(this.props.crntCart.length === 0){
         return (
            <div>
               <h3>Your cart is empty...</h3>
            </div>
         )
      } else {
         let cartData = this.props.crntCart.map((crntPrdct, i)=>{
            console.log(crntPrdct)

            let thisPic = crntPrdct.Images[0].url_75x75


            return(
               <div>
                  <div>
                     <img src={thisPic}/>
                  </div>
                  <div>
                     <h3>{crntPrdct.price}</h3>
                  </div>
                  <div>
                     <span>X</span>
                  </div>
               </div>
            )
         })

         return (
            <div className='cartDataHolder'>
               {cartData}
            </div>
         )
      }

   }

})



module.exports = {
   HomePage: HomePage,
   CloserPage: CloserPage
}
