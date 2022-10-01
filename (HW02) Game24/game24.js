const judgePoint24 = function (nums) {
  let arrNums = [];
  let result = [];
  let text;

  nums
    .trim()  //ลบ white space ด้านซ้ายกับขวา
    .split("") //แยกตัวเลขออกจากกัน
    .map((val) => { //clone array 
      
      if (!Number(val)) { //check ว่าเป็นตัวเลขหรือเปล่า
        throw Error("Input number only"); //ถ้าไม่ใช่จะขึ้นข้อความ error("Input number only")
      }
      return arrNums.push(+val); //เอาค่า val ไปใส่ใน array ของ arrNums 
    });                          //**note** ใส่ + หน้าval เพื่อให้ val เป็นตัวเลข เวลาบวกกันจะได้ไม่เป็น string

  if (arrNums.length > 4) { //ใส่เลขได้แค่ 4 ตัว
    console.log("maximum length 4 digits"); //ถ้าใส่มากกว่า 4 ตัวจะ console.log("maximum length 4 number")
    return;
  }
  const arrUnique = [...new Set(arrNums)]; //set ตัวเลขให้ไม่ซ้ำกัน

  if (arrUnique.length < 4) { //ต้องใส่ตัวเลขที่ไม่ซ้ำกัน 4 ตัว
    console.log("Numbers must be unique."); //ถ้าใส่มากกว่า 4 ตัวจะ console.log("Numbers must be unique.")
    return;
  }

  if (arrNums.indexOf(0) !== -1) {  //check ตัวเลขต้องเป็น 1-9 เท่านั้น 
    console.log("character is 1-9"); //ถ้ามีเลข 0 จะ console.log("character is 1-9")
    return;
  }

  const cal1 = (array) => {
    const arr = [...array]; 

    for (let i = 0; i < arr.length; i++) { //คำนวณโดย index ที่ 0 มา +,-,*,/ กับ index ที่ 1
      const a = arr.shift();// และ index ที่ 2 มา +,-,*,/ กับ index ที่ 3 
      const b = arr.shift();//แล้วนำผลลัพธ์ทั้งหมดเก็บใส่ใน array ของ result
      result.push(a+b); //ค่าใน result จะเป็น [a+b,a-b,a*b,a/b,c+d,c-d,c*d,c/d]  
      result.push(a-b); //โดย a = arr[0],b = arr[1],c = arr[2],d = arr[3]
      result.push(a*b);
      result.push(a/b); 
    }
  };
  cal1(arrNums);
  
  const calSym = ["+", "-", "*", "/"];
  const cal2 = (arr) => {
    // console.log(arr);
    const half = arr.length / 2; //แบ่งผลลัพธ์จาก cal1 เป็น 2 ส่วน จะได้
    const arrFirst = arr.splice(0, half); //[a+b,a-b,a*b,a/b] โดย a = arr[0],b = arr[1]
    const arrSecond = arr.splice(0, half); //[c+d,c-d,c*d,c/d] โดย c = arr[2],d = arr[3]
    // console.log(arrPrev);
    // console.log(arrlast);
    for (let i = 0; i < half; i++) { //วนลูปจนหาค่าที่คำนวณแล้วได้ 24
      for (let j = 0; j < half; j++) {
        const a = arrFirst[i];
        const b = arrSecond[j];

        if ((a+b) === 24) {
          text = `(${arrNums[0]} ${calSym[i]} ${arrNums[1]}) ${calSym[0]}  (${arrNums[2]} ${calSym[j]}  ${arrNums[3]} )`;
          return;
        }
        if ((a-b) === 24) {
          text = `(${arrNums[0]} ${calSym[i]} ${arrNums[1]}) ${calSym[1]}  (${arrNums[2]} ${calSym[j]}  ${arrNums[3]} )`;
          return;
        }
        if ((a*b) === 24) {
          text = `(${arrNums[0]} ${calSym[i]} ${arrNums[1]}) ${calSym[2]}  (${arrNums[2]} ${calSym[j]}  ${arrNums[3]} )`;
          return;
        }
        if ((a/b) === 24) {
          text = `(${arrNums[0]} ${calSym[i]} ${arrNums[1]}) ${calSym[3]}  (${arrNums[2]} ${calSym[j]}  ${arrNums[3]} )`;
          return;
        }
      }
    }
  };
  cal2(result);

  if (!text) { //ถ้าคำนวณแล้วไม่ได้ 24 ให้แสดงข้อความ error
    throw new Error("ชุดนี้ไม่สามารถทำให้ผลลัพธ์กลายเป็น 24 ได้");
  }
  console.log(text);
};

judgePoint24(" 1234");
