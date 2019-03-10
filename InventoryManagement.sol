pragma solidity >=0.4.22 <0.6.0;

/*
Author : Nwobodo Emeka
Inventory Management is the supervsion of Inventory and stocks.
Inventory or stock is the goods or materials that a business holds for
the ultimate goal of resale.

This  smart contract performs InventoryManagement, and order Management
Note: some calculations should be done on client side in order to reduce
gas price ( eg. calculations that get to do with increasing or decreasing 
of stockquantity, reorderpoint e.t.c)
*/
contract InventoryManagement{
     //this contains data in the Inventory
     //data are sku and jsonstring of inventory{price:20,sku:'VL-RD-15'....}
     struct Inventory{
        string sku;
        string Jsoninventory;
    }
    //this is used to store individaul product
    //data are sku. productname and jsonstring of product {sku:"GUCCI-CL-RD-34",productname:"Gucci leather red cloth"....}
     struct Product{
        string sku;
        string productname;
        string Jsonproduct;
     }
     
    //this is use to store individaulorders either supply/restock order or sells order
    //data are orderid,sku,and jsonstring of order {price:20,quantity:50,ordertype:"sell",status:"filled"...}
     struct Order{
        uint orderid;
        string sku;
        string Jsonorder;
        string orderstatus;
    }
    
    //contains list of product created by the user
    Product [] products;
    //contains list of Inventories created by the user
    Inventory [] Inventories;
    //contains list of orers 
    Order [] orders;
    //this contains list of furfilled orders
    Order [] transactionhistory;
    address owner;
    constructor() public {
        owner=msg.sender;
    }
   //this add inventory to the smart contract
    function addInventory( string memory _sku,string memory _Jsoninventory) public{
        Inventories.length++;
        Inventories[Inventories.length-1].sku = _sku;
        Inventories[Inventories.length-1].Jsoninventory = _Jsoninventory;
       
    }
    //add product to the smartcontract
    function addProduct( string memory _sku,string memory _productname, string memory _Jsonproduct) public{
        products.length++;
        products[products.length-1].sku = _sku;
        products[products.length-1].productname=_productname;
        products[products.length-1].Jsonproduct = _Jsonproduct;
       
       
    } 
    //update existing inventory
    function updateInventory( string memory _sku,string memory _Jsoninventory) public {
         for(uint i=0;i<Inventories.length;i++){
             if(equals(Inventories[i].sku,_sku)){
                 Inventories[i].sku = _sku;
                 Inventories[i].Jsoninventory = _Jsoninventory;
                 break;
             }
         }
        
    }
    //update existing product
    function updateProduct( string memory _sku,string memory _productname, string memory _Jsonproduct) public{
         for(uint i=0;i<products.length;i++){
             if(equals(products[i].sku,_sku)){
                 products[i].sku = _sku;
                 products[i].productname=_productname;
                 products[i].Jsonproduct = _Jsonproduct;
                 break;
             }
         }
        
    } 
    //remove existing Inventories
     function removeInventory( string memory _sku) public {
         uint pos;
         for(uint i=0;i<Inventories.length;i++){
             if(equals(Inventories[i].sku,_sku)){
                 pos=i;
                 break;
             }
         }
          delete Inventories[pos];
    }
    //removeeove existing product
    function removeProduct( string memory _sku) public{
        uint pos;
         for(uint i=0;i<products.length;i++){
             if(equals(products[i].sku,_sku)){
                pos=i;
                break;
             }
         }
          delete products[pos];
          
    } 
    //get inventory by sku
     function getInventory( string memory sku)public  returns (string memory _Jsoninventory){
         for(uint i=0;i<Inventories.length;i++){
             if(equals(Inventories[i].sku,sku)){
              _Jsoninventory= Inventories[i].Jsoninventory;
                break;
            }
        }
        
       
        return _Jsoninventory;
    }
    //get product by sku
    function getProduct( string memory _sku) public  returns (string memory _Jsonproduct){
         for(uint i=0;i<products.length;i++){
             if(equals(products[i].sku,_sku)){
                _Jsonproduct= products[i].Jsonproduct;
                break;
             }
         }
        return _Jsonproduct;
    }  
    //get list of Inventories
     function getInventories(uint start, uint range)public view returns (string  memory data ){
         uint limit=start+range;
         string memory r;
         for(uint i=0;i<Inventories.length;i++){
             if(i>=start){
                r=data;
                data= string(abi.encodePacked(r,Inventories[i].Jsoninventory,"%"));
             }
             if(limit==i){
                 break;
             }
         }
         return data;
        
    }
    //get list of products
    function getProducts(uint start, uint range) public view returns (string  memory data){
         uint limit=start+range;
          string memory r;
         for(uint i=0;i<products.length;i++){
            
                 if(i>=start){
                     r=data;
                    data= string(abi.encodePacked(r,products[i].Jsonproduct,"%"));
                  }
                 if(limit==i){
                    break;
                  }
           }
        return data;
        
     }  
    //compare two string data
    function equals(string memory a, string memory b) private  returns (bool){
        return keccak256(abi.encodePacked(a))== keccak256(abi.encodePacked(b));
    }
    
   function createOrder(string  memory _sku,uint _orderid, string memory _Jsonorder,string memory _Jsoninventory) public{
        orders.length++;
        orders[orders.length-1].sku = _sku;
        orders[orders.length-1].orderid=_orderid;
        orders[orders.length-1].Jsonorder = _Jsonorder;
        orders[orders.length-1].orderstatus = "undelivered";
        //reduce quantity from inventory
        updateInventory(_sku,_Jsoninventory);
   }
   //this is used to cancel order an restock on sold qunatities
   function cancelOrder(uint _orderid,string memory _sku,string memory _Jsoninventory) public{
       uint pos=0;
       for(uint i=0;i<orders.length;i++){
             if(orders[i].orderid==_orderid){
                 pos=i;
                 break;
             }
         }
         delete orders[pos];
         //restock unsold quantity
         updateInventory(_sku,_Jsoninventory);
   }
   //tell the contract that an order has been delivered
   function deliveredOrder(string memory _sku, string memory _Jsonorder,uint _orderid) public{
        for(uint i=0;i<orders.length;i++){
             if(orders[i].orderid==_orderid){
                  orders[i].sku = _sku;
                  orders[i].orderid=_orderid;
                  orders[i].Jsonorder = _Jsonorder;
                  orders[i].orderstatus = "delivered";
                 break;
             }
         }
         //create history for the dlivered order
         transactionhistory.length++;
         transactionhistory[transactionhistory.length-1].sku = _sku;
         transactionhistory[transactionhistory.length-1].orderid=_orderid;
         transactionhistory[transactionhistory.length-1].Jsonorder = _Jsonorder;
         transactionhistory[transactionhistory.length-1].orderstatus = "delivered";
         
   }
   //get transaction history
    function getTransactionHistory(uint start, uint range) public view returns (string  memory data){
         uint limit=start+range;
         string memory r;
         for(uint i=0;i<transactionhistory.length;i++){
            
                 if(i>=start){
                     r=data;
                     data= string(abi.encodePacked(r,transactionhistory[i].Jsonorder,"%"));
                  }
                 if(limit==i){
                    break;
                  }
           }
        return data;
        
     }  
     //get list of orders
      function getOrders(uint start, uint range) public view returns (string  memory data){
         uint limit=start+range;
         string memory r;
         for(uint i=0;i<orders.length;i++){
            
                 if(i>=start){
                     r=data;
                     data= string(abi.encodePacked(r,orders[i].Jsonorder,"%"));
                  }
                 if(limit==i){
                    break;
                  }
           }
        return data;
        
     }  
   
}