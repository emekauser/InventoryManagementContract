
 if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
 } else {
   web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}
var productlist=[];//store list pf products
var inventorylist=[];//store list of inventories
var orderlist=[];//store list of orders
var abi= [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			},
			{
				"name": "_productname",
				"type": "string"
			},
			{
				"name": "_Jsonproduct",
				"type": "string"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			},
			{
				"name": "_Jsoninventory",
				"type": "string"
			}
		],
		"name": "updateInventory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"name": "_Jsonproduct",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "start",
				"type": "uint256"
			},
			{
				"name": "range",
				"type": "uint256"
			}
		],
		"name": "getInventories",
		"outputs": [
			{
				"name": "data",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sku",
				"type": "string"
			}
		],
		"name": "getInventory",
		"outputs": [
			{
				"name": "_Jsoninventory",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "start",
				"type": "uint256"
			},
			{
				"name": "range",
				"type": "uint256"
			}
		],
		"name": "getProducts",
		"outputs": [
			{
				"name": "data",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			}
		],
		"name": "removeProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			}
		],
		"name": "removeInventory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			},
			{
				"name": "_productname",
				"type": "string"
			},
			{
				"name": "_Jsonproduct",
				"type": "string"
			}
		],
		"name": "updateProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sku",
				"type": "string"
			},
			{
				"name": "_Jsoninventory",
				"type": "string"
			}
		],
		"name": "addInventory",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
 web3.eth.defaultAccount = web3.eth.accounts[0];
 const invertory_managementcontract = web3.eth.contract(abi);
var InventoryManagement= invertory_managementcontract.at('0xec550235b8564341e628aceb64d95855548cd4ce');
 //var res=InventoryManagement.getInventory("jj");
 //alert(web3.toAscii(res));
// alert(web3.fromAscii("is a multi-factor authentication (MFA) protocol developed by Hydrogen. As part of the protocol, the Hydro mobile app generates HydroIDs for users to connect them to the forthcoming ecosystem of Hydro smart contracts. This bounty is intended to foster broader adoption of Client Raindrop and the Hydro mobile app by offering website administrators tools to easily integrate Hydro MFA into their sites. Specifically, this task is to create a Weebly app that integrates with the Hydro API to offer a seamless implementation of the MFA workflow. This will work with general Weebly CMS sites, and Square E-Commerce sites that are integrated into Weebly CMS since their acquisition."))
 function update(){
 	   Course.setInstructor('Stephen Hawking', 76);
 }
 function get(){
  Course.getInstructor(function(error, result){
  if(!error){
   // $('#instructor').html(result[0]);
    alert(web3.toAscii(web3.toHex(result)));
    }else{
      console.error(error);
   }
 });
}

 $('#createp').css("display","block");
 $('#createo').css("display","none");
 $('#view').css("display","none");

 function openCreateproductwindow(){
 	 $('#createp').css("display","block");
 $('#createo').css("display","none");
 $('#view').css("display","none");
 }
 function openCreateorderwindow(){
 	 $('#createp').css("display","block");
 $('#createo').css("display","none");
 $('#view').css("display","none");
 }
