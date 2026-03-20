import React from 'react'
import Image from 'next/image'

const Services = () => {
    return (
        <div className="bg-[#f7f5f0]">
            <div className="max-w-300 mx-auto flex gap-30 items-center justify-center text-center py-6">

                <div className='border-r border-[#f1ede5] flex flex-col items-center justify-center'>
                    <Image alt='Return' src='/info-ico1.svg' width={63} height={63} />
                    <p className="font-semibold text-[#404041]">Free Easy Returns</p>
                    <p className="text-[#404041]">Return to 7 days</p>
                </div>

                <div className='border-r border-[#f1ede5] flex flex-col items-center justify-center'>
                    <Image alt='Delivery' src='/info-ico2.svg' width={63} height={63} />
                    <p className="font-semibold text-[#404041]">Free Delivery Monday</p>
                    <p className="text-[#404041]">Orders over AED49</p>
                </div>

                <div className='border-r border-[#f1ede5] flex flex-col items-center justify-center'>
                    <Image alt='Support' src='/info-ico3.svg' width={63} height={63} />
                    <p className="font-semibold text-[#404041]">All Day Support</p>
                    <p className="text-[#404041]">24/7 Support care</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <Image alt='Secured' src='/info-ico4.svg' width={63} height={63} />
                    <p className="font-semibold text-[#404041]">Secure Checkout</p>
                    <p className="text-[#404041]">100% protected by Paypal</p>
                </div>

            </div>
        </div>
    )
}

export default Services