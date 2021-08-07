define(['utils/messageBroker','ojs/ojcore','knockout','jquery','ojs/ojarraydataprovider',
        'models/category.model','models/products.model','ojs/ojbindingprovider','ojs/ojlistview',
        'ojs/ojlistitemlayout','ojs/ojactioncard','ojs/ojbutton','ojs/ojinputtext','ojs/ojinputnumber','ojs/ojlabel','ojs/ojtable'], 
    function(MsgBroker,oj,ko,$,ArrayDataProvider,categoryModel,productsModel) {
        function PosViewModel(){
            self = this;
            self.testData = ko.observableArray(["Ehab Test",'test2','test3','test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray([]);
            //--------------------------------------------------------------------
            /// for Category 
            self.allData = ko.observableArray([]);
            self.selectedData = ko.observableArray([]);
            self.CategoryDataProvider = new ArrayDataProvider(self.selectedData,{keyAttributes: '@rid'});
            //--------------------------------------------------------------------
            /// for Products
            self.allProducts = ko.observableArray([]);
            self.selectedProducts = ko.observableArray([]);
            self.ProductsDataProvider = new ArrayDataProvider(self.selectedProducts,{keyAttributes: '@rid'});
            //--------------------------------------------------------------------
            /// For Invoice
            self.selectedProductInvoice = ko.observableArray([]);
            self.InvoiceDataProvider = new ArrayDataProvider(self.selectedProductInvoice,{keyAttributes: '@rid'});
            
            self.invoiceTemp=ko.observableArray([]);
            self.invoiceTempProduct = new ArrayDataProvider(self.invoiceTemp,{keyAttributes: '@product_id'});
            self.quantityVal = ko.observable(1);
            self.totalInvoice = ko.observable(0);
            //self.totalPrice =0;

            //=================================================================

            categoryModel.getCategoryList((success,data)=>{
                
                if(success)
                    self.allData(data);
                    self.selectedData(self.allData());
                    self.selectedData.valueHasMutated();
                
            });
            //=================================================================

            productsModel.getProductsList((success,data)=>{
                //console.log("Products : ",data);
                if(success)
                    self.allProducts(data);
                    self.selectedProducts(self.allProducts());
                    self.selectedProducts.valueHasMutated();
                //console.log("all Products : ", self.allProducts());
            });

            //=================================================================
            
            self.showCategoryProducts=(event)=>{
            
                MsgBroker.publish('Category-Changed',event.currentTarget.id);
                
                
            };
            //=================================================================
        
            MsgBroker.subscribe('Category-Changed',data => {
                    //console.log("Products filter by category : " + data);
                    self.selectedProducts(self.allProducts().filter(row => row.category_id == data));
                    self.selectedProducts.valueHasMutated();
                    
                
                });//end MsgBroker
            //=================================================================

            self.productSelectionChanged = (event)=>{
                   // console.log(self.selectedProducts());
                    //console.log(event.currentTarget.id);
                    MsgBroker.publish('Product-for-invoice',event.currentTarget.id);
                    
                };
            //=================================================================

            MsgBroker.subscribe('Product-for-invoice',data => {
                    //console.log("Products filter by category : " + data);
                    self.selectedProductInvoice(self.allProducts().filter(row => row.product_id == data));
                    self.selectedProductInvoice.valueHasMutated();
                    //console.log(self.selectedProductInvoice());

                    self.invoiceTemp().push({"product_id":self.InvoiceDataProvider.data()[0].product_id,
                                                    "product_name" :self.InvoiceDataProvider.data()[0].product_name ,
                                                    "product_price" : self.InvoiceDataProvider.data()[0].product_price});
                                                
                    //console.log("Invoice Temporary : ",self.invoiceTemp());
                    
                   // self.invoiceTemp.valueHasMutated();
                    //console.log("Invoice Temporary : ",self.invoiceTemp());
                    var totalPrice =0;
                    var sum =0;
                    self.invoiceTemp().forEach(element => {
                        if(element.product_id == element.product_id){
                            sum += sum;
                        }
                        console.log("sum : " + sum);
                        totalPrice += element.product_price;
                    });
                    self.totalInvoice(totalPrice); 

            }); //end MsgBroker
        //=================================================================

            self.deleteItem = (event)=> {

                event.target.parentElement.parentElement.remove();
                const index =self.invoiceTemp().findIndex(element => element.product_id == event.currentTarget.id);
                self.invoiceTemp().splice(index,1);
                self.invoiceTemp.valueHasMutated();
                //console.log(self.invoiceTemp());
                
            };
        //=================================================================

            self.updateTotal =(id)=>{
                //console.log(self.invoiceTemp());
                console.log("From update Total function : ",id);
                console.log("before remove : ", self.invoiceTemp());
                
            
                var totalPrice=0;
                self.invoiceTemp().filter((row)=> row.product_id == id).forEach(element => {
                    totalPrice += element.product_price;  
                
                });
                self.totalInvoice(self.totalInvoice()-totalPrice);
            };
        //=================================================================
        }
        return PosViewModel;
    
});

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html