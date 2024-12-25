//========================================================================================
// 공통 사용 함수
//---------------------------------------
function fRound(v,positon) {
    return Number(v.toFixed(1));
}
//min <= n < max 버뮈의 간수 생성하기
function rangeRandomInt(min, max) {
    return (Math.floor(Math.random() * (max-min+1) + min))

}
//========================================================================================

// class 정의 및 활용 연습
// 자동차 클래스 (car)

// 속성
//-------------------
// id: 자동차 객체들을 구분하기 위한 id
// gasTank: 연료 탱크 용량, 주유 시 초과할 수 없는 한계치
// gas: 현재 gasTank에 남아 있는 연료 양, 주행하면 줄어든다.
// kmpl: 연비 km/liter
// odoMeter: 출고이후 종 주행 거리
// tripMeter: 사용자가 리셋 이휴 달린 거리

// 메서드
//---------------------------------------
// drive(distance=10km); distance km만큼 주행 지시 (odoMeter, tripMeter에 distance 합산, 연료 소모 처리, gas랑 check)
// fueling(liter="FULL"); gas += liter, FULL 처리할 것
// status(); id, odoMeter, gas, 남은 주행 가능 거리..
// resetTripMeter(); //tripMeter = 0
//========================================================================================
class Car {
    constructor(id,gasTank=60, gas=10,kmpl=10) {
        this.id = id;
        this.gasTank = gasTank;
        this.gas = gas;
        this.kmpl = kmpl;
        this.odoMeter = 0;
        this.tripMeter = 0;
    }
    //-----------------------------------------------------------
    // [ID]:(Odo:23 km)(Gas: 10 liter)(Trip: 4 km)
    // header : "" 프로그래머가 호출한 경우
    // header != "" : 다른 메소드에서 호출한 경우
    status(header = "") {
        if(header == "")
            console.log(`[${this.id}]:(Odo:${this.odoMeter} km)(Gas: ${this.gas} liter)(Trip: ${this.tripMeter} km)`);
        else
             console.log(`${header}:(Odo:${this.odoMeter} km)(Gas: ${fRound(this.gas,1)} liter)(Trip: ${this.tripMeter} km)`);
    }
    //-----------------------------------------------------------
    // 속성 tripMeter를 초기화 한다. (0으로 설정하기)
    resetTripMeter() {
        this.tripMeter = 0;
        console.log(`[${this.id}]: TripMeter를 초기화 하였습니다.`)
        this.status("        ->");
    }
    //-----------------------------------------------------------
    // 주유 메소드:
    // 반환값: 실제 주유된 양(liter) ==> 추후 주유비 계산에 반영할 수 있음
    fueling(liter="FULL"){
        if(liter == "FULL") {
            console.log(`[${this.id}]: 연료탱크를 채웠습니다.`);
            let gasInput = this.gasTank - this.gas; //채워진 gas 량 계산
            this.gas = this.gasTank;
            return gasInput;
        }
        // 주유 요구량 liter만큼 주유 가능한지 확인부터 한다.
        if((this.gas + liter) > this.gasTank) {
            // 실제 주유 가능한 양으로 수정
            liter = this.gasTank - this.gas;
        }
        // 최종 결정된 주유향을 주유한다
        this.gas += liter;
        console.log(`[${this.id}]: ${fRound(liter,1)} liter 주유하였습니다.`);
        // 계기판 확인
        this.status("        ->");
        return liter;
    }
    //-----------------------------------------------------------
    // distance km만큼 주행 지시 (odoMeter, tripMeter에 distance 합산, 연료 소모 처리, gas랑 check)
    // 반환값: 실제 달린 거리
    drive(distance = 10) {
        if(this.gas <= 0) { //주행 불가 상황
            console.log(`[${this.id}]: 주행 불가능(연료 없음)`);
            this.status("        ->");
            return 0;
        }
    let usedGas = distance/this.kmpl;
    // 필요한 연료량이 있는지 확인
    if(usedGas > this.gas){ // 연료가 부족할 경우에는 요구한 주행거리가 아닌 남은 연료로 갈 수 이는 거리 재계산
        distance = this.gas * this.kmpl;
        usedGas = this.gas;
        console.log(`[${this.id}: 연료 부족으로 주행 거리 축소:(${distance} km)]`);
    }
        this.gas -= usedGas;
        this.odoMeter += distance;
        this.tripMeter += distance;
        console.log(`[${this.id}]: 주행(${distance} km)`)
        this.status("        ->");
        return distance;
    }
}
//========================================================================================
function autoDriveCars(){
    // car 에서 앞에 있는 car 한 대를 꺼낸다
    let car = cars.shift();
    // 꺼낸 car를 driving 시킨다.
    car.drive(rangeRandomInt(2, 20));
    //driving 끝난 차는 cars 맨 뒤에 넣는다
    cars.push(car);
}
function stopAutoDriveing() {
    clearInterval(keyAutoDriving);
    console.log("Simulation Stopped!!")
}
//========================================================================================
let cars = [];  //관리할 자동차 배열
cars.push(new Car("K5"));
cars.push(new Car("K9",60, 10,5.8));
cars.push(new Car("BMW520",60, 10,3.8));

let keyAutoDriving = setInterval(autoDriveCars, 5000);
console.log("Simulation Started")
setTimeout(stopAutoDriveing, 600000);
//========================================================================================

// c1.status();
// c1.drive(50);
// c1.resetTripMeter();
// c1.fueling();   //만땅 채우기
// c1.drive(234.56);
// c1.fueling(41);
