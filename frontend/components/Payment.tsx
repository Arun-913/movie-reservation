"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Payment = ({ orderId }: { orderId: string}) => {
    const router = useRouter();

    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = initializeRazorpay;
        };

        const initializeRazorpay = () => {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: "100",
                currency: "INR",
                name: "TrackEase",
                description: "Ticket Booking Payment",
                image: "https://example.com/your_logo",
                order_id: orderId,
                handler: async function (response: any) {
                    console.log(response);
                    console.log("Payment successfull");
                    router.push('/');
                },
                prefill: {
                    name: process.env.NEXT_PUBLIC_NAME,
                    email: process.env.NEXT_PUBLIC_EMAIL,
                    contact: process.env.NEXT_PUBLIC_CONTACT
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                alert("Payment failed");
                console.log(response);
            });

            rzp1.open();
        };

        loadRazorpayScript();
    }, []);    
    return null; 
}