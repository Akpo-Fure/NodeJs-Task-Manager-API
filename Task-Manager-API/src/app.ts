import createError, { HttpError } from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import connectDB from './config/db';
import dotenv from 'dotenv';

import taskRouter from './routes/taskRoutes';
import usersRouter from './routes/userRoutes';

dotenv.config()
connectDB();
const app: Application = express();


// view engine setup
app.set('views', path.join(__dirname, "..", 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/akpofure-task-manager/tasks', taskRouter);
app.use('/akpofure-task-manager/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction): any {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
