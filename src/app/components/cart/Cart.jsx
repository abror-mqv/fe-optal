'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/components/_cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';

import { incrementLineQuantity, decrementLineQuantity, testQuantity, setCart } from '../../redux/slices/CartSlice';
import { Button } from '@mui/material';
import { fetchCart } from '@/app/redux/api/cartApi';
import { saveCart } from '../../redux/slices/CartSlice';


import axios from 'axios';
import { BACK_URL } from '@/app/VAR';
import SaveModal from './SaveModal';
import CheckOutModal from './CheckOutModal';
import { setNewCity } from '@/app/util/NewCity';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import BackPage from '../ui-kit/BackPage/BackPage';
import QuickAuthModal from '../ux-kit/QuickAuthModal/QuickAuthModal';
import ClientAllowModal from '../ux-kit/ClientAllowModal/ClientAllowModal';


function Cart(props) {
	const [openSaveModal, setOpenSaveModal] = useState(false)
	const [openCheckOutModal, setOpenCheckOutModal] = useState(false)


	const [openQAModal, setOpenQAModal] = useState(false)
	const [openCAModal, setOpenCAModal] = useState(false)
	const [lineCount, setLineCount] = useState(0);


	useEffect(() => {
		const token = typeof window !== 'undefined' ? localStorage.getItem("TOKEN") : null;
		const userType = typeof window !== 'undefined' ? localStorage.getItem("USER_TYPE") : null;

		if (!token) {
			setOpenQAModal(true);
		} else if (userType === "FACTORY") {
			setOpenCAModal(true);
		}
	}, []);

	const handleCloseCAModal = () => {
		// setOpenCAModal(false)
	}





	const handleCloseQAModal = () => {
		// setOpenQAModal(false)
	}

	const handleCloseSaveModal = () => {
		setOpenSaveModal(false)
	}

	const handleOpenSaveModal = () => {
		setOpenSaveModal(true)
	}

	const handleOpenCheckOutModal = () => {
		setOpenCheckOutModal(true)
	}
	const handleCloseCheckOutModal = () => {
		setOpenCheckOutModal(false)
	}
	const handleNextCheckOutModal = (city) => {
		handleCloseCheckOutModal();
		setNewCity(city);
	}

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.items);

	const handleIncrement = (product_id, color_id) => {
		dispatch(incrementLineQuantity({ product_id, color_id }));
	};

	const handleDecrement = (product_id, color_id) => {
		dispatch(decrementLineQuantity({ product_id, color_id }));
	};



	useEffect(() => {
		fetchCart(dispatch);
	}, [dispatch]);

	const onTestQuantity = () => {
		dispatch(testQuantity())
	}

	useEffect(() => {
		const count = cart?.reduce((acc, el) => {
			const itemCount = el.color_variations.reduce((subAcc, color) => subAcc + color.quantity, 0);
			return acc + itemCount;
		}, 0);

		setLineCount(count || 0);
	}, [cart]);

	var summary = 0
	cart?.map(el => {
		var product_summary = 0
		el.color_variations.map(color => {
			product_summary = product_summary + (color.quantity * el.price * el.sizes.length)
		})
		summary = summary + product_summary
	})

	var sale_drop = summary * 0.01


	const handleSaveCart = async () => {

		const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null;

		if (!token) {
			console.error("Пользователь не авторизован");
			return;
		}


		const formattedCart = cart.map((item) => ({
			product_id: item.product_id,
			colors: item.color_variations.map((color) => ({
				color_id: color.id,
				quantity: color.quantity,
			})),
		}));

		const obj = {
			cart: [
				...formattedCart
			]
		}

		axios.put(`${BACK_URL}/api/customers/cart-update/`, obj, {
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then(res => {
				console.log(obj)
				console.log(res)
				handleOpenSaveModal()
			}).catch(err => {
				console.log(obj)
				console.log(err)
			})


	};

	useEffect(() => {
		const fetchUserInfo = async () => {
			const token = typeof window !== 'undefined' ? localStorage.getItem("TOKEN") : null;

			if (!token) return;

			try {
				const res = await axios.get(`${BACK_URL}/api/customers/get-user-info`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});

				console.log(res.data);
				setFirstName(res.data.first_name);
				setPhone(res.data.username);
				if (typeof window !== 'undefined') {
					localStorage.setItem("city", res.data.city);
				}
			} catch (err) {
				console.log(err);
			}
		};

		fetchUserInfo();
	}, []);

	const handleCheckout = () => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('TOKEN');
			if (!token) {
				console.error("Пользователь не авторизован");
				return;
			}
			const obj = {}
			axios.get(`${BACK_URL}/api/customers/cart/checkout`, {
				headers: {
					Authorization: `Token ${token}`
				}
			}).then(res => {
				console.log("CHECKOUT RES: ", res.data)
				handleOpenCheckOutModal()
			}).catch(err => {
				console.log("CHECKOUT ERROR: ", err)
			})
		}
	}

	const backs = [
		{
			"url": "/",
			"label": "На главную"
		},
		{
			"url": "/account-customer",
			"label": "В личный кабинет"
		}
	]

	return (
		<div className='cart'>
			<div className='cart_items'>
				<BackPage backs={backs} />
				<div className='cart_info'>
					Корзина
				</div>
				<div className='cart_items_list'>
					{
						cart?.map((el, index) => {

							return (


								<CartItem data={el}
									key={index}
									onIncrement={handleIncrement}
									onDecrement={handleDecrement}
								/>


							)
						})
					}
				</div>
			</div>
			<div className='checkout'>
				<p className='chose_adress'>
					Выбрать адрес доставки
				</p>
				<p className='secondary_text'>
					<span>
						Товары ({lineCount} линеек):
					</span>
					<span>
						<CurrencyFormatter amount={summary} />

					</span>
				</p>
				<p className='secondary_text'>

					<span>
						Моя скидка:
					</span>
					<span>
						{/* {sale_drop} р */}
						0 р.
					</span>
				</p>
				<p className='summary'>

					<span>ИТОГО:</span>
					<span><CurrencyFormatter amount={summary} /></span>
				</p>
				<div className='buttons'>
					<Button fullWidth variant='outlined' onClick={handleSaveCart}>Сохранить</Button>

					<Button fullWidth variant='contained' onClick={() => handleCheckout()} style={{ background: "#CD0000" }} >Оформить</Button>
				</div>
				<SaveModal handleOpenCheckOut={handleOpenCheckOutModal} handleOpen={handleOpenSaveModal} handleClose={handleCloseSaveModal} open={openSaveModal} />
				<CheckOutModal handleOpen={handleOpenCheckOutModal} handleClose={handleCloseCheckOutModal} open={openCheckOutModal} handleNext={handleNextCheckOutModal} handleSaveCart={handleSaveCart} />
				<QuickAuthModal open={openQAModal} handleClose={handleCloseQAModal} warningText="Корзина доступна только после авторизации" />
				<ClientAllowModal open={openCAModal} handleClose={handleCloseCAModal} isAddToCartAction={false} />
			</div>
		</div>
	)
}

export default Cart