function openViewproductwindow(){
 	 $('#createp').css("display","none");
     $('#createo').css("display","none");
     $('#view').css("display","block");
     $('#viewtitle').text("Product List");
     $('#viewbody').empty();
      var result=InventoryManagement.getProducts(0,10);
       var  maindata = [["#", "SKU", "Product Name", "Price","Size","Color"]];
       var products=result.split("%");
       for(let i=0;i<products.length;i++){
       	  if(products[i]!==""){
          var product=JSON.parse(products[i]);
       	   maindata.push([i,product.sku,product.productname,product.price,product.size,product.color]);
       	   productlist.push(product);
       	}
       }
      makeTable($('#viewbody'), maindata);
      console.log(result);
   
 }
 function openViewInventorywindow(){
 	 $('#createp').css("display","none");
     $('#createo').css("display","none");
     $('#view').css("display","block");
     $('#viewtitle').text("Inventory List");
     $('#viewbody').empty();
      var result=InventoryManagement.getInventories(0,10);
       var  maindata = [["#", "SKU", "Product Name", "Price","Quantity","Reorder Point","Action"]];
       var inventories=result.split("%");
       for(let i=0;i<inventories.length;i++){
       	  if(inventories[i]!==""){
          var inventory=JSON.parse(inventories[i]);
         
          var button='<button  class="btn btn-danger btn-fill" onclick=createOrder("'+inventory.sku+'") >create Order</button> ';
       	  maindata.push([i,inventory.sku,inventory.productname,inventory.price,inventory.quantity,inventory.reorderpoint,button]);
          inventorylist.push(inventory);
       	}
       }
      var table2= makeTable($('#viewbody'), maindata);
 }
 function openViewOrderwindow(){
 	 $('#createp').css("display","none");
     $('#createo').css("display","none");
     $('#view').css("display","block");
     $('#viewtitle').text("Order List");
     $('#viewbody').empty();
 }
 function openViewTranshistorywindow(){
 	 $('#createp').css("display","none");
     $('#createo').css("display","none");
     $('#view').css("display","block");
     $('#viewtitle').text("Transaction History");
     $('#viewbody').empty();
 }
 function createOrder(sku){
 	 $('#createp').css("display","none");
     $('#createo').css("display","block");
     $('#view').css("display","none");
     for(let i=0;i<inventorylist.length;i++){
       	  if(inventorylist[i].sku===sku){
          var inventory=inventorylist[i];
             $('#oproductname').text(inventory.productname);
             $('#osku').text(sku);
             $('#oprice').text(inventory.price);
              $('#totalquantity').text("Available Quantity is "+inventory.quantity);
            break;
       	}
       }

 }
   $("#add").click(function(){//This event is trigger when sender is trying to transfer fund
         var allow=false;
          var productname=$("#productname").val();
          var sku=$("#sku").val();
          var stockquantity=$("#stockquantity").val();
          var reorderpoint=$("#reorderpoint").val();
          var color=$("#color").val();
          var size=$("#size").val();
          var price=$("#price").val();
          var error="productname is required";
          if(productname!==""){
              error="sku is required";
             if(sku!==""){
              error="Stock quantity is required";
              if(stockquantity!==""){
                error="reorder point is required";
               if(reorderpoint!==""){
                 error="Product Color is required";
                if(color!==""){
                    error="size is Required";
                   if(size!==""){
                   	 error="price is Required";
                   if(price!==""){
                       allow=true;
                   }
                       
                   }
                }
              }
             }
             }
          }
          if(allow){
            var inventory={sku: sku,productname: productname,quantity: stockquantity, reorderpoint: reorderpoint, price:price};
            var product={sku: sku,productname: productname, size:size,color: color, price:price};
           // InventoryManagement.add(JSON.stringify(inventory));
            InventoryManagement.addInventory(sku,JSON.stringify(inventory), {gas: 5000000});
            InventoryManagement.addProduct(sku,productname,JSON.stringify(product), {gas: 5000000});
           
          }else{
              alert(error);
          }
     });  

   //this area allows the make and manipulate table
function makeTable(container, data) {//container is the place where the table will be
    var table = $("<table style='color:black' />").addClass('table table-bordered');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").html(c));
        });
        table.append(row);
    });
   
  // container.append(total);
    return container.append(table);
}

function appendTableColumn(table, rowData) {
    var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));
    $.each(rowData, function(colIndex, c) {
        lastRow.append($('<td/>').html(c));
    });
   
    return lastRow;
}

function getTableData(table) {
    var data = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('th,td').each(function (colIndex, c) {
            cols.push(c.textContent);
        });
        data.push(cols);
    });
    return data;
}