import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({})

export function CartContextProvider({children}){
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const [cartProducts, setCardProducts] = useState([])
    useEffect(() => {
        if(cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    useEffect(() => {
        if(ls && ls.getItem('cart')) {
            setCardProducts(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    function addProduct(productId){
        setCardProducts(prev => [...prev, productId])
    }

    function removeProduct(productId){
        setCardProducts(prev => {
            const pos = prev.indexOf(productId)
            if(pos !== -1) {
                return prev.filter((value, index) => index !== pos)
            }
            return prev
        })
    }

    function clearCart(){
        setCardProducts([])
    }

    return (
        <CartContext.Provider value={{cartProducts, setCardProducts, addProduct, removeProduct, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}