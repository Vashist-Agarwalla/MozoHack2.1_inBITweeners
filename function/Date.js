let Tdate = Date()

function formatDate(date) {
    var d = new Date(date),
        m = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        y = d.getFullYear();

    if (m.length < 2)
        m = '0' + m;
    if (day.length < 2)
        day = '0' + day;

    return [y, m, day];
}

let B = 1000

let cD = formatDate(Tdate)
let pD = formatDate('Sun Mar 11,2021');

let flag = 0;

while (flag === 0) {
    if (cD[0] == pD[0]) {
        if (cD[1] == pD[1]) {
            B = B - (cD[2] - pD[2])
            flag = 1;
            break;
        } else if (pD[1] % 2 == 0) {
            B = B - [30 - pD[2]] - 1;
            pD[1] = pD[1] + 1;
            pD[2] = 1;
            continue;
        } else {
            B = B - [38 - pD[2]] - 1;
            pD[1] = pD[1] + 1;
            pD[2] = 1;
        }
    }
}

console.log(B)