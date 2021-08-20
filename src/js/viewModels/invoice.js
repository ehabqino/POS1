
define(['utils/messageBroker', 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'models/products.model',
    'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojknockout', "ojs/ojformlayout", 'ojs/ojtable'],
    function (MsgBroker, oj, ko, $, ArrayDataProvider, productsModel) {
        function InvoiceViewModel() {

            var self = this;
            self.invoiceArray = ko.observableArray([]);
            self.invoiceProduct = ko.observableArray([]);
            self.buttonLabel = ko.observable("test");

            //=================================================================
            productsModel.getProductsList((success, data) => {
                //console.log("Products : ",data);
                if (success)
                    self.invoiceProduct(data);
                console.log("Data for invoice from products : ", self.invoiceProduct());

            });//end productsModel.getProductsList
            //=================================================================

            MsgBroker.subscribe('Product-for-invoice', data => {
                console.log("Data From POS : ", data);
                self.invoiceArray(self.invoiceProduct().filter(element => element.product_id == data));
                self.invoiceArray.valueHasMutated();
                console.log("Invoice Array : ", self.invoiceArray());

            }); //end MsgBroker.subscribe
            //=================================================================

        }// end InvoiceViewModel


        return InvoiceViewModel;
    }
);




// Resourses
//oj-input-number : https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=inputNumber&demo=inputNumberConverter