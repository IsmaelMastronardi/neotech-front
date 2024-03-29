import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import trashIcon from '../../images/trash_icon.png';
import minusIcon from '../../images/minus_icon.png';
import plusIcon from '../../images/plus_icon.png';
import {
  addAndRemoveItems, addItemToOrder, deleteAllOneItemFromOrder, deleteItemFromOrder,
} from '../../redux/slices/orderSlice';

const CartItem = ({ product, quantity }) => {
  const orderItems = useSelector((store) => store.order.orderItems);
  const orderLoading = useSelector((store) => store.order.orderLoading);
  const dispatch = useDispatch();

  const [itemLoading, setItemLoading] = useState(false);

  const switchItemLoading = () => {
    setItemLoading(!itemLoading);
  };

  const addToCart = (item) => {
    switchItemLoading();
    dispatch(addItemToOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'addItem'));
        switchItemLoading();
      })
      .catch()
      .finally(() => {
        setItemLoading(false);
      });
  };

  const removeFromCart = (item) => {
    switchItemLoading();
    dispatch(deleteItemFromOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'removeItem'));
      })
      .catch()
      .finally(() => {
        setItemLoading(false);
      });
  };

  const removeAllOfItemFromCart = (item) => {
    dispatch(deleteAllOneItemFromOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'deleteItem'));
      })
      .catch();
  };

  const showCartItemQuantity = (item) => {
    if (orderItems[item.id] && orderItems[item.id].quantity > 0) {
      return (
        <p className="text-4xl text-center">{orderItems[item.id].quantity}</p>
      );
    }
    return null;
  };

  return (
    <li className="itemContainer listItem" key={product.id}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-between w-full px-1 my-2 text-center border-b border-verdigris">
            <p className="py-2 text-2xl text-center truncate">{product.name}</p>
            <button
              type="button"
              className=""
              onClick={() => {
                if (!orderLoading) {
                  removeAllOfItemFromCart(product);
                }
              }}
            >
              <img
                src={trashIcon}
                alt="trash icon"
                className="h-10 pointer-events-none"
              />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex justify-center w-9/12">
              <img src={product.image} alt={`${product.name}`} className="rounded-md md:h-40" />
            </div>
            <div className="flex justify-center w-full min-w-0">
              <p className="py-2 text-2xl truncate">{product.description}</p>
            </div>
            <div>
              <p className="text-3xl">
                $
                {product.price}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around py-4">
          <div className="flex flex-row items-center justify-center gap-2 border rounded-sm">
            <button
              type="button"
              className={`text-4xl ${quantity === 1 ? 'text-gray-100' : ''}`}
              onClick={() => {
                if (!itemLoading) {
                  removeFromCart(product);
                }
              }}
            >
              <img src={minusIcon} alt="minus icon" className="h-12" />
            </button>
            {itemLoading && (
            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            )}
            {!itemLoading && (
            <>
              {showCartItemQuantity(product)}
            </>
            )}
            <button
              type="button"
              className=""
              onClick={() => {
                if (!orderLoading) {
                  addToCart(product);
                }
              }}
            >
              <img src={plusIcon} alt="plus icon" className="h-12" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;
