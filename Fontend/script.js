/*ํYour calories*/
document.getElementById("cal").onclick = function () {
    updateCal();
    showCal();
};

/*find my wristband*/
document.getElementById("find").onclick = function () { findMyWristband() };

setInterval(function(){
    updateMove();
    movementAlert();
},3000);

setInterval(function(){
    updateLight();
    lightAlert();
},5000);

setInterval(function(){reset()},7000);

function showCal() {
    fetch("http://158.108.182.16:50014/information", {method: "GET"})
    .then((data) => data.json())
    .then((datas) => {
        var value = datas[Object.keys(datas)];
        var array_num = Object.keys(value);
        var info = value[array_num];
        document.getElementById("calculate").innerHTML = `You've burned ${info.calories} calories`
    })
    .catch((error) => console.log("error", error));
}

function updateCal() {
    fetch("http://158.108.182.16:50014/cal_calories_and_time?user_id=1", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
}

function findMyWristband() {
    fetch("http://158.108.182.16:50014/update_location_status", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"finding_status": 1}),
})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    .then(document.getElementById("find-wristband").innerHTML = "Request sent to your wristband successfully!");
}

/*alert movement*/
function updateMove() {
    fetch("http://158.108.182.16:50014/cal_movement?user_id=1", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
}
function movementAlert() {
    fetch("http://158.108.182.16:50014/information", {method: "GET"})
    .then((data) => data.json())
    .then((datas) => {
        var value = datas[Object.keys(datas)];
        var array_num = Object.keys(value);
        var info = value[array_num];

        if(info.movement_status != "No status") {
            swal(info.movement_status);
        }
    })
    .catch((error) => console.log("error", error));
}

/* alert light */
function updateLight() {
    fetch("http://158.108.182.16:50014/cal_light?user_id=1", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
}
function lightAlert() {
    fetch("http://158.108.182.16:50014/information", {method: "GET"})
    .then((data) => data.json())
    .then((datas) => {
        var value = datas[Object.keys(datas)];
        var array_num = Object.keys(value);
        var info = value[array_num];

        if(info.light_status != "No status") {
            alert(info.light_status);
        }
    })
    .catch((error) => console.log("error", error));
}

function reset() {
    fetch("http://158.108.182.16:50014/reset_info?user_id=1", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
}