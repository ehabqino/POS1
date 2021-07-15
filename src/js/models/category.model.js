define(['ojs/ojModel'], 
function(oj) {
    class CategoryModel {
        constructor(){
            serverUrl = "http://127.0.0.1:2480/";
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


    }//end class
    return new CategoryModel;
    
    
});