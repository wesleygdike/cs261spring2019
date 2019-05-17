function Supplier() {
    var availability;
    var price;
    var orders;
}

function Station() {
    var id;
    var productionRate;
    var errorRate;
    var availableResources;
    var requiredResources;
    var valueAdded;
    var produce = function() {
        //consume requiredResources from availableResources
        //wait for productionRate
        //error rate/did it work
            //if it worked: produce output
    };
    var output = function() {
        //create new resource
        //set value
        //return new Resource();
    };
}
var ResourceType = Object.freeze({"Raw_Material":1,"Finished_Good":2});
function Resource() {
    var id;
    var amount;
    var type;
    var supplier; //where the goods came from
}

function Consumer() {
    var id;
    var consumptionAmount;
    var consumptionRate;
    var consume = function() {
        //reduce available resources by consumptionAmount every consumptionRate
    };              
}