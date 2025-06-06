import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Offer = () => {
  return (
    <div className="w-full text-center relative">
      {/* Top Overlay */}
      <div className="overlay-top relative">
        <img
          src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-top.png"
          alt="overlay top"
          className="absolute top-[-1px] left-0 w-full h-[15px] z-10"
        />
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/bg.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="p-0">
            <h1 className="text-5xl mt-3 font-bold">50% OFF</h1>
            <h1 className="text-white text-4xl my-3 font-bold">Sunday Special Offer</h1>
            <h4 className="text-white font-normal mb-8 pb-8 text-lg">Only for Sunday from 1st Jan to 30th Jan 2045</h4>
            <form className="flex justify-center mb-8">
              <div className="flex max-w-md w-full gap-1">
                <Input
                  type="email"
                  className="w-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Email"
                  required
                />
                <Button
                  className="px-8 py-4 text-white font-bold transition-colors"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Overlay */}
      <div className="overlay-bottom relative">
        <img
          src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-bottom.png"
          alt="overlay bottom"
          className="absolute bottom-[-1px] left-0 w-full h-[15px] z-10"
        />
      </div>
    </div>
  )
}

export default Offer
