
import { FC, useMemo } from 'react';
import styles from './order-data.module.css';
import { useSelector } from '../../hooks/hooks';
import { ORDER_NUMBER_LENGTH } from '../../constants/constants';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrder } from '../../utils/types';

interface IOrderData {
  order: IOrder
}


const OrderData: FC<IOrderData> = ({ order }) => {
  // const orders = useSelector(state => state.websocket.orders);
  const allIngredients = useSelector(state => state.ingredients.allIngredients);

  // console.log(order, 'dOrderData')

  // const { number, name, status, ingredients, createdAt } = order;



  const uniqueIngredients = Array.from(new Set(order?.ingredients));
  // console.log({uniqueIngredients});

  const ingredientsData = uniqueIngredients.map(ingredient => {
      const findedItem = allIngredients.find(item => item._id === ingredient);
      return {
        name: findedItem?.name,
        id: findedItem?._id,
        image: findedItem?.image,
        price: findedItem?.price
      }      
    }
  );

  const price = useMemo(() => {
    return order?.ingredients.reduce((currentSum, ingredient) => {
      const ingredientPrice = allIngredients.find(item => item._id === ingredient)?.price;
      return ingredientPrice ? currentSum + ingredientPrice : currentSum;
    }, 0);
  }, [order.ingredients]);

  const formatedOrderNumber = useMemo(() => {
    return `#${String(order?.number).padStart(ORDER_NUMBER_LENGTH, '0')}`
  }, [order.number]);

  const formatedStatus = (order?.status === 'created') ?
    <h5 className={`text text_type_main-default mt-3`}>Создан</h5> :
    order?.status === 'pending' ?
      <h5 className={`text text_type_main-default mt-3`}>Готовится</h5> :
      order?.status === 'done' ?
        <h5 className={`text text_type_main-default text_color_success mt-3`}>Выполнен</h5> :
        '';

  const quantity = (ingredientId: string) => order?.ingredients.filter(item => item === ingredientId).length;

  return (
    <section className={`${styles['order-data']}`}>
      <h4 className={`${styles.number} text text_type_digits-default mb-10`}>{formatedOrderNumber}</h4>
      <h2 className='text text_type_main-medium'>{order?.name}</h2>

      {formatedStatus}
      <h3 className='text text_type_main-medium mt-15 mb-6'>Состав</h3>

      <div className={`${styles.composition} custom-scroll mb-10 pr-8`}>
        {ingredientsData.map(item => 
          <div className={`${styles['ingredient-data']} mb-4`} key={item.id}>
            <div className={`${styles['image-wrapper']} mr-4`}>
              <img
                className={`${styles.image}`}
                src={item.image}
                alt={item.name}
              />

            </div>

            <h4 className={`text text_type_main-default mr-4`}>{item.name}</h4>
            <div className={`${styles.amount}`}>
              <h3 className={` text text_type_digits-default mr-2`}>
                {quantity(item.id!)} x {item.price}
              </h3>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.information}`}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order?.createdAt)} />
        </p>
        <div className={`${styles.amount}`}>
          <h3 className={` text text_type_digits-default mr-2`}>
            {price}
          </h3>
          <CurrencyIcon type='primary' />
        </div>


      </div>
    </section>
  )
}
// const OrderData: FC<IOrderData> = ({ order }) => {
//   // const orders = useSelector(state => state.websocket.orders);
//   const allIngredients = useSelector(state => state.ingredients.allIngredients);


//   // const data = {
//   //   _id: '63d97e41936b17001be56fe0',
//   //   ingredients: [
//   //     '60d3b41abdacab0026a733c7',
//   //     '60d3b41abdacab0026a733cb',
//   //     '60d3b41abdacab0026a733d0',
//   //     '60d3b41abdacab0026a733d4',
//   //     '60d3b41abdacab0026a733d2',
//   //     '60d3b41abdacab0026a733cb',
//   //     '60d3b41abdacab0026a733ca',
//   //     '60d3b41abdacab0026a733cf',
//   //     '60d3b41abdacab0026a733ce',
//   //     '60d3b41abdacab0026a733c7'
//   //   ],
//   //   status: 'done',
//   //   name: 'Метеоритный флюоресцентный минеральный астероидный альфа-сахаридный антарианский био-марсианский традиционный-галактический бургер',
//   //   createdAt: '2023-01-31T20:46:57.276Z',
//   //   updatedAt: '2023-01-31T20:46:57.700Z',
//   //   number: 38732
//   // };

//   console.log(order, 'dOrderData')

//   const { number, name, status, ingredients, createdAt } = order;


//   const uniqueIngredients = Array.from(new Set(ingredients));
//   console.log({uniqueIngredients});

//   const ingredientsData = uniqueIngredients.map(ingredient => {
//       const findedItem = allIngredients.find(item => item._id === ingredient);
//       return {
//         name: findedItem?.name,
//         id: findedItem?._id,
//         image: findedItem?.image,
//         price: findedItem?.price
//       }      
//     }
//   );

//   const price = useMemo(() => {
//     return ingredients.reduce((currentSum, ingredient) => {
//       const ingredientPrice = allIngredients.find(item => item._id === ingredient)?.price;
//       return ingredientPrice ? currentSum + ingredientPrice : currentSum;
//     }, 0);
//   }, [ingredients]);

//   const formatedOrderNumber = useMemo(() => {
//     return `#${String(order?.number).padStart(ORDER_NUMBER_LENGTH, '0')}`
//   }, [number]);

//   const formatedStatus = (status === 'created') ?
//     <h5 className={`text text_type_main-default mt-3`}>Создан</h5> :
//     status === 'pending' ?
//       <h5 className={`text text_type_main-default mt-3`}>Готовится</h5> :
//       status === 'done' ?
//         <h5 className={`text text_type_main-default text_color_success mt-3`}>Выполнен</h5> :
//         '';

//   const quantity = (ingredientId: string) => ingredients.filter(item => item === ingredientId).length;

//   return (
//     <section className={`${styles['order-data']}`}>
//       <h4 className={`${styles.number} text text_type_digits-default mb-10`}>{formatedOrderNumber}</h4>
//       <h2 className='text text_type_main-medium'>{name}</h2>

//       {formatedStatus}
//       <h3 className='text text_type_main-medium mt-15 mb-6'>Состав</h3>

//       <div className={`${styles.composition} custom-scroll mb-10 pr-8`}>
//         {ingredientsData.map(item => 
//           <div className={`${styles['ingredient-data']} mb-4`} key={item.id}>
//             <div className={`${styles['image-wrapper']} mr-4`}>
//               <img
//                 className={`${styles.image}`}
//                 src={item.image}
//                 alt={item.name}
//               />

//             </div>

//             <h4 className={`text text_type_main-default mr-4`}>{item.name}</h4>
//             <div className={`${styles.amount}`}>
//               <h3 className={` text text_type_digits-default mr-2`}>
//                 {quantity(item.id!)} x {item.price}
//               </h3>
//               <CurrencyIcon type='primary' />
//             </div>
//           </div>
//         )}
//       </div>
//       <div className={`${styles.information}`}>
//         <p className='text text_type_main-default text_color_inactive'>
//           <FormattedDate date={new Date(createdAt)} />
//         </p>
//         <div className={`${styles.amount}`}>
//           <h3 className={` text text_type_digits-default mr-2`}>
//             {price}
//           </h3>
//           <CurrencyIcon type='primary' />
//         </div>


//       </div>
//     </section>
//   )
// }

export default OrderData