const $ = require('jquery')
const Backbone = require('Backbone')

var etsyModel = Backbone.Model.extend({
   url: '',

   parse: function(rawJSON){
      return rawJSON
   },



   initialize: function(productId){
      this.url = "https://openapi.etsy.com/v2/listings/" + productId + ".js?callback=?&includes=Images,Shop&api_key=a4rxc0l54zj63ku2c0of02ic"

   }

})

var etsyCollection = Backbone.Collection.extend({
   model: etsyModel,
   url: '',
   parse: function(rawJSON){
      return rawJSON.results

   },


   initialize: function(qryStr){
      this.url = 	"https://openapi.etsy.com/v2/listings/active.js?callback=?&includes=Images,Shop&limit=32&api_key=a4rxc0l54zj63ku2c0of02ic"
   }
})



module.exports = {
   etsyCollection: etsyCollection,
   etsyModel: etsyModel
}
