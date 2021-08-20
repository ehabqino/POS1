define(['utils/messageBroker', 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider',
    'models/category.model', 'models/products.model', 'ojs/ojbindingprovider', 'ojs/ojlistview',
    'ojs/ojlistitemlayout', 'ojs/ojactioncard', 'ojs/ojbutton', 'ojs/ojinputtext',
    'ojs/ojinputnumber', 'ojs/ojlabel', 'ojs/ojtable', 'ojs/ojknockout', "ojs/ojmessages"],
    function (MsgBroker, oj, ko, $, ArrayDataProvider, categoryModel, productsModel) {
        function PosViewModel() {
            self = this;
            self.testData = ko.observableArray(["Ehab Test", 'test2', 'test3', 'test4']);
            self.testColor = ko.observable(" oj-bg-danger-30");
            self.dataProvider = ko.observableArray([]);
            //--------------------------------------------------------------------
            /// for Category 
            self.allData = ko.observableArray([]);
            self.selectedData = ko.observableArray([]);
            self.CategoryDataProvider = new ArrayDataProvider(self.selectedData, { keyAttributes: '@rid' });
            //--------------------------------------------------------------------
            /// for Products
            self.allProducts = ko.observableArray([]);
            self.selectedProducts = ko.observableArray([]);
            self.ProductsDataProvider = new ArrayDataProvider(self.selectedProducts, { keyAttributes: '@rid' });
            //--------------------------------------------------------------------
            /// For Invoice
            self.selectedProductInvoice = ko.observableArray([]);
            self.InvoiceDataProvider = new ArrayDataProvider(self.selectedProductInvoice, { keyAttributes: '@rid' });

            self.invoiceTemp = ko.observableArray([]);
            self.invoiceTempProduct = new ArrayDataProvider(self.invoiceTemp, { keyAttributes: '@product_id' });
            self.quantityVal = ko.observable(1);
            self.totalInvoice = ko.observable(0);
            //self.totalPrice =0;
            //-------------------------------------------------------------------

            ///For Message
            self.messagesDataprovider = ko.observableArray([]);
            //=================================================================

            categoryModel.getCategoryList((success, data) => {

                if (success)
                    self.allData(data);
                self.selectedData(self.allData());
                self.selectedData.valueHasMutated();

            });
            //=================================================================

            productsModel.getProductsList((success, data) => {
                //console.log("Products : ",data);
                if (success)
                    self.allProducts(data);
                self.selectedProducts(self.allProducts());
                self.selectedProducts.valueHasMutated();
                //console.log("all Products : ", self.allProducts());
            });

            //=================================================================

            self.showCategoryProducts = (event) => {

                MsgBroker.publish('Category-Changed', event.currentTarget.id);


            };
            //=================================================================

            MsgBroker.subscribe('Category-Changed', data => {
                //console.log("Products filter by category : " + data);
                self.selectedProducts(self.allProducts().filter(row => row.category_id == data));
                self.selectedProducts.valueHasMutated();


            });//end MsgBroker
            //=================================================================

            self.productSelectionChanged = (event) => {
                // console.log(self.selectedProducts());
                //console.log(event.currentTarget.id);
                MsgBroker.publish('Product-for-invoice', event.currentTarget.id);


            };
            //=================================================================

            MsgBroker.subscribe('Product-for-invoice', data => {
                //console.log("Products filter by product : " + data);
                self.selectedProductInvoice(self.allProducts().filter(row => row.product_id == data));
                self.selectedProductInvoice.valueHasMutated();
                //console.log(self.selectedProductInvoice());
                //console.log(self.InvoiceDataProvider.data());
                //self.invoiceTemp.push(self.InvoiceDataProvider.data());

                //console.log(self.invoiceTemp().length);
                for (i = 0; i < self.invoiceTemp().length; i++)
                    if (self.invoiceTemp()[i].product_id == self.InvoiceDataProvider.data()[0].product_id) {
                        //self.quantityVal(self.quantityVal() + 1);
                        //alert("product is added ");
                        self.messagesDataprovider.push({
                            severity: "info",
                            summary: "Info",
                            detail: "Items already exists",
                            autoTimeout: 2000,
                            //autoTimeout: UTIL.message_timeout,
                        });
                        return
                    }

                self.invoiceTemp().push({
                    "product_id": self.InvoiceDataProvider.data()[0].product_id,
                    "product_name": self.InvoiceDataProvider.data()[0].product_name,
                    "product_price": self.InvoiceDataProvider.data()[0].product_price
                });

                // console.log(self.quantityVal());
                //console.log("Invoice Temporary : ",self.invoiceTemp());

                self.invoiceTemp.valueHasMutated();
                //console.log("Invoice Temporary : ",self.invoiceTemp());
                var totalPrice = 0;
                var sum = 0;
                self.invoiceTemp().forEach(element => {
                    totalPrice += element.product_price;
                });

                self.totalInvoice(totalPrice);

            }); //end MsgBroker
            //=================================================================

            self.deleteItem = (event) => {
                //console.log(event.target.parentElement.parentElement);
                //$(event.target.parentElement.parentElement).remove();
                //event.target.parentElement.parentElement.remove();
                // console.log(event.currentTarget.id);
                $(this).remove();
                const index = self.invoiceTemp().findIndex(element =>
                    element.product_id == event.currentTarget.id);
                //console.log("index",index);
                // console.log(typeof self.invoiceTemp()[index].product_price);
                self.totalInvoice(self.totalInvoice() - self.invoiceTemp()[index].product_price);
                self.invoiceTemp().splice(index, 1);
                self.invoiceTemp.valueHasMutated();
                //console.log(self.invoiceTemp());
                //console.log(self.totalInvoice());

            };
            //=================================================================
            self.calculate = (event) => {
                // console.log(event);

                //console.log(document.getElementById());
                //console.log(self.quantityVal());

                return self.quantityVal();
            }
            //=================================================================
            self.updateTotal = (id) => {
                //console.log(self.invoiceTemp());
                console.log("From update Total function : ", id);
                console.log("before remove : ", self.invoiceTemp());


                var totalPrice = 0;
                self.invoiceTemp().filter((row) => row.product_id == id).forEach(element => {
                    totalPrice += element.product_price;

                });
                self.totalInvoice(self.totalInvoice() - totalPrice);
            };
            //=================================================================
            self.selectedChangedListener = (event) => {

                const row = event.detail.value.row;
                console.log("Row selected : ", row);
                console.log("row values : ", row.values());
                if (row.values().size > 0) {
                    row.values().forEach((key) => {
                        console.log("key : ", key);
                        //var selectedRow = self.invoiceTemp().find(element => element.product_id == key);

                        //console.log(selectedRow.user_display_name);
                        //console.log(selectedRow["@rid"].slice(1));

                    });
                }
            }//end selectedChangedListener
            //====================================================================================

        }
        return PosViewModel;

    });

// Resources :
// https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=binding&demo=foreach
//https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=panel&demo=paneloverview
//https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojBindForEach.html