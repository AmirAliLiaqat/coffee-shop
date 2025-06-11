import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OurStory() {
  return (
    <div className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/about">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Button>
        </Link>

        <Card className="border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-gray-900">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                Founded in 2025, our coffee shop began with a simple yet powerful vision: to create a space where coffee lovers could experience the perfect blend of tradition and innovation. What started as a small corner shop has grown into a beloved community hub, all while maintaining our commitment to quality and authenticity.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Journey</h2>
              <p className="text-gray-700">
                From our humble beginnings, we've been dedicated to sourcing the finest coffee beans from sustainable farms around the world. Our journey has been marked by countless cups of coffee shared, stories exchanged, and friendships formed within our walls.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
              <p className="text-gray-700">
                We believe in more than just serving great coffee. Our commitment extends to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Sustainable sourcing practices</li>
                <li>Supporting local communities</li>
                <li>Creating a welcoming environment for all</li>
                <li>Continuous innovation in our craft</li>
              </ul>

              <div className="animate-fadeIn mt-5 h-[350px] lg:h-[500px]">
                <img
                  className="w-full h-full"
                  src="https://demo.htmlcodex.com/1528/coffee-shop-html-template/img/about.png"
                  alt="About Us"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 