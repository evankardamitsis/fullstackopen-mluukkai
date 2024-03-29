import express from 'express';
import { isArray } from 'util';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
  
    if (!height || !weight) {
      res
        .status(400)
        .send({ error: 'Not enough arguments: height(cm), weight(kg)' });
    }
  
    const heightNumber = Number(height);
    const weightNumber = Number(weight);
  
    if (isNaN(heightNumber) || isNaN(weightNumber)) {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  
    const bmi: { height: number; weight: number; bmi: string } = {
      weight: weightNumber,
      height: heightNumber,
      bmi: calculateBmi(heightNumber, weightNumber),
    };
  
    res.json(bmi);
  });

  app.post('/exercises', (req, res) => {
     const { daily_exercises, target} = req.body as {
        daily_exercises: string,
        target:number
     };

     if(!daily_exercises || !target) {
        res.status(400).send({ error: 'Parameters missing' });
     }

     if(isNaN(Number(target))) {
        res.status(400).send({ error: 'Malformatted parameters' });
     }

     const dailyHours: number[] = [];

     try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const dailyExercises: number[] = JSON.parse(daily_exercises);
        if(!isArray(dailyExercises)) throw new Error();

        dailyExercises.forEach((hour) => {
            if(isNaN(Number(hour))){
                throw new Error();
            }
            dailyHours.push(Number(hour));
        });
    } catch (error) {
        res.status(400).send({ error: 'Malformatted parameters' });
    }

    const result: {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
    } = calculateExercises(target, dailyHours);

    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});