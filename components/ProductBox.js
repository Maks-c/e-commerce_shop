import styled from "styled-components";
import React, {useEffect, useState} from 'react'
import Button, {ButtonStyle} from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "./CartContext";
// import FlyingButton from 'react-flying-item'
import {primary} from "../lib/colors";
import FlyingButton from "./FlyingButton";
import {RevealWrapper} from "next-reveal";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  button {
    width: 100%;
    justify-content: center;
  }
`


const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`
const ProductInfoBox = styled.div`
  margin-top: 5px;
`

const PriceRow = styled.div`
  display: block;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  };


  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`


const WishListButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;

  ${props => props.wished ? `
  color:red;
  ` : `
  color:black;
  `}
  svg {
    width: 16px;
  }
`


export default function ProductBox({
                                       _id,
                                       title,
                                       description,
                                       price,
                                       images,
                                       wished = false,
                                       onRemoveFromWishList = () => {
                                       }
                                   }){

    const url = '/product/' + _id

    const [isWished, setIsWished] = useState(wished)


    function addToWishlist(ev){
        ev.preventDefault()
        ev.stopPropagation()
        const nextValue = !isWished
        if(nextValue === false && onRemoveFromWishList) {
            onRemoveFromWishList(_id)
        }
        axios.post('/api/wishlist', {
            product: _id,
        }).then(() => {
        })
        setIsWished(nextValue)

    }


    return (
        <ProductWrapper>
            <RevealWrapper>
                <WhiteBox href={url}>
                    <div>
                        <WishListButton wished={isWished} onClick={addToWishlist}>
                            {isWished ? <HeartSolidIcon/> : <HeartOutlineIcon/>}
                        </WishListButton>
                        <img src={images?.[0]} alt="first image"/>
                    </div>
                </WhiteBox>
            </RevealWrapper>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}>
                        Add to cart
                    </FlyingButton>
                </PriceRow>
            </ProductInfoBox>


        </ProductWrapper>
    )
}