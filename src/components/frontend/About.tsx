import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Coffee, Clock, Heart } from "lucide-react"

const About = () => {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h4 className="uppercase tracking-widest font-medium">About Us</h4>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 leading-tight py-1">
            Serving Since 2025
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-4 sm:mt-8">
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-gray-600 text-sm sm:text-base">Premium Coffee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-gray-600 text-sm sm:text-base">24/7 Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-gray-600 text-sm sm:text-base">Made with Love</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="animate-slide-in-left">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4 text-gray-900">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <h5 className="text-xl mb-4 text-gray-700 font-medium">Eos kasd eos dolor vero vero, lorem stet diam rebum. Ipsum amet sed vero dolor sea</h5>
                <p className="mb-6 leading-relaxed">Takimata sed vero vero no sit sed, justo clita duo no duo amet et, nonumy kasd sed dolor eos diam lorem eirmod. Amet sit amet amet no. Est nonumy sed labore eirmod sit magna. Erat at est justo sit ut. Labor diam sed ipsum et eirmod</p>
                <Link href="/about/our-story">
                  <Button variant="default" className="transition-colors duration-300">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fadeIn relative h-[500px] lg:h-auto">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/about.png"
              alt="About Us"
            />
          </div>

          <div className="animate-slide-in-right">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4 text-gray-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed">Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor</p>
                <div className="space-y-4">
                  <div className="animate-slide-in-left [animation-delay:100ms]">
                    <h5 className="text-xl flex items-center">
                      <Check className="h-5 w-5 mr-3" />
                      Lorem ipsum dolor sit amet
                    </h5>
                  </div>
                  <div className="animate-slide-in-left [animation-delay:200ms]">
                    <h5 className="text-xl flex items-center">
                      <Check className="h-5 w-5 mr-3" />
                      Lorem ipsum dolor sit amet
                    </h5>
                  </div>
                  <div className="animate-slide-in-left [animation-delay:300ms]">
                    <h5 className="text-xl flex items-center">
                      <Check className="h-5 w-5 mr-3" />
                      Lorem ipsum dolor sit amet
                    </h5>
                  </div>
                </div>
                <Link href="/about/our-vision">
                  <Button variant="default" className="mt-6 transition-colors duration-300">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
