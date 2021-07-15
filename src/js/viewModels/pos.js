define(['ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider','models/category.model','ojs/ojbindingprovider'], 
    function(oj,ko,$,ArrayDataProvider,categoryModel) {
        function PosViewModel(){
            self = this;
            self.testData = ko.observableArray(["Ehab Test",'test2','test3','test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray(["category1","category2","category3","category4","category5","category6"]);
            
            categoryModel.getCategoryList((success,data)=>{
                
            });
            
            
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html