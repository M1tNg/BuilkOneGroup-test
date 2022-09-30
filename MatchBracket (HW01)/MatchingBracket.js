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

    if (arrBracket[0] !== "(") { //check index ตัวแรกว่ามีวงเล็บมั้ย
      missLeftBracket += 1; //ถ้าไม่มีให้ค่า missLeftBracket +1
      findIndexLeft.push(1);//
    }

    for (let i = 1; i < arrBracket.length; i += 1) {
      if (arrBracket[i - 1] === "(" && arrBracket[i] === ")") {
        continue; //continue ถ้าไม่ตรงเงื่อนไขก็ข้ามไปบรรทัดล่าง
      }

      if (arrBracket[i - 1] === ")" && arrBracket[i] === "(" ) {
        continue;
      }
      
      if (arrBracket[i] === ")" && arrBracket[i - 1] === ")" ) {
        missLeftBracket += 1;
        findIndexLeft.push(i + 1);
        continue;
      }
      if (arrBracket[i] === "(" && arrBracket[i - 1] === "(" ) {
        missRightBracket += 1;
        findIndexRight.push(i + 1);
        continue;
      }
    }
    if (arrBracket[arrBracket.length - 1] !== ")") {  //check index ตัวสุดท้าย
      missRightBracket += 1;
      findIndexRight.push(arrBracket.length + 1);
    }
  const setMissIndex = (arr) => { //ใส่ and คั่น ถ้าขาด 2 ตัว หรือใส่2ตัวท้าย ถ้ามีมากกว่า 2 ใส่ , แทน
      for (let i = 0; i < arr.length - 1; i++) {
        if (i == arr.length - 2) {
          arr[i] += " and";
        } else {
          arr[i] += " ,";
        }
      }
      return arr.join(" ");
    };

    const textIndexLeft = setMissIndex(findIndexLeft);
    const textIndexRight = setMissIndex(findIndexRight);
  
  if(missLeftBracket !== 0 ){
    console.log(`ต้องใส่ ( เพิ่ม ${missLeftBracket} ตัว ที่ตำแหน่ง ${textIndexLeft} `)
  }
  if(missRightBracket !== 0 ){
    console.log(`ต้องใส่ ) เพิ่ม ${missRightBracket} ตัว ที่ตำแหน่ง ${textIndexRight} `)
  }

  if(missLeftBracket === 0 && missRightBracket === 0 ){
    console.log("ครบคู่")
  }

}

checkBracket(input);