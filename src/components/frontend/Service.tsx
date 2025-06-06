import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Coffee, Award, Calendar } from "lucide-react"

const Service = () => {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="uppercase tracking-widest font-medium">Our Services</h4>
          <h1 className="text-4xl font-bold mt-2 text-gray-900">Fresh & Organic Beans</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <img
                    className="w-full h-48 object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
                    alt="Fastest Door Delivery"
                  />
                </div>
                <div className="w-full sm:w-3/5 sm:pl-8">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
                    <Truck className="h-6 w-6 mr-2" />
                    Fastest Door Delivery
                  </h4>
                  <p className="text-gray-600">Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                    invidunt, dolore tempor diam ipsum takima erat tempor</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <img
                    className="w-full h-48 object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80"
                    alt="Fresh Coffee Beans"
                  />
                </div>
                <div className="w-full sm:w-3/5 sm:pl-8">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
                    <Coffee className="h-6 w-6 mr-2" />
                    Fresh Coffee Beans
                  </h4>
                  <p className="text-gray-600">Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                    invidunt, dolore tempor diam ipsum takima erat tempor</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <img
                    className="w-full h-48 object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
                    alt="Best Quality Coffee"
                  />
                </div>
                <div className="w-full sm:w-3/5 sm:pl-8">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
                    <Award className="h-6 w-6 mr-2" />
                    Best Quality Coffee
                  </h4>
                  <p className="text-gray-600">Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                    invidunt, dolore tempor diam ipsum takima erat tempor</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <img
                    className="w-full h-48 object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
                    alt="Online Table Booking"
                  />
                </div>
                <div className="w-full sm:w-3/5 sm:pl-8">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 flex items-center">
                    <Calendar className="h-6 w-6 mr-2" />
                    Online Table Booking
                  </h4>
                  <p className="text-gray-600">Sit lorem ipsum et diam elitr est dolor sed duo. Guberg sea et et lorem dolor sed est sit
                    invidunt, dolore tempor diam ipsum takima erat tempor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Service
