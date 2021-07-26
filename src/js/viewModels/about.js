/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['utils/messageBroker','accUtils'],
 function(MsgBroker,accUtils) {
    function AboutViewModel() {
      
      /// Ehab Test Publish Subscribe pattern
      MsgBroker.subscribe('Group1', data =>{
        console.log("In About Page : " + data);
      });
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */

      //// Test on array from Ehab 
      const inputarray =[1,5,{a:6,b:8,c:9},2,3,2,5,1];
      const elemettoreplace = {a:6,b:8,c:9} ;
      //console.log(elemettoreplace.b);
      const index = inputarray.findIndex(el => el.b == elemettoreplace.b);
      console.log(inputarray[index].a,inputarray[index].b,inputarray[index].c);
      console.log(index);
      const resultarray = [...inputarray.slice(0,index), ...inputarray.slice(index+1)];
      console.log(resultarray);
      

      this.connected = () => {
        accUtils.announce('About page loaded.', 'assertive');
        document.title = "About";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return AboutViewModel;
  }
);
