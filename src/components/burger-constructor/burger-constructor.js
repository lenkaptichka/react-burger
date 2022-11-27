import { Component } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


class BurgerConstructor extends Component {
  calculateTotalAmount = () => {
    return this.props.selectedIngredients.reduce((currentSum, ingredient) => {
      if (ingredient.type === 'bun') {
        return currentSum + ingredient.price * 2;
      }
      return currentSum + ingredient.price
    }, 0);
  }

  render() {
    const bun = this.props.selectedIngredients.filter(item => item.type === 'bun');
    const otherIngredients = this.props.selectedIngredients.filter(item => item.type !== 'bun');

    return (
      <section className={`${styles['burger-constructor']} pt-25 pl-4`}>
        <div className={`${styles.ingredients}`}>
          {bun.map(item => (
            <div className={`${styles.ingredient} pl-8 mb-4 mr-4`} key={`${item._id}_top`}>
              <ConstructorElement
                text={`${item.name} (верх)`}
                price={item.price}
                type='top'
                isLocked={true}
                thumbnail={item.image}
              />
            </div>
          ))}
          <div className={`${styles['unlocked-ingredients']} custom-scroll`}>
            {otherIngredients.map((item, index) => (
              <div className={`${styles.ingredient} pl-8 mb-4`} key={`${item._id}_${index}`}>
                {!false &&
                  <div className={styles['drag-icon-wrapper']}>
                    <DragIcon type='primary' />
                  </div>
                }
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  isLocked={false}
                  thumbnail={item.image}
                />
              </div>
            ))}
          </div>
          {bun.map(item => (
            <div className={`${styles.ingredient} pl-8 mt-4 mr-4`} key={`${item._id}_bottom`}>
              <ConstructorElement
                text={`${item.name} (низ)`}
                price={item.price}
                type='bottom'
                isLocked={true}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.info} mt-10 mb-10 mr-4`}>
          <div className={`${styles.amount} mr-10`}>
            <h3 className={`${styles['amount-text']} text text_type_digits-medium`}>{this.calculateTotalAmount()}</h3>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large'>Оформить заказ</Button>
        </div>
      </section>
    )
  }
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
    '_id': PropTypes.string,
    'name': PropTypes.string,
    'type': PropTypes.string,
    'proteins': PropTypes.number,
    'fat': PropTypes.number,
    'carbohydrates': PropTypes.number,
    'calories': PropTypes.number,
    'price': PropTypes.number,
    'image': PropTypes.string,
    'image_mobile': PropTypes.string,
    'image_large': PropTypes.string,
    '__v': PropTypes.number
  }))
}

export default BurgerConstructor
