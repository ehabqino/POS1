define(['utils/messageBroker','ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider',
        'models/category.model','models/products.model','ojs/ojbindingprovider','ojs/ojlistview','ojs/ojlistitemlayout','ojs/ojactioncard'], 
    function(MsgBroker,oj,ko,$,ArrayDataProvider,categoryModel,productsModel) {
        function PosViewModel(){
            self = this;
            self.testData = ko.observableArray(["Ehab Test",'test2','test3','test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray([]);
            
            /// for Category 
            self.allData = ko.observableArray([]);
            self.selectedData = ko.observableArray([]);
            self.CategoryDataProvider = new ArrayDataProvider(self.selectedData,{keyAttributes: '@rid'});
            
            /// for Products
            self.allProducts = ko.observableArray([]);
            self.selectedProducts = ko.observableArray([]);
            self.ProductsDataProvider = new ArrayDataProvider(self.selectedProducts,{keyAttributes: '@rid'});


            
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
                //console.log("allData : " , self.allData());
                //console.log("selectedData : " , self.selectedData());
                
                
            });

            productsModel.getProductsList((success,data)=>{
                //console.log("Products : ",data);
                if(success)
                    self.allProducts(data);
                    self.selectedProducts(self.allProducts());
                    self.selectedProducts.valueHasMutated();
                console.log("all Products : ", self.allProducts());
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
                MsgBroker.publish('Category-Changed',event.currentTarget.id);
                
                
            };

            self.productSelectionChanged = (event)=>{
                
                
                
                };
        MsgBroker.subscribe('Category-Changed',data => {
                    console.log("Products filter by category : " + data);
                    self.selectedProducts(self.allProducts().filter(row => row.category_id == data));
                    self.selectedProducts.valueHasMutated();
                    
                    // if(data != "lessons"){
                    //     self.selectedLessons(self.allData().filter(row => row.courseid == data));
                        
                    // }else {
                    //   self.selectedLessons(self.allData());
                    // }
                    // self.selectedLessons.valueHasMutated();
                });//end MsgBroker
                
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html