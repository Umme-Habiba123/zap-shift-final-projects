import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';



const PaymentForm = () => {

    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()
    const navigate=useNavigate()
    console.log(parcelId)


    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })


    if (isPending) {
        return <span className="loading loading-ball loading-xl"></span>
    }

    // amount--------
    console.log('parcelId', parcelInfo)
    const amount = parcelInfo.cost
    const amountInCents = amount * 100;


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }


        const card = elements.getElement(CardElement)

        if (!card) {
            return
        }

        // Step-1 : validate the card---------
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setError(error.message)
        } else {
            setError('')
            console.log('payment-method', paymentMethod)


            //Step-2 : Create payment intent------------
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents: amountInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret

            // Step-3: Confirm payment------
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,

                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result)
                    // Step-4: mark parcel paid also creae payment hiostry----
                    const paymentData = {
                        transactionId: result.paymentIntent.id,
                        parcelId,
                        amountInCents,
                        email: user.email,
                         method: 'card'
                        // paymentMethod:result.paymentIntent.payment_method_types,



                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData)
                    if (paymentRes.data.parcelId) {
                        console.log('payment succesful')
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            html: `
                          <p><strong>Transaction ID:</strong></p>
                           <code>${result.paymentIntent.id}</code>
      `,
                            confirmButtonText: 'Go to My Parcels'
                        }).then(() => {
                            navigate('/dashboard/myParcels');
                        });

                    }


                }
            }
        }


    };






    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto '>
                <CardElement className='p-2 border rounded'>
                </CardElement>

                <button
                    className='btn bg-[#CAEB66] border-none text-black w-full hover:bg-[#acc367]'
                    type='submit'
                    disabled={!stripe}>
                    pay ${amountInCents}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }

            </form>

        </div>
    );
};

export default PaymentForm;