function validate_email(){
    const email=document.getElementById('email').value.trim();
    const error_email=document.getElementById('error_email');
    var checkEmail=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    // var checkEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length==0){
        error_email.style.color='red';
        error_email.innerHTML="Vui lòng nhập trường này";
        return false;
    }else if(!email.match(checkEmail)){
        error_email.style.color='red';
        error_email.innerHTML="Vui lòng nhập đúng định dạng email"; 
        return false;
    }else{
        error_email.style.color='green';
        error_email.innerHTML=''; 
        return true;
    }
}

function validate_sodienthoai(){
    const sodienthoai=document.getElementById('sodienthoai').value.trim().trim();
    const error_sodienthoai=document.getElementById('error_sodienthoai');
    const checkphoneGlobal=/((09|03|07|08|05)+([0-9]{8})\b)/g;
    // /b 	Find a match at the beginning/end of a word, beginning like this: \bHI, end like this: HI\b
    // /g Find global
    // {8} is 8 character is digit in range(0,9)
    if(sodienthoai.length==0){
        error_sodienthoai.style.color='red';
        error_sodienthoai.innerHTML="Vui lòng nhập trường này";
        return false;
    }
    else if(!sodienthoai.match(checkphoneGlobal) || sodienthoai.length>10){
        error_sodienthoai.style.color='red';
        error_sodienthoai.innerHTML="Vui lòng nhập đúng định dạng số điện thoại";
        return false;
    }
    else {
        error_sodienthoai.style.color='green';
        error_sodienthoai.innerHTML='';
        return true;
    }
}

var cars = function (id,tenxe,hinhanh,hangxe,giatien,nguoilienhe,sodienthoai,email){
    this.id=id,
    this.tenxe=tenxe,
    this.hinhanh=hinhanh,
    this.hangxe=hangxe,
    this.giatien=giatien,
    this.nguoilienhe=nguoilienhe,
    this.sodienthoai=sodienthoai,
    this.email=email
}


const result = document.querySelector('#result');
var car=[];
var CurItem=null;
function validate(){
    var form=document.querySelector('form');
    form.onsubmit=(event)=>{
        event.preventDefault();
        // console.log('hello');    
        let tenxe=document.querySelector('#tenxe').value;
        let hinhanh=document.querySelector('#hinhanh').value;
        let hangxe=document.querySelector('#hangxe').value;
        let giatien=document.querySelector('#giatien').value;
        let nguoilienhe=document.querySelector('#nguoilienhe').value;
        let sodienthoai=document.querySelector('#sodienthoai').value;
        let email=document.querySelector('#email').value;
        let id = car.length+1;
        console.log(tenxe,hinhanh,hangxe,giatien,nguoilienhe,sodienthoai,email)

        if(tenxe&&hinhanh&&hangxe&&giatien&&nguoilienhe&&sodienthoai&&email&&validate_email()&&validate_sodienthoai()){
            car.push(new cars(id,tenxe,hinhanh,hangxe,giatien,nguoilienhe,sodienthoai,email))
            render(car);
        }
        document.querySelector('#tenxe').value='';
        document.querySelector('#hinhanh').value='';
        document.querySelector('#giatien').value='';
        document.querySelector('#nguoilienhe').value='';
        document.querySelector('#sodienthoai').value='';
        document.querySelector('#email').value='';
        console.log(car);
        // console.log(car.length);
    }

}

function render(car){
    // console.log('hello')
    let html=``;
    car.map((item,index) => {
        // console.log(item);
        index++;
        html+=
        `
        <tr onclick="get(${item.id})">
            <td>${index}</td>
            <td>  <img src="${item.hinhanh}" width="50px"></td>
            <td>${item.tenxe}</td>
            <td>${item.hangxe}</td>
            <td>${item.giatien}</td>
            <td>${item.nguoilienhe}</td>
            <td>${item.sodienthoai}</td>
            <td>${item.email}</td>
        </tr>
        `;
    });
    // console.log(html);
    result.innerHTML=html;
    // console.log('hello')
}


function get(id){
    // const inforCurr=document.querySelectorAll('#result tr');
    // console.log(inforCurr);
    car.forEach((item)=>{
        if(item.id===id){
            CurItem=item;
            console.log(CurItem)
            const tenxe=document.querySelector('#tenxe').value=item.tenxe;
            const hinhanh=document.querySelector('#hinhanh').value=item.hinhanh;
            const hangxe=document.querySelector('#hangxe').value=item.hangxe;
            const giatien=document.querySelector('#giatien').value=item.giatien;
            const nguoilienhe=document.querySelector('#nguoilienhe').value=item.nguoilienhe;
            const sodienthoai=document.querySelector('#sodienthoai').value=item.sodienthoai;
            const email=document.querySelector('#email').value=item.email;
        }
    })
    // clearItem(CurItem)
}
// console.log(CurItem)
// function clearItem(CurItem){
//     var form=document.querySelector('form');
//     form.onsubmit=(e)=>{
//         e.preventDefault();
//     }
//     console.log('hello')
//     car=car.filter((item)=>{
//         console.log(CurItem.id)
//         console.log(item.id)
//         return item.id!=CurItem.id;
//     })
//     render(car)
//     console.log(car);
//     console.log('hello')
// }

function clearItem(){
    var form=document.querySelector('form');
    form.onsubmit=(e)=>{
        e.preventDefault();
    }
    const name=document.querySelector('#tenxe').value;
    const img=document.querySelector('#hinhanh').value;
    car=car.filter((item)=>{
        console.log(name)
        console.log(item.tenxe)
        return item.tenxe!=name && item.hinhanh!=img;
    })
    render(car)
}

function search(){
    var searchbar=document.querySelector('.search-box input').value.toLowerCase();
    var newcar=car.filter((item)=>{
        console.log('hello')
        return item.tenxe.includes(searchbar.toLowerCase())||item.hangxe.includes(searchbar.toLowerCase())
        ||item.giatien.includes(searchbar.toLowerCase())||item.nguoilienhe.includes(searchbar.toLowerCase())
        ||item.sodienthoai.includes(searchbar.toLowerCase())||item.email.includes(searchbar.toLowerCase())

        // return item.tenxe.indexOf(searchbar.toLowerCase())>-1||item.hangxe.indexOf(searchbar.toLowerCase())>-1
        // ||item.giatien.indexOf(searchbar.toLowerCase())>-1||item.nguoilienhe.indexOf(searchbar.toLowerCase())>-1
        // ||item.sodienthoai.indexOf(searchbar.toLowerCase())>-1||item.email.indexOf(searchbar.toLowerCase())>-1
    })
    console.log(newcar);
    if(searchbar.length!=0){
        render(newcar);
    }else{
        render(car);
    }
    console.log('hello')
}
document.querySelector('.search-box input').addEventListener('keyup',search)