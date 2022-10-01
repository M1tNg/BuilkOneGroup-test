const prompt = require("prompt-sync")();

const input = prompt("กรุณาใส่วงเล็บ ( หรือ ) : ");

const checkBracket = function(data) {
  let arrBracket = [];
  data
    .trim() //ลบ white space ด้านซ้ายกับขวา
    .split("")//แยก string ออกจากกัน
    .map((val) => { //clone array
      const isBracket = val === "(" || val === ")"; 
      if (!isBracket){ //check ว่าเป็นวงเล็บ ( หรือ ) มั้ย
        throw Error('ใส่ได้เฉพาะ ( และ )'); //ถ้าไม่ใช่จะขึ้นข้อความ error('ใส่ได้เฉพาะ ( และ )')
      }
      return arrBracket.push(val); //เอาค่าval ใส่ใน array ของ arrBracket
    });
// console.log(arrBracket);

  if(arrBracket.length === 0){ //เช็คว่าต้องใส่ input อย่างน้อย 1 ตัว
  console.log("ต้องใส่อย่างน้อย 1 ตัว");
  return;
}
  if(arrBracket.length >= 30){ //เช็คว่าใส่ input ห้ามเกิน 30 ตัว
  console.log("คุณใส่ข้อมูลเกิน กรุณาใส่ข้อมูลใหม่");
  return;
}
  let missLeftBracket = 0;
  let missRightBracket = 0;
  let findIndexLeft = [];
  let findIndexRight = [];

    if (arrBracket[0] !== "(") { //check index ตัวแรกว่าเป็นวงเล็บเปิดมั้ย
      missLeftBracket += 1; //ถ้าไม่ใช้ให้ค่า missLeftBracket +1
      findIndexLeft.push(1);//และ push 1 ลงใน array ของ findIndexLeft
    }

    for (let i = 1; i < arrBracket.length; i++) { //ลูปเช็คค่าระหว่าง indexตัวแรกกับindexตัวสุดท้าย 
      if (arrBracket[i - 1] === "(" && arrBracket[i] === ")") {//ถ้าตัวก่อนหน้าเป็น ( และตัวปัจจุบันเป็น )
        continue; //ให้วนลูปถัดไป
      } //Note : continue คือ ให้สั่งวนลูปถัดไปเลย

      if (arrBracket[i - 1] === ")" && arrBracket[i] === "(" ) {//ถ้าตัวก่อนหน้าเป็น ( และตัวปัจจุบันเป็น (
        continue;
      }
      
      if (arrBracket[i - 1] === ")" && arrBracket[i] === ")" ) {//ถ้าตัวก่อนหน้าเป็น ) และตัวปัจจุบันเป็น )
        missLeftBracket += 1; //ให้ค่า missLeftBracket +1
        findIndexLeft.push(i + 1); //และ push 1 ลงใน array ของ findIndexLeft
        continue;
      }
      if (arrBracket[i - 1] === "(" && arrBracket[i] === "(" ) {//ถ้าตัวก่อนหน้าเป็น ( และตัวปัจจุบันเป็น (
        missRightBracket += 1; //ให้ค่า missRightBracket +1
        findIndexRight.push(i + 1); //และ push (i+1) ลงใน array ของ findIndexRight
        continue;
      }
    }
    if (arrBracket[arrBracket.length - 1] !== ")") {  //check index ตัวสุดท้ายว่าเป็นวงเล็บปิดมั้ย
      missRightBracket += 1; //ให้ค่า missRightBracket +1
      findIndexRight.push(arrBracket.length + 1); //และ push (arr.length+1) ลงใน array ของ findIndexRight
    }

    const textIndexLeft = findIndexLeft.join(" , "); //คั่นตัวเลข index ที่หายไปด้วย , 
    const textIndexRight = findIndexRight.join(" , ");
  
  if(missLeftBracket !== 0 ){ //ถ้าไม่มีวงเล็บเปิดที่หายเลย
    console.log(`ต้องใส่ ( เพิ่ม ${missLeftBracket} ตัว ที่ตำแหน่ง ${textIndexLeft} `)
  }
  if(missRightBracket !== 0 ){ //ถ้าไม่มีวงเล็บปิดที่หายเลย
    console.log(`ต้องใส่ ) เพิ่ม ${missRightBracket} ตัว ที่ตำแหน่ง ${textIndexRight} `)
  }

  if(missLeftBracket === 0 && missRightBracket === 0 ){ //ถ้าไม่มีวงเล็บเปิดกับวงเล็บปิดที่ขาดเลย
    console.log("ครบคู่")
  }
}
checkBracket(input);