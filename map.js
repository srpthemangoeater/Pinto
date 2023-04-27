function switchFloor(floor) {
    var floor1 = document.getElementById("floor1");
    var floor2 = document.getElementById("floor2");
    var floorSwitch = document.getElementById("floor-switch");
    if (floor === 2) {
        floor1.style.display = "none";
        floor2.style.display = "table";
        floorSwitch.innerHTML = "ชั้น 2";
    } else {
        floor1.style.display = "table";
        floor2.style.display = "none";
        floorSwitch.innerHTML = "ชั้น 1";
    }
}