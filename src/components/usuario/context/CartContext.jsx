import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(()=>{
        try{
            const productosEnLocalStorage = localStorage.getItem('cartProducts')
            return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : []
        } catch(err){
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartItems))
        console.log(cartItems)
        cartItems.map((productInCart)=>{
            verificarStock(productInCart)
        })
    }, [cartItems])


    const verificarStock = async (obj) => {
        try{
            const response = await axios.get(`https://el-buen-sabor.herokuapp.com/verificar-stock/${obj.id}/${obj.amount}/${obj.es_bebida}`)   
            console.log(response)
        } catch(err){
            deleteItemToCart(obj)
            alert("No hay mas stock de este producto")
        }
    }

    const addItemToCart = (product) =>{
         
        // let timerInterval
        // Swal.fire({
        // title: 'Agregando al carro',
        // timer: 200,
        // didOpen: () => {
        //     Swal.showLoading()
        //     const b = Swal.getHtmlContainer().querySelector('b')
        //     timerInterval = setInterval(() => {
        //     b.textContent = Swal.getTimerLeft()
        //     }, 100)
        // },
        // willClose: () => {
        //     clearInterval(timerInterval)
        // }
        // }).then((result) => {
        // /* Read more about handling dismissals below */
        // if (result.dismiss === Swal.DismissReason.timer) {
        //     console.log('I was closed by the timer')
        // }
        // })


        const inCart = cartItems.find((productInCart) => productInCart.denominacion === product.denominacion)
            
            if (inCart) {
                setCartItems(
                    cartItems.map((productInCart)=>{
                        if (productInCart.denominacion === product.denominacion) {
                                return {...inCart, amount: inCart.amount + 1}
                        } else return productInCart
                    })
                )
            } else {
                setCartItems([...cartItems, {...product, amount: 1}])   
            }}



        const deleteItemToCart = (product) =>{
            const inCart = cartItems.find(
                (productInCart) => productInCart.denominacion === product.denominacion
            )
            if(inCart.amount === 1){
                setCartItems(
                    cartItems.filter(productInCart=>productInCart.denominacion !== product.denominacion)
                )
            }else{
                setCartItems(
                    cartItems.map((productInCart)=>{
                    if(productInCart.denominacion === product.denominacion){
                        return {...inCart, amount: inCart.amount -1}
                    }else return productInCart;
                }))
            }
        }

        return(
            <CartContext.Provider value={{cartItems, addItemToCart, deleteItemToCart}}>
                {children} 
            </CartContext.Provider>
        )
    }
