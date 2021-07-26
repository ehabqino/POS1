define(['utils/messageBroker','ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider',
        'models/category.model','models/products.model','ojs/ojbindingprovider','ojs/ojlistview',
        'ojs/ojlistitemlayout','ojs/ojactioncard','ojs/ojbutton','ojs/ojinputtext','ojs/ojinputnumber','ojs/ojlabel','ojs/ojtable'], 
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

            /// For Invoice
            self.selectedProductInvoice = ko.observableArray([]);
            self.InvoiceDataProvider = new ArrayDataProvider(self.selectedProductInvoice,{keyAttributes: '@rid'});
            
            self.invoiceTemp=ko.observableArray([]);
            self.invoiceTempProduct = new ArrayDataProvider(self.invoiceTemp,{keyAttributes: '@product_id'});
            self.quantityVal = ko.observable(1);
            self.totalInvoice = ko.observable(0);
            //self.totalPrice =0;

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
            
            self.showCategoryProducts=(event)=>{
                //alert("TEST ON Action");
               // console.log(event.currentTarget.id);
                MsgBroker.publish('Category-Changed',event.currentTarget.id);
                
                
            };

            MsgBroker.subscribe('Category-Changed',data => {
                    //console.log("Products filter by category : " + data);
                    self.selectedProducts(self.allProducts().filter(row => row.category_id == data));
                    self.selectedProducts.valueHasMutated();
                    
                    // if(data != "lessons"){
                    //     self.selectedLessons(self.allData().filter(row => row.courseid == data));
                        
                    // }else {
                    //   self.selectedLessons(self.allData());
                    // }
                    // self.selectedLessons.valueHasMutated();
                });//end MsgBroker
            
            self.productSelectionChanged = (event)=>{
                   // console.log(self.selectedProducts());
                    //console.log(event.currentTarget.id);
                    MsgBroker.publish('Product-for-invoice',event.currentTarget.id);
                    
                };
            MsgBroker.subscribe('Product-for-invoice',data => {
                    //console.log("Products filter by category : " + data);
                    self.selectedProductInvoice(self.allProducts().filter(row => row.product_id == data));
                    self.selectedProductInvoice.valueHasMutated();
                    //console.log("One Product Information : ",self.selectedProductInvoice());
                
                    //console.log("invoice data provider : ",self.InvoiceDataProvider);
                    //console.log("invoice data provider : ",self.InvoiceDataProvider.data()[0].product_id);                   
                    //console.log("inoice temp product : " , self.invoiceTempProduct());

                    self.invoiceTemp().push({"product_id":self.InvoiceDataProvider.data()[0].product_id,
                                                    "product_name" :self.InvoiceDataProvider.data()[0].product_name ,
                                                    "product_price" : self.InvoiceDataProvider.data()[0].product_price});
                    //console.log("Invoice Temporary : ",self.invoiceTemp());
                    self.invoiceTemp.valueHasMutated();
                    var totalPrice =0;
                    self.invoiceTemp().forEach(element => {
                        totalPrice += element.product_price;
                        
                        //console.log("element : ", element.product_price);
                        //console.log(totalPrice);
                    });
                    self.totalInvoice(totalPrice);
                    //console.log("inoice temp product : " , self.invoiceTemp());
                    //console.log(self.totalInvoice());

            }); //end MsgBroker
            

            self.deleteItem = (event)=> {
                // Remove Items from the Cart
                //console.log(event.target);
                //console.log("Current Target Id : ",event.currentTarget.id);
                
                console.log(self.invoiceTemp());
                event.target.parentElement.parentElement.remove();
                const index =self.invoiceTemp().findIndex(element => element.product_id == event.currentTarget.id);
                self.invoiceTemp().splice(index,1);
                self.invoiceTemp.valueHasMutated();
                console.log(self.invoiceTemp());
                
                //console.log(index);
                //self.updateTotal(event.currentTarget.id);
            };

            self.updateTotal =(id)=>{
                //console.log(self.invoiceTemp());
                console.log("From update Total function : ",id);
                console.log("before remove : ", self.invoiceTemp());
                
               
                //console.log(self.invoiceTemp().filter((row)=> row.product_id == id));
                //self.invoiceTemp = self.invoiceTemp().filter(row => row.product_id == id);
                //self.invoiceTemp();
                // total_array =[];
                // total_array=self.invoiceTemp().filter((row)=> row.product_id == id)
                // console.log("After Remove : ",self.invoiceTemp()[0]);
                // console.log(total_array);
               // self.invoiceTemp.valueHasMutated();
                //console.log("After Filter : " ,self.invoiceTemp());
                var totalPrice=0;
                self.invoiceTemp().filter((row)=> row.product_id == id).forEach(element => {
                    totalPrice += element.product_price;
                    
                    //console.log("element : ", element.product_price);
                    //console.log(totalPrice);
                });
                self.totalInvoice(self.totalInvoice()-totalPrice);
            };
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html