var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productImg =document.getElementById("productImg")
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productRow=document.getElementById("productRow");
var searchProduct= document.getElementById("searchProduct");
// json.parse ===>to convert productList string to array of object  
var productList;

if(JSON.parse(localStorage.getItem('productList'))==null){
    productList=[];
}
else{
    productList=JSON.parse(localStorage.getItem('productList'));
    displayProducts(productList); 
}

addBtn.onclick =  function(){
    addProduct();
    clearForm();
    displayProducts(productList);
}
function addProduct(){
   
        var productObj ={
            pName: productName.value,
            pPrice: productPrice.value,
            pCat: productCategory.value,
            pDesc: productDesc.value,
            pImg:`./assets/imgs/${productImg.files[0].name}`
        }
        // console.log(productObj);
        productList.push(productObj);
        //array of objects====>json ===>java script object notaion 
        //json.stringify====>convert array of object to string
        localStorage.setItem('productList',JSON.stringify(productList));
        // console.log(productList);
    
    
}
function clearForm(){
        productName.value=null;
        productPrice.value=null;
        productCategory.value=null;
        productDesc.value=null;
        productImg.value=null;
        productName.classList.remove("is-valid");
        productPrice.classList.remove("is-valid");
        productDesc.classList.remove("is-valid");
        productCategory.classList.remove("is-valid");
        productImg.classList.remove("is-valid");
    
}
function displayProducts(productList){
    var box= '';
    for(var i=0;i<productList.length;i++){
         box+=`<div class="col-md-3 shadow">
          <div class="product position-relative">
            <span class="position-absolute end-0 top-0 bg-info badge">${i + 1}</span>
            <img
              src="${productList[i].pImg}"
              class="img-fluid my-2"
              alt=""
            />
            <h2 class="h3">${productList[i].pName}</h2>
            <p class="my-2 lead">${productList[i].pDesc}</p>
            <div class="d-flex justify-content-between">
              <h3 class="h4">${productList[i].pCat}</h3>
              <h4 class="h5">${productList[i].pPrice}$</h4>
            </div>
            <div class="d-flex justify-content-end flex-wrap mb-2">
          <button class="btn btn-outline-warning form-control w-100 me-1 mb-3" onclick="editForUpdate(${i})">Update <i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-outline-danger form-control w-100 me-1" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash"></i></button>
        </div>
          </div>
        </div>`;
    }
    productRow.innerHTML=box;  
}

//local storage :store data if i close my project and come back and open it the data is still here (reload &close proje)======>not secure it's only store for me


function deleteProduct(index){
    //splice delete an element with know index
    productList.splice(index,1);
    //i want to dispay my items after i delete an item
    displayProducts(productList);
    //when i reload the page it still have the same data in spite of delete items and it still appear
    //to solve that i will make a new storage to override the old stroage to 
    //===>to store items after deletion
    localStorage.setItem('productList',JSON.stringify(productList))
}

var globalIndex;
 // i want when i click on update btn in div the data will go in the inputs to modify on it
//how to do this?????????(هرفع الداتا بتاعتي فوق)
function editForUpdate(index){
    globalIndex=index;
    //if i want to select button and disappear other one
    //classlist ==>anything is related to my object i can select it by classlist it contains some method i will choose to change in the element
    updateBtn.classList.remove('d-none');//show btn update
    addBtn.classList.add('d-none');//delete btn add

    //make every input.value==list[i].pobject in the array
    productName.value=productList[index].pName;
    productPrice.value=productList[index].pPrice;
    productCategory.value=productList[index].pCat;
    productDesc.value=productList[index].pDesc;
    productImg.value=productList[index].pImg;
    // `./assets/imgs/${productImg.files[0].name}`=productList[index].pImg;

}

//set the modified values to the same object that i want to modify
updateBtn.onclick = function(){
    updateBtn.classList.add('d-none');//show btn update
    addBtn.classList.remove('d-none');//delete btn add
    productList[globalIndex].pName=productName.value;
    productList[globalIndex].pPrice=productPrice.value;
    productList[globalIndex].pCat= productCategory.value;
    productList[globalIndex].pDesc=productDesc.value;
    productList[globalIndex].pImg=`./assets/imgs/${productImg.files[0].name}`;
    clearForm(); 
    localStorage.setItem('productList',JSON.stringify(productList));
    displayProducts(productList);
}

searchProduct.oninput = function(){
    searchedProduct();
}
function searchedProduct(){
    var term = searchProduct.value;
    var searchedArr=[];
    for(var i=0;i<productList.length;i++){
        if(productList[i].pName.includes(term.toLowerCase()))
            searchedArr.push(productList[i]);
    }
    displayProducts(searchedArr);
    
}

/************string methods*************** */
// var txt='my name is eman shehata';
// console.log(txt.charAt(0));
// console.log(txt.at(9));
// console.log(txt[10]);
// console.log(txt.slice(3,6));
// console.log(txt.substring(3,6));
// console.log(txt.toLowerCase());
// console.log(txt.toUpperCase());
// console.log(txt.toLocaleLowerCase('en'));
// console.log(txt.concat(' and my jop is nothing'));
// console.log(txt+(' and my jop is nothing'));
// console.log(txt.split());
// console.log(txt.split(" "));
// console.log(txt.split(""));
// console.log(txt.split("eman"));
// console.log(txt.split(" ").join());
// console.log(txt.split(" ").join(" "));
// console.log(txt.includes("eman"));
// console.log(txt.replace('eman','emo'));
// console.log(txt.padEnd(40,'emo'));


/******regular expression***** */
// var x=//;
// var y=new RegExp("");


// var x=/ab/;//====>any string contain 'ab'
// var x=/[abc]/;//any string contain a or b or c or all or two of them
// var x=/[a-z0-9#]/;//ang string contain any char from a to z or from 0 to 9 or #
// var x=/web[a-z0-9#]web/;//web+ any char from []+web
// var x=/web[a-z]{3}web/;// you will write three charchter from a-z
// var x=/web[a-z]{3,5}web/;//the max is 5 and min is 3
// var x=/web[a-z]{0,1}web/;//put nothing or 1
// var x=/web[a-z]{0,}web/;//noting or infinite
// var x=/web(designer|devloper)web/;//write designer or devloper
// var x=/web(designer|devloper){2}web/;//write designer or devloper twice or dsigner and devloper
// var x= /web[^abc]web/;//anything rather than a or b or c (complement if it's in the square practis)

// var x=/01[0152][0-9]{8}/;//pattern for any egypt's number
// this examble is true but if the user enter ===>
// ===> 'emandnsfjks01020768625jdskjfdjk' it will match!!!!!!
// how to solve this??????????????????
// var x=/^01[0152][0-9]{8}$/;// ^ start with   $ end with

//[0-9]== \d
//[0-9a-zA-Z_]==\w
// . ==> anything
// pattern for ipv4 ===>^((1?[0-9]{1,2}|(2)[0-5]{2})\.){3}(1?[0-9]{1,2}|(1,2)[0-5]{2})$
/////******* made by me********* */




function validateInputs(element){
    // console.log(element.value,element.id);
    
    var regex={
        productName:/^[A-Z][a-z]{3,7}$/,
        productPrice:/^[1-9][0-9]{1,4}\.[0-9]{1,2}$/,
        productDesc:/^.{6,}$/,
        productCategory:/^(mobile|ipad|labtop)$/
    }
    if(regex[element.id].test(element.value))
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace('d-block','d-none');
        return true;
    }
    else 
    {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace('d-none','d-block');
        return false;
    }
    
        
}
