define(['utils/messageBroker','ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider',
        'models/category.model','ojs/ojbindingprovider','ojs/ojlistview','ojs/ojlistitemlayout','ojs/ojactioncard'], 
    function(MsgBroker,oj,ko,$,ArrayDataProvider,categoryModel) {
        function PosViewModel(){
            self = this;
            self.testData = ko.observableArray(["Ehab Test",'test2','test3','test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray([]);
            
            self.allData = ko.observableArray([]);
            self.selectedData = ko.observableArray([]);
            self.CategoryDataProvider = new ArrayDataProvider(self.selectedData,{keyAttributes: '@rid'});
            


            
            categoryModel.getCategoryList((success,data)=>{
                //console.log("From View Model :" + data);
                
                //self.dataProvider(data);
                // self.allData = new ArrayDataProvider(data,{keyAttributes: "@rid"})
                // var name_category = Object.entries(self.allData.data).map(val => {return val[1].category_name});
                // console.log("Type of all data : " , name_category);
                // self.dataProvider(name_category);
                if(success)
                    self.allData(data);
                    self.selectedData(self.allData());
                    self.selectedData.valueHasMutated();
                console.log("allData : " , self.allData());
                console.log("selectedData : " , self.selectedData());
                
                
            });

            // self.selectCategory = function(event){
            //     //alert("clicked");
            //     console.log(event.target.value);
            //     MsgBroker.publish('Group1',self.dataProvider());
            //     //console.log(self.dataProvider());
            // }
            
            self.showContent=(event)=>{
                //alert("TEST ON Action");
                console.log(event.currentTarget.id);
                
            };
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html