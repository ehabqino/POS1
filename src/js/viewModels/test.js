define(['ojs/ojcore','knockout','jquery'], 
    function(oj,ko,$) {
        function TestviewModel(){

        click1=function(){
            $("button").hide();
            console.log("Click1 Hide Input element");
        }
        click2 = function(){
            $("#mybtn").hide();
        }
    
        
    }//end TestviewModel
    return TestviewModel;
    
});