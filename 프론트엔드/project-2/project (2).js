//======================================
// global variable zone
let draggingMenu = null;    // 현재 드래깅 시작한 객체를 저장하기 위한 변수
let dragOverBox = null;     // 드래깅 중인 객체가 올라간 객체
let price = null;
let payment_button = null;
let admin_button = null;
let body = null;
//======================================
// Menu event handler zone
//======================================
function onDragStartMenu(event) { // 드래그 시작 이벤트 핸들러 함수
    //공부해보기
    draggingMenu = this;    // 자신이 드래깅 객체임을 공지

    this.classList.add("draggingMenu"); // 드래그 중인 객체에 'draggingMenu' 클래스 추가
    let menuName = this.getAttribute("menuname"); // 'menuname' 속성값을 가져옴
    console.log(`Started ${menuName} of ${this.parentNode.id} Dragging`); // 'p' 요소에 드래그 시작 메시지 추가
}

function onDragEndMenu(event) { // 드래그 종료 이벤트 핸들러 함수
    
    draggingMenu = null; // 드래그 중인 객체 초기화
    this.classList.remove("draggingMenu"); // 드래그 중인 객체에서 'draggingMenu' 클래스 제거
    let menuName = this.getAttribute("menuname"); // 'menuname' 속성값을 가져옴
    console.log(`Ended ${menuName} Dragging`); // 드래그 종료 메시지 콘솔에 출력

    // 드래깅 중인 객체가 다른 객체 위에 있는 상태에서 종료되었으면, 다른 객체의 'overBox' 클래스 해제
    if (dragOverBox != null) {
        dragOverBox.classList.remove("overBox");
    }
    
    
}

//======================================
// Box event handler zone
//======================================
function onDragOverBox(event) {
    event.preventDefault(); // 시스템에서 사전에 설정해 놓은 처리 기능을 해제
    dragOverBox = this;
    this.classList.add("overBox");
}

function onDragLeaveBox(event) {
    dragOverBox = null;
    this.classList.remove("overBox");
}

function onDropBox(event) {
    event.preventDefault();
    this.appendChild(draggingMenu);
    if(this.id=="boxCart"){
        price.textContent = parseInt(price.textContent) + parseInt(draggingMenu.children[2].textContent)* parseInt(draggingMenu.children[1].children[1].textContent);
    }
    if(this.id=="boxMenu"){
        price.textContent = parseInt(price.textContent) - (parseInt(draggingMenu.children[2].textContent)* parseInt(draggingMenu.children[1].children[1].textContent));
    }
}

function on_click_plus_button () {
    this.parentNode.children[1].textContent = parseInt(this.parentNode.children[1].textContent) + 1;
    price.textContent = parseInt(price.textContent) + parseInt(this.parentNode.parentNode.children[2].textContent);

}

function on_click_minus_button() {
    this.parentNode.children[1].textContent = parseInt(this.parentNode.children[1].textContent) - 1;
    price.textContent = parseInt(price.textContent) - parseInt(this.parentNode.parentNode.children[2].textContent);   
}

//========================
//결제 버튼 만들기

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth()+1;
const day = today.getDate();

// 모든 화면 초기화 하기

function init_all () {
    const prices = document.querySelectorAll(".counter");
    price.textContent = 0;
    for(i of prices){
        i.textContent = 0;
    }
    draggingMenu = null;   
    dragOverBox = null;     
    price = null;
    payment_button = null;
    admin_button = null;
    body = null;
}

function on_click_payment_button () {
    if(confirm("결제하시겠습니까?")){
        localStorage.setItem("사용자 ID", price.textContent + "원이 결제되었습니다. " + "일시 :" + year + "년 " + month + "월 " + day + "일");
    }
    init_all();
}   

// 관리자 버튼 로직 짜기
function on_click_admin_button () {
    let exit_button = document.createElement("button");
    exit_button.textContent = "X";

    let admin_display = document.createElement("div");
    let local_storage_in_admin = document.createElement("ol");

    exit_button.addEventListener("click",()=>{
        admin_display.remove();
    })
    console.log("관리자 버튼 눌림");
    for (let i =0; i <localStorage.length; i++){
        let li = document.createElement("li");
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        console.log(value);
        li.textContent = value;
        local_storage_in_admin.append(li);
    }
    admin_display.classList.toggle("admin_display");
    admin_display.style.display = "block";
    admin_display.style.backgroundColor = "white";
    admin_display.style.inset = '200px';
    admin_display.append(exit_button);
    admin_display.append(local_storage_in_admin);
    body.append(admin_display);
}

//======================================
$(document).ready(function() { // 문서가 준비되었을 때 실행되는 함수
    // Menu handler
    let menuArray = document.getElementsByClassName("menu"); // 'menu' 클래스를 가진 모든 요소를 가져옴
    price = document.querySelector(".price_receipt");
    payment_button = document.querySelector(".payment_button");
    body = document.querySelector("body");
    admin_button = document.querySelector(".admin_button");
    for (let menu of menuArray) { // 각 'menu' 요소에 대해 반복
        menu.addEventListener("dragstart", onDragStartMenu); // 'dragstart' 이벤트 핸들러를 각 'menu' 요소에 추가
        menu.addEventListener("dragend", onDragEndMenu); // 'dragend' 이벤트 핸들러를 각 'menu' 요소에 추가
    }
    // Box handler
    let boxArray = document.getElementsByClassName("box"); // 'box' 클래스를 가진 모든 요소를 가져옴
    for (let box of boxArray) { // 각 'box' 요소에 대해 반복
        box.addEventListener("dragover", onDragOverBox); // 'dragover' 이벤트 핸들러를 각 'box' 요소에 추가
        box.addEventListener("dragleave", onDragLeaveBox); // 'dragleave' 이벤트 핸들러를 각 'box' 요소에 추가
        box.addEventListener("drop", onDropBox); // 'drop' 이벤트 핸들러를 각 'box' 요소에 추가
    }

    let button_plus_array = document.querySelectorAll(".plus_button");
    let button_minus_array = document.querySelectorAll(".minus_button");



    for (let plus_button of button_plus_array){
        plus_button.addEventListener("click",on_click_plus_button);
    }

    for (let minus_button of button_minus_array){
        minus_button.addEventListener("click",on_click_minus_button);
    }

    payment_button.addEventListener("click",on_click_payment_button);
    admin_button.addEventListener("click",on_click_admin_button);
});
