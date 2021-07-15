define(['ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider','models/category.model','ojs/ojbindingprovider'], 
    function(oj,ko,$,ArrayDataProvider,categoryModel) {
        function PosViewModel(){
            self = this;
            self.testData = ko.observableArray(["Ehab Test",'test2','test3','test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray([]);
            


            
            categoryModel.getCategoryList((success,data)=>{
                console.log("From View Model :" + data);
                self.dataProvider(data);
            });

            self.selectCategory = function(event){
                //alert("clicked");
                
            }
            
            
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html