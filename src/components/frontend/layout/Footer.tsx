import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Twitter, Facebook, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-white mt-20 relative">
      {/* Overlay at the top */}
      <div className="overlay-top relative">
        <img
          src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/overlay-top.png"
          alt="overlay"
          className="absolute top-[-1px] left-0 w-full h-[15px] z-10"
        />
      </div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url("https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/bg.jpg")' }}
      />

      {/* Main content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mb-12">
              <h4 className="text-white uppercase mb-6 tracking-widest">Get In Touch</h4>
              <p className="flex items-center mb-2"><MapPin className="mr-2 h-4 w-4" />123 Street, New York, USA</p>
              <p className="flex items-center mb-2"><Phone className="mr-2 h-4 w-4" />+012 345 67890</p>
              <p className="flex items-center"><Mail className="mr-2 h-4 w-4" />info@example.com</p>
            </div>
            <div className="mb-12">
              <h4 className="text-white uppercase mb-6 tracking-widest">Follow Us</h4>
              <p className="mb-4">Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
              <div className="flex space-x-2">
                <a className="w-12 h-12 flex items-center justify-center border border-white rounded hover:bg-white hover:text-gray-900 transition-colors" href="#"><Twitter className="h-5 w-5" /></a>
                <a className="w-12 h-12 flex items-center justify-center border border-white rounded hover:bg-white hover:text-gray-900 transition-colors" href="#"><Facebook className="h-5 w-5" /></a>
                <a className="w-12 h-12 flex items-center justify-center border border-white rounded hover:bg-white hover:text-gray-900 transition-colors" href="#"><Linkedin className="h-5 w-5" /></a>
                <a className="w-12 h-12 flex items-center justify-center border border-white rounded hover:bg-white hover:text-gray-900 transition-colors" href="#"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <div className="mb-12">
              <h4 className="text-white uppercase mb-6 tracking-widest">Open Hours</h4>
              <div>
                <h6 className="text-white uppercase mb-2">Monday - Friday</h6>
                <p className="mb-4">8.00 AM - 8.00 PM</p>
                <h6 className="text-white uppercase mb-2">Saturday - Sunday</h6>
                <p>2.00 PM - 8.00 PM</p>
              </div>
            </div>
            <div className="mb-12">
              <h4 className="text-white uppercase mb-6 tracking-widest">Newsletter</h4>
              <p className="mb-4">Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
              <div className="w-full">
                <Input
                  type="email"
                  className="w-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your Email"
                  required
                />
                <Button
                  className=" mt-1 px-8 py-4 w-full text-white font-bold transition-colors"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-white border-t border-gray-800 mt-16 py-8 px-4 sm:px-6 lg:px-8">
          <p className="mb-2">Copyright &copy; <a className="font-bold hover:text-blue-400" href="#">Domain</a>. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
