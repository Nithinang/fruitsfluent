import './Productdetails.css'
import Carousel from "react-material-ui-carousel";
import React, { useEffect } from 'react'
import Photo from '../../images/almonds.avif'
import Footer from '../layout/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import Notecontext from '../context/notecontext';

const Productdetails = () => {

    const [data, setdata] = useState({})
    const [count, setCount] = useState(0)

    const [itemquantity, setitemquantity] = useState(0)

    let a = useContext(Notecontext)

    let id = useParams().id

    const show = async (e) => {
        let fetchstring = "https://nutkart-backend.onrender.com/products/all/" + id
        const res = await fetch(fetchstring, {
            method: "GET"
        })

        const resdata = await res.json();
        await setdata(resdata.data)
    }

    useEffect(() => {
        show();
    }, [])

    const navigate = useNavigate();

    const addtocart = async (e) => {
        // let productdata = JSON.parse(e.target.value)
        if (a.name == "#") {
            navigate("/login")
        }
        else {
            let arr = a.cart
            let check = 0
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].productname == data.productname) {
                    check = 1
                }
            }
            if (check == 0) {
                data.cartquantity = Number(1)
                data.cardsum = Number(data.productprice)
                arr.push(data)
                a.cart = arr
            }

            navigate("/cart/")
        }
    }

    return (
        <>
            <div className="ProductDetails">
                <div>
                    <img src={data.imgsrc2}
                        className="CarouselImage"
                    />
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{data.productname}</h2>
                    </div>
                    <div className="detailsBlock-2">
                        <span className="detailsBlock-2-span">
                            {" "}
                            {/* (125 Reviews) */}
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>Rs. {data.productprice}</h1>
                        <div className="detailsBlock-3-1">
                            {/* <div className="detailsBlock-3-1-1">
                                <button onClick={() => setCount(Math.max(count - 1, 0))}>-</button>
                                {count}
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div> */}
                            <button onClick={addtocart}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            { }:
                            <b className="greenColor">
                                In Stock
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{data.productname}</p>
                    </div>

                    {/* <button className="submitReview">
                        Submit Review
                    </button> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Productdetails