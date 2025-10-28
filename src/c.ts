import express, { Request, Response } from 'express';
let savedValues: Record<string, number> = {}; // כאן מאחסנים ערכים
const app = express();
savedValues["pi"] = 3.14;
savedValues["e"] = 2.71;
savedValues["goldenRatio"] = 1.618;
// נתיב ברירת מחדל
app.get('/', (req: Request, res: Response) => {

  res.send('Hello from Express! ' + name);
});

const PORT = 3000;
// מאזין לפורט 3000
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
//1
//add
app.get('/add', (req: Request, res: Response) => {
  if (!req.query.num1 || !req.query.num2) {
    return res.status(400).send('Missing num1 or num2');
  }
  let num1 = req.query.num1.toString();
  let num2 = req.query.num2.toString();
  if (isNaN(Number(num1))) {
    if (savedValues[num1] !== undefined) {
      num1 = savedValues[num1].toString();
    } else {
      return res.status(404).send('Value for num1 not found');
    }
  }
  if (isNaN(Number(num2))) {
    if (savedValues[num2] !== undefined) {
      num2 = savedValues[num2].toString();
    } else {
      return res.status(404).send('Value for num2 not found');
    }
  }
  const sum = Number(num1) + Number(num2);
  res.send(`The sum is: ${sum}`);
});

//minus
app.get('/minus/:num1/:num2', (req: Request, res: Response) => {
 if (!req.query.num1 || !req.query.num2) {
    return res.status(400).send('Missing num1 or num2');
  }
  let num1 = req.query.num1.toString();
  let num2 = req.query.num2.toString();
  if (isNaN(Number(num1))) {
    if (savedValues[num1] !== undefined) {
      num1 = savedValues[num1].toString();
    } else {
      return res.status(404).send('Value for num1 not found');
    }
  }
  if (isNaN(Number(num2))) {
    if (savedValues[num2] !== undefined) {
      num2 = savedValues[num2].toString();
    } else {
      return res.status(404).send('Value for num2 not found');
    }
  };
  
  const sum = Number(num1) - Number(num2);
  res.send(`The sum is: ${sum}`);
});
//multiply
app.get('/multiply/:num1/:num2', (req: Request, res: Response) => {
  if (!req.query.num1 || !req.query.num2) {
    return res.status(400).send('Missing num1 or num2');
  }
  let num1 = req.query.num1.toString();
  let num2 = req.query.num2.toString();
  if (isNaN(Number(num1))) {
    if (savedValues[num1] !== undefined) {
      num1 = savedValues[num1].toString();
    } else {
      return res.status(404).send('Value for num1 not found');
    }
  }
  if (isNaN(Number(num2))) {
    if (savedValues[num2] !== undefined) {
      num2 = savedValues[num2].toString();
    } else {
      return res.status(404).send('Value for num2 not found');
    }
  }
  const sum = Number(num1) * Number(num2);
  res.send(`The sum is: ${sum}`);
});
//divide
app.get('/divide/:num1/:num2', (req: Request, res: Response) => {
  if (!req.query.num1 || !req.query.num2) {
    return res.status(400).send('Missing num1 or num2');
  }
  let num1 = req.query.num1.toString();
  let num2 = req.query.num2.toString();
  if (isNaN(Number(num1))) {
    if (savedValues[num1] !== undefined) {
      num1 = savedValues[num1].toString();
    } else {
      return res.status(404).send('Value for num1 not found');
    }
  }
  if (isNaN(Number(num2))) {
    if (savedValues[num2] !== undefined) {
      num2 = savedValues[num2].toString();
    } else {
      return res.status(404).send('Value for num2 not found');
    }
  }
  const sum = Number(num1) /Number(num2);
  res.send(`The sum is: ${sum}`);
});
//2
//  מחיקת ערך קיים

app.delete('/', (req: Request, res: Response) => {
  let name = req.query.name as string;
  let num = req.query .num;
    if (!name || savedValues[name] === undefined) {
    return res.status(404).send('Value not found');
  }
  delete savedValues[name];
  res.send(`הערך ${name} נמחק`);
});


// הוספת ערך חדש
app.post('/', (req: Request, res: Response) => {
  let name = req.query.key as string;
  let value = Number(req.query.value);
  if (!name || value === undefined) {
    return res.status(400).send('חסר key או value');
  }
  savedValues[name] = value; // שמירה בזיכרון
  res.send(`נוסף ערך חדש: ${name} = ${value}`);
});
// עדכון ערך קיים
app.put('/', (req: Request, res: Response) => {
  let name = req.query.name as string;
  let num = Number(req.query.num);
  if (!name || isNaN(num)) {
    return res.status(400).send('חסר name או num לא מספר');
  }
  if (savedValues[name] === undefined) {
    return res.status(404).send('Value not found');
  }   
 savedValues[name] = num;
  res.send(`הערך ${name} עודכן ל- ${num}`);
})
//3
//מקבל שם ומחזיר את הערך המתאים
app.get('/:name', (req: Request, res: Response) => {
  let routeParams = req.params;
  let name = routeParams.name;
  let value = savedValues[name];
  res.send(`The value is: ${value}`);
})
  ;
app.get('/getAll', (req: Request, res: Response) => {
  res.send(savedValues);
});
//4

//אם לא מצא את הערך יחזיר הודעת שגיאה
app.get('/:name', (req: Request, res: Response) => {
  let flag = false
  for (let key in savedValues) {
    if (key === req.params.name) {
      flag = true
    }
  }
  if (!flag) {
    res.statusCode = 404;
    res.send('Value not found');
  }
});