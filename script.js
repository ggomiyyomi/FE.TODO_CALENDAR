const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth(); //오늘 날짜 가져오기
let year = today.getFullYear(); // 오늘 년도 가져오기


const months = [
    "January", "February", 
    "March", "Aprill", "May", 
    "June", "July", "August", 
    "September", "October", 
    "November", "December"
];

//default 이벤트 배열
const eventsArr = [
    {
        day: 17,
        month: 12,
        year: 2024,
        events: [
            {
                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
    {
        day: 30,
        month: 12,
        year: 2024,
        events: [
            {
                title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
                time: "10:00 AM",
            },
        ],
    },
];


// days 추가 함수
function initCalendar() {
    // 이전달 day & 현재달 모든 day & 다음달 days 계산
    const firstDay = new Date(year, month , 1);
    const lastDay = new Date(year, month+1 , 0);
    const prevLastDay = new Date(year, month , 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay()-1;

    // 맨 위 년도와 월 업데이트
    date.innerHTML = months[month] + " " + year;



    //일자 추가하기

    let days = "";
    // 이전달 days
    for (let x = day; x>0; x--){
        days += `<div class="day prev-date"> ${prevDays-x+1} </div>`;
    }
    // 현재달 days
    for(let i=1; i<=lastDate; i++) {

        // 현 날짜에 현재 이벤트가 표시되는지 확인
        let event = false;
        eventsArr.forEach((eventObj)=> {
            if(
                eventObj.day ===i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            )
            {
                // 이벤트를 찾으면
                event = true;
            }
        })




        //만약 날짜가 오늘이라면 class에 today 추가
        if ( 
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            // 이벤트를 발견하거나 또한 이벤트 클래스가 추가된다면
            if(event) {
                days += `<div class="day today event "> ${i} </div>`;
            } else {
                days += `<div class="day today"> ${i} </div>`;
            }
        }
        //이외 추가
        else {
            if(event) {
                days += `<div class="day event "> ${i} </div>`;
            } else {
                days += `<div class="day"> ${i} </div>`;
            }
        }
    }
    //다음달 days
    for (let j = 1; j<=nextDays; j++) {
        days += `<div class="day next-date"> ${j} </div>`;
    }

    daysContainer.innerHTML = days;
}

initCalendar();


//이전 달 함수
function prevMonth(){
    month--;
    if(month<0) {
        month =11;
        year--;
    }
    initCalendar();
}
//다음 달 함수
function nextMonth(){
    month++;
    if(month>11) {
        month=0;
        year++;
    }
    initCalendar();
}
// 이전 다음 달 넘기는 클릭 기능
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);




// 날짜 선택 이동 &  오늘 날짜 이동 기능 추가
todayBtn.addEventListener("click", ()=> {
    today = new Date();
    month  = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //숫자와 슬래시를 제외한 모든 문자 제거
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    // 숫자 두 개를 적으면 슬래시 붙이기
    if(dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    // 숫자 길이가 7개가 넘지 않도록 하기
    if(dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0,7);
    }
    // backspace를 누를경우
    if(e.inputType === "deleteContentBackward") {
        if(dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0,2);
        }
    }
});

gotoBtn.addEventListener("click",gotoDate);

// 입력된 날짜로 가는 기능
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // 입력 날짜 존재 확인
    if(dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // 입력한 날짜가 존재하지않는다면
    alert("Invalid Date");
}


// 이벤트 생성 선언
const addEventBtn  = document.querySelector(".add-event"),
    addEventContainer  = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),

    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");


// 이벤트 추가 버튼 생성 및 제거
addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active"); //클래스에 active 추가
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active"); //클래스에 active 제거
});
document.addEventListener("click", (e) => {
    //만약 바깥쪽을 눌렀을 경우
    if(e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active"); //클래스에 active 제거
    }
});

// 이벤트 일정 추가 
// 이벤트 제목 50자만 가능하도록
addEventTitle.addEventListener("input", (e)=> {
    addEventTitle.value = addEventTitle.value.slice(0,50);
});
// 이벤트 시간 형식 설정
addEventFrom.addEventListener("input", (e)=> {
    // 숫자와 : 말고 다른 글자는 제거
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g,"");
    // 두 숫자가 들어갔을때 자동으로 ":" 추가
    if(addEventFrom.value.length===2) {
        addEventFrom.value += ":";
    }
    // 사용자가 5자이상 못쓰도록 설정
    if(addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
});

addEventTo.addEventListener("input", (e)=> {
    // 숫자와 : 말고 다른 글자는 제거
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g,"");
    // 두 숫자가 들어갔을때 자동으로 ":" 추가
    if(addEventTo.value.length===2) {
        addEventTo.value += ":";
    }
    // 사용자가 5자이상 못쓰도록 설정
    if(addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0,5);
    }
});