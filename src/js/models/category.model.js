define(['ojs/ojModel'], 
function(oj) {
    class CategoryModel {
        constructor(){
            this.serverUrl = "http://127.0.0.1:2480/";
        }//end of constructor

        initializeModelCollection(endpoint){
            this.categoryModelDef = oj.Model.extend({
                url : endpoint,
                keyAttributes : "@rid" 
            });
            this.categoryCollDef = oj.Model.extend({
                url : endpoint,
                comparator : "@rid" ,
                model : this.categoryModelDef
            });

            this.category = new this.categoryCollDef;

        }//initializeModelCollection

        getCategoryList(notify){
            //api url for all category
            let api_url = this.serverUrl + "query/posdatabase/sql/SELECT FROM category";
            this.initializeModelCollection(api_url);

            // Make Row definition and connect it with Collection Definition
            this.categoryRow = new this.categoryModelDef({},this.category);

            //Operating on the Database "I use orientDB"
            this.categoryRow.fetch({
                success : (coll,data)=>{
                        console.log(data.result);
                        var test = Object.entries(data.result).map(val => {
                            console.log("After format : " + val[1].category_name);
                            return val[1].category_name;
                        });
                        console.log(test);
                
                        notify(true,test);
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

        }//end getCategoryList

    }//end class
    return new CategoryModel;
    
    
});