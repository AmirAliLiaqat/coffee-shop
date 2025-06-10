import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

const Reservation = () => {
  return (
    <div className="w-full my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative">
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

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            <CardContent className="p-8 lg:p-12">
              <div className="mb-8">
                <h1 className="text-5xl font-bold">30% OFF</h1>
                <h1 className="text-4xl text-white mt-2 font-bold">For Online Reservation</h1>
              </div>
              <p className="text-white mb-6 text-lg">Lorem justo clita erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea</p>
              <ul className="text-white space-y-4">
                <li className="flex items-center text-lg">
                  <Check className="h-5 w-5 mr-3" />
                  Lorem ipsum dolor sit amet
                </li>
                <li className="flex items-center text-lg">
                  <Check className="h-5 w-5 mr-3" />
                  Lorem ipsum dolor sit amet
                </li>
                <li className="flex items-center text-lg">
                  <Check className="h-5 w-5 mr-3" />
                  Lorem ipsum dolor sit amet
                </li>
              </ul>
            </CardContent>
            <CardContent className="p-8 lg:p-12 bg-opacity-80">
              <div className="text-center">
                <h1 className="text-3xl text-white mb-8 mt-8 font-bold">Book Your Table</h1>
                <form className="space-y-4">
                  <Input
                    type="text"
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Name"
                    required
                  />
                  <Input
                    type="email"
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email"
                    required
                  />
                  <Input
                    type="text"
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Date"
                  />
                  <Input
                    type="text"
                    className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Time"
                  />
                  <Select>
                    <SelectTrigger className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Person" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Person 1</SelectItem>
                      <SelectItem value="2">Person 2</SelectItem>
                      <SelectItem value="3">Person 3</SelectItem>
                      <SelectItem value="4">Person 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full py-4 text-white font-bold transition-colors rounded-lg shadow-lg"
                    type="submit"
                  >
                    Book Now
                  </Button>
                </form>
              </div>
            </CardContent>
          </div>

          {/* Bottom Overlay */}
          <div className="overlay-bottom relative">
            <img
              src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-bottom.png"
              alt="overlay bottom"
              className="absolute bottom-[-1px] left-0 w-full h-[15px] z-10"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Reservation
