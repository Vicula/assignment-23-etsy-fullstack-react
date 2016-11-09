const Backbone = require('Backbone')
const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')

const view = require('./modl-col.js')
const templates = require('./class-templates.js')

var appHolder = document.querySelector('#app-container')


const appRouter = Backbone.Router.extend({

   routes: {
      "moreInfo/:id" : "showMorePage",
      "closerLook/:id" : "showCloserLook",
      "" : "showHomePage"
   },

   showCloserLook: function(id){

      // var modl = new view.etsyModel(id)
      // modl.fetch().then(function(){
      //    console.log(modl)
         console.log(id)


         // ReactDOM.render(<templates.CloserPage model={modl}/>, appHolder)
      // })
   },

   showHomePage: function(){


      var coll = new view.etsyCollection()
      coll.fetch().then(function(){

         ReactDOM.render(<templates.HomePage data={coll.models}/>, appHolder)




      })
   },

   initialize: function(){
      Backbone.history.start()
   }
})


const app = new appRouter
