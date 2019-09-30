let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

function Clock(radius) {
    this.radius = radius;
}

Clock.prototype.draw = function(cx, cy) {
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = this.radius / 30;
    ctx.strokeStyle = "#304753";
    ctx.fillStyle = "#D2A8AA";
    ctx.fill();
    ctx.stroke();

    for(let i=0; i<12; ++i) {
        let angle = (i / 12) * Math.PI * 2 - Math.PI / 3;
        ctx.beginPath();
        let nx = this.radius * Math.cos(angle);
        let ny = this.radius * Math.sin(angle);
        ctx.moveTo(nx, ny);
        ctx.lineWidth = 3;
        ctx.lineTo(nx * 0.96, ny * 0.96);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = this.radius * 0.08 + 'px Courier New';
        ctx.fillStyle = "#0E2A38";
        ctx.fillText(i+1, nx * 0.9, ny * 0.9);
    }

    let sec_angle = (this.seconds / 60) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius * Math.cos(sec_angle) * 0.9, this.radius * Math.sin(sec_angle) * 0.9);
    ctx.strokeStyle = "#D26363";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo( - this.radius * Math.cos(sec_angle) * 0.1, - this.radius * Math.sin(sec_angle) * 0.1);
    ctx.lineWidth = 6;
    ctx.stroke();

    let min_angle = ((this.minutes + this.seconds / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius * Math.cos(min_angle) * 0.7, this.radius * Math.sin(min_angle) * 0.7);
    ctx.strokeStyle = "#304753";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();

    let hour_angle = ((this.hours + this.minutes / 60) / 12) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.radius * Math.cos(hour_angle) * 0.4, this.radius * Math.sin(hour_angle) * 0.4);
    ctx.strokeStyle = "#304753";
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, this.radius / 20, 0, Math.PI * 2);
    ctx.strokeStyle = "#CF7E83";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#D2A8AA";
    ctx.fill();
    ctx.stroke();

    ctx.translate(-cx, -cy);
}

Clock.prototype.setTime = function() {
    let date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds() + date.getMilliseconds() / 1000;
}

let d = new Date();

let clock = new Clock(canvas.height / 4);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clock.setTime();
    clock.draw(canvas.width / 2, canvas.height / 2);
}

animate();