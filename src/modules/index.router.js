import connectDb from '../../DB/connection.js';
import categoriesRouter from './category/category.router.js'
import productsRouter from './product/product.router.js'
import authRouter from './auth/auth.router.js'

import cors from 'cors'
const initApp = (app,express) => {
  app.use(cors());

  app.use(express.json());
  app.use('/auth',authRouter);
  app.use('/category',categoriesRouter);
  app.use('/product',productsRouter);
  app.use('*',(req,res)=>{
    return res.json({message:"page not found"});
  });

  connectDb();
}

export default initApp;