define(['ojs/ojModel'], 
function(oj) {
    class ProductsModel {
        constructor(){
            this.serverUrl = "http://127.0.0.1:2480/";
        }//end of constructor

        initializeModelCollection(endpoint){
            this.productsModelDef = oj.Model.extend({
                url : endpoint,
                keyAttributes : "@rid" 
            });
            this.productsCollDef = oj.Model.extend({
                url : endpoint,
                comparator : "@rid" ,
                model : this.productsModelDef
            });

            this.products = new this.productsCollDef;

        }//initializeModelCollection

        getProductsList(notify){
            //api url for all category
            let api_url = this.serverUrl + "query/posdatabase/sql/SELECT FROM products";
            this.initializeModelCollection(api_url);

            // Make Row definition and connect it with Collection Definition
            this.productRow = new this.productsCollDef({},this.products);

            //Operating on the Database "I use orientDB"
            this.productRow.fetch({
                success : (coll,data)=>{
                        //console.log(data.result);
                        // var test = Object.entries(data.result).map(val => {
                        //     console.log("After format : " + val[1]);
                        //     //console.log("After format : " + val[1].category_name);
                        //     return val[1] ;
                            
                        // });
                        // console.log(test);
                
                        // notify(true,test);
                        notify(true,data.result);
                },
                error : (model,xhr,options)=>{
                    notify(false,"Error : " + xhr.textStatus);
                },
                headers : {
                    'Authorization' : 'Basic cm9vdDpyb290cHdk',
                    //'Authorization' : 'Basic' + btoa('root:rootpwd'),
                    'Content-Type' : 'application/json'
                }
            });

        }//end getProductsList

    }//end class
    return new ProductsModel;
    
    
});